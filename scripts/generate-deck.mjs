import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const skillRoot = "C:\\Users\\10569\\.codex\\skills\\guizang-ppt-skill";
const templatePath = join(skillRoot, "assets", "template-swiss.html");
const outPath = join(root, "index.html");

const title = "DeepSeek 2026 · V4 之后的中国 AI 基础设施叙事";
const total = 20;

const page = (n) => String(n).padStart(2, "0");
const chrome = (n, left = "DeepSeek 2026 · Field Brief") => `
  <div class="chrome-min">
    <div class="l">${left}</div>
    <div class="r">${page(n)} / ${total}</div>
  </div>`;

function cover() {
  return `
<section class="slide accent" data-layout="SWISS-COVER-ASCII" data-animate="hero">
  <div class="canvas-card">
    <canvas class="ascii-bg" aria-hidden="true"></canvas>
    <div class="chrome-min">
      <div class="l">DEEPSEEK · 2026 FIELD BRIEF</div>
      <div class="r">V4 / OPEN WEIGHTS / INFRA · 01 / ${total}</div>
    </div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:2.6vh">
      <div data-anim="kicker" class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em">LATEST PROGRESS · MAY 2026</div>
      <h1 data-anim="title" style="align-self:center;font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(10.2vw,17vh);line-height:.95;letter-spacing:-.025em;color:#fff">DeepSeek<br/><span style="font-style:italic;font-weight:300">2026</span></h1>
      <div data-anim="bottom" style="display:grid;grid-template-rows:auto auto;gap:1.6vh;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh">
        <div data-anim="lead" class="lead" style="max-width:58ch;color:rgba(255,255,255,.86);font-weight:300">从 R1 冲击波到 V4 Preview：百万上下文、开放权重、低价 API 与国产芯片适配，正在重写中国 AI 基础设施的叙事。</div>
        <div style="display:flex;justify-content:space-between;align-items:end">
          <div class="t-meta" style="color:rgba(255,255,255,.6)">Based on public sources · 2026-05-25</div>
          <div class="t-meta" style="color:rgba(255,255,255,.6)">HTML · PDF · PPTX · GitHub Pages</div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function indexSlide() {
  const items = [
    ["01", "官方主线", "V4 Preview 已接棒，而非 R2。"],
    ["02", "能力边界", "开放权重逼近前沿，但第三方评测更谨慎。"],
    ["03", "成本武器", "Flash / Pro 形成高低搭配。"],
    ["04", "系统工程", "MoE、压缩注意力、DeepEP/DeepGEMM。"],
    ["05", "国产芯片", "华为 Ascend 适配成为产业信号。"],
    ["06", "风险约束", "监管、蒸馏争议与地缘政治。"]
  ];
  return `
<section class="slide light" data-layout="S01" data-animate="grid-reveal">
  <div class="canvas-card">
    ${chrome(2, "INDEX · WHAT MATTERS")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-meta">Six questions for one model company</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(6.4vw,11.2vh);line-height:.98;letter-spacing:-.035em">这份 PPT 回答六个问题</h2>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:2.2vh 1.4vw">
        ${items.map(([num, head, body], i) => `
        <div class="${i === 0 ? "card-accent" : "card-fill"}" style="padding:2.2vh 1.4vw;display:grid;grid-template-rows:auto 1fr auto;min-height:19vh">
          <div class="t-meta" style="${i === 0 ? "color:var(--accent-on)" : ""}">${num}</div>
          <div style="align-self:end;font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(2.4vw,4.4vh);line-height:1.08;letter-spacing:-.025em">${head}</div>
          <p style="font-size:max(16px,.96vw);line-height:1.5;font-weight:500;${i === 0 ? "color:rgba(255,255,255,.86)" : "color:var(--text-secondary)"}">${body}</p>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function thesisSlide() {
  return `
<section class="slide split" data-layout="S03" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-ink" style="justify-content:space-between">
        ${chrome(3, "THESIS · MAIN CLAIM")}
        <div data-anim="statement" style="display:flex;flex-direction:column;gap:2vh">
          <div class="t-meta" style="color:rgba(255,255,255,.62)">One sentence</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(7.8vw,13.8vh);line-height:.96;letter-spacing:-.035em;color:#fff">V4 不是<br/>一次模型更新</h2>
        </div>
        <div class="t-meta" style="color:rgba(255,255,255,.62)">It is an infra signal.</div>
      </div>
      <div class="half b-grey r-border" style="justify-content:center;gap:3vh">
        <div data-anim="up" style="display:flex;flex-direction:column;gap:2.4vh">
          <p class="lead" style="font-weight:300;color:var(--text-primary);max-width:42ch">DeepSeek 2026 的核心，不再是“R2 何时来”，而是 V4 系列把模型、API、开源权重、国产芯片和资本叙事打包成一个基础设施命题。</p>
          <div style="height:1px;background:var(--border-subtle)"></div>
          <p class="body" style="font-weight:500;color:var(--text-secondary);max-width:48ch">判断 DeepSeek 的新框架：看 V4 是否稳定、看长上下文是否便宜可用、看国产硬件是否规模化、看监管是否限制海外渗透。</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function timelineSlide() {
  const rows = [
    ["2025.01", "R1", "低成本推理模型冲击全球估值锚点。"],
    ["2025.12", "V3.2", "作为 V4 前的公开模型线继续迭代。"],
    ["2026.04", "V4", "Preview 上线，Pro / Flash 双版本发布。"],
    ["2026.07", "API", "旧模型名 deepseek-chat / reasoner 退役。"]
  ];
  return `
<section class="slide light" data-layout="S02" data-animate="progression">
  <div class="canvas-card">
    ${chrome(4, "TIMELINE · FROM R1 TO V4")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:4vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
        <div class="t-meta">Public release sequence</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(6vw,10.6vh);line-height:.98;letter-spacing:-.035em">真正的时间线：V4 已经接棒</h2>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:1fr 1fr;gap:3vw;align-items:stretch">
        <div class="timeline-v" style="padding:1vh 0">
          ${rows.map(([date, name, desc]) => `
          <div class="tl-node" style="min-height:10vh">
            <div class="tl-axis"><span class="dot"></span></div>
            <div>
              <div class="t-meta">${date}</div>
              <div style="font-family:var(--sans);font-weight:200;font-size:min(4.2vw,7.5vh);line-height:.95;letter-spacing:-.035em;color:${name === "V4" ? "var(--accent)" : "var(--text-primary)"}">${name}</div>
              <p class="body-sm" style="font-weight:500;color:var(--text-secondary);max-width:36ch">${desc}</p>
            </div>
          </div>`).join("")}
        </div>
        <div style="display:grid;grid-template-rows:1fr auto;gap:3vh">
          <div class="card-accent" style="padding:3vh 2vw;display:flex;flex-direction:column;justify-content:space-between">
            <div class="t-meta" style="color:var(--accent-on)">KEY DATE</div>
            <div style="font-family:var(--sans);font-weight:200;font-size:min(8.4vw,14vh);line-height:.88;letter-spacing:-.05em">2026<br/>04.24</div>
            <p style="font-size:max(18px,1.1vw);line-height:1.5;font-weight:500;color:rgba(255,255,255,.9)">官方透明度页、API 文档与 Hugging Face 同步进入 V4 主线。</p>
          </div>
          <div class="t-meta" style="color:var(--text-helper)">R2 remains unconfirmed in official channels.</div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function specCompareSlide() {
  return `
<section class="slide light" data-layout="S08" data-animate="duo-mirror">
  <div class="canvas-card">
    ${chrome(5, "MODEL LINE · PRO VS FLASH")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-meta">Two-speed portfolio</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(6vw,10.4vh);line-height:.98;letter-spacing:-.035em">V4 被拆成两种速度</h2>
      </div>
      <div class="duo-compare" data-anim="up">
        <div class="col">
          <div class="col-tag"><span class="num">01</span><span>DeepSeek-V4-Pro</span></div>
          <div class="col-ttl">能力上限</div>
          <p class="col-desc">1.6T 总参数、49B 激活参数，面向复杂推理、长链 agent、代码与科学任务。</p>
          <ul class="col-list">
            <li>1M token context</li>
            <li>FP4 + FP8 mixed precision</li>
            <li>旗舰评测与复杂 workflow</li>
          </ul>
        </div>
        <div class="vrule"></div>
        <div class="col accent">
          <div class="col-tag"><span class="num">02</span><span>DeepSeek-V4-Flash</span></div>
          <div class="col-ttl">成本入口</div>
          <p class="col-desc">284B 总参数、13B 激活参数，把百万上下文能力下放到高频业务流。</p>
          <ul class="col-list">
            <li>1M token context</li>
            <li>低价、高吞吐、快速响应</li>
            <li>兼容旧 chat / reasoner 路由</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function kpiTowerSlide() {
  const bars = [
    ["V4-Pro total", "1.6T", "100%"],
    ["V4-Pro active", "49B", "52%"],
    ["V4-Flash total", "284B", "38%"],
    ["V4-Flash active", "13B", "24%"]
  ];
  return `
<section class="slide light" data-layout="S06" data-animate="measure-up">
  <div class="canvas-card">
    ${chrome(6, "PARAMETER ECONOMICS")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:grid;grid-template-columns:1fr auto;gap:4vw;align-items:end">
        <div style="display:flex;flex-direction:column;gap:1.4vh">
          <div class="t-meta">MoE makes size non-linear</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.8vw,10.2vh);line-height:.98;letter-spacing:-.035em">大模型，稀疏激活</h2>
        </div>
        <p class="body-sm" style="max-width:34ch;font-weight:500;color:var(--text-secondary)">总参数塑造能力上限；激活参数决定一次推理真正参与计算的规模。</p>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.6vw;align-items:end">
        ${bars.map(([label, value, height], i) => `
        <div style="display:flex;flex-direction:column;gap:1.2vh;height:48vh;justify-content:end">
          <div class="${i === 0 ? "card-accent" : "card-fill"}" style="height:${height};min-height:12vh;padding:1.8vh 1vw;display:flex;flex-direction:column;justify-content:space-between">
            <div class="t-meta" style="${i === 0 ? "color:var(--accent-on)" : ""}">${label}</div>
            <div style="font-family:var(--sans);font-weight:200;font-size:min(4.8vw,8.5vh);line-height:.9;letter-spacing:-.04em">${value}</div>
          </div>
          <div class="t-meta" style="color:var(--text-helper)">0${i + 1}</div>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function contextSlide() {
  return `
<section class="slide dark" data-layout="S09" data-animate="statement">
  <div class="canvas-card">
    ${chrome(7, "CONTEXT · 1M TOKENS")}
    <div data-anim="statement" style="flex:1;display:grid;grid-template-rows:1fr auto;gap:4vh">
      <div style="align-self:center">
        <div class="t-meta" style="color:rgba(255,255,255,.62);margin-bottom:2vh">LONG CONTEXT IS NOT JUST LENGTH</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(8.8vw,15.4vh);line-height:.94;letter-spacing:-.04em;color:#fff">1M context<br/>不是营销数字</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2vw;border-top:1px solid rgba(255,255,255,.2);padding-top:2.4vh">
        <p class="body-sm" style="font-weight:500;color:rgba(255,255,255,.76)">长文档、代码库和 agent 轨迹可以进入同一个推理空间。</p>
        <p class="body-sm" style="font-weight:500;color:rgba(255,255,255,.76)">Compressed Sparse Attention 与 HCA 让上下文不只是“能塞进去”。</p>
        <p class="body-sm" style="font-weight:500;color:rgba(255,255,255,.76)">真正问题是缓存、检索、引用和分段校验能否跟上。</p>
      </div>
    </div>
  </div>
</section>`;
}

function efficiencySlide() {
  const rows = [
    ["Single-token FLOPs", "27%", "73"],
    ["KV cache", "10%", "90"],
    ["Pretraining tokens", "32T+", "82"],
    ["Context window", "1M", "100"]
  ];
  return `
<section class="slide light" data-layout="S07" data-animate="bar-grow">
  <div class="canvas-card">
    ${chrome(8, "ARCHITECTURE · EFFICIENCY")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-meta">V4 versus V3.2 in long context setting</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.8vw,10.4vh);line-height:.98;letter-spacing:-.035em">效率工程才是主角</h2>
      </div>
      <div data-anim="up" class="h-bar-chart" style="align-self:start">
        ${rows.map(([label, value, pct], i) => `
        <div class="row-lbl">${label}</div>
        <div class="row-track"><div class="row-fill ${i === 0 ? "accent" : ""}" style="width:${pct}%"></div></div>
        <div class="row-val">${value}</div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function apiSlide() {
  return `
<section class="slide light" data-layout="S20" data-animate="stacked-ledger">
  <div class="canvas-card">
    ${chrome(9, "API · PRICING AS STRATEGY")}
    <div class="stacked-ledger" data-anim="ledger" style="flex:1;display:flex;flex-direction:column;justify-content:center">
      ${[
        ["0.0028", "Flash cache-hit input / 1M tokens", "USD"],
        ["0.14", "Flash cache-miss input / 1M tokens", "USD"],
        ["0.28", "Flash output / 1M tokens", "USD"],
        ["07.24", "旧模型名完全退役", "UTC"]
      ].map(([num, label, unit], i) => `
      <div class="ledger-row" style="display:grid;grid-template-columns:36vw 1fr auto;gap:2vw;align-items:center;border-bottom:1px solid var(--border-subtle);padding:2.2vh 0">
        <div class="ledger-num" style="font-family:var(--sans);font-weight:200;font-size:min(9.4vw,13.8vh);line-height:.86;letter-spacing:-.05em;color:${i === 0 ? "var(--accent)" : "var(--text-primary)"}">${num}</div>
        <div class="ledger-label" style="font-family:var(--sans),var(--sans-zh);font-size:max(18px,1.25vw);font-weight:500;color:var(--text-secondary)">${label}</div>
        <div class="ledger-icon t-meta">${unit}</div>
      </div>`).join("")}
    </div>
  </div>
</section>`;
}

function migrationSlide() {
  const steps = [
    ["Map", "旧模型名改为 v4-flash / v4-pro"],
    ["Toggle", "显式控制 thinking 与 effort"],
    ["Cache", "固定上下文走缓存策略"],
    ["Observe", "记录成本、延迟、失败率"]
  ];
  return `
<section class="slide light" data-layout="S11" data-animate="timeline-walk">
  <div class="canvas-card">
    ${chrome(10, "MIGRATION · BEFORE JULY 24")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-meta">Operational checklist</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.8vw,10.2vh);line-height:.98;letter-spacing:-.035em">迁移窗口只剩三个月</h2>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.4vw;align-items:stretch">
        ${steps.map(([head, body], i) => `
        <div class="${i === 3 ? "card-accent" : "card-fill"}" style="padding:2.4vh 1.3vw;display:grid;grid-template-rows:auto 1fr auto;min-height:40vh">
          <div class="t-meta" style="${i === 3 ? "color:var(--accent-on)" : ""}">0${i + 1}</div>
          <div style="align-self:end;font-family:var(--sans);font-weight:200;font-size:min(4.4vw,7.8vh);line-height:.92;letter-spacing:-.04em">${head}</div>
          <p style="font-size:max(16px,1vw);line-height:1.5;font-weight:500;${i === 3 ? "color:rgba(255,255,255,.86)" : "color:var(--text-secondary)"}">${body}</p>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function evalSlide() {
  const metrics = [
    ["整体差距", "8", "months"],
    ["中国模型", "#1", "CAISI so far"],
    ["成本优势", "5/7", "benchmarks"],
    ["数学强项", "97%", "OTIS-AIME"]
  ];
  return `
<section class="slide light" data-layout="S21" data-animate="tech-spec">
  <div class="canvas-card">
    ${chrome(11, "EVALUATION · CAISI")}
    <div data-anim="up" style="flex:1;padding:0;display:grid;grid-template-columns:1.2fr 2fr;gap:4vw;align-items:center">
      <div>
        <div class="t-meta" style="margin-bottom:2vh">Independent signal</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.8vw,10.4vh);line-height:.96;letter-spacing:-.035em">第三方评测<br/>更谨慎</h2>
        <p class="body" style="font-weight:500;color:var(--text-secondary);margin-top:3vh;max-width:34ch">CAISI 的结论不是“V4 不强”，而是：最强中国模型，仍约落后美国前沿模型 8 个月，但成本效率突出。</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2vh 1.4vw">
        ${metrics.map(([label, num, unit], i) => `
        <div class="${i === 0 ? "card-accent" : "card-fill"}" style="padding:2.4vh 1.4vw;min-height:22vh;display:flex;flex-direction:column;justify-content:space-between">
          <div class="t-meta" style="${i === 0 ? "color:var(--accent-on)" : ""}">${label}</div>
          <div style="font-family:var(--sans);font-weight:200;font-size:min(5.6vw,9.5vh);line-height:.9;letter-spacing:-.05em">${num}</div>
          <div class="t-meta" style="${i === 0 ? "color:rgba(255,255,255,.72)" : "color:var(--text-helper)"}">${unit}</div>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function infraSlide() {
  return `
<section class="slide light" data-layout="S17" data-animate="system-diagram">
  <div class="canvas-card">
    ${chrome(12, "OPEN INFRA · MODEL IS ONLY ONE LAYER")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:grid;grid-template-columns:1fr auto;gap:4vw;align-items:end">
        <div style="display:flex;flex-direction:column;gap:1.4vh">
          <div class="t-meta">Open weights plus production kernels</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.6vw,9.8vh);line-height:.98;letter-spacing:-.035em">DeepSeek 的护城河在系统层</h2>
        </div>
        <p class="body-sm" style="max-width:34ch;font-weight:500;color:var(--text-secondary)">从 FlashMLA、DeepEP 到 DeepGEMM，开源基础设施让模型权重变成可服务系统。</p>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:1fr 1.1fr;gap:4vw;align-items:center">
        <div style="display:grid;grid-template-rows:repeat(3,1fr);gap:1.6vh">
          ${[
            ["MODEL", "V4-Pro / V4-Flash", "开放权重与低价 API 扩散开发者心智。"],
            ["KERNEL", "FlashMLA / DeepGEMM", "低精度矩阵与推理 kernel 降低服务成本。"],
            ["SYSTEM", "DeepEP / 3FS / DualPipe", "MoE 通信、存储与并行训练构成工程壁垒。"]
          ].map(([tag, head, body], i) => `
          <div class="${i === 0 ? "card-accent" : "card-fill"}" style="padding:2.2vh 1.5vw;display:grid;grid-template-columns:auto 1fr;gap:1.6vw;align-items:center">
            <div class="t-meta" style="${i === 0 ? "color:var(--accent-on)" : ""}">${tag}</div>
            <div>
              <div style="font-size:max(18px,1.45vw);font-weight:400;letter-spacing:-.015em">${head}</div>
              <p class="body-sm" style="${i === 0 ? "color:rgba(255,255,255,.82)" : "color:var(--text-secondary)"};font-weight:500">${body}</p>
            </div>
          </div>`).join("")}
        </div>
        <div style="position:relative;height:48vh">
          <div style="position:absolute;inset:4vh 6vw;border:1px solid var(--border-strong)"></div>
          <div style="position:absolute;inset:10vh 10vw;border:1px solid var(--accent)"></div>
          <div style="position:absolute;inset:17vh 15vw;background:var(--accent);color:var(--accent-on);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:max(14px,1vw);font-weight:600;letter-spacing:.18em">V4</div>
          <div class="t-meta" style="position:absolute;left:0;top:3vh">SYSTEM</div>
          <div class="t-meta" style="position:absolute;right:0;top:10vh;color:var(--accent)">KERNEL</div>
          <div class="t-meta" style="position:absolute;left:2vw;bottom:5vh">MODEL</div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function chipSlide() {
  return `
<section class="slide light" data-layout="S14" data-animate="loop-form">
  <div class="canvas-card">
    ${chrome(13, "CHIPS · ASCEND INTEGRATION")}
    <div style="flex:1;padding:0;display:grid;grid-template-columns:1fr 1.1fr;gap:4vw;align-items:center">
      <div data-anim="up" style="display:flex;flex-direction:column;gap:2.2vh">
        <div class="t-meta">国产算力闭环</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.6vw,9.8vh);line-height:.98;letter-spacing:-.035em">从“能运行”到“能规模化”</h2>
        <p class="body" style="font-weight:500;color:var(--text-secondary);max-width:38ch">V4 对华为 Ascend 的适配是产业信号。但真正的分水岭，是国产硬件在真实流量下能否跑出可维护、可扩展、可核算的总成本。</p>
      </div>
      <div data-anim="up" style="position:relative;height:54vh">
        ${[
          ["模型结构", "MoE / attention"],
          ["推理 kernel", "FP8 / FP4 / MLA"],
          ["通信系统", "Expert parallel"],
          ["芯片集群", "Ascend / SuperNode"]
        ].map(([head, body], i) => {
          const positions = [["6%", "36%"], ["37%", "70%"], ["70%", "36%"], ["37%", "4%"]];
          const [left, top] = positions[i];
          return `<div class="${i === 3 ? "card-accent" : "card-fill"}" style="position:absolute;left:${left};top:${top};width:25vw;min-height:12vh;padding:1.8vh 1.3vw">
            <div class="t-meta" style="${i === 3 ? "color:var(--accent-on)" : ""}">0${i + 1}</div>
            <div style="font-size:max(18px,1.35vw);font-weight:400;letter-spacing:-.015em">${head}</div>
            <p class="body-sm" style="${i === 3 ? "color:rgba(255,255,255,.84)" : "color:var(--text-secondary)"};font-weight:500">${body}</p>
          </div>`;
        }).join("")}
        <div style="position:absolute;left:50%;top:50%;width:24vw;height:24vw;transform:translate(-50%,-50%);border:1px solid var(--accent)"></div>
        <div style="position:absolute;left:50%;top:50%;width:14vw;height:14vw;transform:translate(-50%,-50%);border:1px solid var(--border-strong)"></div>
      </div>
    </div>
  </div>
</section>`;
}

function marketSlide() {
  return `
<section class="slide light" data-layout="S18" data-animate="why-now">
  <div class="canvas-card">
    ${chrome(14, "WHY NOW · MARKET FORCES")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-meta">Three forces arrived at once</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.8vw,10.4vh);line-height:.98;letter-spacing:-.035em">为什么 2026 是节点</h2>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2vw;align-items:stretch">
        ${[
          ["01", "成本锚点重置", "DeepSeek 继续压低 token 单价，迫使闭源模型解释溢价。", "10×"],
          ["02", "长上下文产品化", "1M context 让代码库、长文档与 agent 轨迹进入同一工作区。", "1M"],
          ["03", "国产栈协同", "模型、kernel、通信库与 Ascend 适配开始形成同一条产业链。", "V4"]
        ].map(([num, head, body, kpi], i) => `
        <div class="${i === 2 ? "card-accent" : "card-fill"}" style="padding:2.6vh 1.5vw;display:grid;grid-template-rows:auto auto 1fr auto;gap:1.4vh">
          <div class="t-meta" style="${i === 2 ? "color:var(--accent-on)" : ""}">${num}</div>
          <div style="font-size:max(20px,1.7vw);font-weight:400;line-height:1.14;letter-spacing:-.02em">${head}</div>
          <p class="body-sm" style="${i === 2 ? "color:rgba(255,255,255,.84)" : "color:var(--text-secondary)"};font-weight:500">${body}</p>
          <div style="font-family:var(--sans);font-weight:200;font-size:min(6vw,10vh);line-height:.9;letter-spacing:-.05em">${kpi}</div>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function fundingSlide() {
  return `
<section class="slide light" data-layout="S16" data-animate="field-notes">
  <div class="canvas-card">
    ${chrome(15, "CAPITAL · HIGH IMPACT, NOT CONFIRMED")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-meta">Funding reports remain media-sourced</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.8vw,10.2vh);line-height:.98;letter-spacing:-.035em">资本给出的价格信号</h2>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:1.6vh 1.2vw">
        ${[
          ["$45B", "估值传闻", "TechCrunch / Bloomberg / FT 转引，未见官方成交确认。", true],
          ["$20B+", "此前锚点", "腾讯、阿里洽谈入股报道推高市场预期。"],
          ["国家基金", "产业资本", "若成真，DeepSeek 将更深嵌入国产算力政策。"],
          ["独立性", "战略变量", "外部股东可能改变开放权重与平台中立叙事。"],
          ["云生态", "站队风险", "云厂商绑定会影响 API 分发与私有部署合作。"],
          ["商业化", "利润约束", "低价 API 与高估值之间存在天然张力。"]
        ].map(([head, tag, body, accent]) => `
        <div class="${accent ? "card-accent" : "card-fill"}" style="padding:1.8vh 1.2vw;display:grid;grid-template-rows:auto auto 1fr;gap:1vh">
          <div class="t-meta" style="${accent ? "color:var(--accent-on)" : ""}">${tag}</div>
          <div style="font-family:var(--sans);font-weight:200;font-size:min(3.8vw,6.5vh);line-height:.95;letter-spacing:-.04em">${head}</div>
          <p class="body-sm" style="${accent ? "color:rgba(255,255,255,.84)" : "color:var(--text-secondary)"};font-weight:500">${body}</p>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function riskSlide() {
  return `
<section class="slide light" data-layout="S19" data-animate="four-cards">
  <div class="canvas-card">
    ${chrome(16, "RISK · THREE PLUS ONE")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
        <div style="width:7vw;height:2px;background:var(--accent)"></div>
        <div class="t-meta">Risk stack</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.8vw,10.2vh);line-height:.98;letter-spacing:-.035em">越基础设施化，风险越前置</h2>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.4vw;align-items:stretch">
        ${[
          ["监管", "政府设备限制、数据安全、关键基础设施采购审查。"],
          ["蒸馏", "Anthropic 指控带来声誉与法律不确定性。"],
          ["地缘", "芯片出口管制、海外企业采购与供应链审计。"],
          ["开源", "权重扩散增强生态，也放大滥用与监管压力。"]
        ].map(([head, body], i) => `
        <div class="card-fill" style="padding:2.4vh 1.4vw;display:grid;grid-template-rows:auto auto 1fr;gap:1.6vh">
          <div class="t-meta">— 0${i + 1}</div>
          <div style="font-size:max(22px,2vw);font-weight:300;letter-spacing:-.025em;color:${i === 0 ? "var(--accent)" : "var(--text-primary)"}">${head}</div>
          <p class="body-sm" style="font-weight:500;color:var(--text-secondary)">${body}</p>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function competitionSlide() {
  return `
<section class="slide light" data-layout="S12" data-animate="manifesto">
  <div class="canvas-card">
    ${chrome(17, "COMPETITION · PRICE ANCHOR")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:1fr auto;gap:4vh">
      <div data-anim="up" style="align-self:start;padding-top:4vh">
        <div class="t-meta" style="margin-bottom:2vh">The pressure is asymmetric</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(7vw,12vh);line-height:.96;letter-spacing:-.04em;max-width:13ch">DeepSeek 不必全面第一</h2>
        <p class="lead" style="font-weight:300;color:var(--text-secondary);max-width:54ch;margin-top:3vh">只要在大量真实任务中足够强、足够便宜、足够开放，它就能持续压缩闭源前沿模型的价格解释空间。</p>
      </div>
      <div data-anim="banner" style="background:var(--ink);color:var(--paper);padding:2.4vh 2vw;display:grid;grid-template-columns:repeat(4,1fr);gap:2vw">
        <div><div class="t-meta" style="color:rgba(255,255,255,.58)">OPEN</div><p class="body-sm" style="color:rgba(255,255,255,.82)">开放权重</p></div>
        <div><div class="t-meta" style="color:rgba(255,255,255,.58)">CHEAP</div><p class="body-sm" style="color:rgba(255,255,255,.82)">低价 API</p></div>
        <div><div class="t-meta" style="color:rgba(255,255,255,.58)">LONG</div><p class="body-sm" style="color:rgba(255,255,255,.82)">1M context</p></div>
        <div><div class="t-meta" style="color:rgba(255,255,255,.58)">LOCAL</div><p class="body-sm" style="color:rgba(255,255,255,.82)">国产栈协同</p></div>
      </div>
    </div>
  </div>
</section>`;
}

function appsSlide() {
  return `
<section class="slide light" data-layout="S15" data-animate="matrix-fill">
  <div class="canvas-card">
    ${chrome(18, "APPLICATIONS · FIRST LANDING ZONES")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:4vh">
      <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-meta">Where V4 becomes useful first</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.6vw,9.8vh);line-height:.98;letter-spacing:-.035em">五类场景，先落地</h2>
      </div>
      <div class="matrix-fill" data-anim="up" style="display:grid;grid-template-columns:repeat(5,1fr);gap:1.2vw">
        ${[
          ["Code agent", "仓库级修复"],
          ["Long doc", "报告/合同/论文"],
          ["Knowledge", "企业知识库"],
          ["Chinese office", "中文办公"],
          ["Private infra", "私有化底座"],
          ["Math/STEM", "科研推理"],
          ["Customer ops", "客服工单"],
          ["Compliance", "合规审查"],
          ["Data analysis", "数据助理"],
          ["RAG workflow", "检索增强"]
        ].map(([head, body], i) => `
        <div class="${i === 0 ? "card-accent" : "card-fill"}" style="padding:1.7vh 1vw;min-height:13vh;display:flex;flex-direction:column;justify-content:space-between">
          <div class="t-meta" style="${i === 0 ? "color:var(--accent-on)" : ""}">${String(i + 1).padStart(2, "0")}</div>
          <div>
            <div style="font-size:max(16px,1.08vw);font-weight:500;line-height:1.2">${head}</div>
            <p class="body-sm" style="${i === 0 ? "color:rgba(255,255,255,.82)" : "color:var(--text-secondary)"};font-weight:500">${body}</p>
          </div>
        </div>`).join("")}
      </div>
      <div data-anim="up" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid var(--border-subtle);padding-top:2vh">
        <div class="t-meta">The value shifts from chat to workflow.</div>
        <div style="font-family:var(--sans);font-weight:200;font-size:min(5.4vw,8.8vh);line-height:.9;letter-spacing:-.04em;color:var(--accent)">10</div>
      </div>
    </div>
  </div>
</section>`;
}

function forecastSlide() {
  const items = [
    ["V4 稳定化", "Preview → stable / v4.1"],
    ["API 退役", "旧模型名迁移完成度"],
    ["Agent 实战", "Claude Code / OpenCode 成功率"],
    ["国产硬件", "Ascend 推理成本与稳定性"],
    ["融资落地", "股东结构与开放策略"],
    ["监管升级", "海外公共部门与企业限制"]
  ];
  return `
<section class="slide light" data-layout="S04" data-animate="grid-reveal">
  <div class="canvas-card">
    ${chrome(19, "WATCHLIST · NEXT 6-12 MONTHS")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.4vh">
        <div class="t-meta">What to monitor after this deck</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(5.8vw,10.2vh);line-height:.98;letter-spacing:-.035em">接下来只看六个信号</h2>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:1.6vh 1.2vw">
        ${items.map(([head, body], i) => `
        <div class="card-fill" style="padding:2vh 1.3vw;display:grid;grid-template-rows:auto 1fr auto;min-height:18vh">
          <div class="t-meta">0${i + 1}</div>
          <div style="align-self:end;font-size:max(20px,1.65vw);font-weight:400;letter-spacing:-.02em;color:${i === 0 ? "var(--accent)" : "var(--text-primary)"}">${head}</div>
          <p class="body-sm" style="font-weight:500;color:var(--text-secondary)">${body}</p>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>`;
}

function closing() {
  return `
<section class="slide split" data-layout="SWISS-CLOSING-ASCII" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between;position:relative;overflow:hidden">
        <canvas class="ascii-bg" aria-hidden="true"></canvas>
        <div class="chrome-min" style="margin-bottom:0;position:relative;z-index:1">
          <div class="l">20 / ${total}</div>
          <div class="r">CLOSING</div>
        </div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em;margin-bottom:1.6vh">FINAL VIEW</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(7.4vw,13vh);line-height:.94;letter-spacing:-.025em;font-weight:200;color:#fff">Enough good.<br/>Cheap enough.<br/><span style="font-style:italic;font-weight:300">Open enough.</span></h2>
          <div style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1vw);line-height:1.6;color:rgba(255,255,255,.82);font-weight:400;max-width:38ch;margin-top:1.4vh">DeepSeek 不需要每一项第一。它只需要在足够多的真实任务上，把成本和开放性推到无法忽视。</div>
        </div>
        <div data-anim="signature" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.62)">Public-source synthesis</div>
          <div class="t-meta" style="color:rgba(255,255,255,.62)">2026.05</div>
        </div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between">
        <div class="chrome-min">
          <div class="l">TAKEAWAYS</div>
          <div class="r">03 RULES</div>
        </div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:0">
          ${[
            ["01", "别再把 R2 当主线", "截至 2026-05-24，官方最新主线是 V4。"],
            ["02", "长上下文要看系统成本", "1M token 只有配合缓存、压缩、检索和校验才有产品价值。"],
            ["03", "观察真实生产，不只看 benchmark", "V4 的决定性证据，将来自 agent 工作流、国产硬件和企业部署。"]
          ].map(([num, head, body], i) => `
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.6vh 0;border-top:1px solid var(--border-subtle);${i === 2 ? "border-bottom:2px solid var(--accent)" : ""}">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(4.4vw,7.8vh);line-height:.9;color:${i === 2 ? "var(--accent)" : "var(--text-primary)"}">${num}</div>
            <div>
              <h3 style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(18px,1.8vw);line-height:1.2;letter-spacing:-.015em;color:${i === 2 ? "var(--accent)" : "var(--text-primary)"};margin-bottom:1vh">${head}</h3>
              <p style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,.94vw);line-height:1.6;color:var(--text-secondary);font-weight:500">${body}</p>
            </div>
          </div>`).join("")}
        </div>
        <div data-anim="foot" class="t-meta" style="color:var(--text-helper);text-align:right">END · GitHub Pages version</div>
      </div>
    </div>
  </div>
</section>`;
}

const slides = [
  cover(),
  indexSlide(),
  thesisSlide(),
  timelineSlide(),
  specCompareSlide(),
  kpiTowerSlide(),
  contextSlide(),
  efficiencySlide(),
  apiSlide(),
  migrationSlide(),
  evalSlide(),
  infraSlide(),
  chipSlide(),
  marketSlide(),
  fundingSlide(),
  riskSlide(),
  competitionSlide(),
  appsSlide(),
  forecastSlide(),
  closing()
].join("\n\n");

let template = readFileSync(templatePath, "utf8");
template = template.replace("[必填] 替换为 PPT 标题 · Deck Title", title);

const start = template.indexOf("<!-- SLIDES_HERE");
const nav = template.indexOf('<div id="nav"></div>', start);
const end = nav === -1 ? -1 : template.lastIndexOf("</div>", nav);
if (start === -1 || nav === -1 || end === -1 || end < start) {
  throw new Error("Could not locate SLIDES_HERE replacement region in template.");
}

const html = `${template.slice(0, start)}${slides}${template.slice(end)}`;
mkdirSync(root, { recursive: true });
writeFileSync(outPath, html, "utf8");
console.log(`Wrote ${outPath}`);
