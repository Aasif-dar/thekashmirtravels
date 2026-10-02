import { isValidObjectId } from "mongoose";
import { connectDb } from "@/lib/db";
import { isDemoMode } from "@/lib/demo";
import { demoStore, nextDemoId } from "@/lib/demoStore";
import { DestinationModel } from "@/models/Destination";
import { JourneyModel } from "@/models/Journey";
import { RequestModel } from "@/models/Request";
import type {
  AdminRequest,
  Destination,
  DestinationInput,
  Journey,
  JourneyInput,
  NewRequest,
} from "@/lib/types";

// The single place that touches data storage. Every function uses MongoDB,
// or the in-memory demo store when isDemoMode() is true.

type Doc = { _id?: unknown; createdAt?: unknown; updatedAt?: unknown; __v?: unknown };

/** Strip Mongo internals so documents are plain, serialisable objects. */
function serialize<T>(doc: Doc & Record<string, unknown>): T {
  const { _id, createdAt, updatedAt, __v, ...rest } = doc;
  void createdAt;
  void updatedAt;
  void __v;
  return { id: String(_id), ...rest } as T;
}

const clone = <T>(value: T): T => structuredClone(value);

/** Same shape as a Mongo duplicate-key error, so handleError maps it to 409. */
const duplicateSlug = () =>
  Object.assign(new Error("Duplicate slug"), { code: 11000 });

type Saved = { id: string; slug: string };

// ---------------------------------------------------------------- destinations

export const destinationRepo = {
  async list(options: { featured?: boolean } = {}): Promise<Destination[]> {
    if (isDemoMode()) {
      const all = demoStore().destinations;
      return clone(options.featured ? all.filter((d) => d.featured) : all);
    }
    await connectDb();
    const docs = await DestinationModel.find(
      options.featured ? { featured: true } : {}
    )
      .sort({ createdAt: 1 })
      .lean();
    return docs.map((doc) => serialize<Destination>(doc));
  },

  async get(slug: string): Promise<Destination | null> {
    if (isDemoMode()) {
      const found = demoStore().destinations.find((d) => d.slug === slug);
      return found ? clone(found) : null;
    }
    await connectDb();
    const doc = await DestinationModel.findOne({ slug }).lean();
    return doc ? serialize<Destination>(doc) : null;
  },

  async create(data: DestinationInput): Promise<Saved> {
    if (isDemoMode()) {
      const store = demoStore();
      if (store.destinations.some((d) => d.slug === data.slug)) throw duplicateSlug();
      const created = { id: nextDemoId(store), ...clone(data) };
      store.destinations.push(created);
      return { id: created.id, slug: created.slug };
    }
    await connectDb();
    const created = await DestinationModel.create(data);
    return { id: String(created._id), slug: data.slug };
  },

  async update(slug: string, data: DestinationInput): Promise<Saved | null> {
    if (isDemoMode()) {
      const store = demoStore();
      const index = store.destinations.findIndex((d) => d.slug === slug);
      if (index === -1) return null;
      if (store.destinations.some((d, i) => i !== index && d.slug === data.slug)) {
        throw duplicateSlug();
      }
      const id = store.destinations[index].id;
      store.destinations[index] = { id, ...clone(data) };
      return { id, slug: data.slug };
    }
    await connectDb();
    const updated = await DestinationModel.findOneAndUpdate({ slug }, data, {
      new: true,
    });
    return updated ? { id: String(updated._id), slug: data.slug } : null;
  },

  async remove(slug: string): Promise<boolean> {
    if (isDemoMode()) {
      const store = demoStore();
      const before = store.destinations.length;
      store.destinations = store.destinations.filter((d) => d.slug !== slug);
      return store.destinations.length < before;
    }
    await connectDb();
    return Boolean(await DestinationModel.findOneAndDelete({ slug }));
  },
};

// -------------------------------------------------------------------- journeys

