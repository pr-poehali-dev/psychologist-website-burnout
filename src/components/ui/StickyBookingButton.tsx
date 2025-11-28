import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface StickyBookingButtonProps {
  onBooking: () => void;
}

const StickyBookingButton = ({ onBooking }: StickyBookingButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

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

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(105077878, 'reachGoal', 'click_sticky_booking');
    }
    onBooking();
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}
    >
      <Button
        size="lg"
        className="bg-primary text-white hover:bg-primary/90 font-semibold shadow-xl rounded-full px-6 py-6"
        onClick={handleClick}
      >
        <Icon name="Send" size={20} className="mr-2" />
        Записаться
      </Button>
    </div>
  );
};

export default StickyBookingButton;