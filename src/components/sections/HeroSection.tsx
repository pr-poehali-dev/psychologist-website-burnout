import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onBooking: () => void;
}

const HeroSection = ({ onBooking }: HeroSectionProps) => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <Badge variant="outline" className="text-primary border-primary">Александр Гонтарь — ваш психолог</Badge>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Путь от выгорания к <span className="text-primary">балансу</span> и энергии
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Практическая психология • Когнитивно-поведенческая терапия (КПТ) • Доказательный подход
          </p>
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