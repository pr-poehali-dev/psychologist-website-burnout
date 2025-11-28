import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ContactSectionProps {
  onBooking: () => void;
}

const ContactSection = ({ onBooking }: ContactSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/559666a4-a8c3-4ba8-b182-ee45f07594f2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Спасибо! Я свяжусь с вами в ближайшее время.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(data.error || 'Ошибка отправки. Попробуйте позже.');
      }
    } catch (error) {
      toast.error('Ошибка соединения. Проверьте интернет.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-white to-primary/8">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-4xl mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Запись на консультацию</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Первый шаг к изменениям начинается с разговора
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Calendar" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Быстрая запись</h4>
                      <p className="text-sm text-muted-foreground mb-3">Выберите удобное время через онлайн-календарь</p>
                      <Button className="w-full" onClick={onBooking}>
                        <Icon name="Calendar" size={18} className="mr-2" />
                        Записаться онлайн
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Send" className="text-blue-500" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Telegram</h4>
                      <p className="text-sm text-muted-foreground mb-3">Быстрый ответ на ваш вопрос</p>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="https://t.me/algonpsy" target="_blank" rel="noopener noreferrer">
                          <Icon name="Send" size={18} className="mr-2" />
                          Написать в Telegram
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Остались вопросы?</h4>
                      <p className="text-sm text-muted-foreground mb-3">Напишите мне, и я отвечу в течение 24 часов</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Icon name="Mail" size={18} className="mr-2" />
                            Задать вопрос
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Задайте ваш вопрос</DialogTitle>
                            <DialogDescription>
                              Я отвечу вам в течение 24 часов
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <Label htmlFor="name">Ваше имя</Label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Телефон (опционально)</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="message">Ваш вопрос</Label>
                              <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              Отправить
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" className="text-primary" size={24} />
                    <div>
                      <h4 className="font-semibold mb-2">Формат консультаций</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Онлайн (Zoom, Skype, Google Meet)</li>
                        <li>• Очно в Москве</li>
                        <li>• Длительность: 60 минут</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Shield" className="text-primary" size={24} />
                    <div>
                      <h4 className="font-semibold mb-2">Конфиденциальность</h4>
                      <p className="text-sm text-muted-foreground">
                        Все консультации конфиденциальны. Я соблюдаю этический кодекс психолога и не разглашаю информацию о клиентах.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Gift" className="text-primary" size={24} />
                    <div>
                      <h4 className="font-semibold mb-2">Первая консультация</h4>
                      <p className="text-sm text-muted-foreground">
                        Знакомство, диагностика запроса и составление плана работы — 30 минут бесплатно
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon name="ShieldCheck" className="text-green-600" size={24} />
                    <div>
                      <h4 className="font-semibold mb-2 text-green-900">Гарантия результата</h4>
                      <p className="text-sm text-green-800">
                        Если после первой полной сессии вы не почувствуете улучшений или не захотите продолжать работу — вернём деньги. Без вопросов.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;