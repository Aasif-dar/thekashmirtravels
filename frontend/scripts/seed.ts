// Idempotent: inserts the original hardcoded destinations/journeys if their
// slug isn't in the DB yet, and never overwrites records edited in the admin.
// Run with: npm run seed
import mongoose from "mongoose";
import { connectDb } from "../src/lib/db";
import { DestinationModel } from "../src/models/Destination";
import { JourneyModel } from "../src/models/Journey";
import { seedDestinations, seedJourneys } from "../src/lib/seedData";

async function main() {
  await connectDb();

  let created = 0;
  for (const destination of seedDestinations) {
    const result = await DestinationModel.updateOne(
      { slug: destination.slug },
      { $setOnInsert: destination },
      { upsert: true }
    );
    if (result.upsertedCount) created++;
  }
  console.log(`Destinations: ${created} created, ${seedDestinations.length - created} already present`);

  created = 0;
  for (const journey of seedJourneys) {
    const result = await JourneyModel.updateOne(
      { slug: journey.slug },
      { $setOnInsert: journey },
      { upsert: true }
    );
    if (result.upsertedCount) created++;
  }
  console.log(`Journeys: ${created} created, ${seedJourneys.length - created} already present`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
