import TagFiltering from "./TagFiltering";
import FilteringButtons from "./FilteringButtons";
import ListEvents from "./ListEvents";
import LoadingListEvents from "./LoadingListEvents";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    tag?: string;
    from?: string;
    until?: string;
    search?: string;
  };
}) {
  const tagQuery = searchParams?.tag || null;
  let numEvents = 100;

  return (
    <main className="max-w-full md:max-w-6xl xl:max-w-7xl m-auto">
      <FilteringButtons />
      <TagFiltering />
      <div className="my-4">
        {tagQuery ? (
          <h1 className="font-semibold text-2xl">Popular {tagQuery} Events</h1>
        ) : (
          <h1 className="font-semibold text-2xl">Popular Events</h1>
        )}
        <h2 className="font-bold text-gray-500">In New York, NY</h2>
      </div>
      <Suspense fallback={<LoadingListEvents />}>
        <ListEvents numEvents={numEvents} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
