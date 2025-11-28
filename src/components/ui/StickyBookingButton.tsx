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
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-primary to-primary/90 shadow-2xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden md:block">
              <p className="text-white font-bold text-lg">
                Готовы начать путь к изменениям?
              </p>
              <p className="text-white/80 text-sm">
                Осталось 3 окна на этой неделе
              </p>
            </div>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg w-full md:w-auto"
              onClick={handleClick}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Записаться на консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBookingButton;