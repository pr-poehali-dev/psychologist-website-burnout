import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const MethodSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const benefits = [
    {
      icon: 'Target',
      title: 'Научно обоснован',
      description: 'КПТ признана ВОЗ и имеет доказанную эффективность'
    },
    {
      icon: 'Clock',
      title: 'Краткосрочная терапия',
      description: 'Видимые результаты уже через 8-12 сессий'
    },
    {
      icon: 'TrendingUp',
      title: 'Практические навыки',
      description: 'Конкретные инструменты для самостоятельной работы'
    },
    {
      icon: 'CheckCircle2',
      title: 'Работа с причинами',
      description: 'Меняем автоматические мысли и поведенческие паттерны'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-6xl mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Когнитивно-поведенческая терапия</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Современный научно обоснованный метод для работы с выгоранием, тревогой и стрессом
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={benefit.icon} size={32} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">КПТ (Когнитивно-поведенческая терапия)</strong> — это метод психотерапии, 
                  который помогает выявить и изменить негативные мысли и убеждения, влияющие на ваше 
                  эмоциональное состояние и поведение.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  В работе с выгоранием КПТ особенно эффективна: мы учимся распознавать автоматические 
                  мысли о работе и себе, заменяем их на более реалистичные и формируем здоровые паттерны 
                  поведения, которые защищают от истощения.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;