import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

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
    { href: '/tests', label: 'Тесты' },
    { href: '#cases', label: 'Кейсы' },
    { href: '/manifesto', label: 'Манифест' },
    { href: '#articles', label: 'Статьи' },
    { href: '#reviews', label: 'Отзывы' },
  ];

  const isSpecialtyPage = location.pathname === '/relationships' || location.pathname === '/burnout';

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white/80 border-b backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {isSpecialtyPage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogoClick}
              className="mr-2"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
          )}
          <h1 
            className="text-2xl md:text-3xl font-extrabold text-primary cursor-pointer hover:scale-105 transition-transform" 
            style={{ textShadow: '2px 2px 4px rgba(139, 92, 246, 0.3), -1px -1px 2px rgba(139, 92, 246, 0.2)' }}
            onClick={handleLogoClick}
          >
            Александр Гонтарь
          </h1>
        </div>

        <nav className="hidden lg:flex gap-4 items-center">
          {!isSpecialtyPage && navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-bold transition-all duration-300 text-sm ${activeSection === link.href ? 'text-primary border-2 border-primary px-3 py-2 rounded-lg' : 'text-foreground/70 hover:text-primary'}`}
            >
              {link.label}
            </a>
          ))}
          {isSpecialtyPage && (
            <Button
              variant="outline"
              onClick={handleLogoClick}
            >
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
          )}
        </nav>

        <div className="hidden md:flex gap-3 items-center">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white animate-pulse"
            onClick={() => window.location.href = '/client-portal'}
          >
            <Icon name="Lock" size={18} className="mr-2" />
            Вход для клиентов
          </Button>
          <Button className="btn-pulse-glow" onClick={onBooking}>
            <Icon name="Calendar" size={18} className="mr-2" />
            Записаться
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Меню</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {isSpecialtyPage && (
                <Button
                  variant="outline"
                  onClick={() => { handleLogoClick(); handleNavClick(); }}
                  className="justify-start"
                >
                  <Icon name="Home" size={18} className="mr-2" />
                  На главную
                </Button>
              )}
              {!isSpecialtyPage && navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`text-lg font-bold transition-all duration-300 py-2 ${activeSection === link.href ? 'text-primary border-2 border-primary px-4 rounded-lg' : 'text-foreground/70 hover:text-primary'}`}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t pt-4 mt-2 space-y-3">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white" 
                  onClick={() => { window.location.href = '/client-portal'; handleNavClick(); }}
                >
                  <Icon name="Lock" size={18} className="mr-2" />
                  Вход для клиентов
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => { onBooking(); handleNavClick(); }}
                >
                  <Icon name="Calendar" size={18} className="mr-2" />
                  Записаться
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;