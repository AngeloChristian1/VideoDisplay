// import { transporter } from './node_mailer_config';
import nodemailer from "nodemailer"

// export const transporter = nodemailer.createTransport({
//     service: process.env.MAILER_SERVICE,
//     auth:{
//         user: process.env.MAILER_AUTH_USER,
//         pass: process.env.MAILER_AUTH_PASS
//     },
//     tls: {
//         // do not fail on invalid certs
//         rejectUnauthorized: false,
//       },
// })

const html = `
<h1>hello WOrld</h1>
<h1>Testing nodemailer</h1>
`

    const transporter = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:587,
        secure: false,
        auth:{
            user:"ishgatetechristian@gmail.com",
            pass:"osoc dgxq moff hpop"
        }
    });

    async function main(){
    const info = await transporter.sendMail({
        from:{
            name:"Gatete Angelo Christian",
            address:"ishgatetechristian@gmail.com"
        },
        to:["ishgateschristian@gmail.com"],
        subject:"Testing nodemailer here",
        html:html,
    })
    console.log("Message sent: " + info.messageId)

    }

    main().catch(console.error)