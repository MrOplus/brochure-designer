# Brochure Creation Tool

A modern, intuitive brochure creation tool built with React, TypeScript, and Vite. Create beautiful brochures with drag-and-drop functionality, customizable elements, and professional templates.

![Brochure Creator](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Brochure+Creation+Tool)

## ✨ Features

- **Drag & Drop Interface**: Intuitive element placement with visual feedback
- **Professional Templates**: Pre-designed templates for various industries
- **Customizable Elements**: Text, images, shapes with full styling control
- **Real-time Editing**: Live preview with instant property changes
- **Export Options**: Export to PDF or save as JSON for later editing
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Keyboard Shortcuts**: Delete elements with Del key, deselect with Esc

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brochure-creation-tool
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

## 🛠️ Built With

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React DnD** - Drag and Drop
- **Lucide React** - Icons
- **jsPDF** - PDF Export
- **html2canvas** - Canvas to Image

## 📋 Usage

### Creating a Brochure

1. **Choose a Template**: Start with a professional template or begin with a blank canvas
2. **Add Elements**: Drag text, images, or shapes from the sidebar onto the canvas
3. **Customize**: Select elements to modify their properties in the sidebar
4. **Export**: Save your work as PDF or export the design as JSON

### Element Types

- **Text**: Customizable font size, color, family, and content
- **Images**: Support for external URLs with adjustable dimensions
- **Shapes**: Colored rectangles with customizable background and border radius

### Keyboard Shortcuts

- `Delete` - Remove selected element
- `Escape` - Deselect current element

## 🎨 Templates

The tool includes several pre-designed templates:

- **Modern Business** - Professional corporate design
- **Creative Portfolio** - Artistic and colorful layout
- **Event Promotion** - Eye-catching event announcements

## 📁 Project Structure

```
src/
├── components/
│   ├── Canvas.tsx          # Main canvas component with drag/drop
│   ├── Sidebar.tsx         # Element library and properties panel
│   ├── Toolbar.tsx         # Top toolbar with actions
│   └── TemplateSelector.tsx # Template selection modal
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css            # Global styles
```

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and building. Configuration is in `vite.config.ts`.

### TypeScript
TypeScript configuration is in `tsconfig.json` with strict mode enabled for better code quality.

### Tailwind CSS
Styling is handled by Tailwind CSS with custom configuration in `tailwind.config.js`.

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- [ ] More element types (charts, icons, QR codes)
- [ ] Advanced image editing tools
- [ ] Collaboration features
- [ ] More export formats (PNG, SVG)
- [ ] Template marketplace
- [ ] Mobile app version
- [ ] Cloud storage integration

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

Made with ❤️ by the Development Team
