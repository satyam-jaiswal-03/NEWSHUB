import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar'; // Assuming Navbar component is in a file named Navbar.js

const Sports = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            category: 'sports',
            country: 'in',
            pageSize: 21, // Number of articles per page
            page: page,
            apiKey: '2bcfb79da33b4acaa0265bfb7ab1936e',
          },
        });
        setNews(response.data.articles.filter(article => article.title !== "[Removed]"));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [page]);

  const handleSaveArticle = (article) => {
    // Implement your logic to save the article here
    console.log('Article saved:', article);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Sports News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {news.map((article, index) => (
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
                    <button className="save-icon" onClick={() => handleSaveArticle(article)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn">
            Previous Page
          </button>
          <button onClick={() => setPage(page + 1)} className="btn ml-4">
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sports;
