/* Extra lockup pieces for the header/footer: a compact mark + wordmark pair,
   plus a reversed mark for petrol backgrounds. One-off; output is in public/. */
const fs = require("fs");
const { PNG } = require("pngjs");

const src = PNG.sync.read(fs.readFileSync("public/img/logo/service-pro.png"));
const PETROL = [0, 58, 78];
const PETROL_AVG = (PETROL[0] + PETROL[1] + PETROL[2]) / 3;

function crop(x0, y0, x1, y1, mode) {
  const w = x1 - x0 + 1,
    h = y1 - y0 + 1;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = ((y + y0) * src.width + (x + x0)) * 4;
      const di = (y * w + x) * 4;
      let [r, g, b] = [src.data[si], src.data[si + 1], src.data[si + 2]];
      const a = src.data[si + 3];
      const isRed = r > 150 && g < 90 && b < 90;

      if (mode === "toPetrol" && r > 200 && g > 200 && b > 200) {
        [r, g, b] = PETROL;
      } else if (mode === "invert" && !isRed) {
        // Flip along the petrol↔white axis so antialiased edges stay clean.
        const t = Math.min(1, Math.max(0, ((r + g + b) / 3 - PETROL_AVG) / (255 - PETROL_AVG)));
        const k = 1 - t;
        r = PETROL[0] + (255 - PETROL[0]) * k;
        g = PETROL[1] + (255 - PETROL[1]) * k;
        b = PETROL[2] + (255 - PETROL[2]) * k;
      }
      out.data[di] = r;
      out.data[di + 1] = g;
      out.data[di + 2] = b;
      out.data[di + 3] = a;
    }
  }
  return out;
}

const write = (p, png) => {
  fs.writeFileSync(p, PNG.sync.write(png));
  console.log(p, png.width + "x" + png.height);
};

// wordmark block only: x 698..1313, y 270..479
write("public/img/logo/wordmark-on-dark.png", crop(698, 270, 1313, 479));
write("public/img/logo/wordmark-on-light.png", crop(698, 270, 1313, 479, "toPetrol"));
// diamond mark, reversed for petrol backgrounds
write("public/img/logo/mark-on-dark.png", crop(30, 96, 576, 642, "invert"));
