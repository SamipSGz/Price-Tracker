import React from 'react';
import { FileText } from 'lucide-react';

interface ProductDetails {
  output: string;
}

const ProductCard = ({ details }: { details: ProductDetails | null }) => {
  if (!details) return null;

  const formatContent = (content: string) => {
    // Split content into lines
    return content.split('\\n').map((line, index) => {
      // Handle bullet points
      if (line.startsWith('*')) {
        return (
          <div key={index} className="flex items-start ml-4 mb-1">
            <span className="mr-2">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      // Handle section headers (lines ending with ':')
      if (line.endsWith(':')) {
        return (
          <div key={index} className="font-bold text-gray-800 mt-4 mb-2">
            {line}
          </div>
        );
      }
      // Regular lines
      return (
        <div key={index} className="mb-1">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-3">
          <FileText className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h3>
            <div className="text-gray-700 space-y-1">
              {formatContent(details.output)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;