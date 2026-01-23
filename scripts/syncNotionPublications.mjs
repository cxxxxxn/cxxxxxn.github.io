import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@notionhq/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'publicationList.js');
const IMG_DIR = path.join(PROJECT_ROOT, 'src', 'imgs');

function env(name) {
  return process.env[name] && String(process.env[name]).trim();
}

function normalizeWhitespace(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function safeJsString(value) {
  return JSON.stringify(value ?? '');
}

function getProperty(properties, candidates) {
  for (const key of candidates) {
    if (properties && Object.prototype.hasOwnProperty.call(properties, key)) return properties[key];
  }
  return undefined;
}

function notionTitle(prop) {
  if (!prop) return '';
  if (prop.type === 'title') return normalizeWhitespace(prop.title?.map((t) => t.plain_text).join(''));
  return '';
}

function notionRichText(prop) {
  if (!prop) return '';
  if (prop.type === 'rich_text') return normalizeWhitespace(prop.rich_text?.map((t) => t.plain_text).join(''));
  return '';
}

function notionUrl(prop) {
  if (!prop) return '';
  if (prop.type === 'url') return normalizeWhitespace(prop.url);
  return '';
}

function notionSelectName(prop) {
  if (!prop) return '';
  if (prop.type === 'select') return normalizeWhitespace(prop.select?.name);
  return '';
}

function notionMultiSelectNames(prop) {
  if (!prop) return [];
  if (prop.type === 'multi_select') {
    return prop.multi_select?.map((o) => normalizeWhitespace(o.name)).filter(Boolean) || [];
  }
  return [];
}

function notionPeopleNames(prop) {
  if (!prop) return [];
  if (prop.type === 'people') {
    return prop.people?.map((p) => normalizeWhitespace(p.name)).filter(Boolean) || [];
  }
  return [];
}

function notionNumber(prop) {
  if (!prop) return undefined;
  if (prop.type === 'number') return typeof prop.number === 'number' ? prop.number : undefined;
  return undefined;
}

function parseAuthors(properties) {
  const prop = getProperty(properties, ['authors', 'Authors', 'Author', 'author']);
  if (!prop) return [];

  const fromMulti = notionMultiSelectNames(prop);
  if (fromMulti.length) return fromMulti;

  const fromPeople = notionPeopleNames(prop);
  if (fromPeople.length) return fromPeople;

  const fromText = notionRichText(prop);
  if (fromText) {
    return fromText
      .split(/,|;|\n/)
      .map((s) => normalizeWhitespace(s))
      .filter(Boolean);
  }

  return [];
}

function extractYear(publication) {
  if (typeof publication.year === 'number') return publication.year;
  const conf = publication.conference || '';
  const match = conf.match(/(19\d{2}|20\d{2})/);
  return match ? Number(match[1]) : 0;
}

function slugify(value) {
  const s = normalizeWhitespace(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'publication';
}

function toJsIdentifier(value) {
  const words = normalizeWhitespace(value)
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

  if (!words.length) return 'img';

  const [first, ...rest] = words;
  const camel =
    first.toLowerCase() +
    rest.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');

  const safe = camel.replace(/[^a-zA-Z0-9_$]/g, '');
  return /^[a-zA-Z_$]/.test(safe) ? safe : `img_${safe}`;
}

async function listLocalImageKeys() {
  try {
    const files = await fs.readdir(IMG_DIR);
    const keys = new Set();
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) continue;
      keys.add(path.basename(file, ext));
    }
    return keys;
  } catch {
    return new Set();
  }
}

function parseImageKey(properties) {
  const prop = getProperty(properties, ['imgKey', 'ImgKey', 'imageKey', 'ImageKey', 'Image', 'image', 'Img', 'img']);
  if (!prop) return '';

  const fromSelect = notionSelectName(prop);
  if (fromSelect) return fromSelect;

  const fromText = notionRichText(prop);
  if (fromText) return fromText;

  const fromTitle = notionTitle(prop);
  if (fromTitle) return fromTitle;

  return '';
}

function parseString(properties, candidates) {
  const prop = getProperty(properties, candidates);
  if (!prop) return '';
  const fromTitle = notionTitle(prop);
  if (fromTitle) return fromTitle;
  const fromText = notionRichText(prop);
  if (fromText) return fromText;
  const fromSelect = notionSelectName(prop);
  if (fromSelect) return fromSelect;
  return '';
}

function parseUrl(properties, candidates) {
  const prop = getProperty(properties, candidates);
  return notionUrl(prop);
}

