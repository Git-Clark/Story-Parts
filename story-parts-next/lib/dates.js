// Date formatting. Deliberately has NO imports.
//
// This lives apart from posts.js on purpose. posts.js reads the filesystem,
// which only exists on the server — so anything importing it gets dragged
// to the server too. ReviewTable.js runs in the browser and needs these
// helpers, so they live here where nothing server-only can follow them.
//
// Rule of thumb: a client component may only import from files that could
// themselves run in a browser.

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** "2026-07-24" -> "24 JUL 2026" */
export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`;
}

/** "2026-07-24" -> "07.24.26" */
export function formatShort(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${m}.${d}.${y.slice(2)}`;
}
