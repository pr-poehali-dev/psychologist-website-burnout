import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const TestsNavigationSection = () => {
  const scrollToTest = (testId: string) => {
    const element = document.getElementById(testId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tests = [
    {
      id: 'depression-test',
      title: 'Тест на депрессию',
      subtitle: 'Шкала депрессии Бека (BDI-II)',
      description: 'Клинически валидизированный опросник из 21 вопроса для оценки выраженности депрессивных симптомов',
      icon: 'Brain',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      featured: false,
    },
    {
      id: 'anxiety-test',
      title: 'Тест на тревожность',
      subtitle: 'Шкала тревожности Бека (BAI)',
      description: 'Опросник из 21 вопроса для оценки физиологических и когнитивных симптомов тревоги',
      icon: 'Heart',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      featured: false,
    },
    {
      id: 'temperament-test',
      title: 'Тест на темперамент',
      subtitle: 'Опросник Айзенка (EPI)',
      description: 'Классическая методика из 57 вопросов для определения типа темперамента по шкалам экстраверсии и нейротизма',
      icon: 'User',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      featured: false,
    },
    {
      id: 'empathy-test',
      title: 'Тест на эмпатию',
      subtitle: 'Методика В.В. Бойко',
      description: 'Диагностика уровня эмпатических способностей — умения понимать и разделять эмоции других людей',
      icon: 'Users',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      featured: false,
    }
  ];

  return (
    <section id="tests-nav" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Психологические тесты
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Пройдите профессиональные тесты для оценки вашего эмоционального состояния. 
            Результаты помогут понять, нужна ли консультация специалиста
          </p>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {tests.map((test, index) => (
            <Card
              key={test.id}
              className={`border-2 ${test.borderColor} ${test.bgColor} hover:shadow-xl transition-all duration-300 cursor-pointer group ${index === 0 ? 'md:col-span-2' : ''}`}
              onClick={() => scrollToTest(test.id)}
            >
              <CardContent className="p-6">
                <div className={`flex flex-col ${index === 0 ? 'md:flex-row md:items-center' : 'items-center'} text-center ${index === 0 ? 'md:text-left' : ''} gap-6`}>
                  <div className={`${index === 0 ? 'w-20 h-20' : 'w-16 h-16'} rounded-full bg-gradient-to-br ${test.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <Icon name={test.icon} size={index === 0 ? 40 : 32} className="text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                      <h3 className={`${index === 0 ? 'text-3xl' : 'text-2xl'} font-bold`}>{test.title}</h3>
                      {test.featured && (
                        <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                          Рекомендуем
                        </span>
                      )}
                    </div>
                    <p className={`${index === 0 ? 'text-base' : 'text-sm'} font-medium text-muted-foreground mb-3`}>
                      {test.subtitle}
                    </p>
                    
                    <p className="text-base text-foreground/70 mb-6">
                      {test.description}
                    </p>

                    <Button
                      size="lg"
                      className={`${index === 0 ? 'w-full md:w-auto px-8' : 'w-full'} group-hover:scale-105 transition-transform`}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToTest(test.id);
                      }}
                    >
                      Пройти тест
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-4">
              <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-2">Важная информация о тестах:</p>
                <ul className="space-y-2">
                  <li>• Все тесты основаны на научно-валидированных психологических методиках</li>
                  <li>• Результаты являются ориентировочными и не заменяют профессиональную диагностику</li>
                  <li>• Тесты помогают определить, когда стоит обратиться к специалисту</li>
                  <li>• Все данные остаются конфиденциальными и сохраняются только в вашем браузере</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestsNavigationSection;