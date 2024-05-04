import { loadStripe } from '@stripe/stripe-js';

const stripePromise =await loadStripe(process.env.STRIPE_SECRET_KEY);
console.log(stripePromise)

export { stripePromise };