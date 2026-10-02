import { handleError, json, requireAdmin } from "@/lib/api";
import { requestRepo } from "@/lib/repo";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { id } = await params;
    return (await requestRepo.remove(id))
      ? json({ ok: true })
      : json({ error: "Not found" }, 404);
  } catch (error) {
    return handleError(error);
  }
}
