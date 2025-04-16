import React, { useState } from 'react';
import {
  FaUserMd, FaHeartbeat, FaAllergies, FaSyringe, FaFileMedical, FaPhoneAlt,
  FaWhatsapp, FaTelegramPlane, FaEnvelope, FaCopy, FaEye
} from 'react-icons/fa';

const EmergencyInfo = () => {
  const [showModal, setShowModal] = useState(false);

  const emergencyCode = 'MEDI-429837';
  const shareUrl = `https://mediwallet.app/report/${emergencyCode}`;
  const shareText = `🚨 Emergency Medical Info for John Doe\nAccess it here: ${shareUrl}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10 p-6 bg-white border-2 border-red-600 rounded-2xl shadow-lg font-sans">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-red-700">🚨 Emergency Medical Card</h2>
        <p className="text-gray-600 font-medium text-sm md:text-base">Vital Patient Information</p>
      </div>

      <div className="space-y-3 text-gray-800 text-sm md:text-base">
        <p><FaUserMd className="inline mr-2 text-blue-600" /><strong>Name:</strong> John Doe</p>
        <p><FaHeartbeat className="inline mr-2 text-pink-600" /><strong>Blood Type:</strong> O+</p>
        <p><FaAllergies className="inline mr-2 text-yellow-600" /><strong>Allergies:</strong> Penicillin</p>
        <p><FaSyringe className="inline mr-2 text-green-600" /><strong>Medications:</strong> Insulin, Metformin</p>
        <p><FaFileMedical className="inline mr-2 text-purple-600" /><strong>Conditions:</strong> Diabetes Type 2, Hypertension</p>
        <p><FaPhoneAlt className="inline mr-2 text-red-600" /><strong>Emergency Contact:</strong> +1-800-123-4567</p>
        <p className="text-xs text-gray-500 mt-2 italic">
          Emergency Code: <span className="font-bold text-black">{emergencyCode}</span>
        </p>
      </div>

      {/* Share Button that triggers modal */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition text-sm md:text-base"
        >
          🔗 Share This Card
        </button>
      </div>

      {/* Modal for Share Options */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl w-11/12 max-w-md">
            <h3 className="font-bold text-lg mb-4 text-center">Share This Card</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
              <a
                href={`mailto:?subject=Emergency Medical Info&body=${encodeURIComponent(shareText)}`}
                className="flex items-center justify-center bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
              >
                <FaEnvelope className="mr-2" /> Email
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-sky-500 text-white py-2 rounded-xl hover:bg-sky-600 transition"
              >
                <FaTelegramPlane className="mr-2" /> Telegram
              </a>
              <button
                onClick={copyLink}
                className="flex items-center justify-center bg-gray-300 text-gray-800 py-2 rounded-xl hover:bg-gray-400 transition"
              >
                <FaCopy className="mr-2" /> Copy
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-xl text-gray-700 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* View Full Report Button */}
      <div className="mt-6 text-center">
        <a
          href={shareUrl}
          className="inline-flex items-center justify-center bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition text-sm md:text-base"
        >
          <FaEye className="mr-2" /> View Full Report
        </a>
      </div>
    </div>
  );
};

export default EmergencyInfo;
