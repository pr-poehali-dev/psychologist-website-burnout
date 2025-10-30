import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleBooking = () => {
    window.open('https://calink.ru/Algon', '_blank');
  };

  const services = [
    {
      icon: 'Flame',
      title: 'Консультации по профессиональному выгоранию',
      description: 'Помогу распознать симптомы выгорания и найти пути восстановления энергии и мотивации',
      duration: '60 минут',
    },
    {
      icon: 'Smartphone',
      title: 'IT детокс и цифровая гигиена',
      description: 'Разработка здоровых отношений с технологиями и восстановление баланса онлайн/офлайн жизни',
      duration: '60 минут',
    },
    {
      icon: 'Users',
      title: 'Групповые программы',
      description: 'Поддерживающие группы для специалистов в IT и других высоконагруженных сферах',
      duration: '90 минут',
    },
  ];

  const articles = [
    {
      title: '5 признаков профессионального выгорания у IT-специалистов',
      excerpt: 'Как распознать выгорание на ранних стадиях и что с этим делать',
      date: '15 октября 2024',
      readTime: '7 мин',
    },
    {
      title: 'Цифровой детокс: с чего начать',
      excerpt: 'Практические шаги к здоровым отношениям со смартфоном и соцсетями',
      date: '8 октября 2024',
      readTime: '5 мин',
    },
    {
      title: 'Баланс work-life в эпоху удаленки',
      excerpt: 'Как создать границы между работой и личной жизнью дома',
      date: '1 октября 2024',
      readTime: '6 мин',
    },
  ];

  const cases = [
    {
      title: 'Из выгорания в осознанную карьеру',
      role: 'Senior Developer, 35 лет',
      problem: 'Работал по 12 часов в день, потерял интерес к программированию, начались панические атаки перед рабочими созвонами',
      solution: 'За 3 месяца работы научился выстраивать границы, освоил техники саморегуляции, пересмотрел карьерные приоритеты',
      result: 'Перешёл на позицию с меньшей нагрузкой, вернул интерес к коду, панические атаки прошли. Начал уделять время хобби',
      icon: 'TrendingUp',
    },
    {
      title: 'Свобода от телефонной зависимости',
      role: 'Product Manager, 29 лет',
      problem: 'Проверяла телефон более 200 раз в день, не могла заснуть без скролла соцсетей, постоянное чувство тревоги',
      solution: 'Программа цифрового детокса: постепенное снижение времени в телефоне, замена привычек, работа с тревогой',
      result: 'Экранное время снизилось с 7 до 2 часов. Восстановился сон, появилось время на чтение и спорт. Тревожность снизилась на 70%',
      icon: 'Smartphone',
    },
    {
      title: 'Баланс между работой и семьёй',
      role: 'Tech Lead, 42 года',
      problem: 'Удалёнка размыла границы — работал до ночи, дети росли без внимания, конфликты с супругой',
      solution: 'Выстраивание рабочих границ, тайм-менеджмент, работа с чувством вины, семейная терапия',
      result: 'Установил чёткий график работы, начал проводить вечера с семьёй. Отношения улучшились, стал более продуктивным',
      icon: 'Heart',
    },
  ];

  const reviews = [
    {
      name: 'Алексей М.',
      role: 'Backend-разработчик',
      text: 'После года работы в стартапе чувствовал полное истощение. Консультации помогли мне вернуть интерес к работе и научиться расставлять приоритеты. Благодарен за поддержку!',
      rating: 5,
    },
    {
      name: 'Мария К.',
      role: 'Product Manager',
      text: 'Программа IT детокса изменила мой подход к технологиям. Научилась осознанно использовать гаджеты, появилось больше времени на себя и семью. Рекомендую всем!',
      rating: 5,
    },
    {
      name: 'Дмитрий В.',
      role: 'Team Lead',
      text: 'Групповые сессии дали понимание, что я не один с такими проблемами. Получил практические инструменты для работы с выгоранием команды. Очень ценный опыт.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/7b4fbc90-0cc7-405e-912a-429cde9d865e.jpg" 
              alt="Александр Гонтарь" 
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
            />
            <h1 className="text-2xl font-bold text-primary">Александр Гонтарь</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">О специалисте</a>
            <a href="#services" className="text-foreground/70 hover:text-primary transition-colors">Услуги</a>
            <a href="#cases" className="text-foreground/70 hover:text-primary transition-colors">Кейсы</a>
            <a href="/manifesto" className="text-foreground/70 hover:text-primary transition-colors font-semibold">🏴‍☠️ Манифест</a>
            <a href="#articles" className="text-foreground/70 hover:text-primary transition-colors">Статьи</a>
            <a href="#reviews" className="text-foreground/70 hover:text-primary transition-colors">Отзывы</a>
          </nav>
          <Button className="hidden md:flex" onClick={handleBooking}>
            <Icon name="Calendar" size={18} className="mr-2" />
            Записаться
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge variant="outline" className="text-primary border-primary">Александр Гонтарь — ваш психолог</Badge>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Путь от выгорания к <span className="text-primary">балансу</span> и энергии
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Практическая психология • Когнитивно-поведенческая терапия (КПТ) • Доказательный подход
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8" onClick={handleBooking}>
                <Icon name="Calendar" size={20} className="mr-2" />
                Записаться на консультацию
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="https://dzen.ru/id/68f6621b6539c44524418486" target="_blank" rel="noopener noreferrer">
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Читать статьи в Дзен
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold">О специалисте</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Меня зовут Александр Гонтарь. Я психолог, предприниматель и отец. С детства меня интересовало, 
                    почему люди ведут себя так или иначе: чего мы боимся, к чему стремимся, управляем ли мы собой 
                    или находимся во власти собственной природы.
                  </p>
                  <p>
                    Я всегда был хорошим слушателем, не давал оценок и помогал людям разобраться в сути происходящего. 
                    Этот интерес привел меня на факультет общей психологии в 2005 году, где начался мой профессиональный путь.
                  </p>
                  <p>
                    За годы практики я консультировал предпринимателей, создавал эффективные команды, помогал выстраивать 
                    здоровые отношения. Работал в разных сферах: транспорт, ресторанный бизнес, индустрия красоты, 
                    дошкольное образование.
                  </p>
                  <p className="font-medium text-foreground">
                    Поработав в разных психологических направлениях, я выявил закономерность: большинство проблем 
                    напрямую или косвенно связаны с <strong>профессиональным выгоранием и эмоциональным истощением</strong>, 
                    вызванным хроническим перенапряжением.
                  </p>
                  <p>
                    Игнорирование выгорания приводит к развитию клинической депрессии, где одной терапии уже недостаточно. 
                    Наше внутреннее состояние влияет на все сферы жизни и все решения. Сбой, ведущий за собой другой сбой, 
                    как в компьютерной программе, может привести к обрушению всей системы.
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <Icon name="GraduationCap" className="text-primary flex-shrink-0 mt-1" size={24} />
                    <div className="flex flex-col">
                      <span className="font-medium">Психолог, Преподаватель психологии</span>
                      <span className="text-sm text-muted-foreground">Московский Социально-Педагогический институт</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Award" className="text-primary" size={24} />
                    <span>Сертифицированный специалист психологии менеджмента</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Briefcase" className="text-primary" size={24} />
                    <span>Когнитивно-поведенческая терапия (КПТ)</span>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl h-[500px] overflow-hidden shadow-xl">
                <img 
                  src="https://cdn.poehali.dev/files/4a3a6dbf-3e9e-40b4-b434-9b2f343e76e4.jpg" 
                  alt="Александр Гонтарь - психолог" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Услуги</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Индивидуальный подход к каждому клиенту и проверенные методики работы
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name={service.icon} className="text-primary" size={28} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>{service.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Полезные статьи</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Практические советы и инсайты для работы над собой
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" asChild>
                  <a href="https://dzen.ru/id/68f6621b6539c44524418486" target="_blank" rel="noopener noreferrer">
                    <CardHeader>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-base">{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-primary flex items-center">
                        Читать в Дзен
                        <Icon name="ArrowRight" size={16} className="ml-1" />
                      </div>
                    </CardContent>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Реальные истории изменений</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Кейсы клиентов, которые прошли путь от выгорания к балансу
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {cases.map((caseItem, index) => (
                <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name={caseItem.icon} className="text-primary" size={28} />
                    </div>
                    <CardTitle className="text-xl mb-2">{caseItem.title}</CardTitle>
                    <CardDescription className="font-medium text-foreground/80">{caseItem.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <Icon name="AlertCircle" size={16} className="text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-semibold text-destructive">Проблема:</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{caseItem.problem}</p>
                    </div>
                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-semibold text-primary">Решение:</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{caseItem.solution}</p>
                    </div>
                    <div>
                      <div className="flex items-start gap-2 mb-2">
                        <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-semibold text-green-600">Результат:</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{caseItem.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Отзывы клиентов</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Истории людей, которые вернули баланс и энергию в свою жизнь
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <CardDescription>{review.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">Готовы начать путь к восстановлению?</h3>
            <p className="text-xl text-white/90">
              Запишитесь на первую консультацию, и мы вместе найдем путь к балансу
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={handleBooking}>
              <Icon name="Calendar" size={20} className="mr-2" />
              Записаться на консультацию
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Александр Гонтарь</h4>
                <p className="text-sm text-muted-foreground">
                  Практическая психология | КПТ | Доказательный подход
                </p>
              </div>
              <div className="space-y-4">
                <h5 className="font-semibold">Навигация</h5>
                <nav className="flex flex-col gap-2 text-sm">
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">О специалисте</a>
                  <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Услуги</a>
                  <a href="#cases" className="text-muted-foreground hover:text-primary transition-colors">Кейсы</a>
                  <a href="#articles" className="text-muted-foreground hover:text-primary transition-colors">Статьи</a>
                  <a href="#reviews" className="text-muted-foreground hover:text-primary transition-colors">Отзывы</a>
                </nav>
              </div>
              <div className="space-y-4">
                <h5 className="font-semibold">Контакты</h5>
                <div className="space-y-2 text-sm">
                  <a href="mailto:Algonpsy@vk.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="Mail" size={16} />
                    <span>Algonpsy@vk.com</span>
                  </a>
                  <a href="https://t.me/algonpsy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="Send" size={16} />
                    <span>@algonpsy</span>
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="font-semibold">Социальные сети</h5>
                <div className="flex gap-3">
                  <Button size="icon" variant="outline" asChild>
                    <a href="https://t.me/algonpsy" target="_blank" rel="noopener noreferrer">
                      <Icon name="Send" size={18} />
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" asChild>
                    <a href="https://instagram.com/algonpsy" target="_blank" rel="noopener noreferrer">
                      <Icon name="Instagram" size={18} />
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" asChild>
                    <a href="https://vk.com/psychologist1111" target="_blank" rel="noopener noreferrer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.39 14.66h-1.6c-.69 0-.9-.56-2.14-1.81-1.08-1.05-1.56-1.19-1.83-1.19-.37 0-.48.11-.48.64v1.65c0 .45-.14.71-1.31.71-1.94 0-4.09-1.17-5.61-3.35-2.28-3.17-2.91-5.57-2.91-6.06 0-.27.11-.52.64-.52h1.6c.48 0 .66.22.84.73.97 2.79 2.59 5.23 3.26 5.23.25 0 .36-.11.36-.74V9.86c-.09-1.37-.8-1.49-.8-1.97 0-.21.18-.43.46-.43h2.51c.4 0 .55.22.55.69v3.71c0 .4.18.55.29.55.25 0 .45-.15.91-.6 1.4-1.57 2.4-4 2.4-4 .13-.28.35-.52.83-.52h1.6c.57 0 .7.29.57.69-.22 1.02-2.39 4.12-2.39 4.12-.21.35-.29.51 0 .91.21.29.91.89 1.38 1.43.86.97 1.52 1.78 1.7 2.34.17.56-.1.84-.67.84z"/>
                      </svg>
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" asChild>
                    <a href="https://dzen.ru/id/68f6621b6539c44524418486" target="_blank" rel="noopener noreferrer">
                      <Icon name="BookOpen" size={18} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
              © 2024 Александр Гонтарь. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;