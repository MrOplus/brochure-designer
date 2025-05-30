import React from 'react';
import { Download, Trash2, FileText, Save, RotateCcw, Settings } from 'lucide-react';
import { BrochureElement, PageSize, PAGE_SIZES } from '../App';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ToolbarProps {
  onClear: () => void;
  onShowTemplates: () => void;
  elements: BrochureElement[];
  pageSize: PageSize;
  onPageSizeChange: (pageSize: PageSize) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onClear, onShowTemplates, elements, pageSize, onPageSizeChange }) => {
  const handleExportPDF = async () => {
    const canvas = document.querySelector('.relative.w-full.h-full.bg-gray-50') as HTMLElement;
    if (!canvas) return;

    try {
      const canvasImage = await html2canvas(canvas, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvasImage.toDataURL('image/png');
      
      // Calculate orientation and format based on page size
      const orientation = pageSize.width > pageSize.height ? 'landscape' : 'portrait';
      const pdfWidth = orientation === 'portrait' ? pageSize.width * 0.352778 : pageSize.height * 0.352778; // Convert px to mm
      const pdfHeight = orientation === 'portrait' ? pageSize.height * 0.352778 : pageSize.width * 0.352778;
      
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      const imgWidth = pdfWidth;
      const imgHeight = (canvasImage.height * imgWidth) / canvasImage.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save('brochure.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    }
  };

  const handleExportJSON = () => {
    const data = {
      elements,
      metadata: {
        created: new Date().toISOString(),
        version: '1.0.0',
      },
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'brochure-design.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.elements && Array.isArray(data.elements)) {
            // You would need to pass this back to the parent component
            // For now, we'll just log it
            console.log('Imported design:', data);
            alert('Import functionality would be implemented with parent component integration');
          }
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="toolbar bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">Brochure Creator</h1>
          <div className="h-6 w-px bg-gray-300" />
          <span className="text-sm text-gray-600">
            {elements.length} element{elements.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onShowTemplates}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <FileText className="w-4 h-4" />
            Templates
          </button>

          <div className="h-6 w-px bg-gray-300" />

          <button
            onClick={handleImportJSON}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Import
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>

          <div className="h-6 w-px bg-gray-300" />

          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
                onClear();
              }
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600" />
            <select
              value={PAGE_SIZES.findIndex(size => size.width === pageSize.width && size.height === pageSize.height)}
              onChange={(e) => onPageSizeChange(PAGE_SIZES[parseInt(e.target.value)])}
              className="px-2 py-1 text-sm border border-gray-300 rounded-md bg-white"
            >
              {PAGE_SIZES.map((size, index) => (
                <option key={index} value={index}>
                  {size.name} ({size.width}×{size.height})
                </option>
              ))}
            </select>
          </div>
          
          <div className="h-6 w-px bg-gray-300" />
          
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
                onClear();
              }
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
