import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SeedballSection from '@/components/SeedballSection';
import CoreAssets from '@/components/CoreAssets';
import HomesThatBreathe from '@/components/HomesThatBreathe';
import Financial from '@/components/Financial';
import Balance from '@/components/Balance';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';

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
      <EnquiryForm />
      <Footer />
    </main>
  );
}
