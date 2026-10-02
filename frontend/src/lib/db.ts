import mongoose from "mongoose";

type Cache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cache the connection on globalThis so serverless invocations and dev
// hot-reloads reuse one connection instead of opening a new one each time.
const g = globalThis as unknown as { __mongoose?: Cache };
const cached: Cache = (g.__mongoose ??= { conn: null, promise: null });

export function hasDb() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (cached.conn) return cached.conn;

  cached.promise ??= mongoose.connect(uri, {
    bufferCommands: false,
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 8000,
  });
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
