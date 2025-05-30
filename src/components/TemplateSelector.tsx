import React from 'react';
import { X, FileText, Briefcase, Heart, Star } from 'lucide-react';
import { Template } from '../App';

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  onClose: () => void;
}

const templates: Template[] = [
  {
    id: 'business-1',
    name: 'Modern Business',
    preview: '/api/placeholder/300/200',
    elements: [
      {
        id: 'title-1',
        type: 'text',
        x: 50,
        y: 50,
        width: 400,
        height: 60,
        content: 'Your Business Name',
        style: {
          fontSize: 36,
          fontFamily: 'Inter',
          color: '#1f2937',
        },
      },
      {
        id: 'subtitle-1',
        type: 'text',
        x: 50,
        y: 120,
        width: 400,
        height: 30,
        content: 'Professional Services & Solutions',
        style: {
          fontSize: 18,
          fontFamily: 'Inter',
          color: '#6b7280',
        },
      },
      {
        id: 'logo-1',
        type: 'shape',
        x: 50,
        y: 180,
        width: 80,
        height: 80,
        style: {
          backgroundColor: '#3b82f6',
          borderRadius: 12,
        },
      },
      {
        id: 'contact-1',
        type: 'text',
        x: 150,
        y: 200,
        width: 300,
        height: 40,
        content: 'contact@business.com | (555) 123-4567',
        style: {
          fontSize: 14,
          fontFamily: 'Inter',
          color: '#374151',
        },
      },
    ],
  },
  {
    id: 'creative-1',
    name: 'Creative Portfolio',
    preview: '/api/placeholder/300/200',
    elements: [
      {
        id: 'bg-shape-1',
        type: 'shape',
        x: 0,
        y: 0,
        width: 200,
        height: 300,
        style: {
          backgroundColor: '#ec4899',
          borderRadius: 0,
        },
      },
      {
        id: 'title-2',
        type: 'text',
        x: 220,
        y: 80,
        width: 300,
        height: 50,
        content: 'Creative Studio',
        style: {
          fontSize: 32,
          fontFamily: 'Inter',
          color: '#1f2937',
        },
      },
      {
        id: 'subtitle-2',
        type: 'text',
        x: 220,
        y: 140,
        width: 280,
        height: 60,
        content: 'Bringing your ideas to life through innovative design',
        style: {
          fontSize: 16,
          fontFamily: 'Inter',
          color: '#4b5563',
        },
      },
      {
        id: 'accent-1',
        type: 'shape',
        x: 400,
        y: 220,
        width: 60,
        height: 60,
        style: {
          backgroundColor: '#f59e0b',
          borderRadius: 30,
        },
      },
    ],
  },
  {
    id: 'event-1',
    name: 'Event Promotion',
    preview: '/api/placeholder/300/200',
    elements: [
      {
        id: 'header-bg',
        type: 'shape',
        x: 0,
        y: 0,
        width: 500,
        height: 120,
        style: {
          backgroundColor: '#7c3aed',
          borderRadius: 0,
        },
      },
      {
        id: 'event-title',
        type: 'text',
        x: 50,
        y: 30,
        width: 400,
        height: 60,
        content: 'SUMMER FESTIVAL 2024',
        style: {
          fontSize: 28,
          fontFamily: 'Inter',
          color: '#ffffff',
        },
      },
      {
        id: 'event-date',
        type: 'text',
        x: 50,
        y: 150,
        width: 300,
        height: 40,
        content: 'June 15-17, 2024',
        style: {
          fontSize: 20,
          fontFamily: 'Inter',
          color: '#1f2937',
        },
      },
      {
        id: 'event-location',
        type: 'text',
        x: 50,
        y: 190,
        width: 300,
        height: 30,
        content: 'Central Park, New York',
        style: {
          fontSize: 16,
          fontFamily: 'Inter',
          color: '#6b7280',
        },
      },
      {
        id: 'star-decoration',
        type: 'shape',
        x: 400,
        y: 150,
        width: 50,
        height: 50,
        style: {
          backgroundColor: '#fbbf24',
          borderRadius: 0,
        },
      },
    ],
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate, onClose }) => {
  const handleStartBlank = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blank template */}
            <div
              onClick={handleStartBlank}
              className="group cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 hover:bg-blue-50 transition-all"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Blank</h3>
                <p className="text-sm text-gray-600">Create your brochure from scratch</p>
              </div>
            </div>

            {/* Template cards */}
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="aspect-[3/2] bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {template.id.includes('business') && (
                      <Briefcase className="w-12 h-12 text-gray-400" />
                    )}
                    {template.id.includes('creative') && (
                      <Heart className="w-12 h-12 text-gray-400" />
                    )}
                    {template.id.includes('event') && (
                      <Star className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">
                    {template.elements.length} elements
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Choose a template to get started, or create your own design from scratch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
