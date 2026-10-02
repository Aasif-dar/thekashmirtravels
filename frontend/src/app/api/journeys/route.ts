import { getJourneys } from "@/lib/queries";
import { journeyRepo } from "@/lib/repo";
import { journeySchema } from "@/lib/validation";
import {
  handleError,
  json,
  publicJson,
  requireAdmin,
  revalidateSite,
} from "@/lib/api";

export async function GET() {
  try {
    return publicJson(await getJourneys());
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const data = journeySchema.parse(await request.json());
    const created = await journeyRepo.create(data);
    revalidateSite();
    return json(created, 201);
  } catch (error) {
    return handleError(error);
  }
}
