import Icon from '@/components/ui/icon';

interface ProblemSectionProps {
  customProblems?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

const ProblemSection = ({ customProblems }: ProblemSectionProps) => {
  const questions = [
    'Что на самом деле мешает специалистам получать удовольствие от своего призвания?',
    'Как настроить свой день, чтобы хватало времени на себя?',
    'Когда наступит тот день, и мы начнем получать больше, чем вкладываем?'
  ];

  const commonMistakes = [
    'Ждут, что «само пройдет» — но выгорание только усугубляется со временем',
    'Пытаются взять себя в руки через силу — это приводит к еще большему истощению',
    'Меняют работу — но проблема переезжает вместе с ними на новое место',
    'Уходят в отпуск — возвращаются отдохнувшими, но через 2-3 недели снова на нуле',
    'Ищут разовые решения — медитация, спорт, витамины помогают временно, но не решают корень проблемы'
  ];

  const whyNotWork = [
    {
      title: '«Само пройдет» — не работает',
      reason: 'Выгорание — это не усталость, а системный сбой адаптационных механизмов психики. Без целенаправленного восстановления нервная система продолжает работать в режиме истощения.'
    },
    {
      title: 'Попытки «взять себя в руки» — усиливают проблему',
      reason: 'Требуют затрат и без того ограниченной энергии. Волевые усилия при выгорании подобны попыткам завести автомобиль с севшим аккумулятором — только глубже разряжают систему.'
    },
    {
      title: 'Смена работы — не решает корень проблемы',
      reason: 'Выгорание связано не столько с местом работы, сколько с индивидуальными паттернами мышления, эмоционального реагирования и управления энергией. Эти паттерны воспроизводятся в любой профессиональной среде.'
    },
    {
      title: 'Отпуск дает временный эффект',
      reason: 'За 2-3 недели отдыха можно восстановить острые симптомы усталости, но невозможно перестроить глубинные механизмы регуляции энергии. Возвращаясь к прежнему образу жизни, вы быстро истощаете накопленный ресурс.'
    },
    {
      title: 'Разовые решения (медитация, спорт, витамины) недостаточны',
      reason: 'Выгорание требует комплексного подхода: работа с мышлением + восстановление энергетической системы + изменение рабочих привычек + формирование устойчивых практик самоподдержки.'
    }
  ];

  if (customProblems) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/10 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              С чем я помогаю
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {customProblems.map((problem, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-sm border border-accent/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                      <Icon name={problem.icon} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                      <p className="text-foreground/70">{problem.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-accent/10 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div 
                key={index}
                className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-accent/20"
              >
                <div className="flex-shrink-0 mt-1">
                  <Icon name="HelpCircle" size={24} className="text-primary" />
                </div>
                <p className="text-lg font-medium text-foreground">
                  {question}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Что делают большинство специалистов?
            </h2>
            <div className="space-y-4">
              {commonMistakes.map((mistake, index) => (
                <div 
                  key={index}
                  className="flex gap-4 items-start p-4 rounded-lg bg-red-50/50 border-l-4 border-red-400"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon name="XCircle" size={20} className="text-red-500" />
                  </div>
                  <p className="text-base text-foreground/80">
                    {mistake}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg text-muted-foreground mt-6">
              И это вполне логично. Помогает решить проблему в <span className="font-bold text-red-500">10% случаев</span>.
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Почему в 90% случаев стандартные методы не работают?
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              Большинство специалистов с выгоранием действуют по привычным схемам, но получают временное облегчение или даже усугубление состояния. Вот почему:
            </p>
            <div className="space-y-6">
              {whyNotWork.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-sm border border-accent/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-3 items-start mb-3">
                    <Icon name="AlertCircle" size={24} className="text-red-500 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base text-foreground/80 leading-relaxed ml-9">
                    {item.reason}
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

export default ProblemSection;