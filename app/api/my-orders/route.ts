import { createAdminClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return Response.json({ error: "Missing user_id" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user_id)
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }

  return Response.json(data);
}
