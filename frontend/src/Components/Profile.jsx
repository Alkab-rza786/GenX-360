import React from 'react';

const Profile = () => {
  const user = {
    firstName: 'Natashia',
    lastName: 'Khaleira',
    role: 'Admin',
    location: 'Leeds, United Kingdom',
    dateOfBirth: '12-10-1990',
    email: 'info@binary-fusion.com',
    phone: '(+62) 821 2554-5846',
    country: 'United Kingdom',
    city: 'Leeds, East London',
    postalCode: 'ERT 1254',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg' // Add your image URL here
  };

  return (
    <div className="bg-gray-50 py-6 flex justify-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">
        {/* Header Section with Profile Image */}
        <div className="flex items-start mb-6">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-200 mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-600">{user.role}</p>
            <p className="text-gray-600">{user.location}</p>
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium text-gray-500 w-1/4">First Name</td>
                <td className="py-3 font-medium w-1/4">{user.firstName}</td>
                <td className="py-3 font-medium text-gray-500 w-1/4">Last Name</td>
                <td className="py-3 font-medium w-1/4">{user.lastName}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium text-gray-500">Date of Birth</td>
                <td className="py-3 font-medium">{user.dateOfBirth}</td>
                <td className="py-3 font-medium text-gray-500">Email Address</td>
                <td className="py-3 font-medium">{user.email}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-500">Phone Number</td>
                <td className="py-3 font-medium">{user.phone}</td>
                <td className="py-3 font-medium text-gray-500">User Role</td>
                <td className="py-3 font-medium">{user.role}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* Address Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-medium text-gray-500 w-1/4">Country</td>
                <td className="py-3 font-medium w-1/4">{user.country}</td>
                <td className="py-3 font-medium text-gray-500 w-1/4">City</td>
                <td className="py-3 font-medium w-1/4">{user.city}</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-gray-500">Postal Code</td>
                <td className="py-3 font-medium">{user.postalCode}</td>
                <td className="py-3"></td>
                <td className="py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;