import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  text: string;
  options: { value: number; label: string }[];
  category: 'depression' | 'anxiety';
}

const CombinedTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const depressionQuestions: Question[] = [
    {
      id: 1,
      text: 'Печаль',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не чувствую себя несчастным' },
        { value: 1, label: 'Я чувствую себя подавленным' },
        { value: 2, label: 'Я всё время несчастен и не могу освободиться от этого чувства' },
        { value: 3, label: 'Я настолько несчастен и опечален, что не могу этого вынести' },
      ],
    },
    {
      id: 2,
      text: 'Пессимизм',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не тревожусь о своём будущем' },
        { value: 1, label: 'Я чувствую, что озадачен будущим' },
        { value: 2, label: 'Я чувствую, что меня ничего не ждёт в будущем' },
        { value: 3, label: 'Моё будущее безнадёжно, и ничто не может измениться к лучшему' },
      ],
    },
    {
      id: 3,
      text: 'Чувство несостоятельности',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не чувствую себя неудачником' },
        { value: 1, label: 'Я чувствую, что терпел больше неудач, чем другие люди' },
        { value: 2, label: 'Когда я оглядываюсь на свою жизнь, я вижу в ней много неудач' },
        { value: 3, label: 'Я чувствую, что как личность я — полный неудачник' },
      ],
    },
    {
      id: 4,
      text: 'Утрата удовольствия',
      category: 'depression',
      options: [
        { value: 0, label: 'Я получаю столько же удовольствия от того, что мне нравится, как и раньше' },
        { value: 1, label: 'Я не получаю столько же удовольствия от того, что мне нравится, как раньше' },
        { value: 2, label: 'Я больше не получаю удовольствия ни от чего' },
        { value: 3, label: 'Я полностью не удовлетворён жизнью, и мне всё надоело' },
      ],
    },
    {
      id: 5,
      text: 'Чувство вины',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не чувствую себя виноватым' },
        { value: 1, label: 'Достаточно часто я чувствую себя виноватым' },
        { value: 2, label: 'Большую часть времени я чувствую себя виноватым' },
        { value: 3, label: 'Я постоянно испытываю чувство вины' },
      ],
    },
    {
      id: 6,
      text: 'Ощущение наказания',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не чувствую, что могу быть наказанным за что-либо' },
        { value: 1, label: 'Я чувствую, что могу быть наказан' },
        { value: 2, label: 'Я ожидаю, что могу быть наказан' },
        { value: 3, label: 'Я чувствую, что уже наказан' },
      ],
    },
    {
      id: 7,
      text: 'Отвращение к себе',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не разочаровался в себе' },
        { value: 1, label: 'Я разочаровался в себе' },
        { value: 2, label: 'Я себе противен' },
        { value: 3, label: 'Я ненавижу себя' },
      ],
    },
    {
      id: 8,
      text: 'Самокритичность',
      category: 'depression',
      options: [
        { value: 0, label: 'Я знаю, что я не хуже других' },
        { value: 1, label: 'Я критикую себя за ошибки и слабости' },
        { value: 2, label: 'Я всё время обвиняю себя за свои поступки' },
        { value: 3, label: 'Я виню себя во всём плохом, что происходит' },
      ],
    },
    {
      id: 9,
      text: 'Суицидальные мысли',
      category: 'depression',
      options: [
        { value: 0, label: 'Я никогда не думал покончить с собой' },
        { value: 1, label: 'Ко мне приходят мысли покончить с собой, но я не буду их осуществлять' },
        { value: 2, label: 'Я хотел бы покончить с собой' },
        { value: 3, label: 'Я бы убил себя, если бы представился случай' },
      ],
    },
    {
      id: 10,
      text: 'Плаксивость',
      category: 'depression',
      options: [
        { value: 0, label: 'Я плачу не больше, чем обычно' },
        { value: 1, label: 'Сейчас я плачу чаще, чем раньше' },
        { value: 2, label: 'Теперь я всё время плачу' },
        { value: 3, label: 'Раньше я мог плакать, а сейчас не могу, даже если мне хочется' },
      ],
    },
    {
      id: 11,
      text: 'Раздражительность',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не раздражён больше обычного' },
        { value: 1, label: 'Я более легко раздражаюсь, чем раньше' },
        { value: 2, label: 'Теперь я постоянно чувствую, что раздражён' },
        { value: 3, label: 'Я стал равнодушен к вещам, которые меня раньше раздражали' },
      ],
    },
    {
      id: 12,
      text: 'Утрата интереса',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не утратил интереса к другим людям' },
        { value: 1, label: 'Я меньше интересуюсь другими людьми, чем раньше' },
        { value: 2, label: 'Я почти потерял интерес к другим людям' },
        { value: 3, label: 'Я полностью утратил интерес к другим людям' },
      ],
    },
    {
      id: 13,
      text: 'Нерешительность',
      category: 'depression',
      options: [
        { value: 0, label: 'Я откладываю принятие решений не больше, чем обычно' },
        { value: 1, label: 'Мне труднее принимать решения, чем раньше' },
        { value: 2, label: 'Принимать решения для меня теперь затруднительно' },
        { value: 3, label: 'Я больше не могу принимать решения' },
      ],
    },
    {
      id: 14,
      text: 'Внешний вид',
      category: 'depression',
      options: [
        { value: 0, label: 'Я не чувствую, что выгляжу хуже, чем обычно' },
        { value: 1, label: 'Меня тревожит, что я выгляжу старым и непривлекательным' },
        { value: 2, label: 'Я знаю, что в моей внешности произошли значительные изменения, делающие меня непривлекательным' },
        { value: 3, label: 'Я знаю, что выгляжу безобразно' },
      ],
    },
    {
      id: 15,
      text: 'Работоспособность',
      category: 'depression',
      options: [
        { value: 0, label: 'Я могу работать так же хорошо, как и раньше' },
        { value: 1, label: 'Мне необходимо сделать дополнительные усилия, чтобы начать делать что-то' },
        { value: 2, label: 'Я с трудом заставляю себя делать что-либо' },
        { value: 3, label: 'Я совсем не могу выполнять никакую работу' },
      ],
    },
    {
      id: 16,
      text: 'Сон',
      category: 'depression',
      options: [
        { value: 0, label: 'Я сплю так же хорошо, как и раньше' },
        { value: 1, label: 'Сейчас я сплю хуже, чем раньше' },
        { value: 2, label: 'Я просыпаюсь на 1-2 часа раньше, и мне трудно заснуть опять' },
        { value: 3, label: 'Я просыпаюсь на несколько часов раньше обычного и больше не могу заснуть' },
      ],
    },
    {
      id: 17,
      text: 'Утомляемость',
      category: 'depression',
      options: [
        { value: 0, label: 'Я устаю не больше, чем обычно' },
        { value: 1, label: 'Теперь я устаю быстрее, чем раньше' },
        { value: 2, label: 'Я устаю почти от всего, что я делаю' },
        { value: 3, label: 'Я не могу ничего делать из-за усталости' },
      ],
    },
    {
      id: 18,
      text: 'Аппетит',
      category: 'depression',
      options: [
        { value: 0, label: 'Мой аппетит не хуже, чем обычно' },
        { value: 1, label: 'Мой аппетит стал хуже, чем раньше' },
        { value: 2, label: 'Мой аппетит теперь значительно хуже' },
        { value: 3, label: 'У меня вообще нет аппетита' },
      ],
    },
    {
      id: 19,
      text: 'Потеря веса',
      category: 'depression',
      options: [
        { value: 0, label: 'В последнее время я не похудел или потеря веса была незначительной' },
        { value: 1, label: 'За последнее время я потерял более 2 кг' },
        { value: 2, label: 'Я потерял более 5 кг' },
        { value: 3, label: 'Я потерял более 7 кг' },
      ],
    },
    {
      id: 20,
      text: 'Озабоченность здоровьем',
      category: 'depression',
      options: [
        { value: 0, label: 'Я беспокоюсь о своём здоровье не больше, чем обычно' },
        { value: 1, label: 'Меня тревожат проблемы моего физического здоровья, такие как боли, расстройства желудка, запоры и т.д.' },
        { value: 2, label: 'Я очень обеспокоен своим физическим состоянием, и мне трудно думать о чём-либо другом' },
        { value: 3, label: 'Я настолько обеспокоен своим физическим состоянием, что больше ни о чём не могу думать' },
      ],
    },
  ];

  const anxietyQuestions: Question[] = [
    {
      id: 21,
      text: 'Онемение или покалывание',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 22,
      text: 'Ощущение жара',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 23,
      text: 'Дрожание ног',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 24,
      text: 'Неспособность расслабиться',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 25,
      text: 'Страх, что произойдёт самое плохое',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 26,
      text: 'Головокружение или лёгкость в голове',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 27,
      text: 'Учащённое сердцебиение',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 28,
      text: 'Неустойчивость',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 29,
      text: 'Ощущение ужаса',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 30,
      text: 'Нервозность',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 31,
      text: 'Ощущение удушья',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 32,
      text: 'Дрожь в руках',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 33,
      text: 'Дрожь всего тела',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 34,
      text: 'Страх потерять контроль',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 35,
      text: 'Затруднённое дыхание',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 36,
      text: 'Страх смерти',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 37,
      text: 'Испуганность',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 38,
      text: 'Расстройство пищеварения',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 39,
      text: 'Обморочность',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 40,
      text: 'Покраснение лица',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
    {
      id: 41,
      text: 'Потливость',
      category: 'anxiety',
      options: [
        { value: 0, label: 'Совсем не беспокоит' },
        { value: 1, label: 'Слегка беспокоит' },
        { value: 2, label: 'Умеренно беспокоит' },
        { value: 3, label: 'Сильно беспокоит' },
      ],
    },
  ];

  const allQuestions = [...depressionQuestions, ...anxietyQuestions];

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [allQuestions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    const depressionScore = depressionQuestions.reduce(
      (sum, q) => sum + (answers[q.id] || 0),
      0
    );
    const anxietyScore = anxietyQuestions.reduce(
      (sum, q) => sum + (answers[q.id] || 0),
      0
    );
    return { depressionScore, anxietyScore };
  };

  const getDepressionLevel = (score: number) => {
    if (score <= 9) return { level: 'Норма', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    if (score <= 15) return { level: 'Лёгкая депрессия', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    if (score <= 19) return { level: 'Умеренная депрессия', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
    if (score <= 29) return { level: 'Средне-тяжёлая депрессия', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    return { level: 'Тяжёлая депрессия', color: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-300' };
  };

  const getAnxietyLevel = (score: number) => {
    if (score <= 7) return { level: 'Минимальная тревожность', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    if (score <= 15) return { level: 'Лёгкая тревожность', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    if (score <= 25) return { level: 'Умеренная тревожность', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
    return { level: 'Тяжёлая тревожность', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
  };

  const getRecommendation = (depScore: number, anxScore: number) => {
    const depLevel = getDepressionLevel(depScore);
    const anxLevel = getAnxietyLevel(anxScore);
    
    if (depScore <= 9 && anxScore <= 7) {
      return {
        title: 'Отличные показатели!',
        text: 'Ваше эмоциональное состояние находится в пределах нормы. Продолжайте заботиться о своём психическом здоровье.',
        icon: 'CheckCircle',
        color: 'text-green-600',
      };
    }
    if (depScore <= 15 && anxScore <= 15) {
      return {
        title: 'Лёгкие проявления',
        text: 'Рекомендуется уделить внимание техникам релаксации, режиму сна и физической активности. При сохранении симптомов стоит обратиться к специалисту.',
        icon: 'AlertCircle',
        color: 'text-yellow-600',
      };
    }
    return {
      title: 'Рекомендуется консультация специалиста',
      text: 'Ваши результаты указывают на необходимость профессиональной помощи. Психолог или психотерапевт помогут разобраться в причинах и подобрать эффективные методы работы.',
      icon: 'AlertTriangle',
      color: 'text-orange-600',
    };
  };

  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const currentQ = allQuestions[currentQuestion];

  if (showResults) {
    const { depressionScore, anxietyScore } = calculateScores();
    const depLevel = getDepressionLevel(depressionScore);
    const anxLevel = getAnxietyLevel(anxietyScore);
    const recommendation = getRecommendation(depressionScore, anxietyScore);

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-primary/5">
        <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                <Icon name="CheckCircle" size={40} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Результаты тестирования</h1>
              <p className="text-muted-foreground">
                Комплексный анализ по шкалам Бека (BDI + BAI)
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className={`border-2 ${depLevel.borderColor} ${depLevel.bgColor}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="Brain" size={28} className="text-blue-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">Депрессия (BDI)</div>
                      <div className={`text-2xl ${depLevel.color}`}>{depressionScore} баллов</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Уровень</span>
                        <span className={`text-sm font-bold ${depLevel.color}`}>{depLevel.level}</span>
                      </div>
                      <Progress value={(depressionScore / 60) * 100} className="h-3" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Максимум: 60 баллов. Оценка выраженности депрессивных симптомов.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-2 ${anxLevel.borderColor} ${anxLevel.bgColor}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="Heart" size={28} className="text-orange-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">Тревожность (BAI)</div>
                      <div className={`text-2xl ${anxLevel.color}`}>{anxietyScore} баллов</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Уровень</span>
                        <span className={`text-sm font-bold ${anxLevel.color}`}>{anxLevel.level}</span>
                      </div>
                      <Progress value={(anxietyScore / 63) * 100} className="h-3" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Максимум: 63 балла. Оценка физиологических и когнитивных симптомов тревоги.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name={recommendation.icon} size={28} className={recommendation.color} />
                  <span>{recommendation.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  {recommendation.text}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div className="text-sm space-y-2">
                    <p className="font-medium">Важная информация:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Результаты носят ориентировочный характер</li>
                      <li>• Для точной диагностики необходима консультация специалиста</li>
                      <li>• Тесты помогают оценить текущее состояние, но не заменяют профессиональную помощь</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={() => {
                setAnswers({});
                setCurrentQuestion(0);
                setShowResults(false);
              }}>
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Пройти заново
              </Button>
              <Button size="lg" variant="outline" className="flex-1" onClick={() => navigate('/')}>
                Вернуться на главную
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к выбору тестов
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon 
                    name={currentQ.category === 'depression' ? 'Brain' : 'Heart'} 
                    size={24} 
                    className={currentQ.category === 'depression' ? 'text-blue-600' : 'text-orange-600'} 
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {currentQ.category === 'depression' ? 'Шкала депрессии (BDI)' : 'Шкала тревожности (BAI)'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Вопрос {currentQuestion + 1} из {allQuestions.length}
                </h1>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{answeredCount}</div>
                <div className="text-sm text-muted-foreground">ответов</div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">{currentQ.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5 ${
                    answers[currentQ.id] === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      answers[currentQ.id] === option.value
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQ.id] === option.value && (
                        <Icon name="Check" size={16} className="text-white" />
                      )}
                    </div>
                    <span className="text-foreground">{option.label}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              <Icon name="ChevronLeft" size={20} className="mr-2" />
              Назад
            </Button>
            <Button
              size="lg"
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined}
              className="flex-1"
            >
              {currentQuestion === allQuestions.length - 1 ? 'Завершить тест' : 'Далее'}
              <Icon name={currentQuestion === allQuestions.length - 1 ? 'Check' : 'ChevronRight'} size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedTest;
