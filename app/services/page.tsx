import { Metadata } from "next";
import {
  Code2,
  PenTool,
  Search,
  Zap,
  Smartphone as Layers,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services - Samuel Ikhifa | Web Development & SEO",
  description:
    "Explore comprehensive web development and SEO services offered by Samuel Ikhifa. From responsive websites to search optimization, we deliver functional and impactful digital experiences.",
  keywords:
    "Web Development, SEO Specialist, Frontend Development, Digital Services, Samuel Ikhifa",
  openGraph: {
    title: "Services - Samuel Ikhifa | Web Development & SEO",
    description:
      "Explore comprehensive web development and SEO services offered by Samuel Ikhifa. From responsive websites to search optimization, we deliver functional and impactful digital experiences.",
    url: "https://samuelikhifa.com/services",
    siteName: "Samuel Portfolio",
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
    canonical: "https://samuelikhifa.com/services",
  },
};

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Build responsive, high-performance websites that work seamlessly across all devices.",
    features: [
      "Frontend Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO Integration",
    ],
    color: "purple",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Create intuitive, beautiful user interfaces that delight users and drive engagement.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Visual Design",
      "Design Systems",
    ],
    color: "lime",
  },
  // {
  //   icon: Code2,
  //   title: "Web Development",
  //   description: "Build responsive, high-performance websites that work seamlessly across all devices.",
  //   features: ["Frontend Development", "Responsive Design", "Performance Optimization", "SEO Integration"],
  //   color: "purple"
  // },
  // {
  //   icon: Smartphone,
  //   title: "Mobile App Design",
  //   description: "Design beautiful and intuitive mobile applications for iOS and Android platforms.",
  //   features: ["Native App Design", "Cross-platform Design", "App Store Optimization", "User Experience"],
  //   color: "lime"
  // },
  // {
  //   icon: Palette,
  //   title: "Brand Identity",
  //   description: "Develop cohesive brand identities that reflect your values and connect with your audience.",
  //   features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  //   color: "purple"
  // },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Improve visibility, ranking, and performance with data-driven SEO strategies.",
    features: [
      "On-page Optimization",
      "Keyword Research",
      "Performance & Speed Tuning",
      "Analytics & Insights",
    ],
    color: "violet",
  },
  // {
  //   icon: Zap,
  //   title: "Prototyping",
  //   description: "Create interactive prototypes to test ideas and gather feedback before development.",
  //   features: ["Interactive Prototypes", "User Testing", "Design Validation", "Stakeholder Feedback"],
  //   color: "lime"
  // },
  // {
  //   icon: Users,
  //   title: "User Research",
  //   description: "Understand your users through comprehensive research and data-driven insights.",
  //   features: ["User Interviews", "Usability Testing", "Analytics Analysis", "Persona Development"],
  //   color: "purple"
  // }
];

export default function ServicesPage() {
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
              My Services
            </h1>
            <p className="text-xl md:text-2xl text-lime-100 max-w-3xl mx-auto leading-relaxed">
              Helping brands and products thrive through design and development
              that’s simple, modern, and impactful.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div
                  className={`w-16 h-16 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon
                    className={`w-8 h-8 text-${service.color}-600`}
                  />
                </div>

                <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="flex items-center space-x-3 text-sm text-gray-700"
                    >
                      <div
                        className={`w-2 h-2 bg-${service.color}-500 rounded-full`}
                      ></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
