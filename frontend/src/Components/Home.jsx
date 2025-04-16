import React from 'react';
import EmergencyImage from './EmergencyImage';
import {
    FileText,
    PlusCircle,
    AlertTriangle,
    UserCircle,
    Search,
    Activity,
    CalendarCheck,
    HeartPulse
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-6xl mx-auto">

                {/* Hero Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-blue-700">
                        Welcome to <span className="text-gray-800">MediWallet</span> 🩺
                    </h1>
                    <p className="mt-2 text-gray-600">Your digital medical companion. Track, manage, and access your health data in one place.</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
                        <Search className="text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search your records, symptoms, diseases..."
                            className="ml-2 w-full outline-none bg-transparent text-sm"
                        />
                    </div>
                </div>

                {/* Action Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <Card onClick={() => navigate("/deaseas-history")}  icon={<FileText className="text-blue-600" size={32} />} title="Disease History" desc="View all past diagnoses" />
                    <Card icon={<PlusCircle className="text-green-600" size={32} />} title="Add Record" desc="Upload prescriptions or tests" />
                    <Card icon={<AlertTriangle className="text-red-600" size={32} />} title="Emergency" desc="Trigger emergency help" />
                    <Card icon={<UserCircle className="text-purple-600" size={32} />} title="Profile" desc="Edit your medical info" />
                </div>

                {/* Health Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard icon={<CalendarCheck className="text-indigo-500" size={28} />} label="Last Checkup" value="12 Jan 2025" />
                    <StatCard icon={<Activity className="text-rose-500" size={28} />} label="Avg Activity Level" value="Moderate" />
                    <StatCard icon={<HeartPulse className="text-red-500" size={28} />} label="Heart Rate" value="76 bpm" />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">🗂️ Recent Records</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Added "High Blood Pressure" on Jan 12</li>
                        <li>• Uploaded new prescription on Jan 5</li>
                        <li>• Profile updated on Jan 2</li>
                        <li>• Emergency contacted on Dec 29</li>
                    </ul>
                </div>

                {/* Emergency AI Button */}
                <div className="mt-10 bg-red-50 p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold text-red-700 mb-4">Emergency Image Detection 🧠</h2>
                    <p className="text-sm text-gray-700 mb-4">
                        Click below if someone has collapsed or appears unconscious. The system will analyze the image using AI.
                    </p>
                    <EmergencyImage />
                </div>


            </div>
        </div>
    );
};

const Card = ({ icon, title, desc, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer"
    >
        {icon}
        <h2 className="text-lg font-semibold text-gray-800 mt-3">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
);


const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-5 rounded-xl flex items-center shadow">
        <div className="mr-4">{icon}</div>
        <div>
            <h4 className="text-gray-600 text-sm">{label}</h4>
            <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default Home;
