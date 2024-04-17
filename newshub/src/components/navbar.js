import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './profile';

function Navbar() {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(""); // State to store the search query

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (query.trim() === "") {
          setNews([]); // Clear news if there's no query
          return;
        }
        const response = await axios.get(`${process.env.REACT_APP_NEWS_API_LINK}`, {
          params: {
            q: query, // Pass the query as a parameter
            category: 'general',
            country: 'in',
            pageSize: 21, // Number of articles per page
            page: page,
            apiKey: `${process.env.REACT_APP_NEWS_API_KEY}`,
          },
        });
        setNews(response.data.articles.filter(article => article.title !== "[Removed]"));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [page, query]); // Include query in the dependency array to refetch news when the query changes

  const handleInputChange = (event) => {
    setQuery(event.target.value); // Update the query state when input changes
  };
  
  const handleSaveArticle = (articleIndex) => {
    // Implement your logic to save the article here
    const article = news[articleIndex];
    console.log('Article saved:', article);
    const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
    savedArticles.push(article);
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  };
  

  return (
    <div>
      <header className="p-3 bg-blue-600 flex ">
        <div className="container">
          <div className="flex flex-wrap align-items-center justify-content-center justify-content-lg-start ">

            <img className='h-10  pr-5' src="./newshub.svg" alt="" />

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="./home" className="nav-link px-2 text-white">HOME</a></li>
              <li><a href="./health" className="nav-link px-2 text-white">HEALTH</a></li>
              <li><a href="./finance" className="nav-link px-2 text-white">FINANCE</a></li>
              <li><a href="./entertainment" className="nav-link px-2 text-white">ENTERTAINMENT</a></li>
              <li><a href="./politics" className="nav-link px-2 text-white">TECHNOLOGY</a></li>
              <li><a href="./sports" className="nav-link px-2 text-white">SPORTS</a></li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input
                type="search"
                className="form-control form-control-dark text-bg-light"
                placeholder="Search..."
                aria-label="Search"
                value={query}
                onChange={handleInputChange} // Call handleInputChange on input change
              />
            </form>

            <div className="text-end">
              {!isAuthenticated &&
                <button onClick={() => loginWithRedirect()} type="button" className="btn btn-outline-light me-2transition duration-300 transform hover:scale-140">Login</button>
              }
              {isAuthenticated &&
                <Profile />
              }
            </div>
          </div>
        </div>
      </header>

      {/* Display search results below the Navbar only if there is a query */}
      {query.trim() !== "" && (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {news.map((article, index) => (
              article.title !== "[Removed]" || article.urlToImage !== "[Removed]" ? (
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
        </div>
      )}
    </div>
  )
}

export default Navbar;
