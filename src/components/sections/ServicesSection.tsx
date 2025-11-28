import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Service {
  icon: string;
  title: string;
  description: string;
  duration: string;
  category?: string;
}

interface ServicesSectionProps {
  services: Service[];
  onBooking: () => void;
}

const ServicesSection = ({ services, onBooking }: ServicesSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  const burnoutServices = services.filter(s => 
    s.title.includes('выгоранию') || s.title.includes('детокс')
  );
  const relationshipServices = services.filter(s => 
    s.title.includes('Парная') || s.title.includes('отношениями') || s.title.includes('изменой')
  );
  const groupServices = services.filter(s => 
    s.title.includes('Групповые')
  );

  const handleServiceClick = (serviceTitle: string) => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(105077878, 'reachGoal', 'click_service_booking', {
        service: serviceTitle
      });
    }
    onBooking();
  };

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

          {burnoutServices.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Icon name="Flame" size={20} className="text-white" />
                </div>
                <h4 className="text-2xl font-bold">Работа с выгоранием и стрессом</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {burnoutServices.map((service, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 flex flex-col">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4">
                        <Icon name={service.icon} className="text-orange-600" size={28} />
                      </div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Icon name="Clock" size={16} className="mr-2" />
                        {service.duration}
                      </div>
                      <Button className="w-full" onClick={() => handleServiceClick(service.title)}>
                        Записаться
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {relationshipServices.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <Icon name="Heart" size={20} className="text-white" />
                </div>
                <h4 className="text-2xl font-bold">Терапия отношений</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relationshipServices.map((service, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 flex flex-col">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-4">
                        <Icon name={service.icon} className="text-pink-600" size={28} />
                      </div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Icon name="Clock" size={16} className="mr-2" />
                        {service.duration}
                      </div>
                      <Button className="w-full" onClick={() => handleServiceClick(service.title)}>
                        Записаться
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {groupServices.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-white" />
                </div>
                <h4 className="text-2xl font-bold">Групповая работа</h4>
              </div>
              <div className="grid md:grid-cols-1 gap-6 max-w-2xl">
                {groupServices.map((service, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 flex flex-col">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                        <Icon name={service.icon} className="text-blue-600" size={28} />
                      </div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Icon name="Clock" size={16} className="mr-2" />
                        {service.duration}
                      </div>
                      <Button className="w-full" onClick={() => handleServiceClick(service.title)}>
                        Записаться
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;