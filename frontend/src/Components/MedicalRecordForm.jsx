import React, { useState } from 'react';
import axios from 'axios';

const MedicalRecordForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    disease: '',
    description: '',
    medication: '',
    allergies: '',
    phobias: '',
    chronicConditions: '',
    lifestyle: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/medical-records', formData);
      alert('Medical record submitted!');
      setFormData({
        name: '',
        age: '',
        gender: '',
        disease: '',
        description: '',
        medication: '',
        allergies: '',
        phobias: '',
        chronicConditions: '',
        lifestyle: '',
        date: '',
      });
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Medical Record Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
        <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" className="border p-2 rounded" required />

        <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 rounded" required />

        <input name="disease" value={formData.disease} onChange={handleChange} placeholder="Disease" className="border p-2 rounded" required />
        <input name="medication" value={formData.medication} onChange={handleChange} placeholder="Medication" className="border p-2 rounded" required />

        <input name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Allergies" className="border p-2 rounded" required />
        <input name="phobias" value={formData.phobias} onChange={handleChange} placeholder="Phobias" className="border p-2 rounded" required />

        <input name="chronicConditions" value={formData.chronicConditions} onChange={handleChange} placeholder="Chronic Conditions" className="border p-2 rounded" required />
        <input name="lifestyle" value={formData.lifestyle} onChange={handleChange} placeholder="Lifestyle (e.g., smoking, diet)" className="border p-2 rounded" required />

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Symptoms / Notes" rows="3" className="md:col-span-2 border p-2 rounded" required />

        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Submit Record
        </button>
      </form>
    </div>
  );
};

export default MedicalRecordForm;
