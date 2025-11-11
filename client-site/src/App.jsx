import React from 'react';
import { Routes, Route } from "react-router-dom";
import Converter from './pages/Converter';
import Subscription from './pages/Subscription';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />

      {/* Pages */}
      <main className="pt-24 pb-16">
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </main>
    </>
  );
}
