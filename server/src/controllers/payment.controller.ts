import { Request, Response } from "express";
import Stripe from "stripe";
import User, { IUser } from "../models/user.model";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-09-30.acacia",
})

export const createCharge = async(req:Request, res:Response) => {
    const user = req.user as any
    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Lifetime subscription",
                        },
                        unit_amount: 1000,
                    },
                    quantity: 1,
                }
            ],
            customer_email: user.email,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            client_reference_id: user._id,

        });

        res.json({ sessionId: session.id });

    } catch (error) {
console.error(error)
res.status(500).json({error: "failed to create charge"})
    }
}


export const handleWebhook = async(req:Request, res:Response) => {
    const signature = req.headers["stripe-signature"] as string

    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

    } catch(error: any) {
console.error(error)
return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    if(event.type === "checkout.session.completed") {
        const session =event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id


        if(userId) {
            const user = await User.findByIdAndUpdate(userId)
        }
    }
}