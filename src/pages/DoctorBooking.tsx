import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Phone, Filter, Search } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
  consultationFee: string;
  nextAvailable: string;
  location: string;
  phone: string;
  languages?: string[];
  experience: string;
  image: string;
}

const DoctorBooking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const specialties = ['General Medicine', 'Pediatrics', 'Cardiology', 'Dermatology', 'Orthopedics', 'Gynecology'];
  const distances = ['Within 5 km', 'Within 10 km', 'Within 20 km', 'Any distance'];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'doctors'), (snapshot) => {
      const data: Doctor[] = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          languages: Array.isArray(docData.languages) ? docData.languages : [], // ✅ FIXED here
        };
      });
      setDoctors(data);
    });

    return () => unsubscribe();
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Nearby Doctors</h1>
          <p className="text-lg text-gray-600">Book appointments with qualified healthcare providers in your area</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="bg-green-100 rounded-lg h-64 flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-gray-600">Showing doctors within 10km of your location</p>
              </div>
              <div className="absolute top-4 left-8 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div className="absolute bottom-8 right-12 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div className="absolute top-16 right-8 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search doctors or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                <SelectTrigger>
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  {distances.map((distance) => (
                    <SelectItem key={distance} value={distance}>{distance}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">{doctor.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                      </div>
                    </div>

                    <p className="text-green-600 font-medium mb-2">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm mb-2">{doctor.experience} experience</p>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{doctor.location} • {doctor.distance}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Next available: {doctor.nextAvailable}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {(doctor.languages ?? []).map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-green-600">{doctor.consultationFee}</span>
                        <span className="text-sm text-gray-500 ml-1">consultation</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorBooking;

