import { getDestinationBySlug } from "@/lib/queries";
import { destinationRepo } from "@/lib/repo";
import { destinationSchema } from "@/lib/validation";
import {
  handleError,
  json,
  publicJson,
  requireAdmin,
  revalidateSite,
} from "@/lib/api";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  try {
    const { slug } = await params;
    const destination = await getDestinationBySlug(slug);
    return destination
      ? publicJson(destination)
      : json({ error: "Not found" }, 404);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { slug } = await params;
    const data = destinationSchema.parse(await request.json());
    const updated = await destinationRepo.update(slug, data);
    if (!updated) return json({ error: "Not found" }, 404);
    revalidateSite();
    return json(updated);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { slug } = await params;
    if (!(await destinationRepo.remove(slug))) return json({ error: "Not found" }, 404);
    revalidateSite();
    return json({ ok: true });
  } catch (error) {
    return handleError(error);
  }
}
