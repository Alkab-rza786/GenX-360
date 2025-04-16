import React, { useState } from 'react';
import axios from 'axios';

const MedicalRecordForm = () => {
  const [records, setRecords] = useState([
    {
      disease: '',
      description: '',
      allergies: '',
      phobias: '',
      chronicConditions: '',
      lifestyle: '',
      prescriptions: [{ text: '', file: null }],
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecordChange = (index, field, value) => {
    const updated = [...records];
    updated[index][field] = value;
    setRecords(updated);
  };

  const handlePrescriptionChange = (recordIndex, pIndex, field, value) => {
    const updated = [...records];
    updated[recordIndex].prescriptions[pIndex][field] = value;
    setRecords(updated);
  };

  const addPrescription = (recordIndex) => {
    const updated = [...records];
    updated[recordIndex].prescriptions.push({ text: '', file: null });
    setRecords(updated);
  };

  const removePrescription = (recordIndex, pIndex) => {
    const updated = [...records];
    updated[recordIndex].prescriptions.splice(pIndex, 1);
    setRecords(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('gender', formData.gender);
    data.append('date', formData.date);

    data.append('records', JSON.stringify(
      records.map(({ prescriptions, ...rest }) => ({
        ...rest,
        prescriptions: prescriptions.map(({ text }) => text),
      }))
    ));

    records.forEach((record, rIndex) => {
      record.prescriptions.forEach((prescription, pIndex) => {
        if (prescription.file) {
          data.append(`file_${rIndex}_${pIndex}`, prescription.file);
        }
      });
    });

    try {
      await axios.post('http://localhost:5000/api/medical-records', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Medical record submitted!');
      setFormData({ name: '', age: '', gender: '', date: '' });
      setRecords([
        {
          disease: '',
          description: '',
          allergies: '',
          phobias: '',
          chronicConditions: '',
          lifestyle: '',
          prescriptions: [{ text: '', file: null }],
        },
      ]);
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Medical Record Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-3 rounded-xl" required />
          <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" className="border p-3 rounded-xl" required />

          <select name="gender" value={formData.gender} onChange={handleChange} className="border p-3 rounded-xl" required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-3 rounded-xl" required />
        </div>

        {records.map((record, index) => (
          <div key={index} className="border p-5 rounded-xl shadow-sm bg-gray-50">
            <h3 className="text-xl font-medium mb-4 text-blue-600">Record {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={record.disease} onChange={(e) => handleRecordChange(index, 'disease', e.target.value)} placeholder="Disease" className="border p-2 rounded-xl" required />
              <input value={record.allergies} onChange={(e) => handleRecordChange(index, 'allergies', e.target.value)} placeholder="Allergies" className="border p-2 rounded-xl" required />
              <input value={record.phobias} onChange={(e) => handleRecordChange(index, 'phobias', e.target.value)} placeholder="Phobias" className="border p-2 rounded-xl" required />
              <input value={record.chronicConditions} onChange={(e) => handleRecordChange(index, 'chronicConditions', e.target.value)} placeholder="Chronic Conditions" className="border p-2 rounded-xl" required />
              <input value={record.lifestyle} onChange={(e) => handleRecordChange(index, 'lifestyle', e.target.value)} placeholder="Lifestyle (e.g., smoking, diet)" className="border p-2 rounded-xl" required />
              <textarea value={record.description} onChange={(e) => handleRecordChange(index, 'description', e.target.value)} placeholder="Symptoms / Notes" className="md:col-span-2 border p-2 rounded-xl" rows="3" required />

              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-2">Prescriptions</label>
                {record.prescriptions.map((prescription, pIndex) => (
                  <div key={pIndex} className="mb-3">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={prescription.text}
                        onChange={(e) => handlePrescriptionChange(index, pIndex, 'text', e.target.value)}
                        placeholder={`Prescription ${pIndex + 1}`}
                        className="flex-1 border p-2 rounded-xl"
                        required
                      />
                      {record.prescriptions.length > 1 && (
                        <button type="button" onClick={() => removePrescription(index, pIndex)} className="text-red-600 hover:text-red-800 font-bold">
                          ✕
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handlePrescriptionChange(index, pIndex, 'file', e.target.files[0])}
                      className="block w-full border p-2 rounded-xl"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addPrescription(index)} className="mt-1 text-blue-600 hover:text-blue-800 font-semibold">
                  + Add Prescription
                </button>
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all">
          Submit Medical Record
        </button>
      </form>
    </div>
  );
};

export default MedicalRecordForm;
