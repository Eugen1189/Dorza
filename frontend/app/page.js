'use client';

import CampaignForm from '@/components/CampaignForm';
import CampaignDashboard from '@/components/CampaignDashboard';
import { useState } from 'react';
import { API_ENDPOINTS } from '@/lib/config';

export default function Home() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);

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
        setShowForm(false);
      } else {
        console.error('Error from Backend:', result);
        const errorMessage = Array.isArray(result.detail) 
          ? result.detail[0].msg || 'Error from API'
          : (typeof result.detail === 'string' ? result.detail : 'Error sending data');
        
        setError({
          status: 'ERROR',
          message: errorMessage,
          details: result.detail,
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      setError({
        status: 'ERROR',
        message: "Impossibile connettersi al server.",
        details: error.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setResponse(null);
    setShowForm(true);
    setError(null);
  };

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Premium animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl">
              Dorza
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          </div>
          <p className="text-2xl md:text-3xl text-emerald-100 font-semibold mb-2 tracking-tight">
            Generatore di Campagne
          </p>
          <p className="text-emerald-300/80 text-lg font-light">
            Crea campagne professionali con un click
          </p>
        </div>

        {showForm && !response && (
          <div className="max-w-4xl mx-auto">
            <CampaignForm onSubmit={handleSubmit} />
            
            {loading && (
              <div className="mt-12 text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl animate-ping opacity-75"></div>
                  <div className="relative inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-emerald-400 shadow-lg"></div>
                </div>
                <p className="text-emerald-200 mt-6 text-xl font-semibold tracking-wider">
                  La magia dell'AI in azione...
                </p>
                <p className="text-emerald-400/70 mt-2 text-sm">Attendere, creazione della campagna</p>
              </div>
            )}
            
            {error && (
              <div className="mt-8 p-8 glass-premium rounded-3xl shadow-2xl border-2 border-red-500/50 max-w-2xl mx-auto backdrop-blur-xl glow-gold">
                <h3 className="text-2xl font-bold mb-3 text-red-300 flex items-center gap-3">
                  Errore di connessione
                </h3>
                <p className="text-red-200">{error.message}</p>
                {error.details && (
                  <pre className="mt-4 text-sm bg-black/40 p-4 rounded-xl overflow-auto text-red-300 border border-red-500/30">
                    {JSON.stringify(error.details, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {response && (
          <div className="max-w-7xl mx-auto">
            {/* Premium back button */}
            <div className="mb-8">
              <button
                onClick={handleBackToForm}
                className="px-8 py-4 glass-premium rounded-2xl hover:bg-emerald-900/30 transition-all duration-300 shadow-xl border-2 border-emerald-500/30 backdrop-blur-xl text-white font-bold flex items-center gap-3 group glow-green"
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                Torna al Form
              </button>
            </div>
            
            {/* Dashboard */}
            <CampaignDashboard campaignData={response} />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
