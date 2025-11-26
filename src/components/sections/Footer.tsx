const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-lg mb-4">Александр Гонтарь</h4>
            <p className="text-sm text-background/70">
              Психолог, специалист по профессиональному выгоранию и измению мышления и поведения.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-background/70 hover:text-background transition-colors">О специалисте</a></li>
              <li><a href="#services" className="text-background/70 hover:text-background transition-colors">Услуги</a></li>
              <li><a href="#cases" className="text-background/70 hover:text-background transition-colors">Кейсы</a></li>
              <li><a href="/manifesto" className="text-background/70 hover:text-background transition-colors">Манифест</a></li>
              <li><a href="#contact" className="text-background/70 hover:text-background transition-colors">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Соцсети</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://t.me/Algonpsycholog" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://vk.com/AleksandrGontarPsy" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                  ВКонтакте
                </a>
              </li>
              <li>
                <a href="https://dzen.ru/id/68f6621b6539c44524418486" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                  Дзен
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-background/20 text-center text-sm text-background/70">
          <p>© 2024 Александр Гонтарь. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;