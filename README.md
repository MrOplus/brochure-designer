# Brochure Creation Tool

A modern, intuitive brochure creation tool built with React, TypeScript, and Vite. Create beautiful brochures with drag-and-drop functionality, customizable elements, and professional templates.

## ✨ Features

- **Drag & Drop Interface**: Intuitive element placement with visual feedback
- **Professional Templates**: Pre-designed templates for various industries
- **Multiple Element Types**: Text, images, shapes, circles, lines, arrows, and icons
- **Local Image Upload**: Upload and use your own images
- **Page Size Customization**: 8 preset page sizes (A4, Letter, Presentation, etc.)
- **Advanced Styling**: Rotation, borders, shadows, text alignment controls
- **Real-time Editing**: Live preview with instant property changes
- **Export Options**: Export to PDF or save as JSON for later editing
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Smooth Performance**: Optimized resizing and drag operations

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrOplus/brochure-designer.git
   cd brochure-designer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start creating brochures!

### GitHub Pages Deployment

This project includes automatic deployment to GitHub Pages via GitHub Actions.

1. **Push to main/master branch** - The workflow automatically triggers
2. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Select "GitHub Actions" as the source
3. **Access your deployed app** at `https://MrOplus.github.io/brochure-designer/`

#### Manual Deployment

```bash
# Build for GitHub Pages
npm run build:github

# Or build with custom base path
VITE_BASE_PATH=/brochure-designer/ npm run build
```

## 🛠️ Built With

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-first Styling
- **React DnD** - Drag and Drop Functionality
- **Lucide React** - Beautiful Icons
- **jsPDF** - PDF Export Capability
- **html2canvas** - Canvas to Image Conversion

## 📋 Usage

### Creating Elements
1. **Drag elements** from the sidebar to the canvas
2. **Click to select** and edit element properties
3. **Use resize handles** to adjust size and position
4. **Delete elements** with the Delete key

### Templates
- Choose from 3 professional templates
- Templates include business, creative, and minimal designs
- All elements remain fully customizable after applying

### Export Options
- **PDF Export**: High-quality PDF with proper page sizing
- **JSON Export**: Save your design for later editing
- **Import**: Load previously saved JSON designs

### Page Sizes
Choose from 8 preset page sizes:
- A4 Portrait/Landscape
- US Letter
- Presentation (16:9)
- Social Media Square/Story
- Business Card

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:github` - Build for GitHub Pages
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── Canvas.tsx      # Main canvas with drag/drop
│   ├── Sidebar.tsx     # Element library & properties
│   ├── Toolbar.tsx     # Export, import, templates
│   └── TemplateSelector.tsx
├── lib/                # Utility functions
├── App.tsx            # Main application
└── main.tsx           # Entry point
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment Status

[![Deploy to GitHub Pages](https://github.com/MrOplus/brochure-designer/actions/workflows/deploy.yml/badge.svg)](https://github.com/MrOplus/brochure-designer/actions/workflows/deploy.yml)

---

**Live Demo**: [https://MrOplus.github.io/brochure-designer/](https://MrOplus.github.io/brochure-designer/)
