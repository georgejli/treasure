"use client";

import { User } from "@supabase/supabase-js";
import { EventDisplayData } from "@/types/event";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import LikeButton from "@/components/events/shared/LikeButton";

export default function EventDisplay({
  event,
  user,
  redirect,
  showLikeButton = true,
}: {
  user?: User | null;
  event: EventDisplayData;
  redirect?: string;
  showLikeButton?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const imageVisibility = loading ? "invisible" : "visible";
  const skeletonDisplay = loading ? "inline-block" : "hidden";

  return (
    <div className="group w-full relative">
      {showLikeButton && (
        <div className="absolute right-2 top-2 p-2 bg-black rounded-full z-10">
          <LikeButton event={event} user={user} />
        </div>
      )}

      <Link href={redirect || `/events/${event.cleaned_name}`}>
        <div className="relative aspect-w-1 aspect-h-1">
          <Image
            className={`object-cover h-full w-full rounded-md ${imageVisibility}`}
            alt="image"
            src={event.publicPosterUrl}
            width={200}
            height={200}
            onLoad={() => setLoading(false)}
          />
          {loading && (
            <Skeleton
              className={`w-full h-full absolute inset-0 ${skeletonDisplay}`}
            />
          )}
        </div>
        <h1 className="text-xl mt-2 font-bold line-clamp-2">{event.name}</h1>
        <h1 className="text-base font-normal">
          <span className="text-primary text-base font-normal">
            {event.formattedDate}
          </span>{" "}
          {event.city + ", " + event.state}
        </h1>
      </Link>
    </div>
  );
}
