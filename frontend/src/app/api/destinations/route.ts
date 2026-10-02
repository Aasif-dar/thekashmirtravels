import { getDestinations } from "@/lib/queries";
import { destinationRepo } from "@/lib/repo";
import { destinationSchema } from "@/lib/validation";
import {
  handleError,
  json,
  publicJson,
  requireAdmin,
  revalidateSite,
} from "@/lib/api";

export async function GET() {
  try {
    return publicJson(await getDestinations());
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const data = destinationSchema.parse(await request.json());
    const created = await destinationRepo.create(data);
    revalidateSite();
    return json(created, 201);
  } catch (error) {
    return handleError(error);
  }
}
