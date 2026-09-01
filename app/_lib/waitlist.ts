import { promises as fs } from "node:fs";
import path from "node:path";
import {
  countRecords,
  createRecord,
  emailExists,
  isAirtableConfigured,
} from "./airtable";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

// Seed count so the "Proof" section doesn't launch at zero.
const SEED_COUNT = 8;

// The public count is a vanity number on the homepage; a slightly stale value is
// fine and beats hitting Airtable on every page view.
const COUNT_TTL_MS = 60_000;

// Storage strategy:
//   - When AIRTABLE_TOKEN + AIRTABLE_BASE_ID are set, every signup is a record in
//     Airtable (Organization, Email, Joined At). Source of truth in production;
//     survives serverless deploys.
//   - Otherwise we fall back to a local JSON file so `next dev` works with zero
//     configuration. That file is git-ignored and does NOT persist on Vercel.

type WaitlistEntry = {
  email: string;
  orgName: string;
  createdAt: string;
};

type WaitlistData = {
  seed: number;
  entries: WaitlistEntry[];
};

let countCache: { value: number; expiresAt: number } | null = null;

async function readData(): Promise<WaitlistData> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistData;
  } catch {
    return { seed: SEED_COUNT, entries: [] };
  }
}

async function writeData(data: WaitlistData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function getAirtableCount(): Promise<number> {
  const now = Date.now();
  if (countCache && countCache.expiresAt > now) return countCache.value;
  const value = await countRecords();
  countCache = { value, expiresAt: now + COUNT_TTL_MS };
  return value;
}

export async function getWaitlistCount(): Promise<number> {
  if (isAirtableConfigured()) {
    return SEED_COUNT + (await getAirtableCount());
  }

  const data = await readData();
  return data.seed + data.entries.length;
}

export async function addWaitlistEntry(
  email: string,
  orgName: string
): Promise<{ count: number; alreadyJoined: boolean }> {
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedOrg = orgName.trim();
  const createdAt = new Date().toISOString();

  if (isAirtableConfigured()) {
    const alreadyJoined = await emailExists(normalizedEmail);

    if (!alreadyJoined) {
      await createRecord({
        email: normalizedEmail,
        orgName: trimmedOrg,
        createdAt,
      });
      // Keep the cached vanity count roughly in step without a re-fetch.
      if (countCache) countCache.value += 1;
    }

    return { count: SEED_COUNT + (await getAirtableCount()), alreadyJoined };
  }

  const data = await readData();
  const alreadyJoined = data.entries.some(
    (entry) => entry.email === normalizedEmail
  );

  if (!alreadyJoined) {
    data.entries.push({
      email: normalizedEmail,
      orgName: trimmedOrg,
      createdAt,
    });
    await writeData(data);
  }

  return { count: data.seed + data.entries.length, alreadyJoined };
}
