const path = require("path");
const express = require("express");

const Smartpay = require("@smartpay/sdk-node").default; // The Nodejs SDK

// Replace the keys with yours
const SECRET_KEY = process.env.SECRET_KEY || "<YOUR_SECRET_KEY>";
const PUBLIC_KEY = process.env.PUBLIC_KEY || "<YOUR_PUBLIC_KEY>";

const smartpay = new Smartpay(SECRET_KEY);
const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());

app.post("/create-smartpay-checkout", async (req, res) => {
  try {
    const session = await smartpay.createCheckoutSession(req.body);

    res.send(session);
  } catch (error) {
    console.log(error);
    console.log(error.details);

    res.send("");
  }
});

/**
 * Handle callbacks
 */
app.get("/payment-success", async (req, res) => {
  // Q. Use the SDK or API to confirm the order status
  res.sendFile("payment-success.html", { root: __dirname });
});

app.get("/payment-canceled", async (req, res) => {
  res.sendFile("payment-canceled.html", { root: __dirname });
});

app.listen(8080, () => console.log("Node server listening on port 8080!"));
