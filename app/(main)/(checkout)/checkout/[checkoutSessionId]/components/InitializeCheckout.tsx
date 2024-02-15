"use client";

import { createPaymentIntent } from "@/lib/actions/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function InitializeCheckout() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const paymentIntent = await createPaymentIntent();
      const secret = paymentIntent?.clientSecret || "";
      setClientSecret(secret);
    };
    fetchPaymentIntent();
  }, []);

  const appearance = {
    theme: "night" as const,
    variables: {
      colorPrimaryText: "#f2f2f2",
      colorPrimary: "#71d08c",
      colorBackground: "#0c0a09",
      fontFamily: "Raleway, sans-serif",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
