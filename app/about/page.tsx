import { Metadata } from "next";
import {
  User,
  Award,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Users,
  Zap,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About - Samuel Ikhifa | Web Developer & SEO Specialist",
  description:
    "Learn more about Samuel Ikhifa, a passionate Web Developer and SEO Specialist from Nigeria. Discover my journey, skills, and approach to creating exceptional digital experiences.",
  keywords:
    "About, Samuel Ikhifa, Web Developer, SEO Specialist, Nigeria, Portfolio, Experience",
  openGraph: {
    title: "About - Samuel Ikhifa | Web Developer & SEO Specialist",
    description:
      "Learn more about Samuel Ikhifa, a passionate Web Developer and SEO Specialist from Nigeria. Discover my journey, skills, and approach to creating exceptional digital experiences.",
    url: "https://samuelikhifa.com/about",
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
    canonical: "https://samuelikhifa.com/about",
  },
};

const skills = [
  // { name: "UI/UX Design", level: 70 },
  { name: "Frontend Development", level: 90 },
  { name: "SEO optimiztion", level: 75 },
  { name: "Performance Optimization ", level: 75 },
  { name: "UI/UX Design", level: 70 },
  { name: "Prototyping", level: 92 },
  // { name: "User Research", level: 60 },
  { name: "Version Control (Git/GitHub)", level: 75 },
];

const experience = [
  {
    year: "2025 - Present",
    title: "Frontend Developer & SEO Specialist",
    company: "Legacy54",
    description:
      "Building and optimizing Legacy54&rsquo;s sports platform with a focus on responsive web development and SEO best practices, ensuring speed, performance, and discoverability while delivering a smooth user experience.",
  },
  {
    year: "2024 - Present",
    title: "Frontend Developer & UI/UX Designer",
    company: "JCIN UNIBEN",
    description:
      "Designed and developed the official JCIN UNIBEN website, ensuring a responsive layout, modern UI, and improved performance across devices.",
  },
  // {
  //   year: "2019 - 2021",
  //   title: "Junior Designer",
  //   company: "Creative Studio",
  //   description: "Assisted in design projects, created wireframes, and contributed to the overall design process."
  // }
];

const values = [
  {
    icon: Users,
    title: "User-Centered",
    description: "Every design decision is based on user needs and research.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Constantly exploring new technologies and design trends.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Genuine love for creating beautiful and functional experiences.",
  },
];

export default function AboutPage() {
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
              About Me
            </h1>
            <p className="text-xl md:text-2xl text-lime-100 max-w-3xl mx-auto leading-relaxed">
              Building high-performance websites where design meets speed,
              usability, and discoverability.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins text-4xl font-bold text-gray-900 mb-6">
                My Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  What began as an interest in creative problem-solving grew
                  into a commitment to building websites that don&rsquo;t just look
                  good — they perform, convert, and scale. I believe every
                  digital product should balance design, functionality, and
                  discoverability, and that&rsquo;s where my work lives: the
                  intersection of frontend engineering and SEO strategy.
                </p>
                {/* <p>
                  With over 4 years of experience in the digital design industry, I've had the privilege 
                  of working on diverse projects that have shaped my understanding of user-centered design 
                  and modern development practices.
                </p>
                <p>
                  My approach combines creative thinking with technical expertise, ensuring that every 
                  project I work on not only looks beautiful but also functions flawlessly and provides 
                  an exceptional user experience.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl font-bold text-gray-900 mb-4">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive skill set that combines design thinking with
              technical implementation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {skills.slice(0, 3).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-lime-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {skills.slice(3).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-lime-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl font-bold text-gray-900 mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My journey in the design and development industry
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-lime-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-lime-600 bg-lime-100 px-3 py-1 rounded-full">
                        {exp.year}
                      </span>
                    </div>
                    <h3 className="font-poppins text-xl font-bold text-gray-900 mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-purple-600 font-medium mb-3">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl font-bold text-gray-900 mb-4">
              My Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide my work and approach to design
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="font-poppins text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
