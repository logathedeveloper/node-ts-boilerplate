import { sendMail } from "../config/mail";
import { welcomeTemplate } from "../templates/welcome.template";

export const handleMailJob = async (job : any) => {
    const { email, name } = job.data;

    console.log(`Sending welcome email to: ${email} with name: ${name}`);
    
    await sendMail({
      to: email,
      subject: "Welcome On board!",
      html: welcomeTemplate(name),
    });
}