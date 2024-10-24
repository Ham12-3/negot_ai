import {Resend} from  "resend"




const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const resend = new Resend(RESEND_API_KEY)


export const sendPremiumConfirmationEmail=async(
    userEmail:string,
    userName:string
)=> {
try {
await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: userEmail,
    subject: "Welcome to Negot Premium",
    html: `<p>Hi ${userName}, </p> <p> Welcome to Negot AI Premium!, You're a premium user!</p>`
})
} catch(error) {
console.error(error)
}
}