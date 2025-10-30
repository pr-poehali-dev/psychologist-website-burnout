import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onBooking: () => void;
}

const Header = ({ onBooking }: HeaderProps) => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://cdn.poehali.dev/files/7b4fbc90-0cc7-405e-912a-429cde9d865e.jpg" 
            alt="Александр Гонтарь" 
            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
          />
          <h1 className="text-2xl font-bold text-primary">Александр Гонтарь</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">Обо мне</a>
          <a href="#services" className="text-foreground/70 hover:text-primary transition-colors">Услуги</a>
          <a href="#cases" className="text-foreground/70 hover:text-primary transition-colors">Кейсы</a>
          <a href="/manifesto" className="text-foreground/70 hover:text-primary transition-colors font-semibold">Манифест</a>
          <a href="#articles" className="text-foreground/70 hover:text-primary transition-colors">Статьи</a>
          <a href="#reviews" className="text-foreground/70 hover:text-primary transition-colors">Отзывы</a>
        </nav>
        <Button className="hidden md:flex" onClick={onBooking}>
          <Icon name="Calendar" size={18} className="mr-2" />
          Записаться
        </Button>
      </div>
    </header>
  );
};

export default Header;