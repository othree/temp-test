import Smartpay from "@smartpay/sdk-web";

import "./App.css";
import "./demo.css";

const CALLBACK_URL_PREFIX = `${document.location.protocol}//${document.location.host}`;

// Replace the keys with yours
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || "<YOUR_PUBLIC_KEY>";

const smartpay = new Smartpay(PUBLIC_KEY);

const checkout = () => {
  // Generate the payload for checkout session
  const payload = {
    amount: 250,
    items: [
      {
        name: "オリジナルス STAN SMITH",
        amount: 250,
        currency: "JPY",
        quantity: 1,
      },
    ],
    customerInfo: {
      accountAge: 35,
      email: "merchant-support@smartpay.co",
      firstName: "かおる",
      lastName: "田中",
      firstNameKana: "カオル",
      lastNameKana: "タナカ",
      address: {
        line1: "北青山 3-6-7",
        line2: "青山パラシオタワー 11階",
        subLocality: "",
        locality: "港区",
        administrativeArea: "東京都",
        postalCode: "107-0061",
        country: "JP",
      },
      dateOfBirth: "1970-06-30",
      gender: "male",
    },
    shippingInfo: {
      address: {
        line1: "北青山 3-6-7",
        line2: "青山パラシオタワー 11階",
        subLocality: "",
        locality: "港区",
        administrativeArea: "東京都",
        postalCode: "107-0061",
        country: "JP",
      },
      feeAmount: 150,
      feeCurrency: "JPY",
    },
    // Your internal reference of the order
    reference: "order_ref_1234567",

    // Callback URLs
    successUrl: `${CALLBACK_URL_PREFIX}/payment-success`,
  };

  fetch("/create-smartpay-checkout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((session) => {
      // 2. Redirect to the checkout app
    });
};

function App() {
  return (
    <div className="App">
      <button onClick={checkout} type="submit">
        Checkout
      </button>
    </div>
  );
}

export default App;
