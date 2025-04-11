import React, { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [quote, setQuote] = useState({
    text: 'Click On Generate Button to Get Daily Quotes',
    author: ''
  });

  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    setLoading(true); // Start loading

    // Show loading text :
    setQuote({
      text: '🔄 Loading quote...',
      author: ''
    });

    try {
      const response = await fetch("/api/api/random");
      const data = await response.json();
      setQuote({
        text: data[0].q,
        author: data[0].a
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({
        text: '⚠️ Failed to fetch quote. Please try again.',
        author: ''
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const copyToClip = () => {
    const textToCopy = `${quote.text} — ${quote.author}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch(() => {
        alert("Failed to copy");
      });
  };

  return (
    <>
      <div className="container">
        <div className="content">

          <div className="title">
            <h1>Daily Quotes</h1>
          </div>

          <div className="quote-content">
            <h1 className={`quote-text ${loading ? 'typing' : ''}`}>{quote.text}</h1>
            <p className='quote-auth'>{quote.author}</p>
          </div>

          <div className="button-sec">
            <button onClick={getQuote} disabled={loading}>GENERATE</button>
            <button onClick={copyToClip}>COPY</button>
          </div>

        </div>
        <h3>Made With <b>&#9829;</b> By <span>Rana Huzaifa</span></h3>
        <div className='copy'>
          <h3>All Copyrights are Reserved &copy;</h3>
        </div>
      </div>
    </>
  )
}

export default App
