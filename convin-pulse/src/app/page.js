'use client';
import { useState } from 'react';
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Customers from "./components/features/Customers";

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch(currentView) {
      case 'customers':
        return <Customers />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome to Convin Pulse</h1>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar onNavigate={setCurrentView} currentView={currentView} />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
