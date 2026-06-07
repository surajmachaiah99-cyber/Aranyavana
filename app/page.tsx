import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SeedballSection from '@/components/SeedballSection';
import Thesis from '@/components/Thesis';
import CoreAssets from '@/components/CoreAssets';
import Architectural from '@/components/Architectural';
import Financial from '@/components/Financial';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SeedballSection />
      <Thesis />
      <CoreAssets />
      <Architectural />
      <Financial />
      <EnquiryForm />
      <Footer />
    </main>
  );
}
