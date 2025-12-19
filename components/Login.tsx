
import React, { useState } from 'react';
import { DumbbellIcon } from './icons/DumbbellIcon';

interface LoginProps {
  onLogin: (role: 'owner' | 'member') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded auth logic for demonstration
    if (email.toLowerCase() === 'owner@asfitness.com' && password === 'password') {
      onLogin('owner');
    } else {
      onLogin('member');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8">
            <div className="flex flex-col items-center mb-6">
                <div className="bg-cyan-500 p-3 rounded-full mb-3">
                    <DumbbellIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-wider">AS FITNESS CLUB</h1>
                <p className="text-gray-500 mt-1">Welcome back! Please sign in.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-300"
                    >
                        Sign in
                    </button>
                </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Owner: `owner@asfitness.com` / `password`</p>
                <p>Any other credentials for Member view.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
