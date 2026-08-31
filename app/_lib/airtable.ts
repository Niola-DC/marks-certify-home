// Airtable REST client for the waitlist. No SDK — just fetch.
//
// Setup:
//   1. Create a base at https://airtable.com with a table (default name "Waitlist").
//   2. Add these fields, with these exact names:
//        Organization  - Single line text
//        Email         - Single line text
//        Joined At     - Single line text (or Date)
//   3. Create a personal access token at https://airtable.com/create/tokens with
//      scopes  data.records:read  +  data.records:write, granted on that base.
//
// Env vars:
//   AIRTABLE_TOKEN    - personal access token (starts with "pat...")
//   AIRTABLE_BASE_ID  - base id from https://airtable.com/api (starts with "app...")
//   AIRTABLE_TABLE    - optional table name or id, defaults to "Waitlist"

const AIRTABLE_API = "https://api.airtable.com/v0";

type AirtableConfig = {
  token: string;
  baseId: string;
  table: string;
};

export type WaitlistRecord = {
  orgName: string;
  email: string;
  createdAt: string;
};

function readConfig(): AirtableConfig | null {
  const token = process.env.AIRTABLE_TOKEN?.trim();
  const baseId = process.env.AIRTABLE_BASE_ID?.trim();
  const table = process.env.AIRTABLE_TABLE?.trim() || "Waitlist";
  if (!token || !baseId) return null;
  return { token, baseId, table };
}

/** True when AIRTABLE_TOKEN and AIRTABLE_BASE_ID are both present. */
export function isAirtableConfigured(): boolean {
  return readConfig() !== null;
}

function tableUrl(config: AirtableConfig, query?: URLSearchParams): string {
  const base = `${AIRTABLE_API}/${config.baseId}/${encodeURIComponent(config.table)}`;
  const qs = query?.toString();
  return qs ? `${base}?${qs}` : base;
}

async function airtableRequest(
  config: AirtableConfig,
  url: string,
  init?: RequestInit
): Promise<Record<string, unknown>> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Airtable API ${res.status} ${res.statusText}: ${detail.slice(0, 500)}`
    );
  }
  return (await res.json()) as Record<string, unknown>;
}

/** True when a record with this email already exists (case-insensitive). */
export async function emailExists(email: string): Promise<boolean> {
  const config = readConfig();
  if (!config) throw new Error("Airtable is not configured.");

  // Double-quoted formula literal; strip quotes/backslashes (never valid in a
  // real email that passed our regex) so the formula can't be broken.
  const needle = email.trim().toLowerCase().replace(/["\\]/g, "");
  const query = new URLSearchParams({
    filterByFormula: `LOWER({Email})="${needle}"`,
    maxRecords: "1",
  });
  query.append("fields[]", "Email");

  const data = await airtableRequest(config, tableUrl(config, query));
  const records = data.records as unknown[] | undefined;
  return Array.isArray(records) && records.length > 0;
}

/** Total number of records in the table. Paginates; capped at 100 pages. */
export async function countRecords(): Promise<number> {
  const config = readConfig();
  if (!config) throw new Error("Airtable is not configured.");

  let count = 0;
  let offset: string | undefined;
  let pages = 0;
  do {
    const query = new URLSearchParams({ pageSize: "100" });
    query.append("fields[]", "Email"); // smallest useful payload
    if (offset) query.set("offset", offset);

    const data = await airtableRequest(config, tableUrl(config, query));
    count += (data.records as unknown[] | undefined)?.length ?? 0;
    offset = data.offset as string | undefined;
    pages += 1;
  } while (offset && pages < 100);

  return count;
}

/** Append one waitlist record. The caller must de-duplicate first. */
export async function createRecord(record: WaitlistRecord): Promise<void> {
  const config = readConfig();
  if (!config) throw new Error("Airtable is not configured.");

  await airtableRequest(config, tableUrl(config), {
    method: "POST",
    body: JSON.stringify({
      fields: {
        Organization: record.orgName,
        Email: record.email,
        "Joined At": record.createdAt,
      },
      typecast: true,
    }),
  });
}
