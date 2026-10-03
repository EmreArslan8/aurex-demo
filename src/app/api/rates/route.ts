import { getRates } from "@/lib/rates/source";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getRates();
  return Response.json(data, { headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30" } });
}
