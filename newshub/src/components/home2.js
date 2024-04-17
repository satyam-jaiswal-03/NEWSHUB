import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar'; // Assuming Navbar component is in a file named Navbar.js

const Home2 = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            category: 'general',
            country: 'in',
            pageSize: 21, // Number of articles per page
            page: page,
            apiKey: `${process.env.REACT_APP_NEWS_API_KEY}`,
          },
        });
        setNews(response.data.articles.filter(article => article.title !== "[Removed]"));
        console.log(news)
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
      
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8"></h2>
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
                    <button className="save-icon" onClick={() => handleSaveArticle(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
</svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button  onClick={() => setPage(page - 1)} disabled={page === 1} className="btn  bg-blue-600 hover:bg-yellow-400 text-white">
            Previous Page
          </button>
          <button onClick={() => setPage(page + 1)} className="btn ml-4  bg-blue-600 hover:bg-yellow-400 text-white">
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home2;
