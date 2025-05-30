import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { TemplateSelector } from './components/TemplateSelector';

export interface BrochureElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'circle' | 'logo' | 'icon' | 'line' | 'arrow';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  src?: string;
  rotation?: number;
  style?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    opacity?: number;
    textAlign?: 'left' | 'center' | 'right';
    strokeColor?: string;
    strokeWidth?: number;
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
  };
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  elements: BrochureElement[];
}

export interface PageSize {
  width: number;
  height: number;
  name: string;
}

export const PAGE_SIZES: PageSize[] = [
  { width: 595, height: 842, name: 'A4 Portrait' },
  { width: 842, height: 595, name: 'A4 Landscape' },
  { width: 612, height: 792, name: 'Letter Portrait' },
  { width: 792, height: 612, name: 'Letter Landscape' },
  { width: 1200, height: 800, name: 'Presentation' },
  { width: 800, height: 1200, name: 'Social Media Post' },
  { width: 1920, height: 1080, name: 'HD Landscape' },
  { width: 1080, height: 1080, name: 'Square' },
];

function App() {
  const [elements, setElements] = useState<BrochureElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(true);
  const [pageSize, setPageSize] = useState<PageSize>(PAGE_SIZES[0]);

  const addElement = (element: Omit<BrochureElement, 'id'>) => {
    const newElement: BrochureElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setElements(prev => [...prev, newElement]);
  };

  const updateElement = (id: string, updates: Partial<BrochureElement>) => {
    setElements(prev => 
      prev.map(el => el.id === id ? { ...el, ...updates } : el)
    );
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const loadTemplate = (template: Template) => {
    setElements(template.elements);
    setShowTemplates(false);
  };

  const clearCanvas = () => {
    setElements([]);
    setSelectedElement(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {showTemplates && (
          <TemplateSelector 
            onSelectTemplate={loadTemplate}
            onClose={() => setShowTemplates(false)}
          />
        )}
        
        <Toolbar 
          onClear={clearCanvas}
          onShowTemplates={() => setShowTemplates(true)}
          elements={elements}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        
        <div className="flex-1 flex overflow-hidden min-h-0">
          <Sidebar 
            onAddElement={addElement}
            selectedElement={selectedElement ? elements.find(el => el.id === selectedElement) || null : null}
            onUpdateElement={updateElement}
          />
          
          <div className="flex-1 p-4">
            <Canvas
              elements={elements}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
              onAddElement={addElement}
              pageSize={pageSize}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
