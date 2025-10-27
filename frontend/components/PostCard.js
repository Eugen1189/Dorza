'use client';

import React, { useState } from 'react';

const PostCard = ({ postData, index }) => {
  const [activePlatform, setActivePlatform] = useState('facebook');
  const [copySuccess, setCopySuccess] = useState('');

  const platforms = {
    facebook: { name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    instagram: { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
    linkedin: { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
    x: { name: 'X (Twitter)', icon: '🐦', color: 'bg-black' }
  };

  // Get current text based on active platform
  const currentText = postData[`${activePlatform}_text`];

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(`${label} copiato!`);
      setTimeout(() => setCopySuccess(''), 3000);
    });
  };

  return (
    <div className="glass-premium rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-500/30">
      {/* Post Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6">
        <h3 className="text-3xl font-black">Post #{index}</h3>
      </div>

      <div className="p-6">
        {/* Platform Tabs */}
        <div className="flex flex-wrap gap-3 mb-6 border-b-2 pb-4 border-emerald-500/30">
          {Object.entries(platforms).map(([key, platform]) => (
            <button
              key={key}
              onClick={() => setActivePlatform(key)}
              className={`px-5 py-3 rounded-xl font-bold transition-all duration-300 ${
                activePlatform === key
                  ? `${platform.color} text-white shadow-xl scale-105 glow-green`
                  : 'glass text-emerald-200 hover:bg-emerald-900/30 border border-emerald-500/30'
              }`}
            >
              <span className="mr-2">{platform.icon}</span>
              {platform.name}
            </button>
          ))}
        </div>

        {/* Content Display with Copy Button */}
        <div className="glass p-6 rounded-2xl mb-6 min-h-[200px] relative border border-emerald-500/30 bg-emerald-900/10">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-emerald-300 text-sm uppercase tracking-wider">
              {platforms[activePlatform].name} Contenuto:
            </div>
            <button
              onClick={() => copyToClipboard(currentText, 'Contenuto')}
              className="px-4 py-2 glass rounded-lg hover:bg-emerald-900/30 transition-all duration-300 text-emerald-200 font-semibold text-sm flex items-center gap-2 border border-emerald-500/50"
            >
              Copia
            </button>
          </div>
          {copySuccess && (
            <div className="mb-3 p-3 bg-emerald-500/30 rounded-lg text-emerald-200 text-sm text-center border border-emerald-400/50">
              {copySuccess}
            </div>
          )}
          <div className="whitespace-pre-wrap text-emerald-50 leading-relaxed font-light text-base">
            {currentText}
          </div>
        </div>

        {/* Generated Image Display */}
        {postData.image_url && (
          <div className="glass p-6 rounded-2xl mb-6 border border-emerald-500/30 bg-emerald-900/10">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-emerald-300 text-sm uppercase tracking-wider flex items-center gap-2">
                Immagine Generata
              </div>
              <a 
                href={postData.image_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 glass rounded-lg hover:bg-emerald-900/30 transition-all duration-300 text-emerald-200 font-semibold text-sm border border-emerald-500/50"
              >
                Apri
              </a>
            </div>
            <img 
              src={postData.image_url} 
              alt="Generated for campaign" 
              className="w-full rounded-xl shadow-xl border-2 border-emerald-500/30"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{display: 'none'}} className="text-emerald-400 text-sm italic text-center py-4">
              Immagine non disponibile
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Prompt */}
          <div className="glass p-5 rounded-2xl border border-emerald-500/40 bg-emerald-900/10 relative">
            <div className="flex justify-between items-center mb-3">
              <div className="font-bold text-sm text-emerald-300 flex items-center gap-2 uppercase tracking-wide">
                Immagine Prompt
              </div>
              <button
                onClick={() => copyToClipboard(postData.image_prompt, 'Prompt')}
                className="px-3 py-1.5 glass rounded-lg hover:bg-emerald-900/30 transition-all duration-300 text-emerald-200 text-xs border border-emerald-500/50"
              >
                Copia
              </button>
            </div>
            <div className="text-emerald-100 text-sm italic leading-relaxed font-light">
              {postData.image_prompt}
            </div>
          </div>

          {/* Hashtags */}
          <div className="glass p-5 rounded-2xl border border-emerald-500/40 bg-emerald-900/10 relative">
            <div className="flex justify-between items-center mb-3">
              <div className="font-bold text-sm text-emerald-300 flex items-center gap-2 uppercase tracking-wide">
                Hashtags
              </div>
              <button
                onClick={() => copyToClipboard(postData.suggested_hashtags, 'Hashtags')}
                className="px-3 py-1.5 glass rounded-lg hover:bg-emerald-900/30 transition-all duration-300 text-emerald-200 text-xs border border-emerald-500/50"
              >
                Copia
              </button>
            </div>
            <div className="text-emerald-100 flex flex-wrap gap-2">
              {postData.suggested_hashtags.split(' ').map((tag, idx) => (
                <span key={idx} className="bg-emerald-900/40 px-3 py-1.5 rounded-full text-sm font-medium border border-emerald-500/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
