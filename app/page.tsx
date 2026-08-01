import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SeedballSection from '@/components/SeedballSection';
import CoreAssets from '@/components/CoreAssets';
import HomesThatBreathe from '@/components/HomesThatBreathe';
import Financial from '@/components/Financial';
import Balance from '@/components/Balance';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import LegalStanding from '@/components/LegalStanding';

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SeedballSection />
      <CoreAssets />
      <HomesThatBreathe />
      <Financial />
      <Balance />
      <LegalStanding />
      <EnquiryForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
