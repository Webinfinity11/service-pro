/* Derives the logo variants the site needs from the original brand PNG.
   Run: node scripts/logo.js   (one-off; output is committed under public/) */
const fs = require("fs");
const { PNG } = require("pngjs");

const SRC = "public/img/logo/service-pro.png";
const PETROL = [0, 58, 78]; // #003A4E, sampled from the logo's diamond

const src = PNG.sync.read(fs.readFileSync(SRC));

function crop(x0, y0, x1, y1, recolorFromX = null) {
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = ((y + y0) * src.width + (x + x0)) * 4;
      const di = (y * w + x) * 4;
      let [r, g, b] = [src.data[si], src.data[si + 1], src.data[si + 2]];
      const a = src.data[si + 3];
      const sx = x + x0;
      // The wordmark's "SERVICE" is pure white — unreadable on a light sheet,
      // so the light variant repaints only those near-white pixels.
      const nearWhite = r > 200 && g > 200 && b > 200;
      if (recolorFromX !== null && sx >= recolorFromX && nearWhite) {
        [r, g, b] = PETROL;
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

// full lockup, x 30..1313 / y 96..642; wordmark starts at x 698
write("public/img/logo/logo-on-dark.png", crop(30, 96, 1313, 642));
write("public/img/logo/logo-on-light.png", crop(30, 96, 1313, 642, 690));
// diamond mark only
write("public/img/logo/mark.png", crop(30, 96, 576, 642));
write("src/app/icon.png", crop(30, 96, 576, 642));
