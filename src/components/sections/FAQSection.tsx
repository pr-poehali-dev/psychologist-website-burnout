import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FAQSectionProps {
  customSubtitle?: string;
}

const FAQSection = ({ customSubtitle }: FAQSectionProps = {}) => {
  const { ref, isVisible } = useScrollReveal();
  
  const defaultSubtitle = 'Ответы на вопросы, которые помогут принять решение';

  const faqs = [
    {
      question: 'Сколько стоит консультация?',
      answer: 'Стоимость индивидуальной консультации — 5 000 рублей за 60 минут, парная терапия — 8 000 рублей за 90 минут. Для программы из 8 сессий предусмотрены пакетные предложения с выгодой до 10%. Первая диагностическая сессия — 30 минут бесплатно.'
    },
    {
      question: 'Работаете ли вы онлайн?',
      answer: 'Да, я провожу консультации как очно в Москве, так и онлайн через удобные видеосвязи (Zoom, Telegram, Толк). Эффективность онлайн-консультаций доказана исследованиями и не уступает очным встречам.'
    },
    {
      question: 'Конфиденциальность гарантирована?',
      answer: 'Абсолютно. Я следую профессиональному этическому кодексу психолога. Всё, что обсуждается на сессиях, остаётся строго конфиденциальным. Никакая информация не передаётся третьим лицам без вашего письменного согласия.'
    },
    {
      question: 'Что если мне не подойдёт?',
      answer: 'Это нормальный вопрос. После первой сессии вы поймёте, подходит ли вам мой подход. Если нет — я порекомендую других специалистов. Главное — чтобы вы нашли своего психолога и получили помощь.'
    },
    {
      question: 'Как быстро я увижу результат?',
      answer: 'Первые изменения в самочувствии клиенты отмечают уже после 2-3 сессий: снижается тревожность, появляется ясность. Устойчивый результат формируется к 6-8 сессии. Важно понимать: это не волшебная таблетка, а совместная работа.'
    },
    {
      question: 'Чем вы отличаетесь от других психологов?',
      answer: 'Я специализируюсь на выгорании и работаю с методом КПТ — одним из самых эффективных и научно обоснованных подходов. У меня 20+ лет практики, опыт в бизнесе и IT-сфере. Я понимаю специфику высоконагруженных профессий изнутри.'
    },
    {
      question: 'Нужно ли мне направление от врача?',
      answer: 'Нет, для консультации психолога направление не требуется. Вы можете записаться самостоятельно. Если в процессе работы я увижу необходимость медицинской поддержки, порекомендую обратиться к психотерапевту, эндокринологу, нутрициологу или неврологу в зависимости от ситуации.'
    },
    {
      question: 'Как проходит первая встреча?',
      answer: 'Первая сессия — диагностическая. Мы знакомимся, я задаю вопросы о вашей ситуации, симптомах, истории. Вместе определяем запрос и план работы. Вы ничего не обязаны рассказывать — только то, что готовы. Это безопасное пространство.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-4xl mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Частые вопросы</h3>
            <p className="text-xl text-muted-foreground">
              {customSubtitle || defaultSubtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-primary/10 rounded-lg px-6 hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;