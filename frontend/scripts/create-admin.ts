// Usage: npm run create-admin -- <email> <password>
// Inserts the admin, or updates the password if the email already exists.
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDb } from "../src/lib/db";
import { AdminModel } from "../src/models/Admin";
import { passwordProblem } from "../src/lib/passwordRules";

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    throw new Error("Usage: npm run create-admin -- <email> <password>");
  }
  const problem = passwordProblem(password);
  if (problem) throw new Error(problem);

  await connectDb();
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await AdminModel.updateOne(
    { email: email.trim().toLowerCase() },
    // passwordChangedAt also signs out any existing sessions for this admin.
    { $set: { passwordHash, passwordChangedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
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
