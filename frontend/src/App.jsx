import { useState, useEffect } from "react";
import axios from "axios";

// Static base URL (no dynamic switching)
const api = axios.create({
  baseURL: 'https://crash.airhosts.org'
});

function App() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teddyMood, setTeddyMood] = useState("😇");
  const [restartCount, setRestartCount] = useState(0);
  const [lastRestart, setLastRestart] = useState(null);
  const [teddyQuotes] = useState([
    "Have you tried turning it off and on again? That's my specialty!",
    "I promise I'm helping... technically.",
    "Servers fear me, developers love me!",
    "Oops, I did it again...",
    "It's not chaos, it's surprise maintenance!",
    "Debug? More like de-bear!",
    "Error 404: Teddy's innocence not found",
  ]);
  const [currentQuote, setCurrentQuote] = useState(teddyQuotes[0]);

  useEffect(() => {
    const savedCount = localStorage.getItem('teddyRestartCount');
    if (savedCount) setRestartCount(parseInt(savedCount, 10));
    const savedLastRestart = localStorage.getItem('teddyLastRestart');
    if (savedLastRestart) setLastRestart(new Date(savedLastRestart));
  }, []);

  const restartContainer = async () => {
    try {
      setIsLoading(true);
      setTeddyMood("😈");
      setStatus("Oops! Teddy knocked over the server again! Picking it up...");
      setCurrentQuote(teddyQuotes[Math.floor(Math.random() * teddyQuotes.length)]);
      
      // POST to /api/restart; no payload is needed since the backend always restarts "mc-mc-1"
      await api.post("/api/restart");
      
      const newCount = restartCount + 1;
      setRestartCount(newCount);
      localStorage.setItem('teddyRestartCount', newCount);
      
      const now = new Date();
      setLastRestart(now);
      localStorage.setItem('teddyLastRestart', now.toISOString());
      
      setStatus("Teddy put the server back up! (Until next time... 👀)");
      setTeddyMood("😇");
    } catch (error) {
      if (error.response?.status === 429) {
        setStatus(`Teddy is taking a quick nap! Try again in ${error.response.data.remainingTime} seconds 😴`);
        setTeddyMood("😴");
      } else {
        setStatus("Even Teddy couldn't fix what Teddy broke this time! 🙈");
        setTeddyMood("😅");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8 relative border-t-4 border-purple-500">
        {/* Floating Teddy */}
        <div 
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-8xl cursor-pointer hover:scale-110 transition-transform duration-200 animate-[bounce_2s_ease-in-out_infinite]"
          onClick={() => setTeddyMood(["😇", "😈", "😅", "😴", "🥳"][Math.floor(Math.random() * 5)])}
        >
          {teddyMood}
        </div>
        
        {/* Title */}
        <div className="mt-8 mb-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Teddy No Crashing
            <span className="block text-sm text-red-500 font-normal">
              (But Actually Yes Crashing)
            </span>
          </h1>
        </div>
        
        {/* Quote Box */}
        <div className="bg-purple-50 rounded-lg p-4 mb-6 transform hover:scale-105 transition-transform duration-200">
          <p className="text-gray-700 text-center">
            {currentQuote}
            <br/>
            <span className="text-sm text-purple-600 italic mt-2 block">
              - Teddy, Professional Chaos Engineer
            </span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{restartCount}</div>
            <div className="text-sm text-gray-600">Servers "Fixed"</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-600 truncate">
              {lastRestart ? new Date(lastRestart).toLocaleTimeString() : 'Never'}
            </div>
            <div className="text-sm text-gray-600">Last Incident</div>
          </div>
        </div>

        {/* Main Button */}
        <button 
          onClick={restartContainer} 
          disabled={isLoading}
          className={`
            w-full py-4 px-6 rounded-lg font-bold text-white
            transition-all duration-200 transform hover:scale-105
            ${isLoading 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Teddy is doing... something
            </span>
          ) : (
            <>
              Let Teddy "Fix" the Server
              <span className="block text-xs mt-1">
                (What could go wrong?)
              </span>
            </>
          )}
        </button>

        {/* Status Message */}
        {status && (
          <div className={`
            mt-6 p-4 rounded-lg text-center font-medium
            transition-all duration-200 transform hover:scale-105
            ${status.includes('back up') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
            }
          `}>
            {status}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="italic hover:text-purple-500 transition-colors duration-200 cursor-default">
            "It's not a bug, it's a feature!" - Teddy's daily motto
          </p>
          <p className="mt-2 text-xs">
            Disclaimer: No servers were permanently harmed in Teddy's learning process
          </p>
        </div>

        {/* Achievement Badge */}
        {restartCount > 10 && (
          <div className="absolute -right-3 -top-3 bg-yellow-400 text-white p-2 rounded-full transform rotate-12 text-xs font-bold animate-pulse">
            🏆 Chaos Expert
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
