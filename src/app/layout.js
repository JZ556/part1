import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1
const day = new Date().getDate();

export const metadata = {
  title: "LTU Moodle HTML Generator",
  description: "Generate HTML5 code for Moodle LMS deployment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('darkMode');
                if (savedTheme === 'true') {
                  document.documentElement.classList.add('dark-mode');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} d-flex flex-column min-vh-100`}>
        {/* Header Section */}
        <header className="container-fluid bg-light py-2 border-bottom">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="mb-0">Assignment 1</h4>
            </div>
            <div className="col-auto">
              <span className="fw-bold">Student No.22065684</span>
            </div>
          </div>
        </header>
        {/* Navigation Section */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-light text-dark text-center py-3 mt-auto">
          <div className="container">
            <p className="mb-0">
              Copyright © Student Name: Shengzhe Zhou, Student No: 22065684, {day}/{month}/{year}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
