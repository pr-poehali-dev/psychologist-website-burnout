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
            Психологические тесты
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Пройдите профессиональные тесты для оценки вашего эмоционального состояния. 
            Результаты помогут понять, нужна ли консультация специалиста
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-200 bg-blue-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center text-center md:text-left gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center hover:scale-110 transition-transform duration-300 flex-shrink-0 mx-auto md:mx-0">
                  <Icon name="Brain" size={40} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-2">Тест на депрессию</h3>
                  <p className="text-base font-medium text-muted-foreground mb-3">
                    Шкала депрессии Бека (BDI-II)
                  </p>
                  
                  <p className="text-base text-foreground/70 mb-6">
                    Клинически валидизированный опросник из 21 вопроса для оценки выраженности депрессивных симптомов. 
                    Один из наиболее широко используемых инструментов для скрининга депрессии в мире.
                  </p>

                  <div className="bg-white/60 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-700 mb-2 font-semibold">Что оценивает тест:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Эмоциональное состояние и настроение</li>
                      <li>• Когнитивные изменения (мышление, концентрация)</li>
                      <li>• Физические симптомы (сон, аппетит, энергия)</li>
                      <li>• Суицидальные мысли и намерения</li>
                    </ul>
                  </div>

                  <Button
                    size="lg"
                    className="w-full md:w-auto px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => navigate('/tests')}
                  >
                    Пройти тесты
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 max-w-3xl mx-auto">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-4">
                <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-2">Важная информация о тесте:</p>
                  <ul className="space-y-2">
                    <li>• Тест основан на стандартизированной методике Аарона Бека</li>
                    <li>• Результаты являются ориентировочными и не заменяют профессиональную диагностику</li>
                    <li>• Тест помогает определить, когда стоит обратиться к специалисту</li>
                    <li>• Все данные остаются конфиденциальными и не сохраняются на сервере</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestPreviewSection;
