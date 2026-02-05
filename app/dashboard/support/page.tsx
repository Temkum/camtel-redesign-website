import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Packages } from '@/components/landing/packages';
import { Coverage } from '@/components/landing/coverage';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Packages />
        <Coverage />
      </main>
      <Footer />
    </div>
  );
}
