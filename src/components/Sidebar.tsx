import React, { useState } from 'react';
import { Home, BarChart2, Users, Settings, Database, FileText, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  active: boolean;
  children?: { name: string; active: boolean }[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  // Bottleneck: Too many state items causing re-renders
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState<Record<string, number>>({});
  
  // Bottleneck: Creating menu items array on every render
  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: <Home size={20} />, active: true },
    { 
      name: 'Analytics', 
      icon: <BarChart2 size={20} />, 
      active: false,
      children: [
        { name: 'Reports', active: false },
        { name: 'Metrics', active: false },
        { name: 'Statistics', active: false },
      ]
    },
    { name: 'Users', icon: <Users size={20} />, active: false },
    { name: 'Database', icon: <Database size={20} />, active: false },
    { name: 'Documents', icon: <FileText size={20} />, active: false },
    { name: 'Settings', icon: <Settings size={20} />, active: false },
    { name: 'Help', icon: <HelpCircle size={20} />, active: false },
  ];
  
  const handleClick = (itemName: string) => {
    // Bottleneck: Complex state update logic on each click
    setClickCount(prev => ({ ...prev, [itemName]: (prev[itemName] || 0) + 1 }));
    
    if (expandedItem === itemName) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemName);
    }
    
    // Bottleneck: Unnecessary re-creation of the entire array
    const newItems = [...menuItems];
    for (let i = 0; i < newItems.length; i++) {
      newItems[i].active = newItems[i].name === itemName;
    }
  };
  
  // Bottleneck: Calculate this on every render
  const getActiveMenuItems = () => {
    return menuItems.filter(item => item.active);
  };
  
  // This is called on every render but doesn't do anything useful
  getActiveMenuItems();
  
  return (
    <aside 
      className={`bg-white shadow-md transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } h-screen overflow-y-auto`}
    >
      <div className="p-4 flex items-center justify-center border-b border-gray-200">
        <h2 className={`font-bold text-blue-600 ${isOpen ? 'text-xl' : 'text-sm'}`}>
          {isOpen ? 'Performance Demo' : 'PD'}
        </h2>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={item.name} className="mb-1">
              <div 
                onClick={() => handleClick(item.name)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  flex items-center px-4 py-3 cursor-pointer
                  ${item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </div>
              
              {isOpen && item.children && expandedItem === item.name && (
                <ul className="ml-10 mt-1">
                  {item.children.map((child, childIndex) => (
                    <li 
                      key={child.name}
                      className={`
                        py-2 px-2 text-sm cursor-pointer
                        ${child.active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}
                      `}
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;