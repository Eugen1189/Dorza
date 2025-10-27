'use client';

import React from 'react';
import PostCard from './PostCard';

const CampaignDashboard = ({ campaignData }) => {

  const exportToJSON = () => {
    const dataStr = JSON.stringify(campaignData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'campaign-export.json';
    link.click();
  };

  const exportToCSV = () => {
    let csv = 'Post Number,Platform,Content,Hashtags\n';
    
    campaignData.posts.forEach((post, index) => {
      const platforms = ['facebook_text', 'instagram_text', 'linkedin_text', 'x_text'];
      const platformNames = ['Facebook', 'Instagram', 'LinkedIn', 'X/Twitter'];
      
      platforms.forEach((platform, idx) => {
        const content = post[platform].replace(/\n/g, ' ').replace(/"/g, '""');
        const hashtags = post.suggested_hashtags.replace(/"/g, '""');
        csv += `${index + 1},${platformNames[idx]},"${content}","${hashtags}"\n`;
      });
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'campaign-export.csv';
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Summary */}
      <div className="glass-premium rounded-3xl shadow-2xl backdrop-blur-xl p-8 mb-8 border-2 border-emerald-500/30 glow-green">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-emerald-400 to-green-400 w-12 h-12 rounded-full flex items-center justify-center text-emerald-900 font-black text-xl shadow-lg">
            📋
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
            Riassunto Strategico
          </h2>
        </div>
        <div className="glass p-6 rounded-2xl border border-emerald-500/40 bg-emerald-900/20">
          <p className="text-lg leading-relaxed whitespace-pre-wrap text-emerald-50 font-light tracking-wide">
            {campaignData.strategy_summary}
          </p>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4 mb-8 justify-end">
        <button
          onClick={exportToJSON}
          className="px-6 py-3 glass rounded-xl hover:bg-emerald-900/30 transition-all duration-300 shadow-xl border border-emerald-400/50 backdrop-blur-xl text-white font-bold flex items-center gap-2 glow-green"
        >
          Export JSON
        </button>
        <button
          onClick={exportToCSV}
          className="px-6 py-3 glass rounded-xl hover:bg-emerald-900/30 transition-all duration-300 shadow-xl border border-emerald-400/50 backdrop-blur-xl text-white font-bold flex items-center gap-2 glow-green"
        >
          Export CSV
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-8">
        {campaignData.posts.map((post, index) => (
          <PostCard key={index} postData={post} index={index + 1} />
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-12 p-8 glass-premium rounded-3xl shadow-2xl text-center border-2 border-emerald-500/50 glow-green">
        <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
          Campagna Generata con Successo!
        </h3>
        <p className="text-lg text-emerald-200 font-light">
          Il tuo contenuto è pronto per essere pubblicato su tutte le piattaforme.
        </p>
      </div>
    </div>
  );
};

export default CampaignDashboard;
