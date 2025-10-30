import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SocialSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-4xl mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Следите за новостями</h3>
            <p className="text-muted-foreground">
              Полезные материалы и инсайты в моих каналах
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="https://t.me/Algonpsycholog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Icon name="Send" size={20} />
                <span>Telegram</span>
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="https://vk.com/AleksandrGontarPsy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.149.132-.427.132-.427s-.019-1.302.574-1.494c.584-.189 1.334 1.258 2.129 1.815.602.421 1.06.329 1.06.329l2.127-.03s1.112-.071.585-.962c-.043-.073-.307-.659-1.577-1.864-1.33-1.261-1.151-1.057.45-3.239.974-1.328 1.363-2.138 1.241-2.484-.116-.33-.833-.243-.833-.243l-2.396.015s-.178-.025-.309.056c-.128.079-.21.263-.21.263s-.377 1.022-.879 1.892c-1.059 1.833-1.483 1.931-1.657 1.817-.403-.267-.302-1.073-.302-1.645 0-1.788.266-2.533-.519-2.727-.261-.064-.453-.107-1.12-.114-.857-.009-1.583.003-1.994.208-.274.137-.485.442-.356.459.159.022.519.099.71.364.247.342.238 1.11.238 1.11s.142 2.104-.331 2.365c-.325.179-.77-.186-1.726-1.854-.489-.853-.859-1.796-.859-1.796s-.071-.178-.198-.273c-.154-.116-.37-.153-.37-.153l-2.276.015s-.342.01-.467.161c-.111.134-.009.411-.009.411s1.777 4.237 3.788 6.373c1.844 1.957 3.937 1.827 3.937 1.827h.949z"/>
                </svg>
                <span>ВКонтакте</span>
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="https://dzen.ru/id/68f6621b6539c44524418486" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Icon name="BookOpen" size={20} />
                <span>Дзен</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;