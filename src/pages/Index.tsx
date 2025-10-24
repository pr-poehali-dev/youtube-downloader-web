import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Service {
  id: string;
  platform: string;
  icon: string;
  title: string;
  description: string;
  price: number;
  minOrder: number;
}

interface TariffPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const Index = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState('1000');
  const [link, setLink] = useState('');

  const services: Service[] = [
    {
      id: 'ig-followers',
      platform: 'instagram',
      icon: 'Instagram',
      title: 'Подписчики Instagram',
      description: 'Живые активные подписчики с аватарками',
      price: 150,
      minOrder: 100
    },
    {
      id: 'ig-likes',
      platform: 'instagram',
      icon: 'Heart',
      title: 'Лайки Instagram',
      description: 'Быстрая накрутка лайков на посты',
      price: 50,
      minOrder: 50
    },
    {
      id: 'tg-members',
      platform: 'telegram',
      icon: 'Send',
      title: 'Подписчики Telegram',
      description: 'Участники в канал или группу',
      price: 200,
      minOrder: 100
    },
    {
      id: 'tg-views',
      platform: 'telegram',
      icon: 'Eye',
      title: 'Просмотры Telegram',
      description: 'Просмотры постов в канале',
      price: 30,
      minOrder: 500
    },
    {
      id: 'yt-views',
      platform: 'youtube',
      icon: 'Play',
      title: 'Просмотры YouTube',
      description: 'Реальные просмотры видео',
      price: 100,
      minOrder: 1000
    },
    {
      id: 'yt-subscribers',
      platform: 'youtube',
      icon: 'Users',
      title: 'Подписчики YouTube',
      description: 'Активные подписчики на канал',
      price: 300,
      minOrder: 100
    }
  ];

  const tariffs: TariffPlan[] = [
    {
      id: 'basic',
      name: 'Базовый',
      price: 0,
      features: ['Стандартная скорость', 'Гарантия 30 дней', 'Поддержка в рабочее время']
    },
    {
      id: 'pro',
      name: 'Профессионал',
      price: 4990,
      popular: true,
      features: ['Ускоренная доставка', 'Гарантия 90 дней', 'Приоритетная поддержка 24/7', 'Скидка 15% на все заказы', 'Реферальный бонус']
    },
    {
      id: 'business',
      name: 'Бизнес',
      price: 9990,
      features: ['Максимальная скорость', 'Гарантия 180 дней', 'Персональный менеджер', 'Скидка 25% на все заказы', 'API доступ', 'Аналитика']
    }
  ];

  const filteredServices = services.filter(s => s.platform === selectedPlatform);

  const handleOrder = () => {
    if (!link || !selectedService) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Заказ создан! Обработка началась');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" className="text-black" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-glow-gold">SocialBoost</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#tariffs" className="hover:text-primary transition-colors">Тарифы</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
          </nav>
          <Button className="gradient-gold text-black font-semibold hover:opacity-90">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <Badge className="mb-4 gradient-gold text-black border-0 px-4 py-1">
            Premium SMM Services
          </Badge>
          <h2 className="text-6xl font-bold mb-6 text-glow-gold">
            Премиальное продвижение
            <br />
            в социальных сетях
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Профессиональные услуги накрутки для Telegram, Instagram и YouTube
            с гарантией качества и конфиденциальности
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gradient-gold text-black font-semibold text-lg px-8 border-glow">
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать сейчас
            </Button>
            <Button size="lg" variant="outline" className="glass text-lg px-8">
              <Icon name="PlayCircle" size={20} className="mr-2" />
              Как это работает
            </Button>
          </div>
        </section>

        <section id="services" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Наши услуги</h3>
            <p className="text-muted-foreground text-lg">
              Выберите платформу и нужную услугу
            </p>
          </div>

          <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 glass mb-8">
              <TabsTrigger value="instagram" className="data-[state=active]:gradient-gold data-[state=active]:text-black">
                <Icon name="Instagram" size={18} className="mr-2" />
                Instagram
              </TabsTrigger>
              <TabsTrigger value="telegram" className="data-[state=active]:gradient-gold data-[state=active]:text-black">
                <Icon name="Send" size={18} className="mr-2" />
                Telegram
              </TabsTrigger>
              <TabsTrigger value="youtube" className="data-[state=active]:gradient-gold data-[state=active]:text-black">
                <Icon name="Play" size={18} className="mr-2" />
                YouTube
              </TabsTrigger>
            </TabsList>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="card-premium hover:border-glow transition-all cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} className="text-black" size={24} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-primary">{service.price}₽</span>
                      <span className="text-muted-foreground">за 1000</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Минимальный заказ: {service.minOrder}
                    </p>
                    <Button 
                      className="w-full gradient-gold text-black font-semibold"
                      onClick={() => setSelectedService(service.id)}
                    >
                      Заказать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </section>

        <section className="mb-20">
          <Card className="card-premium border-glow max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="Zap" className="text-primary" size={28} />
                Быстрый заказ
              </CardTitle>
              <CardDescription>
                Заполните форму и получите результат в течение 24 часов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Выберите услугу</label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ссылка на профиль/пост</label>
                <Input
                  placeholder="https://instagram.com/username"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Количество</label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="glass"
                />
              </div>

              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Количество:</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Цена за 1000:</span>
                  <span className="font-semibold">150₽</span>
                </div>
                <div className="h-px bg-border my-3"></div>
                <div className="flex justify-between">
                  <span className="font-semibold">Итого:</span>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round((parseInt(quantity) / 1000) * 150)}₽
                  </span>
                </div>
              </div>

              <Button onClick={handleOrder} className="w-full gradient-gold text-black font-semibold h-12 text-lg">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Создать заказ
              </Button>
            </CardContent>
          </Card>
        </section>

        <section id="tariffs" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Тарифные планы</h3>
            <p className="text-muted-foreground text-lg">
              Выберите подходящий тариф и получите дополнительные преимущества
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tariffs.map((tariff) => (
              <Card 
                key={tariff.id} 
                className={`card-premium ${tariff.popular ? 'border-glow scale-105' : ''} relative`}
              >
                {tariff.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-gold text-black border-0 px-4 py-1">
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tariff.name}</CardTitle>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-4xl font-bold text-primary">
                      {tariff.price === 0 ? 'Free' : `${tariff.price}₽`}
                    </span>
                    {tariff.price > 0 && (
                      <span className="text-muted-foreground">/месяц</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tariff.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary mt-1" size={18} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tariff.popular ? 'gradient-gold text-black' : 'glass'} font-semibold`}
                  >
                    {tariff.price === 0 ? 'Текущий план' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-premium text-center">
              <CardHeader>
                <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="text-black" size={32} />
                </div>
                <CardTitle>Гарантия безопасности</CardTitle>
                <CardDescription className="text-base">
                  Все данные защищены SSL-шифрованием. Полная конфиденциальность
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-premium text-center">
              <CardHeader>
                <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" className="text-black" size={32} />
                </div>
                <CardTitle>Быстрое выполнение</CardTitle>
                <CardDescription className="text-base">
                  Начало выполнения в течение 1 часа. Полная автоматизация процесса
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-premium text-center">
              <CardHeader>
                <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="HeadphonesIcon" className="text-black" size={32} />
                </div>
                <CardTitle>Поддержка 24/7</CardTitle>
                <CardDescription className="text-base">
                  Всегда на связи для решения любых вопросов и проблем
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section id="reviews" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Отзывы клиентов</h3>
            <p className="text-muted-foreground text-lg">
              Более 50,000 довольных пользователей
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Алексей М.', role: 'Блогер', text: 'Заказываю уже 6 месяцев. Качество на высоте, никаких списаний. Рекомендую!' },
              { name: 'Мария К.', role: 'SMM-менеджер', text: 'Отличный сервис для раскрутки клиентов. Быстро, безопасно, эффективно.' },
              { name: 'Дмитрий В.', role: 'Предприниматель', text: 'Пользуюсь бизнес-тарифом. API очень удобен, поддержка отвечает мгновенно.' }
            ].map((review, index) => (
              <Card key={index} className="card-premium">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center">
                      <Icon name="User" className="text-black" size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-primary fill-primary" size={16} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground">{review.text}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border glass mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-gold rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" className="text-black" size={20} />
                </div>
                <span className="font-bold text-xl">SocialBoost</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Премиальные услуги продвижения в социальных сетях
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Instagram</a></li>
                <li><a href="#" className="hover:text-primary">Telegram</a></li>
                <li><a href="#" className="hover:text-primary">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">О нас</a></li>
                <li><a href="#" className="hover:text-primary">Блог</a></li>
                <li><a href="#" className="hover:text-primary">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
                <li><a href="#" className="hover:text-primary">Политика</a></li>
                <li><a href="#" className="hover:text-primary">Условия</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 SocialBoost. Все права защищены.
            </p>
            <div className="flex gap-4">
              <Icon name="Instagram" className="text-muted-foreground hover:text-primary cursor-pointer" size={20} />
              <Icon name="Send" className="text-muted-foreground hover:text-primary cursor-pointer" size={20} />
              <Icon name="MessageCircle" className="text-muted-foreground hover:text-primary cursor-pointer" size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
