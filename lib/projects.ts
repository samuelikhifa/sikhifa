import { PersistentStorage } from "./storage";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  status: "draft" | "active" | "completed";
  createdAt?: string;
  updatedAt?: string;
}

// Default projects data
const defaultProjects: Project[] = [
  {
    id: 1,
    title: "JCIN UNIBEN",
    category: "Web Development",
    description: "",
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1/portfolio-projects/sample-project-1",
    githubUrl: "https://github.com/r2ruman/recent-experience",
    liveUrl: "https://www.jcinuniben.com/",
    technologies: ["Vite", "TypeScript", "Tailwind CSS", "Figma", "SEO"],
    status: "active",
    // createdAt: "2025-01-15"
  },
  {
    id: 2,
    title: "Legacy54",
    category: "Frontend Developer & SEO Specialist",
    description:
      "Building and optimizing Legacy54’s sports platform with a focus on responsive web development and SEO best practices, ensuring speed, performance, and discoverability while delivering a smooth user experience.",
    imageUrl:
      "https://res.cloudinary.com/demo/image/upload/v1/portfolio-projects/sample-project-2",
    githubUrl: "https://github.com/samuelikhifa/legae.git",
    liveUrl: "https://www.legacy54.com/",
    technologies: [
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Google Analytics",
      "SEO",
    ],
    status: "completed",
    // createdAt: "2025-09-08"
  },
  {
    id: 3,
    title: "TOYP UNIBEN",
    category: "Web Development",
    description:
      "Designed and built the TOYP UNIBEN website with a clean, responsive layout, consistent branding, and smooth navigation to showcase outstanding young achievers.",
    imageUrl: "/projects/toyp-uniben.png", // place your image in public/projects/ or import it
    githubUrl: "https://github.com/samuelikhifa/toyp-uniben", // replace with your real repo if available
    liveUrl: "https://toypuniben.com", // replace with actual live link
    technologies: ["HTML", "CSS", "JavaScript"],
    status: "active",
    // createdAt: "2025-04-14"
  },

  {
    id: 4,
    title: "TrashPoint Africa",
    category: "Web Development",
    description:
      "Led a team to build a recycling web app that incentivizes users to recycle waste for rewards. Delivered the MVP in 3 months, driving 500+ user sign-ups in the first month.",
    imageUrl: "/projects/trashpoint-africa.png", // replace with your actual image path
    githubUrl: "https://github.com/samuelikhifa/trashpoint-africa",
    liveUrl: "https://trashpoint.africa/",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Team Leadership",
    ],
    status: "active",
    // createdAt: "2025-01-10"
  },

  // {
  //   id: 5,
  //   title: "Restaurant Management System",
  //   category: "Web Development",
  //   description: "Complete restaurant management solution with ordering and inventory",
  //   imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/portfolio-projects/sample-project-5",
  //   githubUrl: "https://github.com/r2ruman/restaurant-system",
  //   liveUrl: "https://restaurant.demo.com",
  //   technologies: ["Vue.js", "Laravel", "MySQL"],
  //   status: "completed",
  //   createdAt: "2024-01-12"
  // }
];

// Persistent storage instance
const storage = new PersistentStorage<Project>("projects", defaultProjects);

export const projectStore = {
  // Get all projects
  getAll: () => {
    return storage.getAll();
  },

  // Get projects with filters
  getFiltered: (filters?: {
    status?: string;
    limit?: number;
    category?: string;
  }) => {
    let filtered = storage.getAll();

    if (filters?.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    if (filters?.category && filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Sort by creation date (newest first)
    // filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  },

  // Get project by ID
  getById: (id: number) => {
    return storage.getById(id);
  },

  // Create new project
  create: (project: Omit<Project, 'id'>) => {
    const newProject: Omit<Project, 'id'> = {
      ...project,
      createdAt: (project as Project).createdAt || new Date().toISOString(),
    };
    return storage.create(newProject);
  },

  // Update project
  update: (id: number, updates: Partial<Project>) => {
    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    return storage.update(id, updatedData);
  },

  // Delete project
  delete: (id: number) => {
    return storage.delete(id);
  },

  // Get project categories
  getCategories: () => {
    const projects = storage.getAll();
    const categories = [...new Set(projects.map((p) => p.category))];
    return categories;
  },
};
