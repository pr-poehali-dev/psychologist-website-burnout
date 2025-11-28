import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import TestsNavigationSection from '@/components/sections/TestsNavigationSection';
import DepressionTestSection from '@/components/sections/DepressionTestSection';
import AnxietyTestSection from '@/components/sections/AnxietyTestSection';
import TemperamentTestSection from '@/components/sections/TemperamentTestSection';
import EmpathyTestSection from '@/components/sections/EmpathyTestSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const Tests = () => {
  const handleBooking = () => {
    window.open('https://calink.ru/Algon', '_blank');
  };

  const breadcrumbs = [
    { label: 'Психологические тесты', href: '/tests' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/20">
      <Header onBooking={handleBooking} />
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <TestsNavigationSection />
      <DepressionTestSection onBooking={handleBooking} />
      <AnxietyTestSection onBooking={handleBooking} />
      <TemperamentTestSection onBooking={handleBooking} />
      <EmpathyTestSection onBooking={handleBooking} />
      <Footer />
    </div>
  );
};

export default Tests;