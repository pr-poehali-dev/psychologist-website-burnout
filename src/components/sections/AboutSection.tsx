import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [diplomaOpen, setDiplomaOpen] = useState(false);

  return (
    <section id="about" className="py-20 bg-gradient-to-tl from-primary/6 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={ref} className={`grid md:grid-cols-2 gap-12 items-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">Обо мне</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg font-medium text-foreground">
                  Меня зовут Александр Гонтарь. Я — <strong>психолог-когнитивист с 20-летним стажем</strong>. 
                  Специализируюсь на помощи людям, которые столкнулись с эмоциональным выгоранием, проблемами в отношениях, 
                  тревожными и депрессивными состояниями.
                </p>
                <p>
                  Я предприниматель в области пассажирских перевозок и дополнительного образования — и не по наслышке знаю, 
                  как хроническое перенапряжение выжигает людей изнутри. Вижу это каждый день в своей практике.
                </p>
                <p className="font-medium text-foreground">
                  За годы работы я выявил закономерность: большинство проблем напрямую или косвенно связаны с 
                  <strong> профессиональным выгоранием и эмоциональным истощением</strong>. А выгорание, в свою очередь, 
                  разрушает отношения быстрее, чем любые конфликты.
                </p>
                <p>
                  Когда человек эмоционально истощён, у него не остаётся ресурса для близости, эмпатии, терпения. 
                  Пары начинают жить как соседи, а не партнёры. Игнорирование этого состояния приводит к кризису в отношениях 
                  или развитию клинической депрессии, где одной терапии уже недостаточно.
                </p>
                <p className="font-medium text-foreground">
                  Моя задача — помочь вам восстановить энергию, вернуть контакт с собой и близкими. 
                  Работаю как <strong>очно в Москве</strong>, так и <strong>онлайн</strong> — эффективность одинаковая, 
                  выбор за вами.
                </p>
              </div>
              <div className="space-y-3 pt-4">
                <Dialog open={diplomaOpen} onOpenChange={setDiplomaOpen}>
                  <DialogTrigger asChild>
                    <div className="flex items-start gap-3 cursor-pointer hover:bg-primary/5 p-3 rounded-lg transition-colors border border-primary/20 relative">
                      <Badge className="absolute -top-2 -right-2 bg-green-600 hover:bg-green-700 text-white">
                        <Icon name="ShieldCheck" size={14} className="mr-1" />
                        Проверено
                      </Badge>
                      <Icon name="GraduationCap" className="text-primary flex-shrink-0 mt-1" size={24} />
                      <div className="flex flex-col">
                        <span className="font-medium">Психолог, Преподаватель психологии</span>
                        <span className="text-sm text-muted-foreground">Московский Социально-Педагогический институт, 2010</span>
                        <span className="text-xs text-primary mt-1">Нажмите для просмотра диплома</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                    <img 
                      src="https://cdn.poehali.dev/files/1176326b-82b8-4f33-9b20-5d8e2a72e984.jpg" 
                      alt="Диплом психолога Александра Гонтаря" 
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
                <div className="flex items-center gap-3">
                  <Icon name="Award" className="text-primary" size={24} />
                  <span>Сертифицированный специалист психологии менеджмента</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Briefcase" className="text-primary" size={24} />
                  <span>Когнитивно-поведенческая терапия (КПТ)</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl h-[500px] overflow-hidden shadow-xl">
              <img 
                src="https://cdn.poehali.dev/files/4a3a6dbf-3e9e-40b4-b434-9b2f343e76e4.jpg" 
                alt="Александр Гонтарь - психолог" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;