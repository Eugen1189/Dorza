'use client';

import CampaignForm from '@/components/CampaignForm';
import { useState } from 'react';
import { API_ENDPOINTS } from '@/lib/config';

export default function Home() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      console.log('Sending data to FastAPI:', formData);

      const res = await fetch(API_ENDPOINTS.generate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        console.log('Data successfully sent to FastAPI:', result);
        setResponse(result);
        // In Phase 4 we will redirect user to Dashboard
      } else {
        // Handle validation errors from FastAPI (422 Unprocessable Entity)
        console.error('Error from Backend:', result);
        const errorMessage = Array.isArray(result.detail) 
          ? result.detail[0].msg || 'Помилка API'
          : result.detail || 'Помилка відправки даних';
        
        setError({
          status: 'ERROR',
          message: errorMessage,
          error: result,
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      setError({
        status: 'ERROR',
        message: "Could not connect to server.",
        error: error.message,
      });
      // Re-throw error so form can handle it
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Dorza AI Campaign Generator</h1>
        
        <CampaignForm onSubmit={handleSubmit} />
        
        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 mt-2">Відправка даних...</p>
          </div>
        )}
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2 text-red-800">Помилка:</h3>
            <p className="text-red-600">{error.message}</p>
            {error.error && (
              <pre className="mt-2 text-sm bg-red-100 p-2 rounded overflow-auto">
                {error.error}
              </pre>
            )}
          </div>
        )}
        
        {response && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Відповідь від сервера:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
