import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface StickyBookingButtonProps {
  onBooking: () => void;
}

const StickyBookingButton = ({ onBooking }: StickyBookingButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(4);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('spotsDate');
    const storedSpots = localStorage.getItem('spotsLeft');

    if (storedDate !== today) {
      localStorage.setItem('spotsDate', today);
      localStorage.setItem('spotsLeft', '4');
      setSpotsLeft(4);
    } else if (storedSpots) {
      setSpotsLeft(parseInt(storedSpots, 10));
    }
  }, []);

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(105077878, 'reachGoal', 'click_sticky_booking');
    }
    
    if (spotsLeft > 0) {
      const newSpots = spotsLeft - 1;
      setSpotsLeft(newSpots);
      localStorage.setItem('spotsLeft', newSpots.toString());
    }
    
    onBooking();
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary/20 px-6 py-4 text-center">
        <Button
          size="lg"
          className="bg-primary text-white hover:bg-primary/90 font-semibold shadow-lg px-8 mb-2 w-full"
          onClick={handleClick}
        >
          <Icon name="Send" size={20} className="mr-2" />
          Записаться на консультацию
        </Button>
        <p className="text-sm text-muted-foreground font-medium">
          Осталось {spotsLeft} {spotsLeft === 1 ? 'место' : spotsLeft >= 2 && spotsLeft <= 4 ? 'места' : 'мест'} на эту неделю
        </p>
      </div>
    </div>
  );
};

export default StickyBookingButton;