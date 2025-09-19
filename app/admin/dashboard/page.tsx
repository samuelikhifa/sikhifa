'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardData {
  totalProjects: number;
  happyClients: number;
  recentActivity: Array<{
    id: number;
    action: string;
    timestamp: string;
  }>;
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
    conversionRate: number;
  };
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string;
  status: 'active' | 'completed' | 'draft';
  createdAt: string;
}

type AdminUser = {
  email: string;
  role: 'admin' | string;
};

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectLoading, setProjectLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/verify', { credentials: 'include' });
      const data = await response.json();

      if (data.authenticated) {
        setUser(data.user as AdminUser);
        fetchDashboardData();
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    }
  }, [activeTab]);

  

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', { credentials: 'include' });
      const data = await response.json();

      if (data.success) {
        setDashboardData(data.data);
      } else {
        console.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects', { credentials: 'include' });
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Projects fetch error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please select a JPEG, PNG, or WebP image.');
        event.target.value = '';
        return;
      }

      // Validate file size (10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('File size too large. Please select an image smaller than 10MB.');
        event.target.value = '';
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!selectedImage) {
      return '';
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.message);
      }
    } catch (error: unknown) {
      console.error('Image upload error:', error);
      const errorMessage = (error as { message?: string })?.message || 'Failed to upload image. Please try again.';
      alert(errorMessage);
      return '';
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddProject = async (project: Omit<Project, 'id' | 'createdAt'>) => {
    setProjectLoading(true);
    try {
      // Upload image first if selected
      let imageUrl = project.imageUrl;
      if (selectedImage) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          setProjectLoading(false);
          return;
        }
      }

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...project,
          imageUrl
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProjects([...projects, data.data]);
        setShowAddProject(false);
        // Reset form
        setSelectedImage(null);
        setImagePreview('');
      } else {
        alert('Failed to add project: ' + data.message);
      }
    } catch (error) {
      console.error('Add project error:', error);
      alert('Failed to add project');
    } finally {
      setProjectLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setImagePreview(project.imageUrl);
    setSelectedImage(null);
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    setProjectLoading(true);
    try {
      // Upload image first if selected
      let imageUrl = updatedProject.imageUrl;
      if (selectedImage) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          setProjectLoading(false);
          return;
        }
      }

      const response = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...updatedProject,
          imageUrl
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProjects(projects.map(p => p.id === updatedProject.id ? data.data : p));
        setEditingProject(null);
        // Reset form
        setSelectedImage(null);
        setImagePreview('');
      } else {
        alert('Failed to update project: ' + data.message);
      }
    } catch (error) {
      console.error('Update project error:', error);
      alert('Failed to update project');
    } finally {
      setProjectLoading(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjectLoading(true);
      try {
        const response = await fetch(`/api/admin/projects?id=${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        const data = await response.json();

        if (data.success) {
          setProjects(projects.filter(p => p.id !== id));
        } else {
          alert('Failed to delete project: ' + data.message);
        }
      } catch (error) {
        console.error('Delete project error:', error);
        alert('Failed to delete project');
      } finally {
        setProjectLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Private Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-lime-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R2</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
              </div>
              
              {/* Navigation Tabs */}
              <div className="hidden md:flex space-x-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'projects'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Projects
                </button>
                <Link
                  href="/admin/messages"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'messages'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Messages
                </Link>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'analytics'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  View Portfolio
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && dashboardData && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-lime-500 to-purple-600 rounded-2xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.email}!</h1>
              <p className="text-lime-100">Here&apos;s what&apos;s happening with your portfolio today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-lime-100 rounded-xl">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.totalProjects}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <span className="text-2xl">😊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Happy Clients</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.happyClients}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Page Views</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.analytics.pageViews}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Projects Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
                <p className="text-gray-600">Manage your portfolio projects</p>
              </div>
              <button
                onClick={() => setShowAddProject(true)}
                disabled={projectLoading}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <span>+</span>
                <span>Add Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow group">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group-hover:opacity-90 transition-opacity relative"
                  >
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={false}
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </a>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
                      >
                        {project.title}
                      </a>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-purple-600 font-medium mb-2">{project.category}</p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                    
                    {/* Technologies */}
                    {project.technologies && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Technologies:</p>
                        <p className="text-xs text-gray-700">{project.technologies}</p>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex space-x-4 mb-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.21 22 16.416 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{project.createdAt}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          disabled={projectLoading}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          disabled={projectLoading}
                          className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📁</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first project</p>
                <button
                  onClick={() => setShowAddProject(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Add Your First Project
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && dashboardData && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600">Detailed portfolio performance metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Visitor Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Unique Visitors</span>
                    <span className="font-semibold">{dashboardData.analytics.uniqueVisitors}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-semibold">{dashboardData.analytics.conversionRate}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Projects</span>
                    <span className="font-semibold">{dashboardData.totalProjects}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Happy Clients</span>
                    <span className="font-semibold">{dashboardData.happyClients}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Project</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddProject({
                title: formData.get('title') as string,
                category: formData.get('category') as string,
                description: formData.get('description') as string,
                githubUrl: formData.get('githubUrl') as string,
                liveUrl: formData.get('liveUrl') as string,
                technologies: formData.get('technologies') as string,
                imageUrl: '',
                status: formData.get('status') as 'active' | 'completed' | 'draft'
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Design">App Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    placeholder="https://your-project.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                  <input
                    type="text"
                    name="technologies"
                    placeholder="React, Node.js, MongoDB, Tailwind CSS"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max size: 10MB. Supported: JPEG, PNG, WebP</p>
                </div>
                {imagePreview && (
                  <div className="mt-2 relative h-32">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-lg border"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  disabled={projectLoading || uploadingImage}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {projectLoading || uploadingImage ? 'Processing...' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProject(false);
                    setSelectedImage(null);
                    setImagePreview('');
                  }}
                  disabled={projectLoading || uploadingImage}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Project</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUpdateProject({
                ...editingProject,
                title: formData.get('title') as string,
                category: formData.get('category') as string,
                description: formData.get('description') as string,
                githubUrl: formData.get('githubUrl') as string,
                liveUrl: formData.get('liveUrl') as string,
                technologies: formData.get('technologies') as string,
                status: formData.get('status') as 'active' | 'completed' | 'draft'
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingProject.title}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingProject.category}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Design">App Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingProject.description}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    defaultValue={editingProject.githubUrl}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    defaultValue={editingProject.liveUrl}
                    placeholder="https://your-project.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                  <input
                    type="text"
                    name="technologies"
                    defaultValue={editingProject.technologies}
                    placeholder="React, Node.js, MongoDB, Tailwind CSS"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max size: 10MB. Supported: JPEG, PNG, WebP</p>
                </div>
                {imagePreview && (
                  <div className="mt-2 relative h-32">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-lg border"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingProject.status}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  disabled={projectLoading || uploadingImage}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {projectLoading || uploadingImage ? 'Processing...' : 'Update Project'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    setSelectedImage(null);
                    setImagePreview('');
                  }}
                  disabled={projectLoading || uploadingImage}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}