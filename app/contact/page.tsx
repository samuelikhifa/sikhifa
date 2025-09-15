import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, ArrowRight, CheckCircle, Users, Award, Zap } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact - Samuel Ikhifa | Get In Touch',
  description: 'Get in touch with Samuel Ikhifa for web development and SEO projects. Let\'s discuss your ideas and bring your vision to life.',
  keywords: 'Contact, Web Development, SEO, Get In Touch, Samuel Ikhifa, Nigeria',
  openGraph: {
    title: 'Contact - Samuel Ikhifa | Get In Touch',
    description: 'Get in touch with Samuel Ikhifa for web development and SEO projects. Let\'s discuss your ideas and bring your vision to life.',
    url: 'https://samuelikhifa.com/contact',
    siteName: 'Samuel Ikhifa Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Samuel Ikhifa Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://samuelikhifa.com/contact',
  },
};


const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "ikhifasamuel12@gmail.com",
    link: "mailto:ikhifasamuel12@gmail.com"
  },
  
  {
    icon: Phone,
    title: "Phone",
    value: "+234 904 623 1092",
    link: "tel:+2349046231092"
  }
  
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
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-6">
                  Let's Connect
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  I'm always excited to work on new projects and collaborate with amazing people. 
                  Whether you have a specific project in mind or just want to chat about possibilities, 
                  I'd love to hear from you.
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
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="text-lime-600 hover:text-lime-700 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </div>
        </div>
      </section>

     


     
    </div>
  );
}