"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../components/ContactForm";
import LoadingSpinner from "../components/LoadingSpinner";
// import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  status: string;
  createdAt: string;
  liveUrl: string | string[];
  githubUrl: string | string[];
  technologies?: string[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    // Fetch latest 3 projects from API
    fetch("/api/projects?limit=3&status=active")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.data || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Generate gradient colors based on project category
  const getGradientColors = (category: string) => {
    switch (category) {
      case "UI/UX Design":
        return "from-blue-100 to-blue-200";
      case "Web Development":
        return "from-green-100 to-green-200";
      case "SEO":
        return "from-pink-100 to-purple-200";
      default:
        return "from-gray-100 to-gray-200";
    }
  };

  // Generate icon color based on project category
  const getIconColor = (category: string) => {
    switch (category) {
      case "UI/UX Design":
        return "bg-blue-300";
      case "Web Development":
        return "bg-green-300";
      case "SEO":
        return "bg-pink-300";
      default:
        return "bg-gray-300";
    }
  };

  // Generate text color based on project category
  const getTextColor = (category: string) => {
    switch (category) {
      case "UI/UX Design":
        return "text-blue-600";
      case "Web Development":
        return "text-green-600";
      case "SEO":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  };

  // Helper function to get URL from string or array
  const getUrlFromField = (urlField: string | string[]): string | undefined => {
    if (!urlField) return undefined;
    if (Array.isArray(urlField)) {
      return urlField.length > 0 ? urlField[0] : undefined;
    }
    return urlField;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-lime-500 relative overflow-hidden">
        {/* More geometric patterns */}
        <div className="absolute top-20 right-8 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-32 right-16 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-8 w-2 h-2 bg-white rounded-full opacity-60"></div>

        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative order-2 md:order-1">
              <div className="relative w-64 md:w-80 h-80 md:h-96 mx-auto">
                {/* Profile Picture with lazy loading */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl relative overflow-hidden">
                  {/* Loading state */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <LoadingSpinner size="lg" color="lime" />
                    </div>
                  )}

                  {/* Profile Image */}
                  <Image
                    src="/images/sam.jpg " // Replace with your actual image path
                    alt="R2 Ruman - UI/UX Designer"
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                    loading="lazy"
                    sizes="(max-width: 768px) 256px, 320px"
                    unoptimized={true}
                  />

                  {/* Fallback design if image fails to load */}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="text-center md:text-left order-1 md:order-2">
              {/* Speech bubble */}
              <div className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium">This is Samuel</span>
              </div>

              {/* Main headline */}
              <h1 className="font-poppins text-3xl md:text-4xl lg:text-4xl font-bold text-purple-900 mb-6 leading-tight">
                Frontend Developer
                <br />& SEO Specialist
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-8 max-w-md">
                Digital Experience Engineer obsessed with design clarity,
                frontend performance, and SEO that drives results. I build web
                experiences that are fast, intuitive, and built to grow.
              </p>

              {/* CTA Button */}
              <a
                href="/contact"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* UI/UX Section as Cards */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 justify-center">
          {/* UI Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              Frontend
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Building fast, responsive, and scalable websites that deliver
              smooth user experiences across all devices.
            </p>
          </div>
          {/* UX Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              SEO
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Optimizing websites for visibility, ranking, and growth — turning
              clicks into loyal users.
            </p>
          </div>
        </div>
      </section>

      {/* My Services Section (from first image) */}
      <section className="bg-white py-16" id="services">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-center md:text-left">
                My Services
              </h2>
              <p className="text-gray-600 text-base md:text-lg text-center md:text-left max-w-2xl mx-auto md:mx-0">
                I help businesses and individuals build a strong online presence
                through design, development, and SEO strategies.
              </p>
            </div>
            <div className="mt-6 md:mt-0 text-center md:text-left">
              <a
                href="/services"
                className="bg-lime-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-lime-600 transition-colors inline-flex items-center space-x-2"
              >
                <span>View All Services</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-purple-700">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">
                UI/UX Design
              </h3>
              <p className="text-gray-700">
                Creative and user-centered interfaces for web & mobile
                applications.
              </p>
            </div>
            {/* Service 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-purple-700">💻</span>
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">
                Web Development
              </h3>
              <p className="text-gray-700">
                Responsive, fast, and interactive websites built with modern
                technologies.
              </p>
            </div>
            {/* Service 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-purple-700">📱</span>
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">
                SEO Optimization
              </h3>
              <p className="text-gray-700">
                Improving visibility on search engines with data-driven
                strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects Section - Dynamic from Database */}
      <section className="bg-white py-16 relative">
        {/* Geometric patterns */}
        <div className="absolute top-20 right-8 w-2 h-2 bg-gray-400 rounded opacity-60"></div>
        <div className="absolute top-32 right-16 w-1 h-1 bg-gray-400 rounded opacity-40"></div>

        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-poppins text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Latest Projects
              </h2>
              <p className="text-gray-600 text-lg">
                Showcasing my recent work and creative solutions for various
                clients and industries.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a
                href="/portfolio"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>View All Projects</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                </a>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => {
                const liveUrl = getUrlFromField(project.liveUrl);
                const githubUrl = getUrlFromField(project.githubUrl);
                
                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <div className="p-6">
                      <div className="mb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                            {project.title}
                          </h3>
                          {(liveUrl || githubUrl) ? (
                            <a
                              href={liveUrl || githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-purple-600 transition-colors"
                              aria-label={
                                liveUrl
                                  ? "View Live Demo"
                                  : "View GitHub Repository"
                              }
                            ></a>
                          ) : null}
                        </div>

                        {/* Quick Links */}
                        <div className="flex items-center space-x-4 mt-2">
                          {githubUrl && (
                            <a
                              href={githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-600 hover:text-gray-900 flex items-center transition-colors"
                              aria-label="View on GitHub"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.21 22 16.416 22 12.017 22 6.484 17.522 2 12 2z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Code</span>
                            </a>
                          )}
                          {liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
                              aria-label="View Live Demo"
                            >
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-purple-600 font-medium mb-4">
                        {project.category}
                      </p>
                      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                        {/* Loading state for project images */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                          <LoadingSpinner size="md" color="lime" />
                        </div>

                        {/* Project Image with lazy loading */}
                        {project.imageUrl ? (
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-opacity duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onLoad={(e) => {
                              e.currentTarget.style.opacity = "1";
                              e.currentTarget.previousElementSibling?.remove();
                            }}
                            onError={(e) => {
                              e.currentTarget.style.opacity = "0";
                              e.currentTarget.previousElementSibling?.remove();
                            }}
                            style={{ opacity: 0 }}
                          />
                        ) : (
                          <div
                            className={`w-full h-full bg-gradient-to-br ${getGradientColors(
                              project.category
                            )} flex items-center justify-center`}
                          >
                            <div className="text-center">
                              <div
                                className={`w-16 h-16 ${getIconColor(
                                  project.category
                                )} rounded-lg mx-auto mb-2`}
                              ></div>
                              <div
                                className={`${getTextColor(
                                  project.category
                                )} font-medium`}
                              >
                                {project.category === "UI/UX Design"
                                  ? "Design Mockup"
                                  : project.category === "Web Development"
                                  ? "Web Platform"
                                  : project.category === "App Design"
                                  ? "App Mockup"
                                  : "Project Mockup"}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Project description */}
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* View Details and Live Project Links */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/projects/${project.id}`}
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:underline transition-colors"
                        >
                          View Details
                        </Link>
                        <div className="flex space-x-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trusted by Brands Section - keep as before */}
      <section className="bg-lime-500 py-16 relative">
      
        <div className="absolute top-20 left-8 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-32 left-16 w-1 h-1 bg-white rounded-full opacity-40"></div>

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6">
                Trusted by Brands & Companies
              </h2>
            </div>
            <div>
              <p className="text-white/80 text-lg">
                I&apos;ve had the privilege of working with amazing companies and
                helping them achieve their design goals through innovative
                solutions and creative thinking.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Indeed Testimonial */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-gray-800">Legacy54</div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-yellow-400 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                &ldquo;Samuel brought Legacy54's vision online with creativity and precision. The site reflects our brand as a growing sports company and is already boosting our visibility. Working with him has been a game-changer.&rdquo;
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-800">Victor Olabisi</div>
                <div className="text-gray-600">Founder, Legacy54</div>
              </div>
            </div>
            {/* Zensor Testimonial */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-gray-800">JCIN UNIBEN</div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-yellow-400 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                &ldquo;Samuel excellently brought JCIN UNIBEN online for the first time. The website now gives us visibility, credibility, and a professional outlook that matches our impact. We appreciate his commitment and creativity.&rdquo;
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-800">Praise Ewere</div>
                <div className="text-gray-600">2025 President, JCIN UNIBEN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available for New Project Section */}
      <section className="bg-white py-16 relative">
        {/* Geometric patterns */}
        <div className="absolute top-20 left-8 w-2 h-2 bg-gray-400 rounded opacity-60"></div>
        <div className="absolute top-32 left-16 w-1 h-1 bg-gray-400 rounded opacity-40"></div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Available for New Project
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Ready to bring your ideas to life with innovative design
              solutions. Let&apos;s create something amazing together.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* ContactForm is currently disabled */}
            <ContactForm
              title="Let&apos;s Start Your Project"
              subtitle="Tell me about your vision and I&apos;ll help bring it to life"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center"></footer>
    </div>
  );
}