// import React, { Fragment, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import type { IPayment } from "../model/payment";

// const CheckoutForm = (props: any) => {
//   const stripe: any = useStripe();
//   const elements: any = useElements();

//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isLoading, setLoader] = useState(false);

//   const handleSubmit = async (event: any) => {
//     event.preventDefault();

//     if (elements == null) {
//       return;
//     }

//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setErrorMessage(submitError.message);
//       return;
//     }

//     setLoader(true);

//     try {
//       const payload: any = {
//         amount: props.formData.amount * 100,
//       };

//     //   if (props.formData.organization) {
//     //     payload["organization"] = props.formData.organization;
//     //   }

//     //   if (props.formData.event) {
//     //     payload["event"] = props.formData.event;
//     //   }

//       const response = await fetch(
//         `${import.meta.env.VITE_APP_BASE_URL}/donations/payment-intent`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${props.formData.jwtToken}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const { paymentIntent } = await response.json();

//       const { error } = await stripe.confirmPayment({
//         elements,
//         clientSecret: paymentIntent,
//         confirmParams: {
//           return_url: `http://donations.hiroek.io/success?amount=${props.formData.amount*100}`,
//         },
//       });

//       setLoader(false);

//       if (error) {
//         setErrorMessage(error.message);
//       } else {
//       }
//     } catch (err) {
//       setLoader(false);
//     }
//   };

//   return (
//     <form className="flex flex-col justify-between min-h-screen" onSubmit={handleSubmit}>
//       <div className="order-last m-6">
//           <Fragment>
//             <PaymentElement />

//             <button
//               className="px-10 py-3 my-3 mx-auto rounded-lg w-full bg-purple-700 font-medium text-sm text-white"
//               type="submit"
//               disabled={!stripe || !elements || isLoading}
//             >
//               {isLoading ? "Processing..." : "Finalise"}
//             </button>

//             {errorMessage && <div>{errorMessage}</div>}
//           </Fragment>
//       </div>
//     </form>
//   );
// };

// const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUB_KEY);

// const PaymentForm = (props: {
//     payload: IPayment
// }) => {
//   const amount = props.payload.amount;
//   const fee = 50; // 0.5 gbp
//   const percentageToAdd = (amount * 10) / 100;
//   const amountInPounds = amount * 100;
//   // const newAmount = amountInPounds + percentageToAdd * 100 + fee;
//   const newAmount = amountInPounds;

//   const options = {
//     mode: "payment",
//     payment_method_types: ["card"],
//     currency: "gbp",
//     amount: parseInt(newAmount+""),

//     appearance: {},
//   };
//   return (
//     <Elements stripe={stripePromise} options={options as any}>
//       <CheckoutForm
//         formData={props.payload}
//         finalAmount={parseInt(newAmount+"") / 100}
//         paymentFee={percentageToAdd}
//       />
//     </Elements>
//   );
// };

// export default PaymentForm;
import React, { Fragment, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { IPayment } from "../model/payment";
import CustomButton from "./shared/customButton";

// interface FormData {
//   amount: number;
//   organization?: string;
//   event?: string;
//   jwtToken: string;
// }

interface CheckoutFormProps {
  formData: IPayment;
  finalAmount?: number;
  paymentFee?: number;
  setTab?: any
}

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setLoader] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
    //   setErrorMessage(submitError?.message);
      return;
    }

    setLoader(true);

    try {
      const payload: {
        amount: number;
        organization?: string;
        event?: string;
      } = {
        amount: props.formData.amount * 100,
      };

    //   if (props.formData.organization) {
    //     payload.organization = props.formData.organization;
    //   }

    //   if (props.formData.event) {
    //     payload.event = props.formData.event;
    //   }

      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/donations/payment-intent`,
        {
          method: "POST", 
          body: JSON.stringify(payload),
        }
      );

      const { paymentIntent } = await response.json();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: paymentIntent,
        confirmParams: {
          return_url: `http://donations.hiroek.io/success?amount=${props.formData.amount * 100}`,
        },
      });

      setLoader(false);

      if (error) {
        // setErrorMessage(error.message);
      } else {
        props?.setTab(true)
      }
    } catch (err) {
      setLoader(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <form className="flex flex-col justify-between" onSubmit={handleSubmit}>
      <div className="order-last m-6">
        <Fragment>
          <PaymentElement />

          <button
            className="px-10 py-3 my-3 mx-auto rounded-lg w-full bg-purple-700 font-medium text-sm text-white"
            type="submit"
            disabled={!stripe || !elements || isLoading}
          >
            {isLoading ? "Processing..." : "Finalise"}
          </button>

          {errorMessage && <div>{errorMessage}</div>}
        </Fragment>
      </div>
    </form>
  );
};

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUB_KEY as string);

interface PaymentProps {
  payload: IPayment;
  setOpen?: any
}

const Payment: React.FC<PaymentProps> = (props) => {
  const amount = props.payload.amount;
//   const fee = 50; // 0.5 gbp
  const percentageToAdd = (amount * 10) / 100;

  const [ tab, setTab ] = useState(false)
  const amountInPounds = amount * 100;
  const newAmount = amountInPounds;

  const options = {
    mode: "payment" as const,
    payment_method_types: ["card"] as ["card"],
    currency: "gbp",
    amount: parseInt(newAmount.toString()),
    appearance: {} as Record<string, unknown>,
  };

  return (
    <> 
      {!tab && ( 
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            formData={props.payload}
            finalAmount={parseInt(newAmount.toString()) / 100}
            paymentFee={percentageToAdd}
            setTab={setTab}
          />
        </Elements>
      )}
      {tab && (
        <div className=" w-full min-h-[60vh] flex flex-col justify-between " >
          <div className=" w-full flex flex-col items-center px-4  gap-2 py-[20%] " >
            <p className=" text-xl font-bold leading-[110%] text-center text-primary  " >Thank You <br/> for your generosity!</p>
            <p className=" text-sm font-semibold text-[#37137F80] text-center maw-w-[200px] " >Your donation has been successfully received. your support will make a real difference in the lives of those in need.</p>
          </div>
          <div className=" w-full  px-4 pb-6 " > 
            <CustomButton onClick={()=> props?.setOpen(false)} rounded="16px" width="100%" height="50px"  >View Event</CustomButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;