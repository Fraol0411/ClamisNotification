// src/app/layout.js
import './globals.css'; 
import Header from '../components/layout/Header';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}