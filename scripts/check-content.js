// Content checks that run before every build. Each catches a mistake that
// the type checker cannot see but that sends residents to the wrong place.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const errors = [];

// 1. Every hotline's tel: link must dial exactly the digits shown on screen.
//    A dropped digit in `tel` is invisible on the page but breaks tap-to-call.
const hotlines = readFileSync(join(root, 'src/data/hotlines.ts'), 'utf8');
const pairs = [
  ...hotlines.matchAll(/number:\s*'([^']+)',\s*tel:\s*'([^']+)'/g),
];
if (pairs.length === 0) {
  errors.push('hotlines.ts: no { number, tel } pairs found; check the regex.');
}
for (const [, number, tel] of pairs) {
  if (number.replace(/\D/g, '') !== tel) {
    errors.push(`hotlines.ts: "${number}" has tel "${tel}"`);
  }
}

// 2. No service guide may still be an upstream starter-kit page. The kit's
//    sample LGU is Lapu-Lapu City; such files count as "written" guides and
//    get promoted on the home hub (see code-reviews/009).
const TEMPLATE_LGU = /Lapu-?Lapu/i;
const servicesDir = join(root, 'content/services');
for (const category of readdirSync(servicesDir, { withFileTypes: true })) {
  if (!category.isDirectory()) continue;
  const dir = join(servicesDir, category.name);
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    if (TEMPLATE_LGU.test(readFileSync(join(dir, file), 'utf8'))) {
      errors.push(
        `content/services/${category.name}/${file}: starter-kit template ` +
          'content (mentions Lapu-Lapu City). Replace it with a Davao guide ' +
          'or delete it so the page shows "Guide being written".'
      );
    }
  }
}

if (errors.length) {
  console.error(`Content check failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `Content check passed: ${pairs.length} hotline numbers, no template guides.`
);
