import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Phone, MapPin, List, User, FileText } from 'lucide-react';

const VolunteerDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'medicineRequests'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(data);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAccept = async (id: string) => {
    await updateDoc(doc(db, 'medicineRequests', id), {
      status: 'accepted',
    });
  };

  const handleDeliver = async (id: string) => {
    await updateDoc(doc(db, 'medicineRequests', id), {
      status: 'delivered',
    });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        📦 Volunteer Dashboard
      </h1>

      {requests.length === 0 && (
        <p className="text-center text-gray-500">No medicine requests found.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {requests.map((request) => (
          <Card
            key={request.id}
            className="border border-gray-200 shadow-sm bg-white rounded-lg"
          >
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-lg font-semibold text-green-800 flex items-center gap-2">
                <User className="h-5 w-5 text-green-500" />
                {request.patientName}
              </CardTitle>
              <p className="text-sm text-gray-500 capitalize">
                {request.urgency} priority •{" "}
                <span
                  className={`${
                    request.status === 'pending'
                      ? 'text-yellow-600'
                      : request.status === 'accepted'
                      ? 'text-blue-600'
                      : 'text-green-600'
                  }`}
                >
                  {request.status}
                </span>
              </p>
            </CardHeader>

            <CardContent className="space-y-3 pt-4 text-sm text-gray-700">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                {request.phone}
              </p>
              <p className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                <span>{request.location || 'No address provided'}</span>
              </p>

              <div className="flex items-start">
                <List className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                <div>
                  <strong className="text-gray-800">Medicines Required:</strong>
                  {request.medicines && request.medicines.length > 0 ? (
                    <ul className="list-disc list-inside mt-1">
                      {request.medicines.map((med: string, idx: number) => (
                        <li key={idx}>{med}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Not specified</p>
                  )}
                </div>
              </div>

              {request.notes && (
                <p>
                  <strong className="text-gray-800">Instructions:</strong>{" "}
                  {request.notes}
                </p>
              )}

              {request.imageURL && (
                <div className="mt-2">
                  <strong className="text-gray-800 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    Prescription:
                  </strong>
                  <img
                    src={request.imageURL}
                    alt="Prescription"
                    className="max-w-full mt-2 rounded-lg border"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex justify-between items-center">
                <span className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  Status: {request.status}
                </span>

                {request.status === 'pending' && (
                  <Button
                    onClick={() => handleAccept(request.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Accept
                  </Button>
                )}

                {request.status === 'accepted' && (
                  <Button
                    onClick={() => handleDeliver(request.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Mark as Delivered
                  </Button>
                )}

                {request.status === 'delivered' && (
                  <span className="text-green-600 font-medium">Delivered ✅</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
