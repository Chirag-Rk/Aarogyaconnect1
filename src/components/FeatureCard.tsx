
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  buttonText: string;
}

const FeatureCard = ({ title, description, icon: Icon, to, buttonText }: FeatureCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="h-6 w-6 mr-2 text-green-600" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
          <Link to={to}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
