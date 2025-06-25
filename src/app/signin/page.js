'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import supabase from '../../lib/supabaseClient';

export default function SignIn() {
  const router = useRouter();
    const [formData, setFormData] = useState({
      fullName: '',
      password: '',
    });
      const [message, setMessage] = useState('');
      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

const handleSignIn = async (e) => {
     e.preventDefault();
  setLoading(true);
  setMessage('');

  const { fullName, password } = formData;

  try {
    // Generate username from full name
    const username = fullName.toLowerCase().replace(/ /g, '_');

    // Step 1: Query user by username
    const { data: user, error: fetchError } = await supabase
      .from('custom_users')
      .select('*')
      .eq('username', username)
      .single();

    if (fetchError || !user) {
      setMessage('User not found');
      setLoading(false);
      return;
    }

    // Step 2: Compare passwords (we'll hash these later)
    if (user.password !== password) {
      setMessage('Invalid password');
      setLoading(false);
      return;
    }

    // Step 3: Success — redirect
    setMessage('✅ Signing in...');
    setTimeout(() => {
      router.push('/claim-notification');
    }, 1000);

  } catch (err) {
    setMessage('Unexpected error. Please try again.');
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>

        {message && (
          <div
            className={`p-3 mb-6 text-white rounded ${
              message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSignIn}>
          {/* Email Field */}
          {/* Full Name Field */}
<div>
  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
    Full Name
  </label>
  <input
    id="fullName"
    name="fullName"
    type="text"
    required
    value={formData.fullName}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    placeholder="John Doe"
  />
</div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-medium rounded-lg shadow-md transition ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don{"'"}t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
