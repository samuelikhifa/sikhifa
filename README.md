# R2 Ruman - UI/UX Designer Portfolio

A modern, responsive portfolio website built with Next.js and Tailwind CSS that showcases the work and expertise of R2 Ruman, a passionate UI/UX designer from Bangladesh.

## Features

- **Modern Design**: Clean, vibrant design with lime green, purple, and white color scheme
- **Responsive Layout**: Fully responsive design that works on all devices
- **Professional Presentation**: Showcases UI/UX skills with dedicated sections
- **Interactive Elements**: Hover effects and smooth transitions
- **Geometric Patterns**: Subtle design elements that add visual interest

## Design Elements

### Color Palette
- **Lime Green**: Primary background color for header and hero sections
- **Deep Purple**: Used for buttons and accent elements
- **White**: Clean background for content sections
- **Yellow**: Accent color for speech bubbles and highlights

### Typography
- **Poppins**: Used for headings and main text
- **Inter**: Used for body text and navigation

### Sections
1. **Header/Navigation**: Clean navigation with logo and contact button
2. **Hero Section**: Professional headshot with introduction and CTA
3. **Skills Section**: UI/UX expertise showcase
4. **Services Section**: Service offerings with geometric icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-por
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
my-por/
├── app/
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── page.tsx        # Main portfolio page
│   └── globals.css     # Global styles and Tailwind imports
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## Technologies Used

- **Next.js 15**: React framework for production
- **Tailwind CSS 4**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **React 19**: Latest React features

## Customization

### Colors
Update the CSS custom properties in `globals.css` to change the color scheme:

```css
:root {
  --lime-green: #32CD32;
  --deep-purple: #4A148C;
  --light-purple: #7B68EE;
  --yellow: #FFD700;
}
```

### Content
Modify the content in `page.tsx` to personalize:
- Update personal information
- Change skills and services
- Replace placeholder image with actual headshot
- Customize navigation links

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This project is open source and available under the [MIT License](LICENSE).
