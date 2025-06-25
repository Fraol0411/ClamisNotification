// src/app/page.js
import Link from 'next/link';

export default function Home() {
  return (
   <main className="bg-gradient-to-b from-blue-50 to-white pt-24">
      {/* Hero Section */}
      <section className="h-[30vh] flex items-center justify-center px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Secure Your Valuables with Smart Insurance
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto">
            Get an instant quote for your item and protect it with our flexible insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link href="/quote" className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md">
              Get a Free Quote
            </Link> */}
            <Link href="/signin" className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-gray-300 transition shadow-md">
              Report a Claim
            </Link>
            <Link href="/claims" className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-gray-300 transition shadow-md">
              Claims List
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-blue-600 font-bold mb-10">Why Choose Us?</h2>
          <div className="grid text-blue-600 grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Instant Quotes</h3>
              <p className="text-gray-600">Calculate your insurance cost in seconds with our smart tool.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Fast Claims</h3>
              <p className="text-gray-600">Submit and track claims online without visiting the office.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-gray-600">Your data is protected with bank-level security and encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Protect What Matters Most?</h2>
        <p className="mb-6 max-w-md mx-auto text-blue-100">
          Join thousands of satisfied customers who trust us with their valuables.
        </p>
        <Link href="/quote" className="inline-block px-8 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition">
          Get Started Now
        </Link>
      </section>
    </main>
  );
}