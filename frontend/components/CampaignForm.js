'use client';

import React, { useState } from 'react';

const CampaignForm = ({ onSubmit }) => {
  // Define initial state matching Pydantic model
  const [formData, setFormData] = useState({
    business_name: '',
    product_service: '',
    target_audience: '',
    campaign_goal: 'awareness', // Default value
    desired_tone: 'professional', // Default value
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
    
    // Block form and show loading
    setIsSubmitting(true);
    setStatus({ success: null, message: '' });

    try {
      // Call onSubmit function which will send data to FastAPI
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ 
        success: false, 
        message: 'Error sending data to server' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Створення Кампанії Dorza</h2>

      {/* Секція А: Деталі Бізнесу */}
      <fieldset className="mb-6 border p-4 rounded">
        <legend className="text-lg font-semibold">1. Хто ви і для кого працюєте?</legend>
        
        <div className="mb-4">
          <label htmlFor="business_name" className="block text-sm font-medium mb-2">
            Назва компанії або бренду *
          </label>
          <input
            type="text"
            id="business_name"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Наприклад, ProForma Labs"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="product_service" className="block text-sm font-medium mb-2">
            Опис продукту чи послуги *
          </label>
          <textarea
            id="product_service"
            name="product_service"
            value={formData.product_service}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Короткий опис вашого продукту або послуги"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="target_audience" className="block text-sm font-medium mb-2">
            Цільова аудиторія *
          </label>
          <textarea
            id="target_audience"
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Опишіть вашу цільову аудиторію"
          />
        </div>
      </fieldset>

      {/* Секція Б: Параметри Кампанії */}
      <fieldset className="mb-6 border p-4 rounded">
        <legend className="text-lg font-semibold">2. Яка ваша мета?</legend>
        
        <div className="mb-4">
          <label htmlFor="campaign_goal" className="block text-sm font-medium mb-2">
            Головна мета кампанії *
          </label>
          <select
            id="campaign_goal"
            name="campaign_goal"
            value={formData.campaign_goal}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sales">Продажі</option>
            <option value="engagement">Залучення аудиторії</option>
            <option value="traffic">Трафік на сайт</option>
            <option value="awareness">Підвищення впізнаваності</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="desired_tone" className="block text-sm font-medium mb-2">
            Бажаний тон контенту *
          </label>
          <select
            id="desired_tone"
            name="desired_tone"
            value={formData.desired_tone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="professional">Професійний</option>
            <option value="friendly">Дружній</option>
            <option value="sarcastic">Саркастичний</option>
            <option value="inspirational">Надихаючий</option>
            <option value="humorous">Жартівливий</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="campaign_theme" className="block text-sm font-medium mb-2">
            Тема кампанії (опціонально)
          </label>
          <input
            type="text"
            id="campaign_theme"
            name="campaign_theme"
            value={formData.campaign_theme}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Наприклад, Spring Sale"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="num_posts" className="block text-sm font-medium mb-2">
            Кількість постів для генерації *
          </label>
          <select
            id="num_posts"
            name="num_posts"
            value={formData.num_posts}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={3}>3 пости</option>
            <option value={4}>4 пости</option>
            <option value={5}>5 постів</option>
          </select>
        </div>
      </fieldset>

      {status.message && (
        <div className={`mb-4 p-3 rounded ${
          status.success 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {status.message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg transition ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {isSubmitting ? (
          <>
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            Відправка...
          </>
        ) : (
          '🚀 Запустити AI-Генерацію (Крок 1/4)'
        )}
      </button>
    </form>
  );
};

export default CampaignForm;
