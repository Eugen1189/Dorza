'use client';

import React, { useState } from 'react';

const CampaignForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    business_name: '',
    product_service: '',
    target_audience: '',
    campaign_goal: 'awareness',
    desired_tone: 'professional',
    campaign_theme: '', 
    num_posts: 3,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ success: null, message: '' });

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ 
        success: false, 
        message: 'Errore durante l\'invio dei dati' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-premium p-10 rounded-3xl shadow-2xl backdrop-blur-xl glow-green border-2 border-emerald-500/30">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">
          Il Tuo Inizio Campagna
        </h2>
        <p className="text-emerald-200/80 text-lg font-light">Compila il form per creare una campagna professionale</p>
      </div>

      {/* Section A: Business Details */}
      <div className="mb-8 glass p-7 rounded-2xl border border-emerald-500/30 bg-emerald-900/10">
        <legend className="text-xl font-bold mb-6 text-emerald-100 flex items-center gap-3">
          <span className="bg-gradient-to-r from-emerald-400 to-green-400 w-10 h-10 rounded-full flex items-center justify-center text-emerald-900 font-black shadow-lg">1</span>
          Informazioni Aziendali
        </legend>
        
        <div className="mb-5">
          <label htmlFor="business_name" className="block text-sm font-semibold mb-2 text-emerald-200">
            Nome Azienda *
          </label>
          <input
            type="text"
            id="business_name"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-50 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            placeholder="Es. ProForma Labs"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="product_service" className="block text-sm font-semibold mb-2 text-white/90">
            Prodotto / Servizio *
          </label>
          <textarea
            id="product_service"
            name="product_service"
            value={formData.product_service}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
            placeholder="Breve descrizione del tuo prodotto o servizio"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="target_audience" className="block text-sm font-semibold mb-2 text-white/90">
            Pubblico di Riferimento *
          </label>
          <textarea
            id="target_audience"
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
            placeholder="Descrivi il tuo pubblico di riferimento"
          />
        </div>
      </div>

      {/* Section B: Campaign Parameters */}
      <div className="mb-8 glass p-6 rounded-2xl border border-white/20">
        <legend className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 w-8 h-8 rounded-full flex items-center justify-center">2</span>
          Parametri Campagna
        </legend>
        
        <div className="mb-5">
          <label htmlFor="campaign_goal" className="block text-sm font-semibold mb-2 text-white/90">
            Obiettivo Campagna *
          </label>
          <select
            id="campaign_goal"
            name="campaign_goal"
            value={formData.campaign_goal}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          >
            <option value="sales" className="bg-gray-800">Vendite</option>
            <option value="engagement" className="bg-gray-800">Coinvolgimento</option>
            <option value="traffic" className="bg-gray-800">Traffico sul Sito</option>
            <option value="awareness" className="bg-gray-800">Notorietà</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="desired_tone" className="block text-sm font-semibold mb-2 text-white/90">
            Tono Desiderato *
          </label>
          <select
            id="desired_tone"
            name="desired_tone"
            value={formData.desired_tone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          >
            <option value="professional" className="bg-gray-800">Professionale</option>
            <option value="friendly" className="bg-gray-800">Amichevole</option>
            <option value="sarcastic" className="bg-gray-800">Sarcastico</option>
            <option value="inspirational" className="bg-gray-800">Ispiratore</option>
            <option value="humorous" className="bg-gray-800">Umoristico</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="campaign_theme" className="block text-sm font-semibold mb-2 text-white/90">
            Tema Campagna (opzionale)
          </label>
          <input
            type="text"
            id="campaign_theme"
            name="campaign_theme"
            value={formData.campaign_theme}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            placeholder="Es. Promozione Primaverile"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="num_posts" className="block text-sm font-semibold mb-2 text-white/90">
            Numero di Post *
          </label>
          <select
            id="num_posts"
            name="num_posts"
            value={formData.num_posts}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          >
            <option value={3} className="bg-gray-800">3 post</option>
            <option value={4} className="bg-gray-800">4 post</option>
            <option value={5} className="bg-gray-800">5 post</option>
          </select>
        </div>
      </div>

      {status.message && (
        <div className={`mb-6 p-4 rounded-xl ${
          status.success 
            ? 'bg-green-500/20 border border-green-400 text-green-200' 
            : 'bg-red-500/20 border border-red-400 text-red-200'
        }`}>
          {status.message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden glow-green ${
          isSubmitting 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-white border-2 border-emerald-300/50'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-3 relative z-10">
            <div className="w-6 h-6 border-t-3 border-white rounded-full animate-spin"></div>
            <span>Creazione campagna...</span>
          </div>
        ) : (
          <span className="flex items-center justify-center relative z-10">
            <span>Genera Campagna AI</span>
          </span>
        )}
      </button>
    </form>
  );
};

export default CampaignForm;
