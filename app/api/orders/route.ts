import { createAdminClient } from "@/lib/supabase";

const VALID_STATUSES = ["preparing", "completed", "collected"];

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }

  return Response.json(data);
}

export async function PATCH(request: Request) {
  const { id, status } = await request.json();

  if (!id || !status) {
    return Response.json({ error: "Missing id or status" }, { status: 400 });
  }

  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    return Response.json({ error: "Failed to update status" }, { status: 500 });
  }

  return Response.json({ success: true });
}
