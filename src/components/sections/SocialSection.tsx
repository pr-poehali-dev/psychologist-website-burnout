import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SocialSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/20">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-6xl mx-auto space-y-8 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Оставайтесь на связи</h3>
            <p className="text-xl text-muted-foreground">
              Подписывайтесь на мои каналы для получения новых материалов
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-500/20 shadow-xl">
              <CardHeader className="text-center">
                <Badge variant="outline" className="text-blue-600 border-blue-600 w-fit mx-auto mb-3">
                  Telegram-канал
                </Badge>
                <CardTitle className="text-2xl mb-2">
                  Ежедневные инсайты и техники
                </CardTitle>
                <CardDescription className="text-base">
                  Короткие посты, практические техники и актуальные материалы о психологии выгорания
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-md w-fit mx-auto">
                  <img 
                    src="https://cdn.poehali.dev/files/4267afa7-4bb8-44d6-93dd-5e9c680f1373.png" 
                    alt="QR-код Telegram канала @Algonpsycholog" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  <a href="https://t.me/Algonpsycholog" target="_blank" rel="noopener noreferrer">
                    <Icon name="Send" size={18} className="mr-2" />
                    Подписаться в Telegram
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0077FF]/20 shadow-xl">
              <CardHeader className="text-center">
                <Badge variant="outline" className="text-[#0077FF] border-[#0077FF] w-fit mx-auto mb-3">
                  Сообщество ВКонтакте
                </Badge>
                <CardTitle className="text-2xl mb-2">
                  Присоединяйтесь к сообществу
                </CardTitle>
                <CardDescription className="text-base">
                  Обсуждения, прямые эфиры, анонсы мероприятий и полезные материалы для участников
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-12 rounded-xl text-center">
                  <div className="w-32 h-32 mx-auto bg-[#0077FF] rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.785 16.241s.288-.032.436-.194c.136-.149.132-.427.132-.427s-.019-1.302.574-1.494c.584-.189 1.334 1.258 2.129 1.815.602.421 1.06.329 1.06.329l2.127-.03s1.112-.071.585-.962c-.043-.073-.307-.659-1.577-1.864-1.33-1.261-1.151-1.057.45-3.239.974-1.328 1.363-2.138 1.241-2.484-.116-.33-.833-.243-.833-.243l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377 1.022-.879 1.892c-1.059 1.833-1.483 1.931-1.657 1.817-.403-.267-.302-1.073-.302-1.645 0-1.788.266-2.533-.519-2.727-.261-.064-.453-.107-1.12-.114-.857-.009-1.583.003-1.994.208-.274.137-.485.442-.356.459.159.022.519.099.71.364.247.342.238 1.11.238 1.11s.142 2.104-.331 2.365c-.325.179-.77-.186-1.726-1.854-.489-.853-.859-1.796-.859-1.796s-.071-.178-.198-.273c-.154-.116-.37-.153-.37-.153l-2.276.015s-.342.01-.467.161c-.111.134-.009.411-.009.411s1.777 4.237 3.788 6.373c1.844 1.957 3.937 1.827 3.937 1.827h.949z"/>
                    </svg>
                  </div>
                </div>
                <Button asChild size="lg" className="w-full" style={{backgroundColor: '#0077FF', color: 'white'}}>
                  <a href="https://vk.com/AleksandrGontarPsy" target="_blank" rel="noopener noreferrer">
                    <Icon name="Users" size={18} className="mr-2" />
                    Вступить в группу
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;