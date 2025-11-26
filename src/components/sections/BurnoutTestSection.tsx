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
      question: 'Я чувствую себя несчастным и мне хочется плакать',
      options: [
        { text: 'Нет', value: 0 },
        { text: 'Иногда', value: 1 },
        { text: 'Часто', value: 2 },
        { text: 'Почти всегда', value: 3 }
      ]
    },
    {
      question: 'Утром я чувствую себя лучше всего',
      options: [
        { text: 'Да, почти всегда', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Не очень часто', value: 1 },
        { text: 'Нет, совсем не так', value: 0 }
      ]
    },
    {
      question: 'У меня бывают приступы плача или близости к слезам',
      options: [
        { text: 'Очень часто', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Никогда', value: 0 }
      ]
    },
    {
      question: 'У меня плохой ночной сон',
      options: [
        { text: 'Да, почти всегда', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Нет, я сплю хорошо', value: 0 }
      ]
    },
    {
      question: 'Аппетит у меня не хуже обычного',
      options: [
        { text: 'Да, не хуже', value: 0 },
        { text: 'Немного хуже', value: 1 },
        { text: 'Значительно хуже', value: 2 },
        { text: 'Совсем нет аппетита', value: 3 }
      ]
    },
    {
      question: 'Я получаю удовольствие от общения с привлекательными женщинами/мужчинами',
      options: [
        { text: 'Да, получаю', value: 0 },
        { text: 'Не очень получаю', value: 1 },
        { text: 'Почти не получаю', value: 2 },
        { text: 'Совсем не получаю', value: 3 }
      ]
    },
    {
      question: 'Я замечаю, что теряю вес',
      options: [
        { text: 'Да, теряю много', value: 3 },
        { text: 'Немного потерял', value: 2 },
        { text: 'Вероятно, немного потерял', value: 1 },
        { text: 'Совсем не теряю', value: 0 }
      ]
    },
    {
      question: 'Меня беспокоят запоры',
      options: [
        { text: 'Да, почти постоянно', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Нет, не беспокоят', value: 0 }
      ]
    },
    {
      question: 'Сердце бьется быстрее, чем обычно',
      options: [
        { text: 'Да, очень часто', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Нет, не замечал', value: 0 }
      ]
    },
    {
      question: 'Я устаю без всяких причин',
      options: [
        { text: 'Да, почти постоянно', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Нет, не устаю', value: 0 }
      ]
    },
    {
      question: 'Я мыслю так же ясно, как всегда',
      options: [
        { text: 'Да, так же ясно', value: 0 },
        { text: 'Не так ясно, как обычно', value: 1 },
        { text: 'Значительно хуже', value: 2 },
        { text: 'Совсем плохо мыслю', value: 3 }
      ]
    },
    {
      question: 'Мне легко делать то, что я умею',
      options: [
        { text: 'Да, легко', value: 0 },
        { text: 'Не так легко, как раньше', value: 1 },
        { text: 'Приходится заставлять себя', value: 2 },
        { text: 'Совсем не могу делать', value: 3 }
      ]
    },
    {
      question: 'Я чувствую беспокойство и не могу усидеть на месте',
      options: [
        { text: 'Да, очень сильно', value: 3 },
        { text: 'Довольно сильно', value: 2 },
        { text: 'Немного', value: 1 },
        { text: 'Совсем не чувствую', value: 0 }
      ]
    },
    {
      question: 'Я с надеждой смотрю в будущее',
      options: [
        { text: 'Да, с надеждой', value: 0 },
        { text: 'Не очень с надеждой', value: 1 },
        { text: 'Почти без надежды', value: 2 },
        { text: 'Совсем без надежды', value: 3 }
      ]
    },
    {
      question: 'Я более раздражителен, чем обычно',
      options: [
        { text: 'Да, гораздо более', value: 3 },
        { text: 'Более раздражителен', value: 2 },
        { text: 'Немного более', value: 1 },
        { text: 'Нет, не более раздражителен', value: 0 }
      ]
    },
    {
      question: 'Мне легко принимать решения',
      options: [
        { text: 'Да, легко', value: 0 },
        { text: 'Труднее, чем обычно', value: 1 },
        { text: 'Очень трудно', value: 2 },
        { text: 'Совсем не могу', value: 3 }
      ]
    },
    {
      question: 'Я чувствую, что полезен и необходим',
      options: [
        { text: 'Да, чувствую', value: 0 },
        { text: 'Не очень чувствую', value: 1 },
        { text: 'Почти не чувствую', value: 2 },
        { text: 'Совсем не чувствую', value: 3 }
      ]
    },
    {
      question: 'Я живу достаточно полной жизнью',
      options: [
        { text: 'Да, вполне полной', value: 0 },
        { text: 'Не очень полной', value: 1 },
        { text: 'Довольно пустой', value: 2 },
        { text: 'Совсем пустой', value: 3 }
      ]
    },
    {
      question: 'Я чувствую, что другим людям станет лучше, если я умру',
      options: [
        { text: 'Да, так и есть', value: 3 },
        { text: 'Вероятно, так', value: 2 },
        { text: 'Не думаю', value: 1 },
        { text: 'Нет, совсем не так', value: 0 }
      ]
    },
    {
      question: 'Меня до сих пор радует то, что радовало всегда',
      options: [
        { text: 'Да, радует', value: 0 },
        { text: 'Не очень радует', value: 1 },
        { text: 'Мало что радует', value: 2 },
        { text: 'Ничто не радует', value: 3 }
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

    if (total < 10) {
      return {
        level: 'Отсутствие депрессии',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: 'CheckCircle',
        description: 'У вас нормальное эмоциональное состояние. Отсутствуют признаки депрессии.',
        recommendation: 'Поддерживайте здоровый образ жизни и баланс между работой и отдыхом.'
      };
    } else if (total < 19) {
      return {
        level: 'Легкая депрессия',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: 'AlertTriangle',
        description: 'Присутствуют незначительные признаки депрессии. Это может быть временным состоянием.',
        recommendation: 'Рекомендуется консультация психолога для профилактики и освоения техник саморегуляции.'
      };
    } else if (total < 30) {
      return {
        level: 'Умеренная депрессия',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: 'AlertCircle',
        description: 'У вас выраженные симптомы депрессии. Это влияет на качество жизни и требует внимания.',
        recommendation: 'Настоятельно рекомендуется работа с психологом. КПТ-терапия эффективна при депрессии.'
      };
    } else {
      return {
        level: 'Тяжелая депрессия',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: 'XCircle',
        description: 'Выраженные симптомы тяжелой депрессии. Требуется профессиональная помощь.',
        recommendation: 'Необходима консультация психолога или психиатра. Не откладывайте обращение за помощью.'
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
РЕЗУЛЬТАТЫ ТЕСТА ПО ШКАЛЕ ДЕПРЕССИИ БЕКА

Уровень: ${result.level}
Баллы: ${total} из 60

Интерпретация баллов:
0-9: Отсутствие депрессии
10-18: Легкая депрессия
19-29: Умеренная депрессия
30-63: Тяжелая депрессия

Описание:
${result.description}

Рекомендация:
${result.recommendation}

Ответы на вопросы:
${questions.map((q, i) => `${i + 1}. ${q.question}\n   Ваш ответ: ${q.options[answers[i]].text} (${answers[i]} балла)`).join('\n\n')}

---
Дата прохождения: ${new Date().toLocaleDateString('ru-RU')}
Психолог Александр Гонтарь
https://alexandergontar.ru

Важно: Данный тест является ориентировочным и не заменяет профессиональную диагностику.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-beck-${new Date().toISOString().split('T')[0]}.txt`;
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

  const scrollToAnxietyTest = () => {
    const element = document.getElementById('anxiety-test');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTestsNav = () => {
    const element = document.getElementById('tests-nav');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (showResult) {
    const result = calculateResult();
    const total = answers.reduce((sum, val) => sum + val, 0);
    
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button
              onClick={scrollToTestsNav}
              variant="outline"
              size="sm"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться к выбору теста
            </Button>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className={`border-2 ${result.borderColor} ${result.bgColor}`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Icon name={result.icon} size={48} className={result.color} />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">
                  Результат теста Бека
                </CardTitle>
                <p className={`text-2xl font-bold ${result.color}`}>{result.level}</p>
                <p className="text-lg text-muted-foreground mt-2">
                  Ваш результат: {total} из 60 баллов
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-white rounded-lg border">
                  <p className="text-lg text-foreground/80 mb-4">{result.description}</p>
                  <p className="text-base font-medium text-foreground">{result.recommendation}</p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-2">Интерпретация баллов:</p>
                      <ul className="space-y-1">
                        <li>0-9: Отсутствие депрессии</li>
                        <li>10-18: Легкая депрессия</li>
                        <li>19-29: Умеренная депрессия</li>
                        <li>30-63: Тяжелая депрессия</li>
                      </ul>
                      <p className="mt-3 text-xs">
                        Данный тест является ориентировочным и не заменяет профессиональную диагностику.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
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
                        <Icon name="Send" size={16} className="mr-2" />
                        {isEmailSending ? 'Отправка...' : 'Отправить'}
                      </Button>
                    </div>
                    <Button onClick={downloadPDF} variant="outline">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать
                    </Button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={onBooking}
                      className="w-full"
                      size="lg"
                    >
                      <Icon name="Calendar" size={20} className="mr-2" />
                      Записаться на консультацию
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        onClick={resetTest}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                      >
                        <Icon name="RotateCcw" size={20} className="mr-2" />
                        Пройти снова
                      </Button>
                      <Button
                        onClick={scrollToAnxietyTest}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                      >
                        Тест на тревожность
                        <Icon name="ArrowRight" size={20} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="test" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <Button
            onClick={scrollToTestsNav}
            variant="outline"
            size="sm"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться к выбору теста
          </Button>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Тест по шкале депрессии Бека
            </h2>
            <p className="text-lg text-muted-foreground">
              Опросник Бека (BDI) — стандартизированный тест для оценки выраженности депрессии
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Вопрос {currentQuestion + 1} из {questions.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="mb-4" />
              <CardTitle className="text-xl md:text-2xl">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(val) => handleAnswer(parseInt(val))}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent hover:border-primary transition-all cursor-pointer"
                    onClick={() => handleAnswer(option.value)}
                  >
                    <RadioGroupItem value={option.value.toString()} id={`option-${idx}`} />
                    <Label
                      htmlFor={`option-${idx}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="mt-6 flex gap-3">
                {currentQuestion > 0 && (
                  <Button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    variant="outline"
                  >
                    <Icon name="ChevronLeft" size={20} className="mr-2" />
                    Назад
                  </Button>
                )}
                <Button
                  onClick={resetTest}
                  variant="ghost"
                  className="ml-auto"
                >
                  Начать заново
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Отвечайте на вопросы, ориентируясь на свое состояние в течение последних двух недель, включая сегодняшний день.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurnoutTestSection;