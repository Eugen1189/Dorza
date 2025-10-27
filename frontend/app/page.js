'use client';

import CampaignForm from '@/components/CampaignForm';
import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Помилка відправки форми:', error);
      setResponse({
        status: 'ERROR',
        message: 'Не вдалося відправити дані на сервер',
        error: error.message,
      });
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
            <p className="text-blue-600">Відправка даних...</p>
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
