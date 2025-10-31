import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface BurnoutTestSectionProps {
  onBooking: () => void;
}

const BurnoutTestSection = ({ onBooking }: BurnoutTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const { toast } = useToast();

  const questions = [
    {
      question: 'Как часто вы чувствуете эмоциональное истощение от работы?',
      options: [
        { text: 'Никогда', value: 0 },
        { text: 'Редко', value: 1 },
        { text: 'Иногда', value: 2 },
        { text: 'Часто', value: 3 },
        { text: 'Постоянно', value: 4 }
      ]
    },
    {
      question: 'Насколько сложно вам концентрироваться на задачах?',
      options: [
        { text: 'Легко концентрируюсь', value: 0 },
        { text: 'Иногда отвлекаюсь', value: 1 },
        { text: 'Приходится прикладывать усилия', value: 2 },
        { text: 'Очень сложно', value: 3 },
        { text: 'Практически невозможно', value: 4 }
      ]
    },
    {
      question: 'Как вы себя чувствуете утром перед рабочим днём?',
      options: [
        { text: 'Бодрым и мотивированным', value: 0 },
        { text: 'Нормально', value: 1 },
        { text: 'Уставшим', value: 2 },
        { text: 'Разбитым', value: 3 },
        { text: 'Не хочу вставать', value: 4 }
      ]
    },
    {
      question: 'Как часто вы испытываете раздражение или цинизм к работе?',
      options: [
        { text: 'Никогда', value: 0 },
        { text: 'Редко', value: 1 },
        { text: 'Иногда', value: 2 },
        { text: 'Часто', value: 3 },
        { text: 'Постоянно', value: 4 }
      ]
    },
    {
      question: 'Насколько качественно вы спите последнее время?',
      options: [
        { text: 'Отлично', value: 0 },
        { text: 'Хорошо', value: 1 },
        { text: 'Бывают проблемы', value: 2 },
        { text: 'Плохо', value: 3 },
        { text: 'Бессонница', value: 4 }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const calculateResult = () => {
    const total = answers.reduce((sum, val) => sum + val, 0);
    const max = questions.length * 4;
    const percentage = (total / max) * 100;

    if (percentage < 20) {
      return {
        level: 'Низкий риск',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: 'CheckCircle',
        description: 'У вас хорошее эмоциональное состояние. Продолжайте следить за балансом работы и отдыха.',
        recommendation: 'Профилактические консультации помогут поддерживать этот уровень.'
      };
    } else if (percentage < 40) {
      return {
        level: 'Умеренный риск',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: 'AlertTriangle',
        description: 'Появились первые признаки выгорания. Сейчас самое время принять меры.',
        recommendation: 'Рекомендуется пройти консультацию для профилактики и освоения техник саморегуляции.'
      };
    } else if (percentage < 70) {
      return {
        level: 'Высокий риск',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: 'AlertCircle',
        description: 'У вас выраженные симптомы выгорания. Это влияет на продуктивность и здоровье.',
        recommendation: 'Настоятельно рекомендуется начать работу с психологом. Программа из 8 сессий поможет восстановить баланс.'
      };
    } else {
      return {
        level: 'Критический уровень',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: 'XCircle',
        description: 'Критический уровень выгорания. Требуется немедленная помощь специалиста.',
        recommendation: 'Необходима срочная консультация. Не откладывайте — ваше здоровье под угрозой.'
      };
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setEmail('');
  };

  const downloadPDF = () => {
    const result = calculateResult();
    const total = answers.reduce((sum, val) => sum + val, 0);
    
    const content = `
РЕЗУЛЬТАТЫ ТЕСТА НА ПРОФЕССИОНАЛЬНОЕ ВЫГОРАНИЕ

Уровень риска: ${result.level}
Баллы: ${total} из ${questions.length * 4}

Описание:
${result.description}

Рекомендация:
${result.recommendation}

Ответы на вопросы:
${questions.map((q, i) => `${i + 1}. ${q.question}\n   Ваш ответ: ${q.options[answers[i]].text}`).join('\n\n')}

---
Дата прохождения: ${new Date().toLocaleDateString('ru-RU')}
Психолог Александр Гонтарь
https://alexandergontar.ru
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-burnout-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Результаты сохранены',
      description: 'Файл с результатами загружен на ваше устройство',
    });
  };

  const sendEmail = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректный email',
        variant: 'destructive',
      });
      return;
    }

    setIsEmailSending(true);
    
    try {
      const result = calculateResult();
      const total = answers.reduce((sum, val) => sum + val, 0);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Результаты отправлены',
        description: `Результаты теста отправлены на ${email}`,
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: 'Ошибка отправки',
        description: 'Попробуйте снова или скачайте результаты',
        variant: 'destructive',
      });
    } finally {
      setIsEmailSending(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const result = calculateResult();
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className={`border-2 ${result.borderColor} ${result.bgColor}`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Icon name={result.icon} size={48} className={result.color} />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">
                  Результат теста на выгорание
                </CardTitle>
                <p className={`text-2xl font-bold ${result.color}`}>{result.level}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-white rounded-lg border">
                  <p className="text-lg text-foreground/80 mb-4">{result.description}</p>
                  <p className="text-base font-medium text-foreground">{result.recommendation}</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-sm font-medium mb-3">Сохранить результаты:</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 flex gap-2">
                        <Input
                          type="email"
                          placeholder="Ваш email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={sendEmail}
                          disabled={isEmailSending}
                          variant="outline"
                        >
                          {isEmailSending ? (
                            <Icon name="Loader2" size={18} className="animate-spin" />
                          ) : (
                            <><Icon name="Mail" size={18} className="mr-2" />Отправить</>
                          )}
                        </Button>
                      </div>
                      <Button
                        onClick={downloadPDF}
                        variant="outline"
                      >
                        <Icon name="Download" size={18} className="mr-2" />
                        Скачать
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1 btn-pulse-glow"
                      onClick={onBooking}
                    >
                      <Icon name="Calendar" size={20} className="mr-2" />
                      Записаться на консультацию
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={resetTest}
                    >
                      <Icon name="RotateCcw" size={20} className="mr-2" />
                      Пройти ещё раз
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center italic mt-4">
                  * Это экспресс-тест для первичной оценки. Для точной диагностики рекомендуется пройти полный тест MBI-HSS на консультации.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Экспресс-тест на выгорание
            </h2>
            <p className="text-lg text-muted-foreground">
              Ответьте на 5 вопросов и узнайте ваш уровень риска за 1 минуту
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswer(parseInt(value))}
              >
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-base"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BurnoutTestSection;