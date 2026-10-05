import type { AdminRequest, Destination, Journey } from "@/lib/types";

// In-memory store for demo mode (a local sandbox with no database). It starts
// empty, lives on globalThis so it survives hot reloads, and resets whenever
// the dev server restarts.

export type StoredRequest = AdminRequest & { ipHash: string };

type Store = {
  seq: number;
  destinations: Destination[];
  journeys: Journey[];
  requests: StoredRequest[];
};

function buildInitial(): Store {
  // Intentionally empty: no sample destinations, journeys or requests.
  return { seq: 0, destinations: [], journeys: [], requests: [] };
}

const g = globalThis as unknown as { __demoStore?: Store };

export function demoStore(): Store {
  return (g.__demoStore ??= buildInitial());
}

export function nextDemoId(store: Store) {
  return `demo-${++store.seq}`;
}
