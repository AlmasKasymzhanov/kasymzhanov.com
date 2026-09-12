import { getSupabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("increment_view", { page_slug: slug });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ count: data });
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("page_views")
    .select("count")
    .eq("slug", slug)
    .maybeSingle();

  if (error) return NextResponse.json({ error: "Views unavailable" }, { status: 503 });

  return NextResponse.json({ count: data?.count ?? 0 });
}
