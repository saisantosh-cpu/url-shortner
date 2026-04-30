import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!longUrl) {
      alert("Enter a URL");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/shorten", {
        longUrl,
        customCode,
      });

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert("Error connecting to backend");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <div className="card">

        <div className="card-header">
          <div className="card-logo">🔗</div>
          <h2>URL Shortener</h2>
          <p className="card-subtitle">Shrink any link in seconds</p>
        </div>

        <div className="field">
          <label>Destination URL</label>
          <div className="input-wrapper">
            <span className="input-icon">🌐</span>
            <input
              placeholder="https://your-long-url.com/goes-here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>
            Custom alias
            <span className="badge-optional">optional</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">✏️</span>
            <input
              placeholder="my-brand-link"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
            />
          </div>
        </div>

        <button onClick={handleShorten}>Shorten URL</button>

        {shortUrl && (
          <>
            <div className="divider" />
            <div className="result-box">
              <p className="result-label">Ready to share</p>
              <div className="result-row">
                <a href={shortUrl} target="_blank" rel="noreferrer">
                  {shortUrl}
                </a>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>
          </>
        )}

        <p className="card-footer">Free · No sign-up · Instant</p>
      </div>
    </div>
  );
}

export default App;