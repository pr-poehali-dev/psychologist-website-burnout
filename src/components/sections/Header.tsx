import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface HeaderProps {
  onBooking: () => void;
}

const Header = ({ onBooking }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleNavClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .filter(link => link.href.startsWith('#'))
        .map(link => link.href.substring(1));
      
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'Обо мне' },
    { href: '#services', label: 'Услуги' },
    { href: '#test', label: 'Тесты' },
    { href: '#cases', label: 'Кейсы' },
    { href: '/manifesto', label: 'Манифест' },
    { href: '#articles', label: 'Статьи' },
    { href: '#reviews', label: 'Отзывы' },
  ];

  return (
    <header className="bg-white/80 border-b backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold text-primary" style={{ textShadow: '2px 2px 4px rgba(139, 92, 246, 0.3), -1px -1px 2px rgba(139, 92, 246, 0.2)' }}>Александр Гонтарь</h1>
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-bold transition-all duration-300 ${activeSection === link.href ? 'text-primary border-2 border-primary px-4 py-2 rounded-lg' : 'text-foreground/70 hover:text-primary'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button className="hidden md:flex btn-pulse-glow" onClick={onBooking}>
          <Icon name="Calendar" size={18} className="mr-2" />
          Записаться
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Меню</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`text-lg font-bold transition-all duration-300 py-2 ${activeSection === link.href ? 'text-primary border-2 border-primary px-4 rounded-lg' : 'text-foreground/70 hover:text-primary'}`}
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-4" onClick={() => { onBooking(); handleNavClick(); }}>
                <Icon name="Calendar" size={18} className="mr-2" />
                Записаться
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;