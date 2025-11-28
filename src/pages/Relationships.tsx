import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import TargetAudienceSection from '@/components/sections/TargetAudienceSection';
import TestPreviewSection from '@/components/sections/TestPreviewSection';
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
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const Relationships = () => {
  const handleBooking = () => {
    window.open('https://calink.ru/Algon', '_blank');
  };

  const heroContent = {
    badge: 'Терапия отношений',
    title: 'Восстановите близость и понимание в отношениях',
    subtitle: 'Профессиональная психологическая помощь для пар и индивидуальная работа с проблемами в отношениях',
    description: 'Помогу разобраться в конфликтах, восстановить доверие и выстроить здоровые отношения, основанные на взаимопонимании и уважении'
  };

  const targetPoints = [
    'Чувствуете отдаление партнёра, общаетесь всё меньше и формальнее',
    'Постоянные конфликты из-за мелочей, не можете договориться',
    'Потеряли эмоциональную близость, живёте как соседи',
    'Не знаете, как правильно говорить о своих чувствах и потребностях',
    'Столкнулись с изменой или потерей доверия и не знаете, что делать дальше'
  ];

  const problems = [
    {
      title: 'Конфликты и непонимание',
      description: 'Постоянные ссоры, неспособность услышать друг друга, эскалация конфликтов',
      icon: 'MessageCircleX'
    },
    {
      title: 'Потеря близости',
      description: 'Эмоциональная и физическая дистанция, чувство одиночества в отношениях',
      icon: 'HeartCrack'
    },
    {
      title: 'Проблемы с доверием',
      description: 'Ревность, контроль, последствия измен, неспособность довериться',
      icon: 'ShieldAlert'
    },
    {
      title: 'Кризисы в отношениях',
      description: 'Рождение детей, переезд, смена работы — как справиться с изменениями',
      icon: 'Waves'
    }
  ];

  const services = [
    {
      icon: 'HeartHandshake',
      title: 'Парная терапия',
      description: 'Работа с обоими партнёрами для восстановления близости, разрешения конфликтов и построения здоровых отношений',
      duration: '90 минут',
    },
    {
      icon: 'User',
      title: 'Индивидуальная работа с отношениями',
      description: 'Помощь в понимании паттернов поведения в отношениях, работа с самооценкой и личными границами',
      duration: '60 минут',
    },
    {
      icon: 'Shield',
      title: 'Работа с изменой и доверием',
      description: 'Преодоление кризиса после измены, восстановление доверия или принятие решения о расставании',
      duration: '60-90 минут',
    },
  ];

  const articles = [
    {
      title: 'Почему работа с психологом — это НЕ «просто поговорить»?',
      excerpt: 'Многие считают, что психолог — это дорогой друг. Но настоящая терапия — это системная работа',
      readTime: '5 мин',
      link: 'https://dzen.ru/b/aQJb3zgUXis-XD-v',
    },
    {
      title: 'Нейропластичность: Как «перепрошить» мозг через простые привычки',
      excerpt: 'Почему 92% людей бросают новогодние резолюции к февралю? Ответ кроется в устройстве нашего мозга',
      readTime: '7 мин',
      link: 'https://dzen.ru/a/aP5VLw6wRwVdZlsx',
    },
    {
      title: 'Не сила воли, а химия: как гормоны крадут энергию и продуктивность',
      excerpt: 'Ваше настроение, энергия и способность работать — это результат работы гормональной системы',
      readTime: '8 мин',
      link: 'https://dzen.ru/a/aPpZsjMyvXILBC6e',
    },
  ];

  const cases = [
    {
      title: 'Восстановление после измены',
      role: 'Пара, 5 лет в браке',
      problem: 'Муж признался в измене. Жена в шоке, не знает — прощать или уходить. Постоянные скандалы, недоверие',
      solution: 'Парная терапия: работа с чувствами обоих, восстановление коммуникации, понимание причин измены',
      result: 'За 12 сессий пара смогла восстановить доверие. Научились говорить о трудностях до того, как они станут проблемами',
      icon: 'HeartHandshake',
    },
    {
      title: 'От соседей к партнёрам',
      role: 'Пара, 8 лет вместе',
      problem: 'Живут как соседи по квартире. Нет общения, близости, каждый в своём мире. Думают о расставании',
      solution: 'Работа с эмоциональной близостью, восстановление интереса друг к другу, совместные активности',
      result: 'Вернули близость и интерес друг к другу. Поняли ценность отношений и стали активно в них инвестировать',
      icon: 'Sparkles',
    },
    {
      title: 'Конфликты без конца',
      role: 'Пара, 3 года в отношениях',
      problem: 'Ссоры из-за каждой мелочи. Не могут договориться ни о чём. Каждый считает себя правым',
      solution: 'Обучение навыкам коммуникации, работа с триггерами, понимание потребностей друг друга',
      result: 'Научились слышать друг друга, договариваться без скандалов. Конфликты стали конструктивными',
      icon: 'MessageCircleHeart',
    },
  ];

  const reviews = [
    {
      name: 'Анна и Сергей',
      role: 'Пара, 6 лет в браке',
      text: 'После рождения ребёнка отношения дали трещину. Благодаря терапии смогли найти баланс между ролями родителей и партнёров. Спасибо за возвращение к друг другу!',
      rating: 5,
    },
    {
      name: 'Мария К.',
      role: 'Индивидуальная терапия',
      text: 'Работа над собой помогла понять, почему я выбирала токсичных партнёров. Теперь в здоровых отношениях и знаю свою ценность. Огромная благодарность!',
      rating: 5,
    },
    {
      name: 'Дмитрий и Елена',
      role: 'Пара, 10 лет вместе',
      text: 'Думали, что всё кончено. Терапия дала нам инструменты для восстановления. Сейчас наши отношения крепче, чем когда-либо. Не жалеем ни минуты!',
      rating: 5,
    },
  ];

  const breadcrumbs = [
    { label: 'Терапия отношений', href: '/relationships' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/20">
      <Header onBooking={handleBooking} />
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <HeroSection onBooking={handleBooking} customContent={heroContent} />
      <TargetAudienceSection customPoints={targetPoints} hideButtons />
      <TestPreviewSection />
      <ProblemSection customProblems={problems} />
      <CasesSection 
        cases={cases} 
        hideNote 
        customSubtitle="Истории пар, которые восстановили близость и вернули отношениям гармонию"
      />
      <MistakesSection />
      <AboutSection />
      <MethodSection />
      <ProcessSection onBooking={handleBooking} />
      <ServicesSection services={services} onBooking={handleBooking} />
      <ArticlesSection articles={articles} />
      <SocialSection />
      <ReviewsSection reviews={reviews} />
      <FAQSection customSubtitle="Ответы на вопросы о парной терапии и работе с отношениями" />
      <ContactSection onBooking={handleBooking} />
      <Footer />
    </div>
  );
};

export default Relationships;