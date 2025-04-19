const colorInput = document.getElementById("colorInput");
const colorPicker = document.getElementById("colorPicker");
const colorBoxes = document.querySelectorAll(".color-box");

colorPicker.addEventListener("input", () => {
  const baseColor = colorPicker.value;
  colorInput.style.backgroundColor = baseColor;
  colorInput.value = baseColor;

  const [analogous1, analogous2, complementary, neutral] = getMatchingColors(baseColor);

  const colors = [analogous1, analogous2, complementary, neutral];
  colorBoxes.forEach((box, index) => {
    box.style.backgroundColor = colors[index];
  });
});

function getMatchingColors(hex) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);

  const analogous1 = hslToHex((h + 30) % 360, s, l);
  const analogous2 = hslToHex((h + 330) % 360, s, l); // -30 equivalente
  const complementary = hslToHex((h + 180) % 360, Math.max(s * 0.9, 0.3), Math.min(l * 1.05, 0.9));
  const neutral = l > 0.5 ? "#333333" : "#F0F0F0";

  return [analogous1, analogous2, complementary, neutral];
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }

  return [h, s, l];
}

function hslToHex(h, s, l) {
  h /= 360;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
