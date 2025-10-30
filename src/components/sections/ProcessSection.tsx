import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ProcessSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const steps = [
    {
      number: '1-2',
      title: 'Диагностика и анализ',
      description: 'Выявляем причины выгорания, определяем триггеры и паттерны поведения',
      icon: 'Search'
    },
    {
      number: '3-4',
      title: 'Работа с границами',
      description: 'Учимся говорить "нет", выстраивать здоровые границы и управлять эмоциями',
      icon: 'Shield'
    },
    {
      number: '5-6',
      title: 'Возвращение смысла',
      description: 'Восстанавливаем связь с ценностями и создаём план управления энергией',
      icon: 'Target'
    },
    {
      number: '7-8',
      title: 'Закрепление результата',
      description: 'Интегрируем новые навыки и создаём стратегию профилактики выгорания',
      icon: 'CheckCircle2'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-6xl mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Как проходит работа</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Протокол работы с профессиональным выгоранием: <strong className="text-primary">8 сессий</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name={step.icon} size={28} className="text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-primary mb-1">Сессии {step.number}</div>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <Icon name="Sparkles" size={40} className="text-primary mx-auto mb-4" />
              <h4 className="text-2xl font-bold mb-3">Цель программы</h4>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Восстановить эмоционально-энергетический баланс, сформировать устойчивые навыки 
                саморегуляции и научить профилактике выгорания в будущем
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <div className="px-4 py-2 rounded-full text-sm font-medium">
                  <Icon name="Brain" size={16} className="inline mr-1 text-primary" />
                  КПТ-подход
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-medium">
                  <Icon name="Clock" size={16} className="inline mr-1 text-primary" />
                  8 сессий
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-medium">
                  <Icon name="TrendingUp" size={16} className="inline mr-1 text-primary" />
                  Устойчивый результат
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;