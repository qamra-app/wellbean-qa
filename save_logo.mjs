import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const b = await chromium.launch({ headless: true });
const p = await b.newPage();

// Navigate to the image URL directly and save it
const response = await p.goto(
  'https://instagram.fdoh9-1.fna.fbcdn.net/v/t51.82787-19/689198355_17988624599992360_3641382158982148461_n.jpg?stp=dst-jpg_e0_s320x320&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzIweDEzMjAuc2RyLmYyNjcxOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdoh9-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2AHv3_SedxW_ZVLhEBBGGvNEJaVpkbdKwHCbVXdKv7UsTlsKd6Y49v5tLDxXUjl74EpfatxLkm8SHKJDaZSS&_nc_ohc=RwfAzCRFvE4Q7kNvgHJ5Zjg&_nc_gid=c3_e3IpQ94QOZoZ_JFUh1A&edm=APoiCcYBAAAA&ccb=7-5&oh=00_AYBXjQ7kNH9hEKEV-GN82pHu9PuCPfbFQGQ4Wy5A-VxJzg&oe=68715AB7&_nc_sid=22de04',
  { waitUntil: 'load', timeout: 15000 }
);

// Alternative: grab it from the IG page itself
const b2 = await chromium.launch({ headless: true });
const p2 = await b2.newPage();
await p2.goto('https://www.instagram.com/wellbean.qa/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await p2.waitForTimeout(3000);

const imgEl = await p2.$('header img');
if (imgEl) {
  const src = await imgEl.getAttribute('src');
  console.log('Fetching:', src?.substring(0, 80));
  const imgResponse = await p2.request.get(src);
  const buffer = await imgResponse.body();
  writeFileSync('public/wellbean-logo.jpg', buffer);
  console.log('Saved to public/wellbean-logo.jpg, size:', buffer.length);
}

await b.close();
await b2.close();
