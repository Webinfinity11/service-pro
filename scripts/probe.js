/* Evaluates an expression in a headless Chrome page over CDP.
   node scripts/probe.js <url> <width> <height> "<js expression>" */
const { spawn } = require("child_process");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [url, w, h, expr] = process.argv.slice(2);

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--remote-debugging-port=9333",
  `--window-size=${w},${h}`,
  "--user-data-dir=" + require("fs").mkdtempSync(require("os").tmpdir() + "/cdp-"),
  url,
]);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await wait(400);
    try {
      const r = await fetch("http://127.0.0.1:9333/json/list");
      const list = await r.json();
      targets = list.filter((t) => t.type === "page" && t.url.startsWith("http"));
      if (targets.length) break;
    } catch {}
  }
  if (!targets?.length) {
    console.error("no page target");
    chrome.kill();
    process.exit(1);
  }
  await wait(2500);
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  // --window-size is unreliable in headless=new, so pin the viewport here.
  ws.send(
    JSON.stringify({
      id: 0,
      method: "Emulation.setDeviceMetricsOverride",
      params: {
        width: Number(w),
        height: Number(h),
        deviceScaleFactor: 1,
        mobile: Number(w) < 700,
      },
    })
  );
  await wait(1200);
  ws.send(
    JSON.stringify({
      id: 1,
      method: "Runtime.evaluate",
      params: { expression: expr, returnByValue: true, awaitPromise: true },
    })
  );
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id === 1) {
      console.log(JSON.stringify(m.result?.result?.value ?? m.result, null, 2));
      ws.close();
      chrome.kill();
      process.exit(0);
    }
  };
})();
