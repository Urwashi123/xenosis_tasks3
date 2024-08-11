// server.js
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('your-secret-key-here');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

app.listen(5000, () => console.log('Server running on port 5000'));
