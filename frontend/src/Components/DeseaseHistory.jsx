// components/PrescriptionViewer.jsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, Eye } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Example: Including disease name (could come from ML model/API)
const prescriptions = [
    {
      id: 1,
      title: "Prescription - Dr. Smith - Jan 2025",
      fileUrl: "/prescriptions/Heart_Disease_Medical_Report_Realistic.pdf",
      disease: "Hypertension",
    },
    {
      id: 2,
      title: "Follow-up Prescription - Feb 2025",
      fileUrl: "/prescriptions/prescription2.pdf",
      disease: "Type 2 Diabetes",
    },
    {
      id: 3,
      title: "Cardiology Visit - Mar 2025",
      fileUrl: "/prescriptions/prescription3.pdf",
      disease: "Coronary Artery Disease",
    },
    {
      id: 4,
      title: "ENT Consultation - Apr 2025",
      fileUrl: "/prescriptions/prescription4.pdf",
      disease: "Chronic Sinusitis",
    },
    {
      id: 5,
      title: "General Checkup - May 2025",
      fileUrl: "/prescriptions/prescription5.pdf",
      disease: "Anemia",
    },
    {
      id: 6,
      title: "Orthopedic Referral - Jun 2025",
      fileUrl: "/prescriptions/prescription6.pdf",
      disease: "Osteoarthritis",
    },
    {
      id: 7,
      title: "Dermatology Note - Jul 2025",
      fileUrl: "/prescriptions/prescription7.pdf",
      disease: "Psoriasis",
    },
    {
      id: 8,
      title: "Neurology Visit - Aug 2025",
      fileUrl: "/prescriptions/prescription8.pdf",
      disease: "Migraine",
    },
    {
      id: 9,
      title: "Pulmonary Assessment - Sep 2025",
      fileUrl: "/prescriptions/prescription9.pdf",
      disease: "Asthma",
    },
    {
      id: 10,
      title: "Infectious Disease - Oct 2025",
      fileUrl: "/prescriptions/prescription10.pdf",
      disease: "Tuberculosis",
    }
  ];
  

export default function DiseaseHistory() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (pdf) => {
    setSelectedPdf(pdf);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPdf(null);
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Medical Prescriptions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {prescriptions.map((pdf) => (
          <div
            key={pdf.id}
            className="bg-white shadow-xl rounded-2xl p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              {pdf.title}
            </h3>
            <p className="text-sm text-red-600 font-medium mb-4">
              🦠 Predicted Disease: <span className="font-semibold">{pdf.disease}</span>
            </p>

            <div className="flex justify-between items-center">
              <button
                onClick={() => openModal(pdf)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </button>

              <a
                href={pdf.fileUrl}
                download
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing PDF */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {selectedPdf?.title}
                </h4>
                <p className="text-sm text-red-600 mt-1">
                  🦠 Predicted Disease: <span className="font-semibold">{selectedPdf?.disease}</span>
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-red-600 font-bold text-lg hover:underline"
              >
                Close
              </button>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {selectedPdf && (
                <Document file={selectedPdf.fileUrl}>
                  <Page pageNumber={1} width={800} />
                </Document>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
