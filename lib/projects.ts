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
    title: "Legacy54",
    category: "Web Development & SEO Specialist",
    description:
      "Legacy54 Sports is a startup brand expanding across Africa and needed a strong digital footprint to match its growth ambitions. The goal was to create an online presence that would not only showcase the brand but also attract visibility through search engines. I designed and developed a modern website from scratch with a focus on speed, responsiveness, and user-friendly navigation. Alongside the build, I implemented a structured SEO strategy that improved visibility by about fifty percent. To ensure growth could be monitored effectively, I integrated Google Analytics, giving the team real-time insights into user behavior and site performance. The result was a professional and scalable website that positioned Legacy54 Sports as a credible and fast-growing brand. With stronger visibility and the right tools in place, the organization is now better equipped to expand its influence, engage communities, and attract new partners across Africa.",
    imageUrl:
      "/images/lega.jpg",
    githubUrl: "https://github.com/samuelikhifa/legae.git",
    liveUrl: "https://www.legacy54.com/",
    technologies: [
      "Vite",
      "Figma",
      "TypeScript",
      "Tailwind CSS",
      "Google Analytics",
      "SEO",
    ],
    status: "completed",
    // createdAt: "2025-09-08"
  },

    {
    id: 2,
    title: "OSA Heritage Homes",
    category: "Web Development",
    description: "OSA Heritage Homes is a responsive website for a Texas-based senior care facility, designed to provide families and residents with comprehensive information about assisted living, memory care, and related services. The platform highlights the organization’s values, services, testimonials, and locations, while emphasizing accessibility, trust, and a compassionate care approach. The project involved designing a user-friendly interface, integrating interactive sections for services and testimonials, and ensuring a seamless browsing experience across devices.",
    imageUrl:
      "/images/osa.jpg",
    githubUrl: "https://github.com/samuelikhifa/osaheristage.git",
    liveUrl: "https://www.osaheritage.com/",
    technologies: ["Vite", "TypeScript", "Tailwind CSS", "Figma", "SEO"],
    status: "active",
    // createdAt: "2025-01-15"
  },

  {
    id: 3,
    title: "OBEL – Osayanyobo Brothers Enterprises Limited",
    category: "Web Development",
    description: "OBEL is a corporate website developed for Osayanyobo Brothers Enterprises Limited, an industrial services company operating across Nigeria and the United States. The platform presents OBEL’s expertise in mechanical construction, electrical installations, pipeline construction, facility maintenance, and procurement services. The website was designed to communicate trust, scale, and professionalism while guiding visitors through services, project processes, testimonials, and contact channels. Emphasis was placed on clarity, performance, and responsiveness for industrial and corporate audiences.",
    imageUrl:
      "/images/obel.jpg",
    githubUrl: "https://github.com/samuelikhifa/obel.git",
    liveUrl: "https://www.osayanyoboltd.com/",
    technologies: ["Vite", "TypeScript", "Tailwind CSS", "Figma", "SEO"],
    status: "active",
    // createdAt: "2025-01-15"
  },
    {
    id: 4,
    title: "GVANY Sales & Distribution Company Limited",
    category: "Web Development",
    description: "GVANY Sales & Distribution Company Limited is a Pan-African business website developed to showcase the company’s operations in marketing, distribution, logistics, real estate, and consultancy services across Africa. The platform highlights GVANY’s mission, vision, regional presence, and diverse service offerings, while positioning the brand as a reliable partner for businesses operating within African markets. The website focuses on clear information architecture, responsive design, and strong corporate branding to support credibility and growth.",
    imageUrl:
      "/images/gvany.jpg",
    githubUrl: "https://github.com/samuelikhifa/gvany.git",
    liveUrl: "https://www.gvany.com/",
    technologies: ["Vite", "TypeScript", "Tailwind CSS", "Figma", "SEO"],
    status: "active",
    // createdAt: "2025-01-15"
  },
      {
    id: 5,
    title: "Dr. Christos Etoka – Personal Brand & Mind Engineering Platform",
    category: "Web Development",
    description: "A personal brand and program-based website developed for Dr. Christos Etoka, an educator, psychologist, and thought leader in Mind Engineering and human capacity development. The platform showcases his philosophy, mentoring programs, executive retreats, books, testimonials, and consultation services. The website was designed to communicate authority, inspiration, and trust while guiding users toward engagement through bookings, subscriptions, and program enrollment. Strong emphasis was placed on storytelling, clarity, and responsive user experience.",
    imageUrl:
      "/images/chris.jpg",
    githubUrl: "https://github.com/samuelikhifa/christos.git",
    liveUrl: "https://drchristos.xmindengineering.org",
    technologies: ["Vite", "TypeScript", "Tailwind CSS", "Figma", "SEO"],
    status: "active",
    // createdAt: "2025-01-15"
  },
        {
    id: 6,
    title: "TPN School – Learning & Employment Platform",
    category: "Web Development",
    description: "TPN School is an ed-tech platform designed to help learners acquire in-demand skills and connect with employment opportunities in one place. The website features structured courses across multiple disciplines, instructor onboarding, and employer access to verified, job-ready talent. The platform was built with a focus on usability, scalability, and clear learning-to-employment pathways, ensuring a smooth experience for students, instructors, and employers.",
    imageUrl:
      "/images/tpn.jpg",
    githubUrl: "https://github.com/samuelikhifa/tpn.git",
    liveUrl: "https://tpnschool.com/home",
    technologies: ["Vite", "TypeScript", "Tailwind CSS", "Figma", "SEO"],
    status: "active",
    // createdAt: "2025-01-15"
  },
  {
    id: 7,
    title: "TOYP UNIBEN",
    category: "Web Development",
    description:
      "TOYP UNIBEN (The Outstanding Young Persons Award) is an initiative by JCI UNIBEN that celebrates and recognizes young achievers across the University of Benin. For over a year, the award process relied heavily on Google Docs for nominations, which limited accessibility, reduced visibility, and created gaps in awareness among students. To address these challenges, I developed a dedicated website that reshaped the way the award was presented and managed. The new platform provided a centralized space for nominations, information about the award, and consistent updates. Designed with a clean and responsive interface, the website also reflected the values and credibility of JCI UNIBEN, making the award more visible and engaging to the student community. The impact of this transformation was immediate. The website not only streamlined the nomination process but also amplified the recognition of TOYP UNIBEN across campus. With improved accessibility and stronger digital presence, the award has become more widely known, well-regarded, and positioned as one of the most prestigious recognitions within the University of Benin.",
    imageUrl: "/images/toyp.jpg",
    githubUrl: "https://github.com/samuelikhifa/JCIN-UNIBEN-TOYP25.git", 
    liveUrl: "https://toyp.jcinuniben.com/", 
    technologies: ["HTML", "CSS", "JavaScript", "Figma"],
    status: "completed",
    // createdAt: "2025-04-14"
  },

    {
    id: 8,
    title: "JCIN UNIBEN",
    category: "Web Development",
    description: "Before this project, JCIN UNIBEN had no website or online presence. Everything about the organization, including its mission, activities, and registration, was only available through social media or offline events. This limited visibility and made it difficult for students and potential partners to easily connect with the organization.The goal of the project was to create a modern and responsive website that improves credibility, makes information easy to access, and positions JCIN UNIBEN as a professional and impactful organization within the university and beyond. The site was designed to reflect the brand identity of JCIN UNIBEN, with simple navigation and a layout that communicates clearly to students, partners, and stakeholders.The process began with planning and wireframing, followed by building the main pages such as Home, About, Registration, and Contact. Development is ongoing, with efforts focused on ensuring the design is clean, responsive, and engaging. The website is also being prepared for SEO optimization and traffic tracking to grow visibility and reachSo far, the results have been significant. JCIN UNIBEN has moved from having no digital footprint to owning a dedicated website that is accessible globally. The organization now has a professional online presence that goes beyond social media, giving it credibility and opening new opportunities for engagement. Students and stakeholders can now easily learn about the organization and connect with its programs. The next steps will include adding more content, such as blogs, event highlights, and a registration portal, as well as introducing SEO strategies to make the site more discoverable. Continuous updates will ensure the platform grows with the organization’s activities and impact.",
    imageUrl:
      "/images/jc.jpg",
    githubUrl: "https://github.com/samuelikhifa/jcinnuniben.git",
    liveUrl: "https://www.jcinuniben.com/",
    technologies: ["Vite", "TypeScript", "Tailwind CSS", "Figma", "SEO"],
    status: "active",
    // createdAt: "2025-01-15"
  },

  {
    id: 9,
    title: "My portfolio",
    category: "Web Development",
    description:
      "My portfolio website was created as a platform to showcase my skills in frontend development, SEO, and UI/UX design. The goal was to build more than just a personal site — it had to reflect my ability to design clean interfaces, structure content for visibility, and deliver fast, responsive performance across all devices. The site was built with attention to detail in both design and functionality. From a UI/UX perspective, I focused on creating smooth navigation, clear project highlights, and responsive layouts that adapt to any screen size. On the frontend side, I applied best practices for performance, ensuring quick load times and seamless user interactions. To complement this, I implemented SEO strategies that make the site discoverable and well-positioned on search engines. The result is a professional, modern portfolio that not only presents my work but also demonstrates the very skills I offer. It serves as proof of my ability to design, build, and optimize digital products that balance aesthetics, usability, and visibility.",
    imageUrl: "/images/zul.jpg",
    githubUrl: "https://github.com/samuelikhifa/sikhifa.git",
    liveUrl: "https://sikhifa.vercel.app/",
    technologies: [
      "Next",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "Google Analytics",
      "SEO",
      
   
    ],
    status: "completed",
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
