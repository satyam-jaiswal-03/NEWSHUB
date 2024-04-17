import React, { useState, useEffect } from 'react';

import Navbar from './navbar';
import { Link } from 'react-router-dom';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const savedArticlesData = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(savedArticlesData);
  }, []);

  return (
    <div>
      <Navbar/>
      
      <a href="./home" className=" px-2 text-white"><button>HOME</button></a>
      
     
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8"> SAVED NEWS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {savedArticles.map((article, index) => (
            article.title !== "[Removed]" || article.urlToImage!=="[Removed]" ? (
              <div key={index} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md">
                <img src={article.urlToImage} alt={article.title} className="w-full h-35 object-cover object-center" />
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-700">{article.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <a href={article.url} className="text-blue-500 mt-4 self-end" target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                   
                  </div>
                </div>
              </div>
            ) : null
          ))}
        </div>
        
      </div>
    </div>
  );
};


export default SavedArticles;
