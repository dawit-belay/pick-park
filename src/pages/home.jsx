import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section - Unique Design */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Gradient background with animated shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-orange-900 opacity-90"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{animationDelay: "2s"}}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{animationDelay: "4s"}}></div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)", backgroundSize: "50px 50px"}}></div>

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-8 max-w-5xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8 inline-block">
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                ✨ NEXT GENERATION PARKING
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl sm:text-8xl font-black mb-6 leading-tight">
              Park
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Smarter</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Experience the future of urban parking. AI-powered spot detection, real-time availability, and instant reservations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/cars"
                className="relative group px-10 py-4 text-lg font-bold overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 group-hover:scale-110 transition-transform duration-300"></div>
                <span className="relative">Get Started Now</span>
              </Link>
              <Link
                to="/admin-login"
                className="px-10 py-4 text-lg font-bold border-2 border-white/30 rounded-full hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
              >
                Admin Access
              </Link>
            </div>

            {/* Stats inline */}
            <div className="flex justify-center gap-12 text-center">
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">10K+</div>
                <div className="text-sm text-gray-400">Active Drivers</div>
              </div>
              <div className="w-px bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">5K+</div>
                <div className="text-sm text-gray-400">Parking Spots</div>
              </div>
              <div className="w-px bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">99%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Unique Layout */}
      <div className="py-32 px-4 sm:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black mb-4">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Pick Park?</span>
            </h2>
            <p className="text-gray-400 text-lg">Cutting-edge features designed for modern drivers</p>
          </div>

          {/* Features Grid - Unique Asymmetric Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div
              onMouseEnter={() => setHoveredFeature(0)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 bg-gradient-to-br from-purple-900/20 to-transparent"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/40 transition-colors">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold mb-4">Lightning Fast</h3>
                <p className="text-gray-300 text-lg leading-relaxed">Find, reserve, and confirm your parking spot in under 60 seconds. Our AI-powered algorithm analyzes thousands of spots in real-time.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onMouseEnter={() => setHoveredFeature(1)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="relative group overflow-hidden rounded-3xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-300 bg-gradient-to-br from-pink-900/20 to-transparent"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pink-500/40 transition-colors">
                  <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Verified Spots</h3>
                <p className="text-gray-400">Every spot is verified and monitored by our trusted partners.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onMouseEnter={() => setHoveredFeature(2)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="relative group overflow-hidden rounded-3xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 bg-gradient-to-br from-orange-900/20 to-transparent"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-500/40 transition-colors">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Affordable</h3>
                <p className="text-gray-400">Transparent pricing with no hidden fees. Save up to 40% compared to street parking.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              onMouseEnter={() => setHoveredFeature(3)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="relative group overflow-hidden rounded-3xl p-8 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 bg-gradient-to-br from-yellow-900/20 to-transparent"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-yellow-500/40 transition-colors">
                  <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Smart Control</h3>
                <p className="text-gray-400">Real-time GPS navigation and one-tap reservation management.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Unique Design */}
      <div className="py-32 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-orange-900/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-black mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Transform</span> Your Parking?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of drivers who've already switched to smarter parking.
          </p>
          <Link
            to="/cars"
            className="relative group inline-block px-12 py-5 text-lg font-bold overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 group-hover:scale-110 transition-transform duration-300"></div>
            <span className="relative">Start Parking Smart Today</span>
          </Link>
        </div>
      </div>

      {/* Footer - Unique Design */}
      <div className="border-t border-white/10 py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Pick Park</h3>
              <p className="text-gray-400 text-sm leading-relaxed">The future of urban parking is here. Smart, fast, and affordable.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Users</h4>
              <ul className="text-sm space-y-3 text-gray-400">
                <li><a href="/cars" className="hover:text-white transition">Find Parking</a></li>
                <li><a href="#" className="hover:text-white transition">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Operators</h4>
              <ul className="text-sm space-y-3 text-gray-400">
                <li><a href="/admin-login" className="hover:text-white transition">Admin Panel</a></li>
                <li><a href="#" className="hover:text-white transition">Partner Program</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Company</h4>
              <ul className="text-sm space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Pick Park. All rights reserved.</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;