import React from 'react';
import { Tag, TrendingUp, Calendar } from 'lucide-react';

interface ProductDetails {
  title: string;
  currentPrice: string;
  originalPrice: string;
  lastChecked: string;
  imageUrl: string;
}

export default function ProductCard({ details }: { details: ProductDetails | null }) {
  if (!details) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl w-full">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={details.imageUrl || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
            alt={details.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{details.title}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-lg font-bold text-blue-600">{details.currentPrice}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Original Price</p>
                <p className="text-gray-700 line-through">{details.originalPrice}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Last Checked</p>
                <p className="text-gray-700">{details.lastChecked}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}