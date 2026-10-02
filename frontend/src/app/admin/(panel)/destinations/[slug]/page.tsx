import { notFound } from "next/navigation";
import DestinationForm from "@/components/admin/DestinationForm";
import { adminGetDestination } from "@/lib/adminQueries";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await adminGetDestination(slug);
  if (!destination) notFound();

  return (
    <>
      <h1 className="mb-8 font-serif text-3xl">Edit {destination.title}</h1>
      <DestinationForm key={destination.id} initial={destination} />
    </>
  );
}
