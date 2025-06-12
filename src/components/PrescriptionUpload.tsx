// src/components/ui/PrescriptionUpload.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, MapPin, Phone, User, Clock, List } from 'lucide-react';

import { db, storage } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PrescriptionUpload = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prescription, setPrescription] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    address: '',
    urgency: 'medium',
    additionalNotes: '',
    requiredMedicines: ''
  });
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setPrescription(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!prescription && !formData.requiredMedicines.trim()) {
    toast({
      title: "Missing prescription or medicine list",
      description: "Please upload a prescription or list the required medicines",
      variant: "destructive"
    });
    return;
  }

  if (!formData.patientName || !formData.phoneNumber || !formData.address) {
    toast({
      title: "Missing information",
      description: "Please fill in all required fields",
      variant: "destructive"
    });
    return;
  }

  setIsSubmitting(true);

  try {
    let imageURL = '';
    if (prescription) {
      const filePath = `prescriptions/${Date.now()}_${prescription.name}`;
      const fileRef = ref(storage, filePath);
      await uploadBytes(fileRef, prescription);
      imageURL = await getDownloadURL(fileRef);
    }

    const medicinesArray = formData.requiredMedicines
      .split(',')
      .map(med => med.trim())
      .filter(med => med.length > 0);

    await addDoc(collection(db, 'medicineRequests'), {
      patientName: formData.patientName,
      phone: formData.phoneNumber,
      location: formData.address,
      urgency: formData.urgency,
      notes: formData.additionalNotes,
      medicines: medicinesArray,
      imageURL,
      status: "pending",
      createdAt: serverTimestamp()
    });

    toast({
      title: "Request submitted successfully!",
      description: "Your medicine request has been sent to nearby volunteers.",
    });

    // Reset form
    setPrescription(null);
    setFormData({
      patientName: '',
      phoneNumber: '',
      address: '',
      urgency: 'medium',
      additionalNotes: '',
      requiredMedicines: ''
    });

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

  } catch (error) {
    console.error("Error submitting request:", error);
    toast({
      title: "Upload failed",
      description: "Please try again later",
      variant: "destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-6 w-6 mr-2 text-green-600" />
          Upload Prescription or Type Medicines
        </CardTitle>
        <CardDescription>
          You can upload your prescription or directly list the required medicines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div>
            <Label htmlFor="prescription" className="text-base font-medium">
              Prescription Image (optional)
            </Label>
            <Input
              id="prescription"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {prescription && (
              <div className="mt-2 p-2 bg-green-50 rounded-md flex items-center">
                <FileText className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm text-green-800">{prescription.name}</span>
              </div>
            )}
          </div>

          {/* Required Medicines Textarea */}
          <div>
            <Label htmlFor="requiredMedicines" className="flex items-center">
              <List className="h-4 w-4 mr-1" />
              Required Medicines (optional)
            </Label>
            <Textarea
              id="requiredMedicines"
              name="requiredMedicines"
              value={formData.requiredMedicines}
              onChange={handleInputChange}
              placeholder="E.g. Paracetamol 500mg - 10 tablets, ORS sachets - 5 packs"
              className="min-h-[80px]"
            />
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName" className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                Patient Name *
              </Label>
              <Input
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder="Enter patient name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+91 12345-67890"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Delivery Address *
            </Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter complete address with village/district details"
              className="min-h-[80px]"
              required
            />
          </div>

          {/* Urgency */}
          <div>
            <Label htmlFor="urgency" className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Urgency Level
            </Label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="low">Low - Can wait 2-3 days</option>
              <option value="medium">Medium - Needed within 24 hours</option>
              <option value="high">High - Urgent, needed today</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Any special instructions or additional information"
              className="min-h-[60px]"
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Submitting Request...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Submit Medicine Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrescriptionUpload;
