import JourneyForm from "@/components/admin/JourneyForm";
import { adminListDestinations } from "@/lib/adminQueries";

export default async function NewJourneyPage() {
  const destinations = await adminListDestinations();

  return (
    <>
      <h1 className="mb-8 font-serif text-3xl">New journey</h1>
      <JourneyForm
        destinationOptions={destinations.map(({ slug, title }) => ({
          slug,
          title,
        }))}
      />
    </>
  );
}
