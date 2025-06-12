// src/pages/PrescriptionUpload.tsx
import PrescriptionUpload from '@/components/PrescriptionUpload';

const PrescriptionUploadPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Prescription
          </h1>
          <p className="text-lg text-gray-600">
            Get your medicines delivered by our volunteer network
          </p>
        </div>

        {/* Optional back navigation */}
        <div className="mb-6 text-left">
          <a
            href="/"
            className="text-green-700 hover:underline text-sm flex items-center"
          >
            ← Back to Home
          </a>
        </div>

        <PrescriptionUpload />
      </div>
    </div>
  );
};

export default PrescriptionUploadPage;

