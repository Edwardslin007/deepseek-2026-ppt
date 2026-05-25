import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import pptxgen from "pptxgenjs";
import { PDFDocument } from "pdf-lib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const htmlPath = join(root, "index.html");
const screenshotDir = join(root, "screenshots");
const exportDir = join(root, "exports");
const pdfPath = join(exportDir, "DeepSeek-2026-Field-Brief.pdf");
const pptxPath = join(exportDir, "DeepSeek-2026-Field-Brief.pptx");
const manifestPath = join(exportDir, "export-manifest.json");

if (!existsSync(htmlPath)) {
  throw new Error(`Missing ${htmlPath}. Run npm run build first.`);
}

mkdirSync(screenshotDir, { recursive: true });
mkdirSync(exportDir, { recursive: true });

const browserCandidates = [
  join(process.env.LOCALAPPDATA || "", "ms-playwright", "chromium-1223", "chrome-win64", "chrome.exe"),
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
];
const executablePath = browserCandidates.find((candidate) => candidate && existsSync(candidate));
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {})
});
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1
});

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.evaluate(() => {
  window.__setLowPowerMode?.(true, { persist: false });
  document.body.classList.add("low-power");
});

const total = await page.locator(".slide").count();
const screenshotPaths = [];

for (let i = 0; i < total; i++) {
  await page.evaluate((idx) => {
    window.__currentSlideIndex = idx;
    const deck = document.querySelector("#deck");
    const nav = document.querySelector("#nav");
    const slides = [...document.querySelectorAll(".slide")];
    if (deck) {
      deck.style.transition = "none";
      deck.style.transform = `translateX(${-idx * 100}vw)`;
    }
    slides.forEach((slide, slideIdx) => {
      const active = slideIdx === idx;
      slide.classList.toggle("active", active);
      slide.querySelectorAll("[data-anim],.row-fill,.tl-node,.stack-block,.bar-tower,.sub-card,.col,.vrule,.kpi-cell,.card-fill,.card-accent,.card-ink")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
    });
    nav?.querySelectorAll(".dot").forEach((dot, dotIdx) => dot.classList.toggle("active", dotIdx === idx));
    window.__playSlide?.(idx);
  }, i);
  await page.waitForTimeout(180);
  const out = join(screenshotDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
  await page.screenshot({ path: out, fullPage: false });
  screenshotPaths.push(out);
}

await browser.close();

const pdfDoc = await PDFDocument.create();
for (const pngPath of screenshotPaths) {
  const png = await pdfDoc.embedPng(readFileSync(pngPath));
  const pdfPage = pdfDoc.addPage([1600, 900]);
  pdfPage.drawImage(png, { x: 0, y: 0, width: 1600, height: 900 });
}
writeFileSync(pdfPath, await pdfDoc.save());

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.subject = "DeepSeek 2026 Field Brief";
pptx.title = "DeepSeek 2026 Field Brief";
pptx.company = "Local Generated";
pptx.lang = "zh-CN";
pptx.theme = {
  headFontFace: "Microsoft YaHei UI",
  bodyFontFace: "Microsoft YaHei UI",
  lang: "zh-CN"
};
pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333333, height: 7.5 });
pptx.layout = "CUSTOM_WIDE";

for (const pngPath of screenshotPaths) {
  const slide = pptx.addSlide();
  slide.background = { color: "F7F7F4" };
  slide.addImage({ path: pngPath, x: 0, y: 0, w: 13.333333, h: 7.5 });
}
await pptx.writeFile({ fileName: pptxPath });

writeFileSync(manifestPath, JSON.stringify({
  generated_at: new Date().toISOString(),
  html: htmlPath,
  screenshots: screenshotPaths,
  pdf: pdfPath,
  pptx: pptxPath,
  slide_count: total,
  viewport: "1920x1080"
}, null, 2), "utf8");

console.log(JSON.stringify({
  slide_count: total,
  html: htmlPath,
  pdf: pdfPath,
  pptx: pptxPath,
  screenshots: screenshotDir,
  manifest: manifestPath
}, null, 2));
