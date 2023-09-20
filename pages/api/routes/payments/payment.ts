import stripe from "stripe" 

import { NextApiRequest, NextApiResponse } from "next"


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    console.log(process.env.STRIPE_KEY_TEST)
    const myStripe = new stripe(process.env.STRIPE_KEY_TEST as string, {} as any)

    try{
const paymentIntent = await myStripe.paymentIntents.create({
        amount: Number(req.query.amount),
        currency: "usd",
        payment_method_types: ["card"]
        
    })
    return res.status(200).json({clientSecret: paymentIntent.client_secret})
    }catch(error: any){
   
        return res.status(error.statusCode).json(error.message)
    }
    
}