
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Stethoscope, 
  Brain, 
  Truck, 
  Volume2, 
  HelpCircle, 
  Users, 
  MapPin, 
  Star,
  CheckCircle,
  Heart,
  FileText,
  Home as HomeIcon,
  Trees,
  Sun
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: 'Audio Health Tips',
      description: 'Listen to health advice in your local language',
      icon: Volume2,
      color: 'bg-blue-500',
      link: '/tips'
    },
    {
      title: 'Health Quizzes',
      description: 'Test your health knowledge with interactive quizzes',
      icon: HelpCircle,
      color: 'bg-purple-500',
      link: '/quiz'
    },
    {
      title: 'AI Symptom Checker',
      description: 'Get instant health guidance based on your symptoms',
      icon: Brain,
      color: 'bg-green-500',
      link: '/symptoms'
    },
    {
      title: 'Medicine Delivery',
      description: 'Volunteer-driven medicine delivery to remote areas',
      icon: Truck,
      color: 'bg-orange-500',
      link: '/volunteer'
    },
    {
      title: 'Prescription Upload',
      description: 'Upload your prescription and get medicines delivered',
      icon: FileText,
      color: 'bg-blue-600',
      link: '/prescription'
    },
    {
      title: 'Nearby Doctors',
      description: 'Find and book appointments with local healthcare providers',
      icon: Stethoscope,
      color: 'bg-red-500',
      link: '/doctors'
    }
  ];

  const stats = [
    { label: 'Villages Served', value: '500+', icon: MapPin },
    { label: 'Doctors Connected', value: '150+', icon: Stethoscope },
    { label: 'Volunteers Active', value: '300+', icon: Users },
    { label: 'Lives Impacted', value: '10,000+', icon: Heart }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Village Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 text-white">
        {/* Animated Village Background */}
        <div className="absolute inset-0">
          {/* Sky with clouds */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-300 to-blue-400 opacity-30"></div>
          
          {/* Mountains silhouette */}
          <div className="absolute bottom-0 left-0 w-full opacity-20">
            <svg viewBox="0 0 1200 400" className="w-full h-40">
              <path d="M0,400 L0,300 Q200,200 400,250 Q600,150 800,200 Q1000,100 1200,180 L1200,400 Z" fill="#10b981" opacity="0.6"/>
              <path d="M0,400 L0,320 Q300,220 600,280 Q900,180 1200,240 L1200,400 Z" fill="#059669" opacity="0.4"/>
            </svg>
          </div>
          
          {/* Village houses scattered */}
          <div className="absolute bottom-16 left-20 opacity-30">
            <div className="flex items-end space-x-2">
              <div className="w-8 h-12 bg-yellow-200 rounded-t-lg relative">
                <div className="w-6 h-6 bg-red-400 rounded-full absolute -top-3 left-1"></div>
                <div className="w-2 h-2 bg-blue-600 absolute top-2 left-1"></div>
              </div>
              <div className="w-6 h-10 bg-pink-200 rounded-t-lg relative">
                <div className="w-4 h-4 bg-orange-400 rounded-full absolute -top-2 left-1"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-20 right-32 opacity-25">
            <div className="flex items-end space-x-3">
              <div className="w-10 h-14 bg-blue-200 rounded-t-lg relative">
                <div className="w-8 h-8 bg-green-400 rounded-full absolute -top-4 left-1"></div>
                <div className="w-2 h-2 bg-yellow-600 absolute top-3 left-2"></div>
                <div className="w-2 h-2 bg-yellow-600 absolute top-3 left-5"></div>
              </div>
              <div className="w-7 h-11 bg-purple-200 rounded-t-lg relative">
                <div className="w-5 h-5 bg-red-400 rounded-full absolute -top-2 left-1"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 opacity-20">
            <div className="flex items-end space-x-4">
              <div className="w-12 h-16 bg-green-200 rounded-t-lg relative">
                <div className="w-10 h-10 bg-blue-400 rounded-full absolute -top-5 left-1"></div>
                <div className="w-3 h-4 bg-brown-600 absolute bottom-0 left-2 bg-amber-800"></div>
              </div>
              <div className="w-8 h-12 bg-yellow-200 rounded-t-lg relative">
                <div className="w-6 h-6 bg-red-400 rounded-full absolute -top-3 left-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating village icons */}
        <div className="absolute top-20 left-10 opacity-40 animate-bounce">
          <div className="w-16 h-16 bg-yellow-300/70 rounded-full flex items-center justify-center backdrop-blur-sm">
            <HomeIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="absolute top-32 right-20 opacity-40 animate-pulse">
          <div className="w-12 h-12 bg-green-300/70 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Trees className="h-6 w-6 text-green-800" />
          </div>
        </div>

        <div className="absolute top-10 right-1/3 opacity-40 animate-bounce" style={{animationDelay: '1s'}}>
          <div className="w-14 h-14 bg-blue-300/70 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sun className="h-7 w-7 text-yellow-600" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in drop-shadow-lg">
              🏘️ AarogyaConnect 🌿
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90 drop-shadow-md">
              आपके गाँव में स्वास्थ्य सेवा • Village Healthcare • గ్రామ ఆరోగ్య సేవ
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto drop-shadow-sm">
              🌾 Connecting rural communities with quality healthcare through technology, 
              local volunteers, and accessible medical services in multiple languages. 🏥
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50 shadow-lg font-semibold">
                <Link to="/doctors">
                  <Stethoscope className="mr-2 h-5 w-5" />
                  🩺 Book a Doctor
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/90 text-purple-600 hover:bg-white hover:text-purple-700 shadow-lg font-semibold">
                <Link to="/symptoms">
                  <Brain className="mr-2 h-5 w-5" />
                  🤔 Check Symptoms
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/90 text-orange-600 hover:bg-white hover:text-orange-700 shadow-lg font-semibold">
                <Link to="/volunteer">
                  <Users className="mr-2 h-5 w-5" />
                  🙋‍♀️ Volunteer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Village Illustration Section */}
      <section className="py-12 bg-gradient-to-b from-green-100 via-blue-50 to-yellow-50 relative overflow-hidden">
        {/* Decorative village elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-4 left-8 opacity-30">
            <div className="text-6xl animate-bounce" style={{animationDelay: '0.5s'}}>🏠</div>
          </div>
          <div className="absolute top-8 right-12 opacity-30">
            <div className="text-5xl animate-bounce" style={{animationDelay: '1.5s'}}>🌳</div>
          </div>
          <div className="absolute bottom-8 left-16 opacity-30">
            <div className="text-4xl animate-bounce" style={{animationDelay: '2s'}}>🚜</div>
          </div>
          <div className="absolute bottom-4 right-20 opacity-30">
            <div className="text-5xl animate-bounce" style={{animationDelay: '0.8s'}}>🌻</div>
          </div>
          <div className="absolute top-1/2 left-1/4 opacity-20">
            <div className="text-3xl animate-pulse">⛰️</div>
          </div>
          <div className="absolute top-1/3 right-1/4 opacity-20">
            <div className="text-4xl animate-pulse">🌾</div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🏘️ Bringing Healthcare to Every Village 🏘️
            </h2>
            <p className="text-lg text-gray-600">
              From the mountains to the plains, we serve every community with care and compassion
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-4 border-green-200">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-4xl">🏔️</div>
                  <p className="text-sm font-medium text-gray-700">Mountain Villages</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl">🌾</div>
                  <p className="text-sm font-medium text-gray-700">Farming Communities</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl">🏞️</div>
                  <p className="text-sm font-medium text-gray-700">River Side Towns</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-green-800">Healthcare for All Villages</span>
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Village Theme */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="text-9xl absolute top-4 left-4">🏘️</div>
          <div className="text-9xl absolute bottom-4 right-4">🌿</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Our Village Impact 🎯</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-100 hover:shadow-lg transition-all">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <stat.icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Village Theme */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 relative overflow-hidden">
        {/* Enhanced village background */}
        <div className="absolute inset-0 opacity-10">
          <div className="text-8xl absolute top-10 left-10 animate-pulse">🏠</div>
          <div className="text-6xl absolute top-20 right-20 animate-bounce">🌳</div>
          <div className="text-7xl absolute bottom-20 left-20 animate-pulse">🚜</div>
          <div className="text-5xl absolute bottom-10 right-10 animate-bounce">🌸</div>
          <div className="text-4xl absolute top-1/2 left-1/3 animate-pulse">⛰️</div>
          <div className="text-6xl absolute top-1/3 right-1/3 animate-bounce">🌾</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🏥 Village Healthcare Solutions 🏥
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              🌟 From AI-powered symptom checking to community-driven medicine delivery, 
              we provide accessible healthcare services tailored for rural communities. 🌟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-3 border-green-200 hover:border-green-300 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full hover:bg-green-50 hover:border-green-400 border-2">
                    <Link to={feature.link}>
                      🚀 Explore Feature
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="text-9xl absolute top-10 left-10">🔄</div>
          <div className="text-9xl absolute bottom-10 right-10">⚡</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎯 How AarogyaConnect Works 🎯
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to access quality healthcare in your village
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border-2 border-green-200">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">1️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">🔗 Connect</h3>
              <p className="text-gray-600">
                Access our platform through your phone or computer. Available in multiple local languages. 📱
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">🎯 Choose Service</h3>
              <p className="text-gray-600">
                Select from doctor consultation, symptom checking, health tips, or volunteer services. 🏥
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3️⃣</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">💖 Get Care</h3>
              <p className="text-gray-600">
                Receive personalized healthcare guidance and support from our network of professionals. 👩‍⚕️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Animated village silhouette */}
        <div className="absolute bottom-0 left-0 right-0 opacity-20">
          <svg viewBox="0 0 1200 300" className="w-full h-40">
            <path d="M0,300 L0,200 Q200,150 400,180 Q600,120 800,160 Q1000,100 1200,140 L1200,300 Z" fill="currentColor"/>
            {/* Village houses on the hills */}
            <rect x="150" y="160" width="20" height="30" fill="currentColor" opacity="0.7"/>
            <polygon points="150,160 160,145 170,160" fill="currentColor" opacity="0.8"/>
            <rect x="350" y="170" width="25" height="35" fill="currentColor" opacity="0.6"/>
            <polygon points="350,170 362.5,150 375,170" fill="currentColor" opacity="0.7"/>
            <rect x="750" y="150" width="18" height="28" fill="currentColor" opacity="0.8"/>
            <polygon points="750,150 759,135 768,150" fill="currentColor" opacity="0.9"/>
          </svg>
        </div>

        {/* Floating emojis */}
        <div className="absolute top-10 left-10 opacity-30 animate-bounce text-4xl">🏠</div>
        <div className="absolute top-20 right-20 opacity-30 animate-pulse text-3xl">❤️</div>
        <div className="absolute bottom-20 left-20 opacity-30 animate-bounce text-3xl" style={{animationDelay: '1s'}}>🌟</div>
        <div className="absolute bottom-10 right-10 opacity-30 animate-pulse text-4xl" style={{animationDelay: '0.5s'}}>🏥</div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            🌟 Ready to Experience Better Healthcare? 🌟
          </h2>
          <p className="text-xl mb-8 opacity-90 drop-shadow-md">
            Join thousands of rural families who have improved their health with AarogyaConnect 🏘️❤️
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50 shadow-xl">
              <Link to="/doctors">
                🚀 Start Your Health Journey
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 shadow-xl">
              <Link to="/volunteer">
                🙋‍♀️ Become a Volunteer
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
