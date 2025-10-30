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
                <p>
                  Меня зовут Александр Гонтарь. Я психолог, предприниматель и отец. С детства меня интересовало, 
                  почему люди ведут себя так или иначе: чего мы боимся, к чему стремимся, управляем ли мы собой 
                  или находимся во власти собственной природы.
                </p>
                <p>
                  Я всегда был хорошим слушателем, не давал оценок и помогал людям разобраться в сути происходящего. 
                  Этот интерес привел меня на факультет общей психологии в 2005 году, где начался мой профессиональный путь.
                </p>
                <p>
                  За годы практики я консультировал предпринимателей, создавал эффективные команды, помогал выстраивать 
                  здоровые отношения. Работал в разных сферах: транспорт, ресторанный бизнес, индустрия красоты, 
                  дошкольное образование.
                </p>
                <p className="font-medium text-foreground">
                  Поработав в разных психологических направлениях, я выявил закономерность: большинство проблем 
                  напрямую или косвенно связаны с <strong>профессиональным выгоранием и эмоциональным истощением</strong>, 
                  вызванным хроническим перенапряжением.
                </p>
                <p>
                  Игнорирование выгорания приводит к развитию клинической депрессии, где одной терапии уже недостаточно. 
                  Наше внутреннее состояние влияет на все сферы жизни и все решения. Сбой, ведущий за собой другой сбой, 
                  как в компьютерной программе, может привести к обрушению всей системы.
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