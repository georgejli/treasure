"use client";
import { useState } from "react";
import CreateEventStepOne from "@/components/events/create-event/CreateEventStepOne";
import CreateEventStepTwo from "@/components/events/create-event/CreateEventStepTwo";
import CreateEventStepThree from "@/components/events/create-event/CreateEventStepThree";
import CreateEventStepFour from "@/components/events/create-event/CreateEventStepFour";
import CreateEventStepFive from "@/components/events/create-event/CreateEventStepFive";
import { EventForm } from "@/types/event";

export default function Page() {
  const [step, setStep] = useState(1);
  const [eventForm, setEventForm] = useState<EventForm>({
    name: "",
    description: "",
    venue_name: "",
    address: "",
    lat: 0,
    lng: 0,
    date: undefined,
    start_time: "09:30",
    end_time: "16:30",
    tickets: [
      {
        ticket_price: "",
        ticket_quantity: "",
        ticket_name: "",
      },
    ],
    tags: [],
    poster_url: undefined,
    venue_map_url: undefined,
  });

  return (
    <main className="max-w-lg h-[calc(100vh-220px)] m-auto">
      {step === 1 && (
        <CreateEventStepOne
          eventForm={eventForm}
          setEventForm={setEventForm}
          onNext={() => setStep(step + 1)}
        />
      )}
      {step === 2 && (
        <CreateEventStepTwo
          eventForm={eventForm}
          setEventForm={setEventForm}
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
        />
      )}
      {step === 3 && (
        <CreateEventStepThree
          eventForm={eventForm}
          setEventForm={setEventForm}
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
        />
      )}
      {step === 4 && (
        <CreateEventStepFour
          eventForm={eventForm}
          setEventForm={setEventForm}
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
        />
      )}
      {step === 5 && (
        <CreateEventStepFive
          eventForm={eventForm}
          onBack={() => setStep(step - 1)}
        />
      )}
    </main>
  );
}
