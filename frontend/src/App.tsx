import React, { useState } from 'react';
import { GaugeCircle } from 'lucide-react';
import PriceTrackerForm from './components/PriceTrackerForm';
import ProductCard from './components/ProductCard';

interface ProductDetails {
  title: string;
  currentPrice: string;
  originalPrice: string;
  lastChecked: string;
  imageUrl: string;
}

function App() {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: { url: string; title: string }) => {
    setLoading(true);
    // Simulating API call - replace with actual backend integration
    setTimeout(() => {
      setProductDetails({
        title: data.title || "Sample Product",
        currentPrice: "$999.99",
        originalPrice: "$1,299.99",
        lastChecked: new Date().toLocaleString(),
        imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GaugeCircle className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Price Tracker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track product prices across the web. Enter a product URL and let us monitor the price changes for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <PriceTrackerForm onSubmit={handleSubmit} />
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Fetching product details...</p>
            </div>
          )}

          {productDetails && !loading && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Details</h2>
              <ProductCard details={productDetails} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;