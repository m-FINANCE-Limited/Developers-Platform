import {copyFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));

const sourceRoot = resolve(
  process.env.PLATFORM_NEXT_DOCUMENT_DIR ??
    resolve(scriptDir, '../../platform-next/document'),
);
const siteRoot = resolve(scriptDir, '..');

const files: Array<[source: string, destination: string]> = [
  ['openapi/fxserver-trader.yaml', 'openapi/fxserver-trader.yaml'],
  ['openapi/webproxy.yml', 'openapi/webproxy.yml'],
  [
    'docs/fx-server/general-rest-api-information.md',
    'docs/fx-server/general-rest-api-information.md',
  ],
  ['docs/fx-server/price-steaming.md', 'docs/fx-server/price-steaming.md'],
  [
    'docs/business-logic/01-currency-overview.md',
    'docs/business-logic/01-currency-overview.md',
  ],
  [
    'docs/business-logic/02-contract-overview.md',
    'docs/business-logic/02-contract-overview.md',
  ],
  [
    'docs/business-logic/03-price-concept.md',
    'docs/business-logic/03-price-concept.md',
  ],
];

for (const [source, destination] of files) {
  const destinationPath = resolve(siteRoot, destination);
  mkdirSync(dirname(destinationPath), {recursive: true});
  copyFileSync(resolve(sourceRoot, source), destinationPath);
  console.info(`Synced ${destination}`);
}
