import { Tables } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import SeeTickets from "./SeeTickets";
import createSupabaseServerClient from "@/utils/supabase/server";

export default async function Tickets({
  event,
  user,
}: {
  event: Tables<"events">;
  user: User | null;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .eq("event_id", event.id)
    .order("price", { ascending: true });

  return (
    <>
      {tickets && tickets.length > 0 && (
        <SeeTickets tickets={tickets} event={event} user={user} />
      )}
    </>
  );
}
