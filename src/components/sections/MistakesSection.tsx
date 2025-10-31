import Icon from '@/components/ui/icon';

const MistakesSection = () => {
  const mistakes = [
    {
      title: 'Нерегулярность',
      description: 'Пропуск сессий или самостоятельных практик разрушает целостность протокола. Система работает по принципу сложного процента — важен каждый шаг.'
    },
    {
      title: '«Хочу волшебную таблетку»',
      description: 'Ожидание, что проблема решится за одну встречу без вашего активного участия. Я — ваш проводник и инструктор, но путь проходите вы.'
    },
    {
      title: 'Невыполнение домашних заданий',
      description: 'Сессия длится 60 минут, а основная интеграция навыков происходит в вашей реальной жизни между встречами.'
    },
    {
      title: 'Избирательность',
      description: 'Клиент решает применять только то, что ему «понравилось» или «показалось легким», игнорируя ключевые, но непривычные элементы системы.'
    },
    {
      title: 'Желание угодить психологу',
      description: 'Скрывать настоящие трудности и говорить «все хорошо», когда это не так. Чем честнее вы будете о своих проблемах, тем точнее я смогу помочь.'
    },
    {
      title: 'Отсутствие терпения',
      description: 'Первые результаты приходят через 3-4 недели. Попытки оценить эффективность метода после двух сессий — как проверять рост дерева через час после посадки.'
    },
    {
      title: 'Самостоятельная «корректировка» методов',
      description: 'Начинать смешивать методики с другими практиками (например, коучингом или духовными курсами), создавая конфликтующие установки в психике.'
    },
    {
      title: 'Фокус только на симптомах',
      description: 'Уклонение от работы с глубинными убеждениями и триггерами, вызывающими выгорание, ограничиваясь лишь техниками «скорой помощи».'
    },
    {
      title: 'Обесценивание маленьких побед',
      description: 'Выход из выгорания состоит из микро-шагов. Не замечать их — лишать себя мотивации и топлива для движения вперед.'
    },
    {
      title: 'Неготовность к временным откатам',
      description: 'В сложные недели может казаться, что все вернулось назад. Это нормальная часть процесса переобучения нервной системы, а не признак провала.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-primary">
              Но есть маленький нюанс
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Даже самая эффективная методика может не сработать, если на пути допущены критические ошибки. 
              Вот топ-10 ошибок, которые совершают клиенты, сводя прогресс на нет:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mistakes.map((mistake, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm border border-accent/20 hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">{index + 1}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {mistake.title}
                    </h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {mistake.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-primary/5 border-l-4 border-primary rounded-lg">
            <div className="flex gap-4 items-start">
              <Icon name="Lightbulb" size={28} className="text-primary flex-shrink-0 mt-1" />
              <p className="text-lg text-foreground leading-relaxed">
                <span className="font-bold">Моя задача</span> — помочь вам избежать этих ловушек, вовремя их заметить и скорректировать курс. 
                Поэтому наша работа — это всегда <span className="font-bold text-primary">диалог и партнерство</span>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MistakesSection;
