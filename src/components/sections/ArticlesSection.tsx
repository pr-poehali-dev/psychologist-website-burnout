import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Article {
  title: string;
  excerpt: string;
  readTime: string;
  link: string;
}

interface ArticlesSectionProps {
  articles: Article[];
}

const ArticlesSection = ({ articles }: ArticlesSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="articles" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-6xl mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Полезные статьи</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Практические советы и инсайты для работы над собой
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" asChild>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Icon name="Clock" size={14} />
                      <span>{article.readTime}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-primary flex items-center font-medium">
                      Читать в Дзен
                      <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;