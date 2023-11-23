import createSupabaseServerClient from "@/utils/supabase/server";
import validateUser from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import EventDisplay from "@/components/events/shared/EventDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MiniEvent from "@/components/events/events-public/MiniEvent";

export default async function Page() {
  const { data: userData } = await validateUser();
  if (!userData.user) {
    redirect("/account");
  }

  const supabase = await createSupabaseServerClient();
  const { data: eventData } = await supabase
    .from("events")
    .select("*")
    .eq("organizer_id", userData.user.id);

  return (
    <main className="w-full max-w-md m-auto">
      {eventData?.length === 0 ? (
        <div className="flex flex-col space-y-4">
          <p className="text-center">You are hosting no events</p>
          <Link href="/profile/create-event" className="m-auto">
            <Button className="w-40">Create Event</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-12">
          <h1 className="font-bold text-2xl mb-6">My Events</h1>
          {eventData?.map((event) => (
            <MiniEvent key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}
