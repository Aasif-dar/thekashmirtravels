import { getJourneyBySlug } from "@/lib/queries";
import { journeyRepo } from "@/lib/repo";
import { journeySchema } from "@/lib/validation";
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
    const journey = await getJourneyBySlug(slug);
    return journey ? publicJson(journey) : json({ error: "Not found" }, 404);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { slug } = await params;
    const data = journeySchema.parse(await request.json());
    const updated = await journeyRepo.update(slug, data);
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
    if (!(await journeyRepo.remove(slug))) return json({ error: "Not found" }, 404);
    revalidateSite();
    return json({ ok: true });
  } catch (error) {
    return handleError(error);
  }
}
