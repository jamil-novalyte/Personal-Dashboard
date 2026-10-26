'use client';
import { useState } from 'react';

const tabs = ['Today', 'Bridge', 'Jobs', 'Novalyte', 'Investors', 'Overnight', 'Settings'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <main className="flex flex-col h-full">
      <header className="sticky top-0 bg-[#FAF9F6]/95 backdrop-blur border-b border-[#E5E9E7] px-4 py-4 z-10">
        <h1 className="text-2xl font-bold text-[#171D27]">Command Brief</h1>
        <p className="text-sm text-[#626B78]">Oct 25, 2026 · 3 actions · UPS in 9 days</p>
      </header>

      <nav className="flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-[#E5E9E7]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              activeTab === tab 
                ? 'bg-[#009B87] text-white' 
                : 'bg-[#EAFBF5] text-[#005F58]'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Viewing: {activeTab}</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E9E7]">
          <p className="text-[#89919B]">Dashboard content for {activeTab} will be implemented in next turn.</p>
        </div>
      </section>
      
      <footer className="p-4 text-center text-xs text-[#89919B] border-t border-[#E5E9E7]">
        Backend will refresh this overnight. Data below is mock.
      </footer>
    </main>
  );
}
