import { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact - Samuel Ikhifa | Get In Touch",
  description:
    "Get in touch with Samuel Ikhifa for web development and SEO projects. Let's discuss your ideas and bring your vision to life.",
  keywords:
    "Contact, Web Development, SEO, Get In Touch, Samuel Ikhifa, Nigeria",
  openGraph: {
    title: "Contact - Samuel Ikhifa | Get In Touch",
    description:
      "Get in touch with Samuel Ikhifa for web development and SEO projects. Let's discuss your ideas and bring your vision to life.",
    url: "https://samuelikhifa.com/contact",
    siteName: "Samuel Ikhifa Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Samuel Ikhifa Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://samuelikhifa.com/contact",
  },
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "ikhifasamuel12@gmail.com",
    link: "mailto:ikhifasamuel12@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+234 904 623 1092",
    link: "tel:+2349046231092",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-lime-500 relative overflow-hidden">
        {/* Geometric patterns */}
        <div className="absolute top-4 left-20 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-8 left-32 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-12 left-16 w-3 h-0.5 bg-white opacity-50"></div>
        <div className="absolute top-6 right-32 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-10 right-20 w-1 h-1 bg-white rounded-full opacity-40"></div>

        <div className="container mx-auto px-6 py-16">
          <div className="text-center text-white">
            <h1 className="font-poppins text-5xl md:text-7xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-lime-100 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your project and bring your ideas to life
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form with FormSubmit */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-6">
                  Send me a message
                </h2>
                
                <form 
                  action="https://formsubmit.co/ikhifasamuel12@gmail.com" 
                  method="POST"
                  className="space-y-6"
                >
                  {/* Hidden FormSubmit configurations */}
                  <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value="https://samuelikhifa.com/contact/thank-you" />
                  <input type="hidden" name="_template" value="table" />
                  
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors resize-vertical"
                      placeholder="Tell me about your project or inquiry..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-6">
                  Let's Connect
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  I'm always excited to work on new projects and collaborate
                  with amazing people. Whether you have a specific project in
                  mind or just want to chat about possibilities, I'd love to
                  hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={info.title} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-lime-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-lime-600 hover:text-lime-700 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="bg-lime-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-lime-600" />
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                </div>
                <p className="text-gray-600">
                  I typically respond within 24 hours. For urgent matters, 
                  feel free to call me directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}