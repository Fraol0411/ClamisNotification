// src/app/claim-notification/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import supabase from '../../lib/supabaseClient';


export default function ClaimNotificationPage() {

   const [formData, setFormData] = useState({
    fullName: '',
    policyNumber: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    address: '',

    policyType: '',
    coverageDetails: '',
    effectiveDate: '',
    expiryDate: '',

    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentType: '',
    incidentDescription: '',
    policeReport: '',
    injured: false,
    thirdParty: false,

    lossAmount: '',
    deductibles: '',
    previousClaims: '',
    compensationMethod: '',

    signature: '',
    declarationDate: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };



  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  const {
    fullName,
    policyNumber,
    idNumber,
    phoneNumber,
    email,
    address,
    policyType,
    coverageDetails,
    effectiveDate,
    expiryDate,
    incidentDate,
    incidentTime,
    incidentLocation,
    incidentType,
    incidentDescription,
    policeReport,
    injured,
    thirdParty,
    lossAmount,
    deductibles,
    previousClaims,
    compensationMethod,
    signature,
    declarationDate,
  } = formData;

  const { error } = await supabase.from('claims').insert([
    {
      full_name: fullName,
      policy_number: policyNumber,
      national_id: idNumber,
      phone_number: phoneNumber,
      email,
      address,
      policy_type: policyType,
      coverage_details: coverageDetails,
      effective_date: effectiveDate,
      expiry_date: expiryDate,
      incident_date: incidentDate,
      incident_time: incidentTime,
      incident_location: incidentLocation,
      incident_type: incidentType,
      incident_description: incidentDescription,
      police_report_number: policeReport,
      injured,
      third_party: thirdParty,
      loss_amount: parseFloat(lossAmount) || null,
      deductibles: parseFloat(deductibles) || null,
      previous_claims: previousClaims,
      compensation_method: compensationMethod,
      signature,
      declaration_date: declarationDate,
    },
  ]);

  if (error) {
    setMessage(`Error submitting claim: ${error.message}`);
    setLoading(false);
    return;
  }

  setMessage('✅ Claim submitted successfully!');
  setLoading(false);

  // Optionally reset form or redirect
  setTimeout(() => {
    window.location.href = '/claim-confirmation';
  }, 2000);
};



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gray-50  rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Insurance Claim Notification</h1>
        <p className="text-center text-gray-600 mb-10">
          Please fill out the form below with accurate information about your insurance claim.
        </p>

        <form className="space-y-12" onSubmit={handleSubmit}>
          {/* 🧾 Policy Holder Information */}
          <section className="border-b pb-8 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Policy Holder Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Number
                </label>
                <input
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="POL-123456"
                />
              </div>
              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  National ID / Passport Number
                </label>
                <input
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="ID-123456789"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="tel"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="+251912345678"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address (City, Sub-city, House No.)
                </label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Addis Ababa, Kirkos, House No. 123"
                />
              </div>
            </div>
          </section>

          {/* 📄 Policy Details */}
          <section className="border-b pb-8 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Policy Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="policyType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Policy
                </label>
                <select
                  id="policyType"
                  name="policyType"
                  value={formData.policyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                >
                  <option value="">Select policy type</option>
                  <option value="motor">Motor</option>
                  <option value="life">Life</option>
                  <option value="property">Property</option>
                  <option value="health">Health</option>
                </select>
              </div>
              <div>
                <label htmlFor="coverageDetails" className="block text-sm font-medium text-gray-700 mb-1">
                  Coverage Details
                </label>
                <input
                  id="coverageDetails"
                  name="coverageDetails"
                  value={formData.coverageDetails}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Comprehensive / Third Party / Basic"
                />
              </div>
              <div>
                <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Effective Date
                </label>
                <input
                  id="effectiveDate"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleChange}
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            </div>
          </section>

          {/* 🚨 Incident Details */}
          <section className="border-b pb-8 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Incident Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Incident
                </label>
                <input
                  id="incidentDate"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="incidentTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Incident
                </label>
                <input
                  id="incidentTime"
                  name="incidentTime"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="incidentLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Location of Incident
                </label>
                <input
                  id="incidentLocation"
                  name="incidentLocation"
                  value={formData.incidentLocation}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Addis Ababa, Bole Road"
                />
              </div>
              <div>
                <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Incident
                </label>
                <select
                  id="incidentType"
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                >
                  <option value="">Select incident type</option>
                  <option value="accident">Accident</option>
                  <option value="theft">Theft</option>
                  <option value="fire">Fire</option>
                  <option value="illness">Illness</option>
                  <option value="death">Death</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Cause of Loss / Description of Incident
                </label>
                <textarea
                  id="incidentDescription"
                  name="incidentDescription"
                  value={formData.incidentDescription}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Describe what happened..."
                ></textarea>
              </div>
              <div>
                <label htmlFor="policeReport" className="block text-sm font-medium text-gray-700 mb-1">
                  Police Report Number (if applicable)
                </label>
                <input
                  id="policeReport"
                  name="policeReport"
                  value={formData.policeReport}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="PR-123456"
                />
              </div>
              <div>
                <label htmlFor="injured" className="block text-sm font-medium text-gray-700 mb-1">
                  Was anyone injured or killed?
                </label>
                <select
                  id="injured"
                  name="injured"
                  value={formData.injured}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <label htmlFor="thirdParty" className="block text-sm font-medium text-gray-700 mb-1">
                  Was a third party involved?
                </label>
                <select
                  id="thirdParty"
                  name="thirdParty"
                  value={formData.thirdParty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
          </section>

          📷 Supporting Documents
          {/* <section className="border-b pb-8 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Supporting Documents</h2>
            <p className="text-sm text-gray-500 mb-4">You can upload up to 5 files (PDF, JPG, PNG, Max 10MB)</p>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
                  Photos/Videos of Damage
                </label>
                <input
                  id="photos"
                  name="photos"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="policeReportFile" className="block text-sm font-medium text-gray-700 mb-1">
                  Police Reports
                </label>
                <input
                  id="policeReportFile"
                  name="policeReportFile"
                  type="file"
                  accept=".pdf,.doc,.jpg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="medicalReports" className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Reports (for health/life claims)
                </label>
                <input
                  id="medicalReports"
                  name="medicalReports"
                  type="file"
                  accept=".pdf,.doc,.jpg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="deathCertificate" className="block text-sm font-medium text-gray-700 mb-1">
                  Death Certificate (for life insurance)
                </label>
                <input
                  id="deathCertificate"
                  name="deathCertificate"
                  type="file"
                  accept=".pdf,.doc,.jpg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="repairEstimate" className="block text-sm font-medium text-gray-700 mb-1">
                  Repair Estimates / Invoices
                </label>
                <input
                  id="repairEstimate"
                  name="repairEstimate"
                  type="file"
                  accept=".pdf,.doc,.jpg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label htmlFor="driversLicense" className="block text-sm font-medium text-gray-700 mb-1">
                  Driver’s License (for motor claims)
                </label>
                <input
                  id="driversLicense"
                  name="driversLicense"
                  type="file"
                  accept=".pdf,.doc,.jpg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            </div>
          </section> */}

          {/* 💰 Claim Details */}
          {/* <section className="border-b pb-8 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Claim Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="lossAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Loss Amount
                </label>
                <input
                  id="lossAmount"
                  name="lossAmount"
                  type="number"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="ETB 50,000"
                />
              </div>
              <div>
                <label htmlFor="deductibles" className="block text-sm font-medium text-gray-700 mb-1">
                  Any Deductibles
                </label>
                <input
                  id="deductibles"
                  name="deductibles"
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="ETB 5,000"
                />
              </div>
              <div>
                <label htmlFor="previousClaims" className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Claims (optional)
                </label>
                <textarea
                  id="previousClaims"
                  name="previousClaims"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="List any previous claims if applicable"
                ></textarea>
              </div>
              <div>
                <label htmlFor="compensationMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Compensation Method
                </label>
                <select
                  id="compensationMethod"
                  name="compensationMethod"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                >
                  <option value="">Select method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                  <option value="mobile_money">Mobile Money</option>
                </select>
              </div>
            </div>
          </section> */}

          {/* ✍️ Declaration & Consent */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Declaration & Consent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">
                  Signature
                </label>
                <input
                  id="signature"
                  name="signature"
                  value={formData.signature}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="declarationDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  id="declarationDate"
                  name="declarationDate"
                  value={formData.declarationDate}
                  onChange={handleChange}
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  I consent to the investigation and use of my personal data in accordance with the company privacy policy.
                </span>
              </label>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Submit Claim
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`p-3 mt-6 text-white rounded ${
              message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {message}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}