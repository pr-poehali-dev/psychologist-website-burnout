import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [reviews]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-bl from-primary/8 via-transparent to-primary/5">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-7xl mx-auto scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Отзывы клиентов</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Истории людей, которые вернули баланс и энергию в свою жизнь
            </p>
          </div>
          
          <div className="relative">
            {canScrollLeft && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 hidden md:flex"
                onClick={() => scroll('left')}
              >
                <Icon name="ChevronLeft" size={24} />
              </Button>
            )}
            
            <div 
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((review, index) => (
                <Card key={index} className="border-2 flex-shrink-0 w-[350px] snap-start">
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

            {canScrollRight && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 hidden md:flex"
                onClick={() => scroll('right')}
              >
                <Icon name="ChevronRight" size={24} />
              </Button>
            )}
          </div>

          <div className="text-center mt-6 text-sm text-muted-foreground md:hidden">
            Проведите пальцем влево, чтобы увидеть больше отзывов
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;