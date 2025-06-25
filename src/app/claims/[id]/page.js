// src/app/claim/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '../../../lib/supabaseClient'; // Make sure this is working!

export default function ClaimDetailsPage({ params }) {
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  const claimId = params.id;

  useEffect(() => {
    const fetchClaim = async () => {
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .eq('id', claimId)
        .single();

      if (error) {
        console.error('Error fetching claim:', error);
        setLoading(false);
        return;
      }

      setClaim(data);
      setLoading(false);
    };

    fetchClaim();
  }, [claimId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading claim details...</p>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Claim Not Found</h2>
          <p className="text-gray-600 mb-6">No claim found with that ID.</p>
          <Link href="/claims" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Claims List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Claim Details</h1>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              claim.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : claim.status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            Status: {claim.status || 'pending'}
          </span>
        </div>

        {/* Summary Info - Top Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Policy Holder</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{claim.full_name}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Policy Number</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{claim.policy_number}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Incident Date</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(claim.incident_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Type of Incident</h3>
              <p className="mt-1 text-lg capitalize font-semibold text-gray-900">
                {claim.incident_type || 'N/A'}
              </p>
            </div>
          </div>
        </section>

        {/* Policy Holder Info */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Policy Holder Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">National ID / Passport</h3>
              <p className="mt-1 text-gray-800">{claim.national_id || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
              <p className="mt-1 text-gray-800">{claim.phone_number || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
              <p className="mt-1 text-gray-800">{claim.email || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1 text-gray-800">{claim.address || 'N/A'}</p>
            </div>
          </div>
        </section>

        {/* Policy Details */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Policy Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Policy Type</h3>
              <p className="mt-1 text-gray-800">{claim.policy_type || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Coverage Details</h3>
              <p className="mt-1 text-gray-800">{claim.coverage_details || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Effective Date</h3>
              <p className="mt-1 text-gray-800">
                {claim.effective_date
                  ? new Date(claim.effective_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Expiry Date</h3>
              <p className="mt-1 text-gray-800">
                {claim.expiry_date
                  ? new Date(claim.expiry_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </section>

        {/* Incident Details */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Incident Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date of Incident</h3>
              <p className="mt-1 text-gray-800">
                {claim.incident_date
                  ? new Date(claim.incident_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Time of Incident</h3>
              <p className="mt-1 text-gray-800">{claim.incident_time || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="mt-1 text-gray-800">{claim.incident_location || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-gray-800">{claim.incident_description || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Police Report No.</h3>
              <p className="mt-1 text-gray-800">{claim.police_report_number || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Injured?</h3>
              <p className="mt-1 text-gray-800">{claim.injured ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Third Party Involved?</h3>
              <p className="mt-1 text-gray-800">{claim.third_party ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </section>

        {/* Claim Details */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Claim Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Estimated Loss Amount</h3>
              <p className="mt-1 text-gray-800">{claim.loss_amount ? `ETB ${claim.loss_amount}` : 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Deductibles</h3>
              <p className="mt-1 text-gray-800">{claim.deductibles ? `ETB ${claim.deductibles}` : 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Previous Claims</h3>
              <p className="mt-1 text-gray-800">{claim.previous_claims || 'None'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Compensation Method</h3>
              <p className="mt-1 text-gray-800">{claim.compensation_method || 'N/A'}</p>
            </div>
          </div>
        </section>

        {/* Declaration & Consent */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Declaration & Consent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Signature</h3>
              <p className="mt-1 text-gray-800">{claim.signature || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Declaration Date</h3>
              <p className="mt-1 text-gray-800">
                {claim.declaration_date
                  ? new Date(claim.declaration_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-6">
          <Link href="/claims" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Claims List</span>
          </Link>
        </div>
      </div>
    </div>
  );
}