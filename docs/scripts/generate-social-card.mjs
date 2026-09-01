import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(scriptDirectory, "../public");
const logoPath = path.join(publicDirectory, "logo.png");
const outputPath = path.join(publicDirectory, "social-card.png");

const width = 1200;
const height = 630;

const backdrop = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#061c1b" />
        <stop offset="0.55" stop-color="#0b3732" />
        <stop offset="1" stop-color="#116158" />
      </linearGradient>
      <radialGradient id="glow">
        <stop offset="0" stop-color="#6ee7b7" stop-opacity="0.34" />
        <stop offset="1" stop-color="#6ee7b7" stop-opacity="0" />
      </radialGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#001412" flood-opacity="0.55" />
      </filter>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#background)" />
    <circle cx="1035" cy="118" r="390" fill="url(#glow)" />
    <circle cx="55" cy="670" r="340" fill="url(#glow)" opacity="0.55" />

    <g opacity="0.13" fill="none" stroke="#d1fae5">
      <circle cx="1018" cy="314" r="258" />
      <circle cx="1018" cy="314" r="292" />
    </g>

    <g font-family="Arial, Helvetica, sans-serif">
      <g transform="translate(86 78)">
        <rect width="283" height="40" rx="20" fill="#ecfdf5" fill-opacity="0.11" stroke="#a7f3d0" stroke-opacity="0.32" />
        <circle cx="23" cy="20" r="5" fill="#5eead4" />
        <text x="40" y="26" fill="#ccfbf1" font-size="17" font-weight="700" letter-spacing="1.6">TANSTACK ROUTER + START</text>
      </g>

      <text x="82" y="239" fill="#f0fdfa" font-size="88" font-weight="800" letter-spacing="-3">Themer</text>
      <text x="86" y="299" fill="#99f6e4" font-size="30" font-weight="700">Theme management for React apps</text>

      <text x="86" y="372" fill="#d5f5ef" font-size="25">Light, dark, system, and custom themes.</text>
      <text x="86" y="410" fill="#d5f5ef" font-size="25">SSR-ready with zero flash.</text>

      <g transform="translate(86 484)" fill="#e7faf6" font-size="19" font-weight="700">
        <rect width="132" height="42" rx="21" fill="#ffffff" fill-opacity="0.09" stroke="#ffffff" stroke-opacity="0.13" />
        <text x="24" y="27">ZERO FOUC</text>
        <rect x="146" width="137" height="42" rx="21" fill="#ffffff" fill-opacity="0.09" stroke="#ffffff" stroke-opacity="0.13" />
        <text x="172" y="27">SSR READY</text>
        <rect x="297" width="156" height="42" rx="21" fill="#ffffff" fill-opacity="0.09" stroke="#ffffff" stroke-opacity="0.13" />
        <text x="323" y="27">TYPE-SAFE</text>
      </g>

      <text x="88" y="574" fill="#8ed9cf" font-size="19">lukonik.github.io/themer</text>
    </g>

    <circle cx="930" cy="315" r="245" fill="#052f2b" fill-opacity="0.58" stroke="#a7f3d0" stroke-opacity="0.2" filter="url(#shadow)" />
  </svg>
`);

const logo = await sharp(logoPath)
  .resize(430, 430, { fit: "contain" })
  .png()
  .toBuffer();

await sharp(backdrop)
  .composite([{ input: logo, left: 715, top: 100 }])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outputPath);

console.log(`Generated ${outputPath}`);
