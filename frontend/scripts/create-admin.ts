// Usage: npm run create-admin -- <email> <password>
// Inserts the admin, or updates the password if the email already exists.
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDb } from "../src/lib/db";
import { AdminModel } from "../src/models/Admin";

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    throw new Error("Usage: npm run create-admin -- <email> <password>");
  }
  if (password.length < 8) throw new Error("Password must be at least 8 characters");

  await connectDb();
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await AdminModel.updateOne(
    { email: email.trim().toLowerCase() },
    { $set: { passwordHash }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );
  console.log(result.upsertedCount ? "Admin created." : "Admin password updated.");
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
