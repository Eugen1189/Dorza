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
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4">📋 Campaign Strategy Summary</h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {campaignData.strategy_summary}
          </p>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4 mb-8 justify-end">
        <button
          onClick={exportToJSON}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md flex items-center gap-2"
        >
          📥 Export JSON
        </button>
        <button
          onClick={exportToCSV}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md flex items-center gap-2"
        >
          📊 Export CSV
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {campaignData.posts.map((post, index) => (
          <PostCard key={index} postData={post} index={index + 1} />
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-center">
        <h3 className="text-2xl font-bold mb-2">✨ Campaign Generated Successfully!</h3>
        <p className="text-lg opacity-90">
          Your content is ready to be published across all platforms.
        </p>
      </div>
    </div>
  );
};

export default CampaignDashboard;