function parseNumber(properties, candidates) {
  const prop = getProperty(properties, candidates);
  return notionNumber(prop);
}

function generatePublicationListJs(publications, usedImages) {
  const importLines = [];
  const seen = new Set();

  // Stable import order
  for (const img of usedImages) {
    if (!img?.fileBase || !img?.importId || seen.has(img.fileBase)) continue;
    seen.add(img.fileBase);
    importLines.push(`import ${img.importId} from '../imgs/${img.fileBase}.png';`);
  }

  const lines = [];
  lines.push(...importLines);
  lines.push('');
  lines.push('const publicationList = [');

  publications.forEach((p, idx) => {
    const comma = idx === publications.length - 1 ? '' : ',';
    const authors = Array.isArray(p.authors) ? p.authors : [];

    lines.push('  {');
    lines.push(`    'name': ${safeJsString(p.name)},`);
    lines.push(`    'title': ${safeJsString(p.title)},`);
    lines.push(`    'conference': ${safeJsString(p.conference)},`);

    if (p.img?.importId) {
      lines.push(`    'img': ${p.img.importId},`);
    }

    if (p.paper) lines.push(`    'paper': ${safeJsString(p.paper)},`);
    if (p.code) lines.push(`    'code': ${safeJsString(p.code)},`);
    if (p.media) lines.push(`    'media': ${safeJsString(p.media)},`);
    if (p.vedio) lines.push(`    'vedio': ${safeJsString(p.vedio)},`);

    lines.push(`    'authors': ${JSON.stringify(authors)}`);
    lines.push(`  }${comma}`);
  });

  lines.push('];');
  lines.push('');
  lines.push('export default publicationList;');
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const token = env('NOTION_TOKEN');
  const databaseId = env('NOTION_DATABASE_ID');

  if (!token || !databaseId) {
    console.log('[sync:notion:publications] NOTION_TOKEN/NOTION_DATABASE_ID not set; skip syncing.');
    return;
  }

  const notion = new Client({ auth: token });
  const localImageKeys = await listLocalImageKeys();

  const pages = [];
  let cursor = undefined;

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const resp = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    });

    pages.push(...resp.results);
    if (!resp.has_more) break;
    cursor = resp.next_cursor;
  }

  const publications = pages
    .map((page) => {
      const properties = page.properties || {};

      const title =
        parseString(properties, ['title', 'Title', 'Paper Title', 'Paper']) ||
        parseString(properties, ['Name', 'name']);

      const conference = parseString(properties, ['conference', 'Conference', 'Venue', 'venue']);

      const name =
        parseString(properties, ['slug', 'Slug', 'name', 'Name']) ||
        slugify(title);

      const paper = parseUrl(properties, ['paper', 'Paper', 'PDF', 'Pdf']);
      const code = parseUrl(properties, ['code', 'Code', 'GitHub', 'Github']);
      const media = parseUrl(properties, ['media', 'Media', 'Blog', 'Press']);
      const vedio = parseUrl(properties, ['vedio', 'Vedio', 'video', 'Video']);

      const year = parseNumber(properties, ['year', 'Year']);

      const authors = parseAuthors(properties);

      const imgKeyRaw = parseImageKey(properties);
      const imgKey = normalizeWhitespace(imgKeyRaw);

      return {
        name,
        title,
        conference,
        paper,
        code,
        media,
        vedio,
        authors,
        year,
        imgKey,
      };
    })
    .filter((p) => p.title)
    .map((p) => {
      // Validate image key against local assets to keep CRA bundling stable.
      if (p.imgKey && !localImageKeys.has(p.imgKey)) {
        console.warn(`[sync:notion:publications] Unknown imgKey "${p.imgKey}"; expected a file in src/imgs like ${p.imgKey}.png`);
        return { ...p, imgKey: '', img: undefined };
      }

      if (!p.imgKey) return { ...p, img: undefined };

      const importId = toJsIdentifier(p.imgKey);
      return { ...p, img: { fileBase: p.imgKey, importId } };
    })
    .sort((a, b) => {
      const ya = extractYear(a);
      const yb = extractYear(b);
      if (yb !== ya) return yb - ya;
      return String(a.title).localeCompare(String(b.title));
    });

  const usedImages = publications.map((p) => p.img).filter(Boolean);

  const js = generatePublicationListJs(publications, usedImages);

  await fs.writeFile(OUTPUT_FILE, js, 'utf8');
  console.log(`[sync:notion:publications] Wrote ${publications.length} publications to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error('[sync:notion:publications] Failed:', err);
  if (env('NOTION_SYNC_REQUIRED') === '1') process.exit(1);
});
