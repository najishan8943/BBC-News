import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>

      <div className="bg-white flex justify-center py-3 border-b border-gray-300 relative">

        <div className="absolute left-4 top-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl font-bold text-gray-700 hover:text-black" >
            ☰
          </button>
        </div>

        <div className="flex gap-1">
          <div className="bg-black text-white font-bold px-3 py-2 text-4xl">B</div>
          <div className="bg-black text-white font-bold px-3 py-2 text-4xl">B</div>
          <div className="bg-black text-white font-bold px-3 py-2 text-4xl">C</div>
        </div>

      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50">

          <div className="w-64 h-full bg-white shadow-lg p-5">

            <button
              onClick={() => setMenuOpen(false)}
              className="text-xl font-bold mb-4"  >
              ✕ Close
            </button>

            <div className="flex flex-col gap-3 text-sm">

              <Link onClick={() => setMenuOpen(false)} to="/" className="hover:text-gray-600">Home</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Sports" className="hover:text-gray-600">Sports</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Business" className="hover:text-gray-600">Business</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Technology" className="hover:text-gray-600">Technology</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Health" className="hover:text-gray-600">Health</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Culture" className="hover:text-gray-600">Culture</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Arts" className="hover:text-gray-600">Arts</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Travel" className="hover:text-gray-600">Travel</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Weather" className="hover:text-gray-600">Weather</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Audio" className="hover:text-gray-600">Audio</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Video" className="hover:text-gray-600">Video</Link>
              <Link onClick={() => setMenuOpen(false)} to="/category/Live" className="hover:text-gray-600">Live</Link>

            </div>

          </div>

          <div
            className="flex-1"
            onClick={() => setMenuOpen(false)}></div>

        </div>
      )}

      <div className="bg-white border-b border-gray-200">
        <div className="flex gap-6 px-6 py-3 text-sm overflow-x-auto whitespace-nowrap justify-center">

          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/category/Sports" className="hover:text-gray-600">Sports</Link>
          <Link to="/category/Business" className="hover:text-gray-600">Business</Link>
          <Link to="/category/Technology" className="hover:text-gray-600">Technology</Link>
          <Link to="/category/Health" className="hover:text-gray-600">Health</Link>
          <Link to="/category/Culture" className="hover:text-gray-600">Culture</Link>
          <Link to="/category/Arts" className="hover:text-gray-600">Arts</Link>
          <Link to="/category/Travel" className="hover:text-gray-600">Travel</Link>
          <Link to="/category/Weather" className="hover:text-gray-600">Weather</Link>
          <Link to="/category/Audio" className="hover:text-gray-600">Audio</Link>
          <Link to="/category/Video" className="hover:text-gray-600">Video</Link>
          <Link to="/category/Live" className="hover:text-gray-600">Live</Link>

        </div>
      </div>

    </div>
  );
};

export default Navbar;