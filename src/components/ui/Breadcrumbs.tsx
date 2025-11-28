import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Хлебные крошки" className="py-4">
      <ol 
        className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link 
            to="/" 
            className="hover:text-primary transition-colors flex items-center gap-1"
            itemProp="item"
          >
            <Icon name="Home" size={16} />
            <span itemProp="name">Главная</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => (
          <li 
            key={index}
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-2"
          >
            <Icon name="ChevronRight" size={16} className="text-muted-foreground/50" />
            {index === items.length - 1 ? (
              <span 
                className="font-medium text-foreground"
                itemProp="name"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.href} 
                className="hover:text-primary transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
