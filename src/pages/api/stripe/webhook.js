import User from '../../../../models/User';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET;


export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {

        const buffer = (req) => {
          return new Promise((resolve, reject) => {
            const chunks = [];

            req.on('data', (chunk) => {
              chunks.push(chunk);
            });

            req.on('end', () => {
              resolve(Buffer.concat(chunks));
            });

            req.on('error', reject);
          });
        };

        const body = await buffer(req);
        const sig = req.headers['stripe-signature'];
        if (sig && body){
          const event = await stripe.webhooks.constructEvent(body, sig, endpointSecret)
            if (event.type === 'checkout.session.completed') {
              if(event.data.object.payment_status && event.data.object.status){
                await User.findOneAndUpdate({email : event.data.object.customer_email} , {userType : 'premium'})
                return res.status(200).end();
              }
            } 
            else if(event.type === 'customer.subscription.deleted'){
              await User.findOneAndUpdate({email : event.data.object.customer_email} , {userType : 'standard'})
              return res.status(200).end();
            }  
            else if(event.type === 'payment_intent.payment_failed' || event.type === 'payment_intent.canceled' || event.type === 'charge.failed'){
              const customer = await stripe.customers.retrieve(event.data.object.customer);
              await User.findOneAndUpdate({email : customer.email} , {userType : 'standard'})
              return res.status(200).end();
            }
            else if(event.type === 'invoice.payment_failed' ){
              await User.findOneAndUpdate({email : event.data.object.customer_email} , {userType : 'standard'})
              return res.status(200).end();
            }

          return res.status(200).end()
        }
        else{
          return res.status(405).end('Invalid Headers'); 
        }  
      } catch (err) {
        console.log(err)
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }


  export const config = {
    api: {
      bodyParser: false,
    },
  };
