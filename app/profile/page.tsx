import createSupabaseServerClient from "@/utils/supabase/server";
import Link from "next/link";
import format from "date-fns/format";
import { getProfile } from "@/lib/helpers/profiles";
import { validateUser, logoutUser } from "@/lib/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

export default async function Page() {
  const { data: userData } = await validateUser();
  const user: User = userData.user as User;

  const supabase = await createSupabaseServerClient();
  const { profile } = await getProfile(user.id);

  const {
    data: { publicUrl },
  } = await supabase.storage.from("avatars").getPublicUrl(profile.avatar_url);

  const formattedDate = format(new Date(user.created_at), "MMMM do, yyyy");

  return (
    <main className="m-auto max-w-lg">
      <div className="flex flex-col space-y-6">
        <Avatar className="h-32 w-32 m-auto">
          <AvatarImage src={publicUrl} />
          <AvatarFallback>
            {profile.first_name[0]}
            {profile.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl m-auto font-semibold text-center">
          Welcome, {profile.first_name}!
        </h1>
        <Link href="/profile/events">
          <Button className="w-full">My Events</Button>
        </Link>
        <Link href="/profile/manage-account" className="">
          <Button className="w-full" variant={"secondary"}>
            Account
          </Button>
        </Link>
        {profile.role === "admin" && (
          <>
            <Link href="/profile/featured-events" className="">
              <Button className="w-full" variant={"secondary"}>
                Featured Events
              </Button>
            </Link>
            <Link href="/profile/create-profile" className="">
              <Button className="w-full" variant={"secondary"}>
                Create Temporary Profile
              </Button>
            </Link>
            <Link href="/profile/assign">
              <Button variant={"secondary"} className="w-full">
                Assign User to Temporary Profile
              </Button>
            </Link>
          </>
        )}
        <Link
          href={`/${profile.username}`}
          className="border-b-2 border-b-secondary pb-6 mb-0"
        >
          <Button className="w-full" variant={"secondary"}>
            View Profile
          </Button>
        </Link>
        <div className="text-base text-center border-b-2 border-b-secondary pb-6 mb-0">
          On Treasure since{" "}
          <span className="text-primary">{formattedDate}</span>
        </div>
        <div className="text-base text-center">{profile.bio}</div>
      </div>
    </main>
  );
}
