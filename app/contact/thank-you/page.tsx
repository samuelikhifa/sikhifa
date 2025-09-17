import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Message received",
  description:
    "Thanks for reaching out. Your message has been sent successfully and I'll get back to you shortly.",
  alternates: {
    canonical: "https://samuelikhifa.com/contact/thank-you",
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-lime-600" />
          </div>
        </div>

        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Thank you!
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Your message has been sent successfully. I appreciate you taking the time to reach out, and I&apos;ll get back to you as soon as possible.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-lime-600 px-5 py-3 text-white font-medium hover:bg-lime-700 transition-colors w-full sm:w-auto"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Back to Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
