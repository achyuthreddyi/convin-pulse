'use client';
import { useState } from 'react';
import CustomerTabs from './components/CustomerTabs';
import CustomerList from './components/CustomerList';

export default function Customers() {
  const [activeTab, setActiveTab] = useState('all');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'all':
        return <CustomerList />;
      case 'active':
        return <div className="p-6">Active customers view</div>;
      case 'inactive':
        return <div className="p-6">Inactive customers view</div>;
      case 'new':
        return <div className="p-6">New customers view</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-gray-600">Manage and view your customer information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <CustomerTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
} 