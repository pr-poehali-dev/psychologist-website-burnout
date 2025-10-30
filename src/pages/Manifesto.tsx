import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Manifesto = () => {
  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Brain" className="text-primary" size={32} />
              <span className="text-xl font-semibold">Александр Гонтарь</span>
            </Link>
            <Button asChild>
              <Link to="/">На главную</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <div className="text-6xl">🏴‍☠️</div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Манифест доказательного психолога
            </h1>
            <p className="text-xl text-muted-foreground">
              Почему 95% советов о выгорании — это шум, а не решение
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-accent/30 p-6 rounded-xl border-l-4 border-primary">
              <p className="text-lg leading-relaxed">
                Вы перепробовали всё: медитации по утрам, планировщики, советы «взять отпуск» и даже сменили работу. 
                Но состояние вернулось. Снова туман в голове, раздражительность и ощущение, что жизнь проходит мимо.
              </p>
              <p className="text-lg font-semibold mt-4">
                Знаете, в чём проблема? Вы лечили симптомы, игнорируя систему. Я научу вас видеть разницу.
              </p>
            </div>

            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">❌</div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Миф 1: «Выгорание — это просто усталость. Нужно отдохнуть»
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="font-semibold text-primary">
                      Реальность: Выгорание — это системный сбой на трёх уровнях (исследования Maslach, 2016):
                    </p>
                    
                    <ol className="space-y-3 list-decimal list-inside">
                      <li className="pl-2">
                        <strong>Эмоциональное истощение</strong> — не просто «устал», а истощение ресурсов нервной системы. 
                        Уровень кортизола хронически повышен, префронтальная кора (отвечающая за контроль и планирование) работает хуже.
                      </li>
                      <li className="pl-2">
                        <strong>Цинизм и деперсонализация</strong> — мозг включает режим энергосбережения: 
                        «Не вовлекайся эмоционально — это дорого».
                      </li>
                      <li className="pl-2">
                        <strong>Снижение продуктивности</strong> — объективные когнитивные нарушения: 
                        страдает рабочая память, скорость реакции, способность к концентрации.
                      </li>
                    </ol>

                    <div className="bg-muted p-4 rounded-lg border-l-2 border-primary">
                      <p className="font-semibold mb-2">💡 Пример:</p>
                      <p>
                        Представьте, что ваш мозг — это процессор. При стрессе он перегревается и начинает троттлить 
                        (снижать производительность), чтобы не сгореть. Отдых — это просто временное охлаждение. 
                        Но если система охлаждения неисправна (ваши копинг-стратегии не работают), 
                        процессор будет перегреваться снова и снова.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">❌</div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Миф 2: «Позитивное мышление и аффирмации помогут»
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="font-semibold text-primary">
                      Реальность: Токсичный позитив усугубляет состояние.
                    </p>
                    
                    <p>
                      Исследование (BMC Psychiatry, 2021) показывает: попытки подавить негативные эмоции 
                      приводят к эффекту «рикошета» — они возвращаются с удвоенной силой.
                    </p>

                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <p className="font-semibold mb-3">✅ Что действительно работает (мета-анализ JAMA, 2023):</p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li><strong>Техники принятия (ACT-терапия)</strong> — обучение наблюдать мысли и эмоции без борьбы</li>
                        <li><strong>Ценностно-ориентированное поведение</strong> — действия, согласованные с глубокими ценностями даже при отсутствии мотивации</li>
                        <li><strong>Поведенческая активация</strong> — системное увеличение поведений, которые приносят ресурс</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">❌</div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Миф 3: «Нужно лучше планировать время»
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="font-semibold text-primary">
                      Реальность: При выгорании страдает не управление временем, а управление энергией.
                    </p>
                    
                    <p>
                      Тайм-менеджмент бесполезен, когда ваши когнитивные функции объективно снижены.
                    </p>

                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-semibold mb-2">🧬 Биологическая основа:</p>
                      <p>
                        Хронический стресс → дисрегуляция оси HPA (гипоталамус-гипофиз-надпочечники) → 
                        нарушение циркадных ритмов → ухудшение качества сна → замкнутый круг истощения.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-primary/5 p-8 rounded-2xl space-y-6 border-2 border-primary">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">✅</div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    Альтернатива: Протокольный подход
                  </h2>
                  
                  <p className="text-lg">
                    В своей работе я использую чёткие протоколы, основанные на трёх принципах:
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Icon name="Search" className="text-primary" />
                        1. Диагностика перед интервенцией
                      </h3>
                      <p className="mb-2">Мы начинаем не с советов, а с диагностики:</p>
                      <ul className="space-y-1 list-disc list-inside ml-4">
                        <li>Какая именно компонента выгорания доминирует?</li>
                        <li>Каков ваш текущий уровень нейропластичности?</li>
                        <li>Какие копинг-стратегии объективно работают для вас?</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Icon name="Brain" className="text-primary" />
                        2. Фокус на нейробиологии
                      </h3>
                      <p className="mb-2">Я объясню вам простым языком:</p>
                      <ul className="space-y-1 list-disc list-inside ml-4">
                        <li>Почему при выгорании трудно принимать решения</li>
                        <li>Как восстановить работу префронтальной коры</li>
                        <li>Почему физическая активность важнее аффирмаций</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Icon name="Target" className="text-primary" />
                        3. Измеримые результаты
                      </h3>
                      <p className="mb-2">Никаких расплывчатых «вам станет лучше». Мы работаем с конкретными метриками:</p>
                      <ul className="space-y-1 list-disc list-inside ml-4">
                        <li>Уровень субъективного истощения по шкале MBI</li>
                        <li>Показатели вариабельности сердечного ритма</li>
                        <li>Количество «ресурсных часов» в неделю</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-accent/20 p-8 rounded-2xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">🎯</div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    Что делать прямо сейчас
                  </h2>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl font-bold text-primary flex-shrink-0">1️⃣</div>
                      <p>
                        <strong>Откажитесь от поиска волшебной таблетки.</strong> 
                        {' '}Выгорание создавалось месяцами или годами — за неделю оно не уйдёт.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="text-2xl font-bold text-primary flex-shrink-0">2️⃣</div>
                      <div>
                        <p className="font-semibold mb-2">Начните с биологических основ:</p>
                        <ul className="space-y-1">
                          <li>→ Сон 7-9 часов в сутки</li>
                          <li>→ Регулярное питание без пропусков</li>
                          <li>→ 20 минут ходьбы ежедневно</li>
                        </ul>
                        <p className="mt-2 text-sm text-muted-foreground italic">
                          Это не банальности — это фундамент восстановления нейромедиаторного баланса.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="text-2xl font-bold text-primary flex-shrink-0">3️⃣</div>
                      <div>
                        <p className="font-semibold mb-2">Выберите специалиста, который:</p>
                        <ul className="space-y-1">
                          <li>→ Работает с измеримыми результатами</li>
                          <li>→ Объясняет механизмы работы психики</li>
                          <li>→ Не обещает быстрых решений</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="text-center pt-8">
              <Button onClick={scrollToContact} size="lg" className="text-lg">
                Записаться на консультацию
                <Icon name="ArrowRight" className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Александр Гонтарь. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Manifesto;
