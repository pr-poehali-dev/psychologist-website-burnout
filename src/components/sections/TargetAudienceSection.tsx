import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface TargetAudienceSectionProps {
  customPoints?: string[];
  hideButtons?: boolean;
}

const TargetAudienceSection = ({ customPoints, hideButtons }: TargetAudienceSectionProps) => {
  const navigate = useNavigate();

  const targetPoints = customPoints || [
    'IT-специалист, менеджер, врач — ваш ресурс на нуле, а дедлайны не кончаются',
    'Просыпаетесь уже уставшим, кофе не бодрит, а лишь немного отдаляет сон',
    'Не можете сосредоточиться, работа занимает в 3 раза больше времени',
    'Появились раздражительность, цинизм, ничего не радует',
    'Понимаете, что так дальше нельзя, но не знаете, с какой стороны подступиться'
  ];

  const showButtons = !hideButtons;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {showButtons && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                Выберите, с чем вам нужна помощь:
              </h2>
              <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Я специализируюсь на двух основных направлениях. Выберите то, что ближе вашей ситуации
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card 
                  className="p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 group"
                  onClick={() => navigate('/burnout')}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-orange-500 rounded-full group-hover:scale-110 transition-transform">
                      <Icon name="Flame" size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Выгорание, стресс, депрессия
                    </h3>
                    <p className="text-foreground/70">
                      Если вы чувствуете эмоциональное истощение, потерю энергии, апатию и не знаете, как восстановиться
                    </p>
                    <Button 
                      size="lg" 
                      className="w-full bg-orange-500 hover:bg-orange-600 group-hover:scale-105 transition-transform"
                    >
                      Узнать подробнее
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                </Card>

                <Card 
                  className="p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-pink-500 bg-gradient-to-br from-pink-50 to-purple-50 group"
                  onClick={() => navigate('/relationships')}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-pink-500 rounded-full group-hover:scale-110 transition-transform">
                      <Icon name="Heart" size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Проблемы в отношениях
                    </h3>
                    <p className="text-foreground/70">
                      Если вы столкнулись с конфликтами, потерей близости, изменой или не знаете, как наладить отношения
                    </p>
                    <Button 
                      size="lg" 
                      className="w-full bg-pink-500 hover:bg-pink-600 group-hover:scale-105 transition-transform"
                    >
                      Узнать подробнее
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Не уверены, что выбрать? Запишитесь на консультацию, и мы определим направление работы вместе
                </p>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            {hideButtons && (
              <div className="flex justify-center mb-8">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2"
                  onClick={() => navigate('/')}
                >
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Вернуться на главную
                </Button>
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Это предложение для вас, если вы:
            </h2>
            <div className="space-y-4">
              {targetPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 items-start p-4 rounded-lg hover:bg-accent/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon name="CircleCheck" size={20} className="text-primary" />
                  </div>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;