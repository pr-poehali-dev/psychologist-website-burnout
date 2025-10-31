import Icon from '@/components/ui/icon';

const TargetAudienceSection = () => {
  const targetPoints = [
    'IT-специалист, менеджер, врач — ваш ресурс на нуле, а дедлайны не кончаются',
    'Просыпаетесь уже уставшим, кофе не бодрит, а лишь немного отдаляет сон',
    'Не можете сосредоточиться, работа занимает в 3 раза больше времени',
    'Появились раздражительность, цинизм, ничего не радует',
    'Понимаете, что так дальше нельзя, но не знаете, с какой стороны подступиться'
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
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
    </section>
  );
};

export default TargetAudienceSection;
