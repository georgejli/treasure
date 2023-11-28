"use server";
import createSupabaseServerClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { EventForm, EventFormTicket, EventFormTag } from "@/types/event";
import { Tables } from "@/types/supabase";
import { createTicketTailorEvent } from "../ticket-tailor";

const createEvent = async (values: EventForm) => {
  const supabase = await createSupabaseServerClient();
  const {
    name,
    description,
    venue_name,
    address,
    lng,
    lat,
    date,
    start_time,
    end_time,
    poster_url,
    venue_map_url,
  } = values;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        name,
        description,
        address,
        lng,
        venue_name,
        lat,
        date,
        start_time,
        end_time,
        poster_url,
        venue_map_url,
        organizer_id: user?.id,
      },
    ])
    .select();

  if (data) {
    const event: Tables<"events"> = data[0];
    const ticketTailorEventData = await createTicketTailorEvent(event);
    console.log(ticketTailorEventData);
    await createTickets(values.tickets, event.id);
    await createTags(values.tags, event.id);
  }
  if (!error) {
    redirect("/profile");
  }
};

const createTags = async (tags: EventFormTag[], event_id: string) => {
  const supabase = await createSupabaseServerClient();
  tags.forEach(async (tag) => {
    const { data: tagsData, error } = await supabase
      .from("event_tags")
      .insert([
        {
          event_id,
          tag_id: tag.tag_id,
        },
      ])
      .select();
    console.log(tagsData, error);
  });
};

const createTickets = async (tickets: EventFormTicket[], event_id: string) => {
  const supabase = await createSupabaseServerClient();
  tickets.forEach(async (ticket) => {
    const { ticket_price, ticket_quantity, ticket_name } = ticket;
    const { data: ticketsData, error } = await supabase
      .from("tickets")
      .insert([
        {
          price: ticket_price,
          quantity: ticket_quantity,
          name: ticket_name,
          event_id,
        },
      ])
      .select();
  });
};

export { createEvent };
