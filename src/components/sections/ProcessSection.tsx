import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ProcessSectionProps {
  onBooking?: () => void;
}

const ProcessSection = ({ onBooking }: ProcessSectionProps) => {
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
    <section className="bg-white py-20">
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

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-2 border-primary/20">
              <CardContent className="p-6 md:p-8">
                <h4 className="text-xl md:text-2xl font-bold mb-4">Работа строится на принципах доказательной психологии (КПТ)</h4>
                <div className="space-y-3 text-sm md:text-base text-foreground/80">
                  <p>• Структурированный 8-сессионный протокол терапии выгорания</p>
                  <p>• Работа с измеримыми показателями через «Энергетический аудит»</p>
                  <p>• Инструментарий: от дыхательных практик до построения жизненного баланса</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start">
                    <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm md:text-base mb-1">Протокол с измеримым результатом</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Прогресс виден после 3-4 сессии</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start">
                    <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm md:text-base mb-1">Онлайн или оффлайн в Москве</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Сессия длится 60 минут</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start">
                    <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm md:text-base mb-1">Реальные инструменты</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Адаптированы для занятых специалистов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start">
                    <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm md:text-base mb-1">Измеримый результат</p>
                      <p className="text-xs md:text-sm text-muted-foreground">От теста MBI до дневника энергии</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start">
                    <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm md:text-base mb-1">Поддержка между сессиями</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Чат для вопросов и помощи</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-4">
                  <div className="flex gap-3 items-start">
                    <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm md:text-base mb-1">Системный подход</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Как инженер по психическому состоянию</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/10 border-2 border-primary/30">
              <CardContent className="p-6 text-center">
                <Icon name="TrendingUp" size={32} className="text-primary mx-auto mb-3" />
                <p className="text-sm md:text-base font-medium text-foreground italic">
                  «Инвестиция окупается за 2-3 месяца за счёт возвращённой продуктивности и предотвращения ошибок, вызванных усталостью»
                </p>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 btn-pulse-glow"
                onClick={onBooking}
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать работу
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;