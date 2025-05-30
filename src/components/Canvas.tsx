import React, { useRef, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { BrochureElement, PageSize } from '../App';

interface CanvasProps {
  elements: BrochureElement[];
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<BrochureElement>) => void;
  onDeleteElement: (id: string) => void;
  onAddElement: (element: Omit<BrochureElement, 'id'>) => void;
  pageSize: PageSize;
}

interface ResizeHandle {
  position: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w';
  cursor: string;
}

const resizeHandles: ResizeHandle[] = [
  { position: 'nw', cursor: 'nw-resize' },
  { position: 'ne', cursor: 'ne-resize' },
  { position: 'sw', cursor: 'sw-resize' },
  { position: 'se', cursor: 'se-resize' },
  { position: 'n', cursor: 'n-resize' },
  { position: 's', cursor: 's-resize' },
  { position: 'e', cursor: 'e-resize' },
  { position: 'w', cursor: 'w-resize' },
];

export const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onAddElement,
  pageSize,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Use requestAnimationFrame for smooth resizing
  const rafRef = useRef<number | null>(null);
  
  const connectRef = (el: HTMLDivElement | null) => {
    if (el) {
      (canvasRef as any).current = el;
      drop(el);
    }
  };

  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<{ elementId: string; handle: string } | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; elementX: number; elementY: number } | null>(null);

  const [, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (offset && canvasRect) {
        return {
          x: offset.x - canvasRect.left,
          y: offset.y - canvasRect.top,
        };
      }
      return { x: 100, y: 100 };
    },
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedElement) {
        onDeleteElement(selectedElement);
      }
      if (e.key === 'Escape') {
        onSelectElement(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, onDeleteElement, onSelectElement]);

  const handleMouseDown = (e: React.MouseEvent, elementId: string, action: 'drag' | 'resize', handle?: string) => {
    e.stopPropagation();
    
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    if (action === 'drag') {
      setIsDragging(elementId);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        elementX: element.x,
        elementY: element.y,
      });
    } else if (action === 'resize' && handle) {
      setIsResizing({ elementId, handle });
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        elementX: element.x,
        elementY: element.y,
      });
    }

    onSelectElement(elementId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart) return;

    // Cancel any pending animation frame to ensure smooth updates
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      // Direct mouse movement with minimal resistance for smooth resizing
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      if (isDragging) {
        const newX = Math.max(0, Math.min(dragStart.elementX + deltaX, pageSize.width - 50));
        const newY = Math.max(0, Math.min(dragStart.elementY + deltaY, pageSize.height - 50));
        
        onUpdateElement(isDragging, {
          x: newX,
          y: newY,
        });
      } else if (isResizing) {
        const element = elements.find(el => el.id === isResizing.elementId);
        if (!element) return;

        let newX = element.x;
        let newY = element.y;
        let newWidth = element.width;
        let newHeight = element.height;

        const handle = isResizing.handle;
        // Removed sensitivity reduction for smooth, direct resizing
        const adjustedDeltaX = deltaX;
        const adjustedDeltaY = deltaY;

        if (handle.includes('w')) {
          const widthChange = -adjustedDeltaX;
          newWidth = Math.max(20, element.width + widthChange);
          newX = element.x + element.width - newWidth;
        }
        if (handle.includes('e')) {
          newWidth = Math.max(20, element.width + adjustedDeltaX);
        }
        if (handle.includes('n')) {
          const heightChange = -adjustedDeltaY;
          newHeight = Math.max(20, element.height + heightChange);
          newY = element.y + element.height - newHeight;
        }
        if (handle.includes('s')) {
          newHeight = Math.max(20, element.height + adjustedDeltaY);
        }

        // Ensure elements stay within canvas bounds
        newX = Math.max(0, Math.min(newX, pageSize.width - newWidth));
        newY = Math.max(0, Math.min(newY, pageSize.height - newHeight));

        onUpdateElement(isResizing.elementId, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        });
      }
    });
  };

  const handleMouseUp = () => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    setIsDragging(null);
    setIsResizing(null);
    setDragStart(null);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
    }
  };

  const renderElement = (element: BrochureElement) => {
    const isSelected = selectedElement === element.id;
    
    return (
      <div
        key={element.id}
        className={`absolute cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={{
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
          opacity: element.style?.opacity || 1,
        }}
        onMouseDown={(e) => handleMouseDown(e, element.id, 'drag')}
      >
        {element.type === 'text' && (
          <div
            className="w-full h-full flex items-center break-words"
            style={{
              fontSize: element.style?.fontSize || 16,
              fontFamily: element.style?.fontFamily || 'Inter',
              fontWeight: element.style?.fontWeight || 'normal',
              color: element.style?.color || '#000000',
              backgroundColor: element.style?.backgroundColor || 'transparent',
              borderRadius: element.style?.borderRadius || 0,
              textAlign: element.style?.textAlign || 'left',
              justifyContent: element.style?.textAlign === 'center' ? 'center' : element.style?.textAlign === 'right' ? 'flex-end' : 'flex-start',
              transform: element.rotation ? `rotate(${element.rotation}deg)` : 'none',
              transformOrigin: 'center',
              padding: '4px',
            }}
          >
            {element.content || 'Text'}
          </div>
        )}
        
        {element.type === 'image' && (
          <img
            src={element.src || 'https://via.placeholder.com/100x100/e5e7eb/6b7280?text=Image'}
            alt="Brochure element"
            className="w-full h-full object-cover"
            style={{
              borderRadius: element.style?.borderRadius || 0,
              transform: element.rotation ? `rotate(${element.rotation}deg)` : 'none',
              transformOrigin: 'center',
            }}
            draggable={false}
          />
        )}
        
        {element.type === 'shape' && (
          <div
            className="w-full h-full"
            style={{
              backgroundColor: element.style?.backgroundColor || '#3b82f6',
              borderRadius: element.style?.borderRadius || 0,
              border: element.style?.borderWidth ? `${element.style.borderWidth}px solid ${element.style.borderColor || '#000000'}` : 'none',
              transform: element.rotation ? `rotate(${element.rotation}deg)` : 'none',
              transformOrigin: 'center',
            }}
          />
        )}

        {element.type === 'circle' && (
          <div
            className="w-full h-full rounded-full"
            style={{
              backgroundColor: element.style?.backgroundColor || '#10b981',
              border: element.style?.borderWidth ? `${element.style.borderWidth}px solid ${element.style.borderColor || '#000000'}` : 'none',
            }}
          />
        )}
        
        {element.type === 'line' && (
          <div
            className="w-full"
            style={{
              height: element.height,
              backgroundColor: element.style?.backgroundColor || '#374151',
              transform: element.rotation ? `rotate(${element.rotation}deg)` : 'none',
              transformOrigin: 'center',
            }}
          />
        )}
        
        {(element.type === 'arrow' || element.type === 'icon') && (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              fontSize: element.style?.fontSize || 24,
              color: element.style?.color || '#374151',
              transform: element.rotation ? `rotate(${element.rotation}deg)` : 'none',
              transformOrigin: 'center',
            }}
          >
            {element.content || (element.type === 'arrow' ? '→' : '★')}
          </div>
        )}

        {/* Resize handles */}
        {isSelected && (
          <>
            {resizeHandles.map((handle) => (
              <div
                key={handle.position}
                className="absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600 transition-colors hover:scale-110"
                style={{
                  cursor: handle.cursor,
                  zIndex: 10,
                  // Add padding for easier grabbing
                  padding: '2px',
                  margin: '-2px',
                  ...(handle.position.includes('n') && { top: -6 }),
                  ...(handle.position.includes('s') && { bottom: -6 }),
                  ...(handle.position.includes('w') && { left: -6 }),
                  ...(handle.position.includes('e') && { right: -6 }),
                  ...(!handle.position.includes('n') && !handle.position.includes('s') && { top: '50%', transform: 'translateY(-50%)' }),
                  ...(!handle.position.includes('w') && !handle.position.includes('e') && { left: '50%', transform: 'translateX(-50%)' }),
                  ...(handle.position.includes('n') && handle.position.includes('w') && { top: -6, left: -6 }),
                  ...(handle.position.includes('n') && handle.position.includes('e') && { top: -6, right: -6 }),
                  ...(handle.position.includes('s') && handle.position.includes('w') && { bottom: -6, left: -6 }),
                  ...(handle.position.includes('s') && handle.position.includes('e') && { bottom: -6, right: -6 }),
                }}
                onMouseDown={(e) => handleMouseDown(e, element.id, 'resize', handle.position)}
              />
            ))}
          </>
        )}
      </div>
    );
  };

  // Cleanup effect to cancel animation frames
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg overflow-auto">
        <div className="p-8 flex items-center justify-center min-h-full">
          <div
            ref={connectRef}
            className={`relative bg-white shadow-lg border border-gray-300 ${isResizing || isDragging ? 'select-none' : ''}`}
            style={{ 
              width: `${pageSize.width}px`, 
              height: `${pageSize.height}px`,
              transform: 'scale(0.8)', // Scale down for better view
              transformOrigin: 'center',
              userSelect: isResizing || isDragging ? 'none' : 'auto',
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleCanvasClick}
          >
            {/* Grid background */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />
            
            {/* Render all elements */}
            {elements.map(renderElement)}
            
            {/* Drop zone indicator */}
            {elements.length === 0 && (
              <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center pointer-events-none">
                <div className="text-gray-500 text-center">
                  <div className="text-lg font-medium">Drop elements here</div>
                  <div className="text-sm">Drag and drop elements from the sidebar to start creating your brochure</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
