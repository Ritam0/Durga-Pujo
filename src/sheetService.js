import Papa from 'papaparse';

export const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5uLoRxdIXohO21FnUV_3wc4IyYx4S0YIIbsFQtl09j4eTr3tV4apsQIyyZZx0duELdUy70a8hxmWR/pub?gid=1447819627&single=true&output=csv';

// Column B = committee name. The kromik sonkha (serial number) is just the
// row's position among the data rows, not a literal sheet column.
// Row 1 is a header row and is skipped.
export async function fetchCommittees() {
  if (!SHEET_CSV_URL) {
    throw new Error('SHEET_NOT_CONFIGURED');
  }

  const res = await fetch(SHEET_CSV_URL, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to load sheet (status ${res.status})`);
  }

  const text = await res.text();
  const { data } = Papa.parse(text, { skipEmptyLines: true });

  return data
    .slice(1)
    .filter((row) => row[1] && row[1].trim())
    .map((row, i) => ({
      serial: String(i + 1),
      name: row[1].trim(),
    }));
}
