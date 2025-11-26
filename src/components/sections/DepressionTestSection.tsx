import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { jsPDF } from 'jspdf';

interface DepressionTestSectionProps {
  onBooking: () => void;
}

const DepressionTestSection = ({ onBooking }: DepressionTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const bdiQuestions = [
    {
      question: 'Грусть',
      options: [
        'Я не чувствую себя грустным(ой)',
        'Я часто чувствую грусть',
        'Я всё время грущу',
        'Я настолько грустен(а) и несчастен(а), что не могу этого вынести'
      ]
    },
    {
      question: 'Пессимизм',
      options: [
        'Я смотрю в будущее без особого разочарования',
        'Я чувствую себя разочарованным(ой) в будущем',
        'Я чувствую, что мне нечего ждать впереди',
        'Я чувствую, что будущее безнадёжно и ничего не улучшится'
      ]
    },
    {
      question: 'Чувство неудачи',
      options: [
        'Я не чувствую себя неудачником(цей)',
        'Я чувствую, что потерпел(а) больше неудач, чем большинство людей',
        'Оглядываясь на свою жизнь, я вижу много неудач',
        'Я чувствую себя полным(ой) неудачником(цей)'
      ]
    },
    {
      question: 'Потеря удовольствия',
      options: [
        'Я получаю столько же удовольствия от вещей, как и раньше',
        'Я не получаю удовольствие от вещей так, как раньше',
        'Я почти не получаю удовольствия от вещей',
        'Я не могу получить никакого удовольствия от вещей'
      ]
    },
    {
      question: 'Чувство вины',
      options: [
        'Я не чувствую себя особенно виноватым(ой)',
        'Я чувствую себя виноватым(ой) большую часть времени',
        'Я чувствую себя довольно виноватым(ой) большую часть времени',
        'Я чувствую себя виноватым(ой) всё время'
      ]
    },
    {
      question: 'Чувство наказания',
      options: [
        'Я не чувствую, что меня наказывают',
        'Я чувствую, что меня могут наказать',
        'Я ожидаю, что меня накажут',
        'Я чувствую, что меня наказывают'
      ]
    },
    {
      question: 'Неприятие себя',
      options: [
        'Я отношусь к себе так же, как всегда',
        'Я потерял(а) уверенность в себе',
        'Я разочарован(а) в себе',
        'Я не люблю себя'
      ]
    },
    {
      question: 'Самокритичность',
      options: [
        'Я не критикую и не виню себя больше обычного',
        'Я более критичен(на) к себе, чем раньше',
        'Я критикую себя за все свои ошибки',
        'Я виню себя во всём плохом, что происходит'
      ]
    },
    {
      question: 'Суицидальные мысли',
      options: [
        'У меня нет мыслей о том, чтобы причинить себе вред',
        'У меня есть мысли о том, чтобы причинить себе вред, но я бы этого не сделал(а)',
        'Я хотел(а) бы покончить с собой',
        'Я бы покончил(а) с собой, если бы представилась возможность'
      ]
    },
    {
      question: 'Плаксивость',
      options: [
        'Я плачу не больше обычного',
        'Я плачу больше, чем раньше',
        'Я плачу всё время',
        'Раньше я мог(ла) плакать, но теперь не могу, даже если хочу'
      ]
    },
    {
      question: 'Возбуждение',
      options: [
        'Я не более раздражителен(льна), чем обычно',
        'Я более раздражителен(льна), чем обычно',
        'Я намного более раздражителен(льна), чем обычно',
        'Я всё время раздражён(а)'
      ]
    },
    {
      question: 'Потеря интереса',
      options: [
        'Я не потерял(а) интереса к другим людям',
        'Я меньше интересуюсь другими людьми, чем раньше',
        'Я потерял(а) большую часть интереса к другим людям',
        'Я потерял(а) весь интерес к другим людям'
      ]
    },
    {
      question: 'Нерешительность',
      options: [
        'Я принимаю решения так же хорошо, как всегда',
        'Мне труднее принимать решения, чем обычно',
        'Мне гораздо труднее принимать решения, чем раньше',
        'Я больше не могу принимать решения'
      ]
    },
    {
      question: 'Бесполезность',
      options: [
        'Я не чувствую себя бесполезным(ой)',
        'Я не считаю себя таким(ой) же ценным(ой) и полезным(ой), как раньше',
        'Я чувствую себя менее ценным(ой) по сравнению с другими людьми',
        'Я чувствую себя совершенно бесполезным(ой)'
      ]
    },
    {
      question: 'Потеря энергии',
      options: [
        'У меня столько же энергии, как всегда',
        'У меня меньше энергии, чем обычно',
        'У меня недостаточно энергии, чтобы делать многое',
        'У меня недостаточно энергии, чтобы что-либо делать'
      ]
    },
    {
      question: 'Изменения в режиме сна',
      options: [
        'Мой режим сна не изменился',
        'Я сплю немного больше/меньше обычного',
        'Я сплю намного больше/меньше обычного',
        'Я сплю большую часть дня или просыпаюсь на 1-2 часа раньше'
      ]
    },
    {
      question: 'Раздражительность',
      options: [
        'Я не более раздражителен(льна), чем обычно',
        'Я более раздражителен(льна), чем обычно',
        'Я намного более раздражителен(льна), чем обычно',
        'Я раздражён(а) всё время'
      ]
    },
    {
      question: 'Изменения в аппетите',
      options: [
        'Мой аппетит не изменился',
        'Мой аппетит немного меньше/больше обычного',
        'Мой аппетит намного меньше/больше обычного',
        'У меня совсем нет аппетита или я хочу есть всё время'
      ]
    },
    {
      question: 'Трудности с концентрацией',
      options: [
        'Я могу концентрироваться так же хорошо, как всегда',
        'Я не могу концентрироваться так же хорошо, как обычно',
        'Мне трудно долго концентрироваться на чём-либо',
        'Я не могу ни на чём сконцентрироваться'
      ]
    },
    {
      question: 'Усталость',
      options: [
        'Я не более устал(а) или утомлён(а), чем обычно',
        'Я устаю или утомляюсь легче, чем обычно',
        'Я слишком устал(а) или утомлён(а), чтобы делать многое',
        'Я слишком устал(а) или утомлён(а), чтобы что-либо делать'
      ]
    },
    {
      question: 'Потеря интереса к сексу',
      options: [
        'Мой интерес к сексу не изменился',
        'Я меньше интересуюсь сексом, чем раньше',
        'Я гораздо меньше интересуюсь сексом',
        'Я полностью потерял(а) интерес к сексу'
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) return;
    
    if (currentQuestion < bdiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const result = getResult();
    const score = calculateScore();
    const maxScore = 63;
    const date = new Date().toLocaleDateString('ru-RU');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Rezultaty testa BDI-II', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data prohojdeniya: ${date}`, 105, 30, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Vash rezultat:', 20, 50);
    
    doc.setFontSize(32);
    const scoreColor = score <= 13 ? [22, 163, 74] : score <= 19 ? [202, 138, 4] : score <= 28 ? [234, 88, 12] : [220, 38, 38];
    doc.setTextColor(...scoreColor);
    doc.text(`${score} / ${maxScore}`, 105, 70, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(result.level, 105, 85, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Interpretaciya:', 20, 105);
    
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(result.description, 170);
    doc.text(descLines, 20, 115);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Rekomendacii:', 20, 135);
    
    doc.setFont('helvetica', 'normal');
    const recLines = doc.splitTextToSize(result.recommendation, 170);
    doc.text(recLines, 20, 145);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('Vajno:', 20, 175);
    doc.setFont('helvetica', 'normal');
    doc.text('- Etot test yavlyaetsya skriningovym instrumentom, a ne diagnozom', 20, 182);
    doc.text('- Tolko specialist mojet postavit tochnyi diagnoz', 20, 189);
    doc.text('- Depressiya - eto izlechimoe sostoyanie pri pravilnom podhode', 20, 196);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 210, 190, 210);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Shkala depressii Beka (BDI-II)', 105, 220, { align: 'center' });
    doc.text('Beck Depression Inventory - Second Edition', 105, 227, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Dlya zapisyi na konsultaciyu posetite: calink.ru/Algon', 105, 280, { align: 'center' });

    doc.save(`BDI-II_rezultaty_${date.replace(/\./g, '-')}.pdf`);
  };

  const calculateScore = () => {
    return answers.reduce((sum, val) => sum + val, 0);
  };

  const getResult = () => {
    const score = calculateScore();
    
    if (score <= 13) {
      return {
        level: 'Минимальная депрессия',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: 'Ваши результаты указывают на минимальный уровень депрессивных симптомов. Это нормальное состояние.',
        recommendation: 'Продолжайте поддерживать своё психическое здоровье через здоровый образ жизни и социальные связи.',
        icon: 'CheckCircle2',
        chartColor: '#16a34a'
      };
    } else if (score <= 19) {
      return {
        level: 'Лёгкая депрессия',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        description: 'Результаты указывают на лёгкие депрессивные симптомы, которые могут влиять на вашу повседневную жизнь.',
        recommendation: 'Рекомендуется обратить внимание на режим дня, физическую активность и общение. Консультация психолога может помочь.',
        icon: 'AlertCircle',
        chartColor: '#ca8a04'
      };
    } else if (score <= 28) {
      return {
        level: 'Умеренная депрессия',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        description: 'Результаты указывают на умеренный уровень депрессивных симптомов, которые существенно влияют на качество жизни.',
        recommendation: 'Настоятельно рекомендуется консультация с психологом или психотерапевтом для работы над этим состоянием.',
        icon: 'AlertTriangle',
        chartColor: '#ea580c'
      };
    } else {
      return {
        level: 'Тяжёлая депрессия',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: 'Результаты указывают на тяжёлый уровень депрессивных симптомов. Это серьёзное состояние, требующее внимания.',
        recommendation: 'Необходима срочная консультация со специалистом. Обратитесь к психологу или психиатру для получения профессиональной помощи.',
        icon: 'XCircle',
        chartColor: '#dc2626'
      };
    }
  };

  const progress = ((currentQuestion + 1) / bdiQuestions.length) * 100;

  if (showResult) {
    const result = getResult();
    const score = calculateScore();
    const maxScore = 63;

    return (
      <section id="depression-test" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <Card className={`${result.borderColor} border-2 shadow-2xl`}>
            <CardHeader className={result.bgColor}>
              <div className="flex items-center justify-center mb-4">
                <Icon name={result.icon} size={64} className={result.color} />
              </div>
              <CardTitle className="text-center text-3xl">
                Результаты теста BDI-II
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${result.color}`}>
                  {score} / {maxScore}
                </div>
                <h3 className={`text-2xl font-semibold ${result.color}`}>
                  {result.level}
                </h3>
              </div>

              <div className="my-8">
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(score / maxScore) * 100}%`,
                      backgroundColor: result.chartColor
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>0</span>
                  <span>13</span>
                  <span>19</span>
                  <span>28</span>
                  <span>63</span>
                </div>
                <div className="flex justify-between mt-1 text-xs font-medium">
                  <span className="text-green-600">Минимальная</span>
                  <span className="text-yellow-600">Лёгкая</span>
                  <span className="text-orange-600">Умеренная</span>
                  <span className="text-red-600">Тяжёлая</span>
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Info" size={20} />
                    Что это означает:
                  </h4>
                  <p className="text-gray-700">{result.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Lightbulb" size={20} />
                    Рекомендации:
                  </h4>
                  <p className="text-gray-700">{result.recommendation}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                  <Icon name="Heart" size={20} />
                  Важно помнить:
                </h4>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                    <span>Этот тест является скрининговым инструментом, а не диагнозом</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                    <span>Только специалист может поставить точный диагноз</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                    <span>Депрессия — это излечимое состояние при правильном подходе</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4 flex-col sm:flex-row">
                  <Button
                    onClick={onBooking}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                  >
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Записаться на консультацию
                  </Button>
                  <Button
                    onClick={downloadPDF}
                    size="lg"
                    variant="default"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Icon name="Download" size={20} className="mr-2" />
                    Скачать результаты PDF
                  </Button>
                </div>
                <Button
                  onClick={handleReset}
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  <Icon name="RotateCcw" size={20} className="mr-2" />
                  Пройти заново
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

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
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentQ.question}
                </h3>
                <p className="text-sm text-gray-600">
                  Выберите утверждение, которое лучше всего описывает ваше состояние за последние две недели
                </p>
              </div>

              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswer(parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                        answers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => handleAnswer(index)}
                    >
                      <RadioGroupItem value={index.toString()} id={`q${currentQuestion}-${index}`} />
                      <Label
                        htmlFor={`q${currentQuestion}-${index}`}
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
                  onClick={handlePrevious}
                  variant="outline"
                  size="lg"
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  <Icon name="ChevronLeft" size={20} className="mr-2" />
                  Назад
                </Button>
                <Button
                  onClick={handleNext}
                  size="lg"
                  disabled={answers[currentQuestion] === undefined}
                  className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                >
                  {currentQuestion === bdiQuestions.length - 1 ? 'Показать результат' : 'Далее'}
                  <Icon name="ChevronRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DepressionTestSection;