"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, ExternalLink, Calendar, Tag } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

type Project = {
  id: number | string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string | string[];
  status: 'active' | 'completed' | 'draft';
  createdAt?: string | number | Date;
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from API
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        console.log('Projects API response:', data); // Debug log
        setProjects((data.data as Project[]) || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <>
<Head>
  <title>Portfolio - Samuel Ikhifa | Web Development & SEO Projects</title>
  <meta name="description" content="Explore the comprehensive portfolio of Samuel Ikhifa, featuring web development projects, SEO case studies, and digital solutions." />
  <meta name="keywords" content="Portfolio, Web Development, SEO Specialist, Digital Projects, Samuel Ikhifa" />
  <meta property="og:title" content="Portfolio - Samuel Ikhifa | Web Development & SEO Projects" />
  <meta property="og:description" content="Explore the comprehensive portfolio of Samuel Ikhifa, featuring web development projects, SEO case studies, and digital solutions." />
  <meta property="og:url" content="https://samuelikhifa.com/portfolio" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://samuelikhifa.com/portfolio" />
</Head>

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
                My Portfolio
              </h1>
              <p className="text-xl md:text-2xl text-lime-100 max-w-3xl mx-auto leading-relaxed">
                A collection of projects that showcase my passion for design and development
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner size="lg" color="lime" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">No projects match the selected filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    {/* Project Image */}
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative group-hover:shadow-lg transition-all duration-300"
                      aria-label={`View ${project.title} live site`}
                    >
                      {project.imageUrl ? (
                        <>
                          {/* Loading state */}
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                            <LoadingSpinner size="md" color="lime" />
                          </div>
                          
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            onLoad={(e) => {
                              e.currentTarget.style.opacity = '1';
                              e.currentTarget.previousElementSibling?.remove();
                            }}
                            onError={(e) => {
                              e.currentTarget.style.opacity = '0';
                              e.currentTarget.previousElementSibling?.remove();
                            }}
                            style={{ opacity: 0 }}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Briefcase className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </a>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-poppins text-xl font-bold text-gray-900 group-hover:text-lime-600 transition-colors">
                          {project.title}
                        </h3>
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-lime-600 transition-colors"
                          aria-label={`View ${project.title} live site`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{project.category}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.createdAt ? new Date(project.createdAt).getFullYear() : ""}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/projects/${project.id}`}
                          className="text-lime-600 hover:text-lime-700 font-medium text-sm group-hover:underline transition-colors"
                        >
                          View Details
                        </Link>
                        <div className="flex space-x-4">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                              aria-label="View on GitHub"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.21 22 16.416 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                              aria-label="View Live Demo"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              <span>Live</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}