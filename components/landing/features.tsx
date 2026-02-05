import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wifi, Zap, Shield, Headphones, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Experience speeds up to 100Mbps with our fiber optic network, perfect for streaming, gaming, and remote work.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'Enterprise-grade security with 99.9% uptime guarantee. Your data stays protected at all times.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any issues or questions.',
  },
  {
    icon: Globe,
    title: 'Wide Coverage',
    description:
      'Extensive network coverage across major cities in Cameroon, with continuous expansion to new areas.',
  },
  {
    icon: Clock,
    title: 'Quick Setup',
    description:
      'Professional installation within 48 hours. Get connected quickly with minimal disruption.',
  },
  {
    icon: Wifi,
    title: 'Unlimited Data',
    description:
      'No data caps or throttling. Enjoy unlimited internet access with consistent speeds all month long.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Why Choose X-tremNet?
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            We deliver more than just internet. Experience the difference with
            features designed for modern digital life.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
