export default function Sidebar({ onNavigate, currentView }) {
  const navItems = [
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'Customers', id: 'customers' },
    { name: 'Analytics', id: 'analytics' },
    { name: 'Reports', id: 'reports' },
    { name: 'Settings', id: 'settings' },
  ];

  return (
    <aside className="w-64 border-r h-[calc(100vh-64px)]">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                  currentView === item.id ? 'bg-gray-100' : ''
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 