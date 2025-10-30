import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onBooking: () => void;
}

const HeroSection = ({ onBooking }: HeroSectionProps) => {
  const yearsOfPractice = new Date().getFullYear() - 2005;

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="overflow-hidden rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-96 h-64 sm:h-80 md:h-96 lg:h-[442px]">
              <img 
                src="https://cdn.poehali.dev/files/2e684343-1c6d-4fc9-b7ac-ec0d255a56e5.jpg" 
                alt="Александр Гонтарь - психолог" 
                className="w-full h-auto object-cover mx-auto"
                style={{ marginTop: '-30%', transform: 'scale(1.15)' }}
              />
            </div>
          </div>
          <Badge variant="outline" className="text-primary border-primary">Александр Гонтарь — ваш психолог</Badge>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Путь от выгорания к <span className="text-primary">балансу</span> и энергии
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Практическая психология • Когнитивно-поведенческая терапия (КПТ) • Доказательный подход
          </p>
          <div className="flex justify-center gap-8 py-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{yearsOfPractice}+</div>
              <div className="text-sm text-muted-foreground mt-1">лет практики</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground mt-1">клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground mt-1">результат</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="text-lg px-8 btn-pulse btn-float" onClick={onBooking}>
              <Icon name="Calendar" size={20} className="mr-2" />
              Записаться на консультацию
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 btn-float" asChild>
              <a href="https://dzen.ru/id/68f6621b6539c44524418486" target="_blank" rel="noopener noreferrer">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Читать статьи в Дзен
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;