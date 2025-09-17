"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Globe,
  Code,
  Palette,
  Smartphone,
  Monitor,
  Zap,
  Users,
  Clock,
} from "lucide-react";
import LoadingSpinner from "../../../components/LoadingSpinner";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  status: "draft" | "active" | "completed";
  createdAt: string;
  updatedAt?: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setProject(data.data);
        } else {
          setError("Project not found");
        }
      } catch (error) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "UI/UX Design":
        return <Palette className="w-6 h-6" />;
      case "Web Development":
        return <Monitor className="w-6 h-6" />;
      case "App Design":
        return <Smartphone className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" color="lime" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The project you are looking for does not exist."}
          </p>
          <button
            onClick={() => router.push("/portfolio")}
            className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Project Image */}
            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 text-6xl">📁</div>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-6 right-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                  {getCategoryIcon(project.category)}
                  <span className="text-sm font-medium text-gray-700">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h1>
                  <p className="text-gray-600 text-lg">{project.description}</p>
                </div>
                <div className="flex space-x-3 ml-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors group"
                      title="View GitHub Repository"
                    >
                      <Github className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-lime-500 rounded-lg hover:bg-lime-600 transition-colors group"
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-6 h-6 text-white" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {project.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Code className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900">
                      {project.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Zap className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Technologies</p>
                    <p className="font-semibold text-gray-900">
                      {project.technologies?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-lime-100 rounded-lg">
                  <Code className="w-6 h-6 text-lime-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Technologies & Stack
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-lime-50 to-purple-50 border border-lime-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Project Links
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                        <Github className="w-8 h-8 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                          GitHub Repository
                        </h3>
                        <p className="text-gray-600">
                          View source code and documentation
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-6 border-2 border-lime-200 rounded-xl hover:border-lime-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-lime-100 rounded-lg group-hover:bg-lime-200 transition-colors">
                        <Globe className="w-8 h-8 text-lime-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                          Live Demo
                        </h3>
                        <p className="text-gray-600">
                          Visit the live application
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Project Details
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {project.description}
              </p>
              {project.updatedAt && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Last Updated:</strong>{" "}
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Back to Portfolio */}
          <div className="text-center">
            <button
              onClick={() => router.push("/portfolio")}
              className="bg-gradient-to-r from-purple-600 to-lime-500 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-lime-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
