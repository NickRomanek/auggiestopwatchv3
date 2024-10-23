import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { Footer } from './components/Footer';
import { Version } from './components/Version';
import { Leaderboard } from './components/Leaderboard';
import { NameEntry } from './components/NameEntry';

export const APP_VERSION = 'v1.0.0';
export const VERSION_DATE = '2024-03-19';

interface LeaderboardEntry {
  name: string;
  time: number;
}

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time => time + 10), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleSubmitScore = () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }

    const newEntry = { name: playerName.trim(), time };
    
    setLeaderboard(prevLeaderboard => {
      const existingEntryIndex = prevLeaderboard.findIndex(
        entry => entry.name.toLowerCase() === playerName.toLowerCase()
      );

      let newLeaderboard;
      if (existingEntryIndex >= 0) {
        // Update only if new time is better
        if (time < prevLeaderboard[existingEntryIndex].time) {
          newLeaderboard = [...prevLeaderboard];
          newLeaderboard[existingEntryIndex] = newEntry;
        } else {
          return prevLeaderboard;
        }
      } else {
        newLeaderboard = [...prevLeaderboard, newEntry];
      }

      // Sort by time and keep top 10
      return newLeaderboard
        .sort((a, b) => a.time - b.time)
        .slice(0, 10);
    });

    handleReset();
  };

  const handleResetLeaderboard = () => {
    if (window.confirm('Are you sure you want to reset the leaderboard?')) {
      setLeaderboard([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#2A3990] mb-6">Leaderboard</h2>
            <NameEntry 
              playerName={playerName}
              onNameChange={setPlayerName}
              onSubmit={handleSubmitScore}
              disabled={!time || isRunning}
            />
            <Leaderboard 
              entries={leaderboard}
              onReset={handleResetLeaderboard}
            />
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Timer time={time} />
            <Controls 
              isRunning={isRunning}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
            />
            <Version />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;