import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Smartphone, Package } from 'lucide-react';

export function PromoBanner() {
  return (
    <Card className="overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Smartphone className="h-8 w-8" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">
                X-tremNet+
              </Badge>
              <h3 className="text-xl font-bold">
                01 SIM CARD (data only+) To Go
              </h3>
              <p className="text-sm opacity-90 mt-1">1 DONGLE | PACK SINGLE</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">5900</span>
              <span className="text-lg">Fcfa</span>
            </div>
            <p className="text-sm opacity-80">/ 30 jours</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ServiceHighlights() {
  const highlights = [
    {
      icon: Wifi,
      title: 'High Speed Internet',
      description: 'Up to 100 Mbps download speed',
    },
    {
      icon: Package,
      title: 'Flexible Packages',
      description: 'Choose from various data plans',
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Use with any compatible device',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {highlights.map((item, index) => (
        <Card key={index} className="text-center">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-1">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
