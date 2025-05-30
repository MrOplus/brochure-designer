import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Type, Image, Square, Circle, Star, Upload, ArrowRight, Minus } from 'lucide-react';
import { BrochureElement } from '../App';

interface SidebarProps {
  onAddElement: (element: Omit<BrochureElement, 'id'>) => void;
  selectedElement: BrochureElement | null;
  onUpdateElement: (id: string, updates: Partial<BrochureElement>) => void;
}

interface DraggableElementProps {
  type: 'text' | 'image' | 'shape' | 'circle' | 'icon' | 'line' | 'arrow';
  icon: React.ReactNode;
  label: string;
  onAddElement: (element: Omit<BrochureElement, 'id'>) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, icon, label, onAddElement }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ x: number; y: number }>();
      if (item && dropResult) {
        const baseElement = {
          type: item.type as 'text' | 'image' | 'shape' | 'circle' | 'icon' | 'line' | 'arrow',
          x: dropResult.x,
          y: dropResult.y,
          width: type === 'text' ? 200 : type === 'line' ? 150 : type === 'arrow' ? 120 : 100,
          height: type === 'text' ? 40 : type === 'line' ? 4 : type === 'arrow' ? 40 : 100,
        };

        if (type === 'text') {
          onAddElement({
            ...baseElement,
            content: 'Click to edit text',
            style: {
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: 'normal',
              color: '#000000',
              textAlign: 'left',
            },
          });
        } else if (type === 'shape') {
          onAddElement({
            ...baseElement,
            style: {
              backgroundColor: '#3b82f6',
              borderRadius: 8,
              borderWidth: 0,
              borderColor: '#000000',
            },
          });
        } else if (type === 'circle') {
          onAddElement({
            ...baseElement,
            style: {
              backgroundColor: '#10b981',
              borderRadius: 50,
              borderWidth: 0,
              borderColor: '#000000',
            },
          });
        } else if (type === 'line') {
          onAddElement({
            ...baseElement,
            style: {
              backgroundColor: '#374151',
              borderRadius: 0,
            },
          });
        } else if (type === 'arrow') {
          onAddElement({
            ...baseElement,
            content: '→',
            style: {
              fontSize: 24,
              color: '#374151',
              textAlign: 'center',
            },
          });
        } else if (type === 'icon') {
          onAddElement({
            ...baseElement,
            content: '★',
            style: {
              fontSize: 32,
              color: '#f59e0b',
              textAlign: 'center',
            },
          });
        } else {
          onAddElement({
            ...baseElement,
            src: 'https://via.placeholder.com/100x100/e5e7eb/6b7280?text=Image',
          });
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`element-item ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ onAddElement, selectedElement, onUpdateElement }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onAddElement({
          type: 'image',
          x: 100,
          y: 100,
          width: 200,
          height: 150,
          src: result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Elements</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          <DraggableElement
            type="text"
            icon={<Type className="w-5 h-5 text-blue-600" />}
            label="Text"
            onAddElement={onAddElement}
          />
          <DraggableElement
            type="image"
            icon={<Image className="w-5 h-5 text-green-600" />}
          label="Image"
          onAddElement={onAddElement}
        />
        
        {/* Local Image Upload */}
        <div className="element-item" onClick={triggerImageUpload}>
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Upload Image</span>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        <DraggableElement
          type="shape"
          icon={<Square className="w-5 h-5 text-purple-600" />}
          label="Rectangle"
          onAddElement={onAddElement}
        />
        <DraggableElement
          type="circle"
          icon={<Circle className="w-5 h-5 text-pink-600" />}
          label="Circle"
          onAddElement={onAddElement}
        />
        <DraggableElement
          type="line"
          icon={<Minus className="w-5 h-5 text-gray-600" />}
          label="Line"
          onAddElement={onAddElement}
        />
        <DraggableElement
          type="arrow"
          icon={<ArrowRight className="w-5 h-5 text-orange-600" />}
          label="Arrow"
          onAddElement={onAddElement}
        />
        <DraggableElement
          type="icon"
          icon={<Star className="w-5 h-5 text-yellow-600" />}
          label="Icon/Symbol"
          onAddElement={onAddElement}
        />
        </div>
      </div>

      {selectedElement && (
        <div className="border-t border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-md font-semibold text-gray-900 mb-3">Properties</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">X</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.x)}
                    onChange={(e) => onUpdateElement(selectedElement.id, { x: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Y</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.y)}
                    onChange={(e) => onUpdateElement(selectedElement.id, { y: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">Width</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.width)}
                    onChange={(e) => onUpdateElement(selectedElement.id, { width: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Height</label>
                  <input
                    type="number"
                    value={Math.round(selectedElement.height)}
                    onChange={(e) => onUpdateElement(selectedElement.id, { height: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>

            {selectedElement.type === 'text' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Content
                  </label>
                  <textarea
                    value={selectedElement.content || ''}
                    onChange={(e) => onUpdateElement(selectedElement.id, { content: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Size
                  </label>
                  <input
                    type="number"
                    value={selectedElement.style?.fontSize || 16}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, fontSize: parseInt(e.target.value) || 16 }
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    min="8"
                    max="72"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={selectedElement.style?.color || '#000000'}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, color: e.target.value }
                    })}
                    className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </>
            )}

            {selectedElement.type === 'shape' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={selectedElement.style?.backgroundColor || '#3b82f6'}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, backgroundColor: e.target.value }
                    })}
                    className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Border Radius
                  </label>
                  <input
                    type="number"
                    value={selectedElement.style?.borderRadius || 0}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, borderRadius: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    min="0"
                    max="50"
                  />
                </div>
              </>
            )}

            {/* Circle element properties */}
            {selectedElement.type === 'circle' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fill Color
                  </label>
                  <input
                    type="color"
                    value={selectedElement.style?.backgroundColor || '#10b981'}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, backgroundColor: e.target.value }
                    })}
                    className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Border Width
                  </label>
                  <input
                    type="number"
                    value={selectedElement.style?.borderWidth || 0}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, borderWidth: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    min="0"
                    max="20"
                  />
                </div>
                
                {(selectedElement.style?.borderWidth || 0) > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Border Color
                    </label>
                    <input
                      type="color"
                      value={selectedElement.style?.borderColor || '#000000'}
                      onChange={(e) => onUpdateElement(selectedElement.id, { 
                        style: { ...selectedElement.style, borderColor: e.target.value }
                      })}
                      className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                )}
              </>
            )}

            {/* Line element properties */}
            {selectedElement.type === 'line' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Line Color
                </label>
                <input
                  type="color"
                  value={selectedElement.style?.backgroundColor || '#374151'}
                  onChange={(e) => onUpdateElement(selectedElement.id, { 
                    style: { ...selectedElement.style, backgroundColor: e.target.value }
                  })}
                  className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            )}

            {/* Arrow and Icon element properties */}
            {(selectedElement.type === 'arrow' || selectedElement.type === 'icon') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symbol
                  </label>
                  <input
                    type="text"
                    value={selectedElement.content || ''}
                    onChange={(e) => onUpdateElement(selectedElement.id, { content: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    placeholder="Enter symbol or emoji"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Size
                  </label>
                  <input
                    type="number"
                    value={selectedElement.style?.fontSize || 24}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, fontSize: parseInt(e.target.value) || 24 }
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    min="8"
                    max="120"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="color"
                    value={selectedElement.style?.color || '#374151'}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, color: e.target.value }
                    })}
                    className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </>
            )}

            {/* Enhanced text properties */}
            {selectedElement.type === 'text' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Weight
                  </label>
                  <select
                    value={selectedElement.style?.fontWeight || 'normal'}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, fontWeight: e.target.value }
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="lighter">Light</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Align
                  </label>
                  <select
                    value={selectedElement.style?.textAlign || 'left'}
                    onChange={(e) => onUpdateElement(selectedElement.id, { 
                      style: { ...selectedElement.style, textAlign: e.target.value as 'left' | 'center' | 'right' }
                    })}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </>
            )}

            {/* General properties for all elements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rotation
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={selectedElement.rotation || 0}
                onChange={(e) => onUpdateElement(selectedElement.id, { rotation: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">
                {selectedElement.rotation || 0}°
              </div>
            </div>

            {selectedElement.type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={selectedElement.src || ''}
                  onChange={(e) => onUpdateElement(selectedElement.id, { src: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opacity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedElement.style?.opacity || 1}
                onChange={(e) => onUpdateElement(selectedElement.id, { 
                  style: { ...selectedElement.style, opacity: parseFloat(e.target.value) }
                })}
                className="w-full"
              />
              <div className="text-xs text-gray-500 text-center">
                {Math.round((selectedElement.style?.opacity || 1) * 100)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
