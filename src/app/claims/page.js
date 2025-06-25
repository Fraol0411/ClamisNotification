// src/app/claims/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '../../lib/supabaseClient';

export default function ClaimsListPage() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      const { data, error } = await supabase
        .from('claims')
        .select('id, full_name, policy_number, incident_date, incident_type, compensation_method, created_at');

      if (error) {
        console.error('Error fetching claims:', error);
        setLoading(false);
        return;
      }

      setClaims(data);
      setLoading(false);
    };

    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading claims...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Submitted Claims</h1>

        {/* Responsive Table/Card View */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {/* Mobile View: Stacked Cards */}
          <div className="block md:hidden">
            {claims.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No claims found</p>
            ) : (
              claims.map((claim) => (
                <div key={claim.id} className="border-b border-gray-200 p-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs uppercase text-gray-500 font-medium">Policy Holder</span>
                      <p className="font-semibold">{claim.full_name}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-gray-500 font-medium">Policy No.</span>
                      <p>{claim.policy_number}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-gray-500 font-medium">Incident Date</span>
                      <p className="capitalize">{new Date(claim.incident_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-gray-500 font-medium">Type of Incident</span>
                      <p className="capitalize">{claim.incident_type || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-gray-500 font-medium">Compensation Method</span>
                      <p>{claim.compensation_method || 'N/A'}</p>
                    </div>
                    <div className="pt-2 text-right">
                      <Link
                        href={`/claims/${claim.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Claim
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Policy No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incident Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compensation Method
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {claims.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No claims found
                    </td>
                  </tr>
                ) : (
                  claims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {claim.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.policy_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(claim.incident_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-500">
                        {claim.incident_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.compensation_method || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-2">
                        <Link
                          href={`/claims/${claim.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Claim
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}