export const journeyRepo = {
  async list(options: { featured?: boolean } = {}): Promise<Journey[]> {
    if (isDemoMode()) {
      const all = demoStore().journeys;
      return clone(options.featured ? all.filter((j) => j.featured) : all);
    }
    await connectDb();
    const docs = await JourneyModel.find(
      options.featured ? { featured: true } : {}
    )
      .sort({ createdAt: 1 })
      .lean();
    return docs.map((doc) => serialize<Journey>(doc));
  },

  async get(slug: string): Promise<Journey | null> {
    if (isDemoMode()) {
      const found = demoStore().journeys.find((j) => j.slug === slug);
      return found ? clone(found) : null;
    }
    await connectDb();
    const doc = await JourneyModel.findOne({ slug }).lean();
    return doc ? serialize<Journey>(doc) : null;
  },

  async create(data: JourneyInput): Promise<Saved> {
    if (isDemoMode()) {
      const store = demoStore();
      if (store.journeys.some((j) => j.slug === data.slug)) throw duplicateSlug();
      const created = { id: nextDemoId(store), ...clone(data) };
      store.journeys.push(created);
      return { id: created.id, slug: created.slug };
    }
    await connectDb();
    const created = await JourneyModel.create(data);
    return { id: String(created._id), slug: data.slug };
  },

  async update(slug: string, data: JourneyInput): Promise<Saved | null> {
    if (isDemoMode()) {
      const store = demoStore();
      const index = store.journeys.findIndex((j) => j.slug === slug);
      if (index === -1) return null;
      if (store.journeys.some((j, i) => i !== index && j.slug === data.slug)) {
        throw duplicateSlug();
      }
      const id = store.journeys[index].id;
      store.journeys[index] = { id, ...clone(data) };
      return { id, slug: data.slug };
    }
    await connectDb();
    // Remove optional fields that were cleared in the form.
    const unset: Record<string, 1> = {};
    if (data.price === undefined) unset.price = 1;
    if (!data.heroImage) unset.heroImage = 1;
    const updated = await JourneyModel.findOneAndUpdate(
      { slug },
      { $set: data, ...(Object.keys(unset).length ? { $unset: unset } : {}) },
      { new: true }
    );
    return updated ? { id: String(updated._id), slug: data.slug } : null;
  },

  async remove(slug: string): Promise<boolean> {
    if (isDemoMode()) {
      const store = demoStore();
      const before = store.journeys.length;
      store.journeys = store.journeys.filter((j) => j.slug !== slug);
      return store.journeys.length < before;
    }
    await connectDb();
    return Boolean(await JourneyModel.findOneAndDelete({ slug }));
  },
};

// -------------------------------------------------------------------- requests

export const requestRepo = {
  async create(data: NewRequest): Promise<string> {
    if (isDemoMode()) {
      const store = demoStore();
      const id = nextDemoId(store);
      // Newest first, like the admin list.
      store.requests.unshift({
        id,
        type: data.type,
        name: data.name,
        phone: data.phone,
        email: data.email,
        travellers: data.travellers,
        notes: data.notes,
        journey: data.journey?.title,
        travelDate: data.travelDate,
        destinations: data.destinations.map((d) => d.title),
        travelDates: data.travelDates,
        tripLength: data.tripLength,
        budget: data.budget,
        emailSent: false,
        createdAt: new Date().toISOString(),
        ipHash: data.ipHash,
      });
      return id;
    }
    await connectDb();
    const created = await RequestModel.create(data);
    return String(created._id);
  },

  async countSince(ipHash: string, since: Date): Promise<number> {
    if (isDemoMode()) {
      return demoStore().requests.filter(
        (r) => r.ipHash === ipHash && new Date(r.createdAt) > since
      ).length;
    }
    await connectDb();
    return RequestModel.countDocuments({ ipHash, createdAt: { $gt: since } });
  },

  async markEmailSent(id: string): Promise<void> {
    if (isDemoMode()) {
      const found = demoStore().requests.find((r) => r.id === id);
      if (found) found.emailSent = true;
      return;
    }
    await connectDb();
    await RequestModel.updateOne({ _id: id }, { emailSent: true });
  },

  async list(): Promise<AdminRequest[]> {
    if (isDemoMode()) {
      return demoStore().requests.map((r) => {
        const { ipHash, ...rest } = clone(r);
        void ipHash;
        return rest;
      });
    }
    await connectDb();
    const docs = await RequestModel.find()
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();
    return docs.map((doc) => ({
      id: String(doc._id),
      type: doc.type,
      name: doc.name,
      phone: doc.phone,
      email: doc.email,
      travellers: doc.travellers,
      notes: doc.notes ?? "",
      journey: doc.journey?.title,
      travelDate: doc.travelDate,
      destinations: (doc.destinations ?? []).map((d) => d.title),
      travelDates: doc.travelDates,
      tripLength: doc.tripLength,
      budget: doc.budget,
      emailSent: doc.emailSent,
      createdAt: new Date(doc.createdAt).toISOString(),
    }));
  },

  async remove(id: string): Promise<boolean> {
    if (isDemoMode()) {
      const store = demoStore();
      const before = store.requests.length;
      store.requests = store.requests.filter((r) => r.id !== id);
      return store.requests.length < before;
    }
    if (!isValidObjectId(id)) return false;
    await connectDb();
    return Boolean(await RequestModel.findByIdAndDelete(id));
  },
};
