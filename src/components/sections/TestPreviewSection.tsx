import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const TestPreviewSection = () => {
  const navigate = useNavigate();

  const tests = [
    {
      title: 'Тест на депрессию',
      subtitle: 'Шкала депрессии Бека (BDI-II)',
      description: 'Оценка настроения, когнитивных изменений, физических симптомов и мотивации. 21 вопрос для определения выраженности депрессивных симптомов',
      icon: 'Brain',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200'
    },
    {
      title: 'Тест на тревожность',
      subtitle: 'Шкала тревоги Бека (BAI)',
      description: 'Измерение физических и эмоциональных проявлений тревоги. 21 вопрос для оценки интенсивности тревожных симптомов',
      icon: 'Activity',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      border: 'border-orange-200'
    },
    {
      title: 'Тест на темперамент',
      subtitle: 'Опросник Айзенка (EPI)',
      description: 'Определение типа темперамента: холерик, сангвиник, флегматик или меланхолик. 57 вопросов для анализа экстраверсии и нейротизма',
      icon: 'Users',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      border: 'border-purple-200'
    },
    {
      title: 'Тест на эмпатию',
      subtitle: 'Методика Бойко',
      description: 'Оценка способности к эмпатии и эмоциональному отклику. 36 вопросов для определения уровня сопереживания и понимания других людей',
      icon: 'Heart',
      gradient: 'from-green-500 to-teal-600',
      bgGradient: 'from-green-50 to-teal-50',
      border: 'border-green-200'
    }
  ];

  return (
    <section id="tests-preview" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Профессиональные психологические тесты
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Пройдите валидированные тесты для оценки вашего эмоционального состояния и личностных особенностей. 
            Результаты помогут понять, нужна ли консультация специалиста
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {tests.map((test, index) => (
            <Card 
              key={index}
              className={`border-2 ${test.border} bg-gradient-to-br ${test.bgGradient} hover:shadow-xl transition-all duration-300 group cursor-pointer`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${test.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon name={test.icon} size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{test.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {test.subtitle}
                    </p>
                    <p className="text-xs text-foreground/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {test.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            size="lg"
            className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => navigate('/tests')}
          >
            Пройти тесты
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-4">
              <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-2">Важная информация о тестах:</p>
                <ul className="space-y-2">
                  <li>• Все тесты основаны на стандартизированных клинических методиках</li>
                  <li>• Результаты являются ориентировочными и не заменяют профессиональную диагностику</li>
                  <li>• Тесты помогают определить, когда стоит обратиться к специалисту</li>
                  <li>• Все данные остаются конфиденциальными и не сохраняются на сервере</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestPreviewSection;