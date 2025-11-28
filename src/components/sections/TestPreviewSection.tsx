import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const TestPreviewSection = () => {
  const navigate = useNavigate();

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
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Icon name="Brain" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Тест на депрессию</h3>
                  <p className="text-sm text-muted-foreground">
                    Шкала депрессии Бека (BDI-II)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Icon name="Activity" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Тест на тревожность</h3>
                  <p className="text-sm text-muted-foreground">
                    Шкала тревоги Бека (BAI)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Icon name="Users" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Тест на темперамент</h3>
                  <p className="text-sm text-muted-foreground">
                    Опросник Айзенка (EPI)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <Icon name="Heart" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Тест на эмпатию</h3>
                  <p className="text-sm text-muted-foreground">
                    Методика Бойко
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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