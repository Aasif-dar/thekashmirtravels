import { notFound } from "next/navigation";
import JourneyForm from "@/components/admin/JourneyForm";
import { adminGetJourney, adminListDestinations } from "@/lib/adminQueries";

export default async function EditJourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [journey, destinations] = await Promise.all([
    adminGetJourney(slug),
    adminListDestinations(),
  ]);
  if (!journey) notFound();

  return (
    <>
      <h1 className="mb-8 font-serif text-3xl">Edit {journey.title}</h1>
      <JourneyForm
        key={journey.id}
        initial={journey}
        destinationOptions={destinations.map(({ slug, title }) => ({
          slug,
          title,
        }))}
      />
    </>
  );
}
