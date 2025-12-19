
import React from 'react';
import { DumbbellIcon } from './icons/DumbbellIcon';

interface HeaderProps {
  isOwnerView: boolean;
  onToggleView: () => void;
  userRole: 'owner' | 'member';
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isOwnerView, onToggleView, userRole, onLogout }) => {
  return (
    <header className="bg-white p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <DumbbellIcon className="w-8 h-8 text-cyan-500" />
          <h1 className="text-2xl font-bold tracking-wider text-gray-800">AS FITNESS CLUB</h1>
        </div>
        <div className="flex items-center space-x-4">
          {userRole === 'owner' && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Member</span>
              <label htmlFor="view-toggle" className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  id="view-toggle" 
                  className="sr-only peer" 
                  checked={isOwnerView}
                  onChange={onToggleView} 
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-cyan-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
              <span className="text-sm text-gray-500">Owner</span>
            </div>
          )}
          <button 
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
