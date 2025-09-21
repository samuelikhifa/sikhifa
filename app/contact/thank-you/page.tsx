import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Thank You | Message received",
  description:
    "Thanks for reaching out. Your message has been sent successfully and I'll get back to you shortly.",
  alternates: {
    canonical: "https://samuelikhifa.com/contact/thank-you",
  },
};

export default function ThankYouPage() {
  // Redirect any visits to the old thank-you route back to the contact page with success flag
  redirect("/contact?sent=1");
}
