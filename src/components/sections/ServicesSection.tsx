import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Service {
  icon: string;
  title: string;
  description: string;
  duration: string;
}

interface ServicesSectionProps {
  services: Service[];
  onBooking: () => void;
}

const ServicesSection = ({ services, onBooking }: ServicesSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-6xl mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Услуги</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Индивидуальный подход к каждому клиенту на основе доказательных методов
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon} className="text-primary" size={28} />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Icon name="Clock" size={16} className="mr-2" />
                    {service.duration}
                  </div>
                  <Button className="w-full" onClick={onBooking}>
                    Записаться
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;