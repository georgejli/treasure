import { redirect } from "next/navigation";
import createSupabaseServerClient from "@/utils/supabase/server";
import EditEventForm from "@/components/events/edit-event/EditEventForm";
import { validateUser } from "@/lib/actions/auth";
import { EventForm } from "@/types/event";
import { useState } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const { data } = await validateUser();
  const user = data.user;
  if (!user) {
    redirect("/account");
  }
  const supabase = await createSupabaseServerClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.id)
    .single();

  // redirect if not organizer to another page
  if (event.organizer_id != user.id) {
    redirect("/events");
  }

  // load the event tickets
  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .eq("event_id", params.id);

  // load the event poster
  const {
    data: { publicUrl },
  } = await supabase.storage.from("posters").getPublicUrl(event.poster_url);

  return (
    <main className="m-auto max-w-lg">
      <EditEventForm event={event} posterUrl={publicUrl} />
    </main>
  );
}