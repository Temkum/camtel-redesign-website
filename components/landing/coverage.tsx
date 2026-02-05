import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Building2, Users, TrendingUp } from 'lucide-react';

const cities = [
  'Yaounde',
  'Douala',
  'Bafoussam',
  'Bamenda',
  'Garoua',
  'Maroua',
  'Ngaoundere',
  'Bertoua',
  'Limbe',
  'Buea',
  'Kribi',
  'Ebolowa',
];

const stats = [
  { icon: MapPin, value: '10+', label: 'Regions Covered' },
  { icon: Building2, value: '50+', label: 'Cities Connected' },
  { icon: Users, value: '50,000+', label: 'Active Subscribers' },
  { icon: TrendingUp, value: '200%', label: 'Network Growth' },
];

export function Coverage() {
  return (
    <section id="coverage" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Expanding Across Cameroon
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Our fiber optic network continues to grow, connecting more
              communities every day. Check if X-tremNet is available in your
              area.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-border/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-muted/50 p-8">
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              Available Cities
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cities.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 rounded-lg bg-background px-3 py-2"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {city}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              More cities coming soon. Contact us to check coverage in your
              specific area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
