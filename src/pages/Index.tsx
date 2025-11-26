import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import TargetAudienceSection from '@/components/sections/TargetAudienceSection';
import TestsNavigationSection from '@/components/sections/TestsNavigationSection';
import BurnoutTestSection from '@/components/sections/BurnoutTestSection';
import AnxietyTestSection from '@/components/sections/AnxietyTestSection';
import ProblemSection from '@/components/sections/ProblemSection';
import CasesSection from '@/components/sections/CasesSection';
import MistakesSection from '@/components/sections/MistakesSection';
import AboutSection from '@/components/sections/AboutSection';
import MethodSection from '@/components/sections/MethodSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import SocialSection from '@/components/sections/SocialSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

const Index = () => {
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
      title: 'Почему работа с психологом — это НЕ «просто поговорить»?',
      excerpt: 'Многие считают, что психолог — это дорогой друг. Но настоящая терапия — это системная работа, похожая на строительство прочного дома',
      readTime: '5 мин',
      link: 'https://dzen.ru/b/aQJb3zgUXis-XD-v',
    },
    {
      title: 'Нейропластичность: Как «перепрошить» мозг через простые привычки',
      excerpt: 'Почему 92% людей бросают новогодние резолюции к февралю? Ответ кроется в устройстве нашего мозга и нейропластичности',
      readTime: '7 мин',
      link: 'https://dzen.ru/a/aP5VLw6wRwVdZlsx',
    },
    {
      title: 'Не сила воли, а химия: как гормоны крадут энергию и продуктивность',
      excerpt: 'Ваше настроение, энергия и способность работать — это результат работы гормональной системы. И что с этим делать',
      readTime: '8 мин',
      link: 'https://dzen.ru/a/aPpZsjMyvXILBC6e',
    },
  ];

  const cases = [
    {
      title: 'Артем, руководитель IT-отдела',
      role: 'Руководитель IT-отдела',
      problem: 'Пришел с жалобами на полное эмоциональное истощение, бессонницу и сильное снижение производительности',
      solution: 'После 6 сессий вернул контроль над рабочим графиком, внедрил «цифровой карантин», что сократило его рабочее время на 2 часа в день без потери эффективности',
      result: 'Показатели по тесту MBI снизились с критических до умеренных. Сейчас Артем справляется с нагрузкой без ощущения опустошения',
      icon: 'TrendingUp',
    },
    {
      title: 'Свобода от телефонной зависимости',
      role: 'Продакт-менеджер, 29 лет',
      problem: 'Проверяла телефон более 200 раз в день, не могла заснуть без скролла соцсетей, постоянное чувство тревоги',
      solution: 'Программа цифрового детокса: постепенное снижение времени в телефоне, замена привычек, работа с тревогой',
      result: 'Экранное время снизилось с 7 до 2 часов. Восстановился сон, появилось время на чтение и спорт. Тревожность снизилась на 70%',
      icon: 'Smartphone',
    },
    {
      title: 'Баланс между работой и семьёй',
      role: 'Технический руководитель, 42 года',
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
      name: 'Екатерина К.',
      role: 'Продакт-менеджер',
      text: 'Программа IT детокса изменила мой подход к технологиям. Научилась осознанно использовать гаджеты, появилось больше времени на себя и семью. Рекомендую всем!',
      rating: 5,
    },
    {
      name: 'Дмитрий В.',
      role: 'Руководитель команды',
      text: 'Групповые сессии дали понимание, что я не один с такими проблемами. Получил практические инструменты для работы с выгоранием команды. Очень ценный опыт.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/20">
      <Header onBooking={handleBooking} />
      <HeroSection onBooking={handleBooking} />
      <TargetAudienceSection />
      <TestsNavigationSection />
      <BurnoutTestSection onBooking={handleBooking} />
      <AnxietyTestSection onBooking={handleBooking} />
      <ProblemSection />
      <CasesSection cases={cases} />
      <MistakesSection />
      <AboutSection />
      <MethodSection />
      <ProcessSection onBooking={handleBooking} />
      <ServicesSection services={services} onBooking={handleBooking} />
      <ArticlesSection articles={articles} />
      <SocialSection />
      <ReviewsSection reviews={reviews} />
      <FAQSection />
      <ContactSection onBooking={handleBooking} />
      <Footer />
    </div>
  );
};

export default Index;