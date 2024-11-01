import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Meditation from '../pages/Meditation';
import MoodTracker from '../pages/MoodTracker';
import Breathing from '../pages/Breathing';
import Tips from '../pages/Tips';

export default function MainContent() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/breathing" element={<Breathing />} />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </main>
  );
}