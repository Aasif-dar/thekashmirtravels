import { adminListRequests, type AdminRequest } from "@/lib/adminQueries";
import DeleteButton from "@/components/admin/DeleteButton";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

function Details({ request }: { request: AdminRequest }) {
  const rows: [string, string | undefined][] = [
    ["Phone", request.phone],
    ["Email", request.email],
    ["Travellers", String(request.travellers)],
    ["Travel date", request.travelDate],
    ["Travel dates", request.travelDates],
    ["Trip length", request.tripLength],
    ["Budget", request.budget],
    ["Notes", request.notes],
    ["Owner email", request.emailSent ? "Sent" : "Not sent"],
  ];
  return (
    <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[110px_1fr]">
      {rows
        .filter(([, value]) => value)
        .map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-charcoal/50">{label}</dt>
            <dd className="break-words whitespace-pre-wrap">{value}</dd>
          </div>
        ))}
    </dl>
  );
}

export default async function AdminRequestsPage() {
  let requests: AdminRequest[] = [];
  let error = "";
  try {
    requests = await adminListRequests();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load requests";
  }

  return (
    <>
      <h1 className="font-serif text-3xl">Requests</h1>

      {error && <p className="mt-6 text-sm text-burgundy">{error}</p>}

      <div className="mt-8 overflow-x-auto border border-charcoal/15 bg-white/60">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/15 text-[12px] tracking-[0.1em] text-charcoal/60 uppercase">
            <tr>
              <th className="p-3">Type</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Journey / destinations</th>
              <th className="p-3">Received</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-charcoal/10 align-top last:border-0"
              >
                <td className="p-3">
                  {request.type === "booking" ? "Booking" : "Custom trip"}
                </td>
                <td className="p-3">
                  <span className="font-medium">{request.name}</span>
                  <details className="mt-1">
                    <summary className="cursor-pointer text-xs text-deep-green">
                      Details
                    </summary>
                    <div className="mt-2">
                      <Details request={request} />
                    </div>
                  </details>
                </td>
                <td className="p-3 text-charcoal/70">
                  {request.type === "booking"
                    ? request.journey
                    : request.destinations.join(", ") || "Not decided"}
                </td>
                <td className="p-3 whitespace-nowrap text-charcoal/60">
                  {formatDate(request.createdAt)}
                </td>
                <td className="p-3 text-right">
                  <DeleteButton
                    url={`/api/requests/${request.id}`}
                    name={`request from ${request.name}`}
                  />
                </td>
              </tr>
            ))}
            {!requests.length && !error && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-charcoal/50">
                  No requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
