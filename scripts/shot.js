/* Reliable screenshots over CDP (headless --window-size is not dependable).
   node scripts/shot.js <url> <width> <out.png> [--full] [height] */
const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const args = process.argv.slice(2);
const full = args.includes("--full");
const evalJs = (args.find(a=>a.startsWith("--eval="))||"").slice(7);
const scrollTo = Number((args.find(a=>a.startsWith("--scroll="))||"").split("=")[1] || 0);
const [url, w, out, maybeH] = args.filter((a) => !a.startsWith("--"));
const h = Number(maybeH || 900);

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-prefers-reduced-motion",
  "--remote-debugging-port=9334",
  "--user-data-dir=" + fs.mkdtempSync(os.tmpdir() + "/cdp-shot-"),
  "about:blank",
]);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let target = null;
  for (let i = 0; i < 40; i++) {
    await wait(400);
    try {
      const list = await (await fetch("http://127.0.0.1:9334/json/list")).json();
      target = list.find((t) => t.type === "page");
      if (target) break;
    } catch {}
  }
  if (!target) throw new Error("no target");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((res) => {
      const n = ++id;
      pending.set(n, res);
      ws.send(JSON.stringify({ id: n, method, params }));
    });

  await send("Emulation.setDeviceMetricsOverride", {
    width: Number(w),
    height: h,
    deviceScaleFactor: 1,
    mobile: Number(w) < 700,
  });
  await send("Page.enable");
  await send("Page.navigate", { url });
  await wait(4500);
  // Reveal anything still waiting on a scroll observer.
  await send("Runtime.evaluate", {
    expression: "document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))",
  });
  if (scrollTo) { await send("Runtime.evaluate", { expression: "window.scrollTo(0," + scrollTo + ")" }); await wait(1800); }
  if (evalJs) { await send("Runtime.evaluate", { expression: evalJs }); await wait(800); }
  await wait(900);

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: full,
    ...(full ? { optimizeForSpeed: false } : {}),
  });
  fs.writeFileSync(out, Buffer.from(shot.result.data, "base64"));
  console.log(out, fs.statSync(out).size + " bytes");
  ws.close();
  chrome.kill();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  chrome.kill();
  process.exit(1);
});
