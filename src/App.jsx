import { useState, useEffect } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [status, setStatus] = useState(null);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [echoResponse, setEchoResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("API URL: ", API_URL);
    fetchStatus();
    fetchItems();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/status`);
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      console.error("Error fetching status:", err);
      setError("Failed to connect to backend");
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/items`);
      const data = await response.json();
      setItems(data.items);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleEcho = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/echo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });
      const data = await response.json();
      setEchoResponse(data);
    } catch (err) {
      console.error("Error echoing message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Railway Demo App</h1>
      <p className="subtitle">React Frontend + FastAPI Backend</p>

      {error && <div className="error">{error}</div>}

      <div className="section">
        <h2>Backend Status</h2>
        {status ? (
          <div className="status-card">
            <p>
              Status: <strong>{status.status}</strong>
            </p>
            <p>
              Environment: <strong>{status.environment}</strong>
            </p>
          </div>
        ) : (
          <p>Loading status...</p>
        )}
      </div>

      <div className="section">
        <h2>Echo Test</h2>
        <form onSubmit={handleEcho}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message..."
            className="input"
          />
          <button type="submit" disabled={loading} className="button">
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        {echoResponse && (
          <div className="response-card">
            <p>
              Received: <strong>{echoResponse.received}</strong>
            </p>
            <p>
              Length: <strong>{echoResponse.length}</strong>
            </p>
          </div>
        )}
      </div>

      <div className="section">
        <h2>Items from Backend</h2>
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
