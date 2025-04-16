import React, { useRef, useState } from 'react';

const EmergencyImage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState({});
  const [email, setEmail] = useState(''); // Added state for email
  const fileInputRef = useRef();

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setResult('');
      setEmail(''); // Reset email when a new image is captured
    }
  };

  const handleSendToML = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      setResult(data[0]); // Set prediction result
      console.log(data)

      // Assign email based on prediction result
      // let assignedEmail = '';
      // switch (data.prediction) {
      //   case 'Unconscious':
      //     assignedEmail = 'emergency@unconscious.com';
      //     break;
      //   case 'Normal':
      //     assignedEmail = 'care@normal.com';
      //     break;
      //   case 'Injury Detected':
      //     assignedEmail = 'help@injury.com';
      //     break;
      //   default:
      //     assignedEmail = 'unknown@prediction.com';
      //     break;
      // }
      // setEmail(assignedEmail); // Set the email
    } catch (err) {
      console.error(err);
      setResult('Something went wrong.');
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleCapture}
        hidden
      />
      {!image && (
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition"
        >
         Upload image
        </button>
      )}

      {image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Captured"
            className="w-48 h-48 object-cover rounded-md shadow"
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleSendToML}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Analyze with AI
            </button>
            <button
              onClick={() => {
                setImage(null);
                setResult('');
                setEmail(''); // Reset email when retake is clicked
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Retake
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-white border border-blue-300 rounded shadow">
          <h4 className="font-semibold text-blue-800">Prediction Result:</h4>
          <p className="text-gray-700 mt-1">{result.name}</p>
          {result.email && (
            <p className="mt-2 text-gray-700">
              <strong>Assigned Email:</strong> {result.email}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmergencyImage;
