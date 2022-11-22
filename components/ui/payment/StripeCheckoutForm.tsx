import { useState, useEffect, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentProcess } from "../../src/payments/StripePaymentProcess";
import { LoadingSpinnerAnimation } from "../icons/LoadingSpinnerAnimation";

export default function StripeCheckoutForm({
  adId,
  userName,
}: {
  adId: string;
  userName: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<{ message: string; state: number }>({
    message: "",
    state: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage({ message: "Payment succeeded!", state: 0 });
          break;
        case "processing":
          setMessage({ message: "Your payment is processing.", state: 1 });
          break;
        case "requires_payment_method":
          setMessage({
            message: "Your payment was not successful, please try again.",
            state: 2,
          });
          break;
        default:
          setMessage({ message: "Something went wrong.", state: 2 });
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const paymentProcess = new StripePaymentProcess();
    const { message, status } = await paymentProcess.confirmPayment(
      stripe,
      elements,
      userName
    );
    setMessage({ message, state: status });

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="bg-sky-500 text-white p-2 w-full text-center rounded-md"
      >
        <span id="button-text" className="w-full flex justify-center">
          {isLoading ? (
            <div className="w-6 h-6">
              <LoadingSpinnerAnimation />
            </div>
          ) : (
            "Pagar y lanzar"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          className={`${
            message.state == 0
              ? "text-green-500"
              : message.state == 2
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {message.message}
        </div>
      )}
    </form>
  );
}
