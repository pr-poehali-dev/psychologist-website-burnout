import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { bdiQuestions } from './testData';

interface TestQuestionProps {
  currentQuestion: number;
  answer: number | undefined;
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TestQuestion = ({ currentQuestion, answer, onAnswer, onNext, onPrevious }: TestQuestionProps) => {
  const progress = ((currentQuestion + 1) / bdiQuestions.length) * 100;
  const currentQ = bdiQuestions[currentQuestion];

  return (
    <section id="depression-test" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Тест на депрессию (BDI-II)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Шкала депрессии Бека (Beck Depression Inventory) — клинически валидизированный инструмент для оценки депрессивных симптомов
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  Вопрос {currentQuestion + 1} из {bdiQuestions.length}
                </CardTitle>
                <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {currentQ.question}
                </h3>
                <p className="text-sm text-gray-600">
                  Выберите утверждение, которое лучше всего описывает ваше состояние за последние две недели
                </p>
              </div>

              <RadioGroup
                value={answer?.toString()}
                onValueChange={(val) => onAnswer(parseInt(val))}
              >
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-blue-300 hover:bg-blue-50 ${
                        answer === index
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white'
                      }`}
                      onClick={() => onAnswer(index)}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-base leading-relaxed"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex gap-4 pt-6">
                <Button
                  onClick={onPrevious}
                  variant="outline"
                  size="lg"
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  <Icon name="ChevronLeft" size={20} className="mr-2" />
                  Назад
                </Button>
                <Button
                  onClick={onNext}
                  size="lg"
                  disabled={answer === undefined}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-primary hover:from-blue-700 hover:to-primary/90"
                >
                  {currentQuestion === bdiQuestions.length - 1 ? 'Завершить тест' : 'Далее'}
                  <Icon name="ChevronRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-start gap-4">
            <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">О тесте BDI-II:</p>
              <p>
                Шкала депрессии Бека — один из самых надёжных инструментов для оценки депрессивных симптомов. 
                Результаты помогут определить уровень депрессивных проявлений и понять, требуется ли профессиональная помощь.
              </p>
              <p className="text-xs text-gray-600 italic">
                Внимание: этот тест не заменяет профессиональную диагностику и консультацию специалиста.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestQuestion;
