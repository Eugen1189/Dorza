'use client';

import React, { useState } from 'react';

const PostCard = ({ postData, index }) => {
  const [activePlatform, setActivePlatform] = useState('facebook');

  const platforms = {
    facebook: { name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    instagram: { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
    linkedin: { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
    x: { name: 'X (Twitter)', icon: '🐦', color: 'bg-black' }
  };

  // Get current text based on active platform
  const currentText = postData[`${activePlatform}_text`];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
      {/* Post Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
        <h3 className="text-2xl font-bold">Post #{index + 1}</h3>
      </div>

      <div className="p-6">
        {/* Platform Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b-2 pb-2">
          {Object.entries(platforms).map(([key, platform]) => (
            <button
              key={key}
              onClick={() => setActivePlatform(key)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                activePlatform === key
                  ? `${platform.color} text-white shadow-lg scale-105`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="mr-2">{platform.icon}</span>
              {platform.name}
            </button>
          ))}
        </div>

        {/* Content Display with Copy Button */}
        <div className="bg-gray-50 p-6 rounded-lg mb-4 min-h-[200px] relative border-2 border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className="font-bold text-gray-700 text-sm uppercase tracking-wide">
              {platforms[activePlatform].name} Content:
            </div>
            <button
              onClick={() => copyToClipboard(currentText)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm flex items-center gap-2"
            >
              📋 Copy
            </button>
          </div>
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {currentText}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Image Prompt */}
          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200 relative">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-sm text-purple-800 flex items-center gap-2">
                🖼️ Image Prompt
              </div>
              <button
                onClick={() => copyToClipboard(postData.image_prompt)}
                className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition text-xs"
              >
                📋
              </button>
            </div>
            <div className="text-purple-900 text-sm italic leading-relaxed">
              {postData.image_prompt}
            </div>
          </div>

          {/* Hashtags */}
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 relative">
            <div className="flex justify-between items-center mb-3">
              <div className="font-bold text-sm text-blue-800 flex items-center gap-2">
                # Hashtags
              </div>
              <button
                onClick={() => copyToClipboard(postData.suggested_hashtags)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs"
              >
                📋
              </button>
            </div>
            <div className="text-blue-900 flex flex-wrap gap-2">
              {postData.suggested_hashtags.split(' ').map((tag, idx) => (
                <span key={idx} className="bg-blue-200 px-3 py-1 rounded-full text-sm font-medium">
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
