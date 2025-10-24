import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface DownloadItem {
  id: string;
  title: string;
  thumbnail: string;
  quality: string;
  progress: number;
  status: 'downloading' | 'completed' | 'failed';
  size: string;
  date: string;
}

const Index = () => {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('1080p');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [username, setUsername] = useState('Пользователь');
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  const [downloads] = useState<DownloadItem[]>([
    {
      id: '1',
      title: 'Топ 10 трендов веб-дизайна 2025',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      quality: '1080p',
      progress: 100,
      status: 'completed',
      size: '125 МБ',
      date: '2 часа назад'
    },
    {
      id: '2',
      title: 'React Tutorial для начинающих',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      quality: '720p',
      progress: 100,
      status: 'completed',
      size: '89 МБ',
      date: 'Вчера'
    },
    {
      id: '3',
      title: 'Лучшие практики UI/UX дизайна',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      quality: '4K',
      progress: 100,
      status: 'completed',
      size: '342 МБ',
      date: '3 дня назад'
    }
  ]);

  const handleDownload = () => {
    if (!url) {
      toast.error('Введите URL видео');
      return;
    }

    setIsDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          toast.success('Видео успешно скачано!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border glass">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-red rounded-lg flex items-center justify-center animate-pulse-glow">
              <Icon name="Download" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-glow">TubeDL</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              <Icon name="Zap" size={16} className="mr-1" />
              Premium
            </Badge>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>П</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="download" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 glass mb-8">
            <TabsTrigger value="download" className="data-[state=active]:gradient-red">
              <Icon name="Download" size={18} className="mr-2" />
              Скачать
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:gradient-red">
              <Icon name="History" size={18} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:gradient-red">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="download" className="space-y-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold mb-4 text-glow">
                  Скачивайте видео с YouTube
                </h2>
                <p className="text-xl text-muted-foreground">
                  Быстро, бесплатно и в любом качестве
                </p>
              </div>

              <Card className="glass border-primary/20 animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Link" size={24} className="text-primary" />
                    Вставьте ссылку на видео
                  </CardTitle>
                  <CardDescription>Поддерживаются все видео и плейлисты YouTube</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="glass border-primary/30 focus:border-primary"
                      disabled={isDownloading}
                    />
                    <Select value={quality} onValueChange={setQuality} disabled={isDownloading}>
                      <SelectTrigger className="w-32 glass border-primary/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4K">4K (2160p)</SelectItem>
                        <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                        <SelectItem value="720p">HD (720p)</SelectItem>
                        <SelectItem value="480p">SD (480p)</SelectItem>
                        <SelectItem value="360p">360p</SelectItem>
                        <SelectItem value="audio">Только аудио</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {isDownloading && (
                    <div className="space-y-2 animate-fade-in">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Загрузка...</span>
                        <span className="font-semibold text-primary">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>
                  )}

                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full gradient-red hover:opacity-90 transition-opacity h-12 text-lg font-semibold animate-pulse-glow"
                  >
                    <Icon name="Download" size={20} className="mr-2" />
                    {isDownloading ? 'Скачивание...' : 'Скачать видео'}
                  </Button>

                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">4K</div>
                      <div className="text-sm text-muted-foreground">Макс. качество</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">∞</div>
                      <div className="text-sm text-muted-foreground">Без лимитов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">⚡</div>
                      <div className="text-sm text-muted-foreground">Быстро</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="glass hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Icon name="Gauge" size={32} className="text-accent mb-2" />
                    <CardTitle>Высокая скорость</CardTitle>
                    <CardDescription>
                      Скачивайте видео на максимальной скорости вашего интернета
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="glass hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Icon name="Shield" size={32} className="text-primary mb-2" />
                    <CardTitle>Безопасность</CardTitle>
                    <CardDescription>
                      Все загрузки защищены SSL-шифрованием для вашей безопасности
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="glass hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Icon name="Sparkles" size={32} className="text-accent mb-2" />
                    <CardTitle>Любое качество</CardTitle>
                    <CardDescription>
                      От 144p до 4K - выбирайте качество под свои нужды
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">История загрузок</h2>
                <Button variant="outline" className="glass">
                  <Icon name="Trash2" size={18} className="mr-2" />
                  Очистить всё
                </Button>
              </div>

              <div className="space-y-4">
                {downloads.map((item) => (
                  <Card key={item.id} className="glass hover:border-primary/50 transition-all animate-scale-in">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-40 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="bg-primary/20 text-primary">
                                  {item.quality}
                                </Badge>
                                <Badge variant="outline">{item.size}</Badge>
                              </div>
                            </div>
                            <Button size="icon" variant="ghost" className="hover:text-primary">
                              <Icon name="Download" size={20} />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="Clock" size={16} />
                            {item.date}
                            <span className="ml-auto flex items-center gap-1 text-green-500">
                              <Icon name="CheckCircle" size={16} />
                              Завершено
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Настройки профиля</h2>

              <Card className="glass mb-6">
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                  <CardDescription>Обновите свои данные профиля</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="glass"
                    />
                  </div>
                  <Button className="gradient-red hover:opacity-90">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass mb-6">
                <CardHeader>
                  <CardTitle>Настройки загрузки</CardTitle>
                  <CardDescription>Управляйте параметрами скачивания</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Уведомления</Label>
                      <p className="text-sm text-muted-foreground">
                        Получать уведомления о завершении загрузок
                      </p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Автоматическая загрузка</Label>
                      <p className="text-sm text-muted-foreground">
                        Начинать загрузку сразу после вставки ссылки
                      </p>
                    </div>
                    <Switch checked={autoDownload} onCheckedChange={setAutoDownload} />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Zap" className="text-primary" />
                    Premium подписка
                  </CardTitle>
                  <CardDescription>Получите доступ к расширенным возможностям</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Check" className="text-green-500" size={20} />
                      <span>Без рекламы</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" className="text-green-500" size={20} />
                      <span>Ускоренная загрузка</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" className="text-green-500" size={20} />
                      <span>Пакетное скачивание</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" className="text-green-500" size={20} />
                      <span>Приоритетная поддержка</span>
                    </div>
                  </div>
                  <Button className="w-full gradient-blue hover:opacity-90">
                    <Icon name="Crown" size={18} className="mr-2" />
                    Перейти на Premium - 299₽/месяц
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border glass mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-red rounded-lg flex items-center justify-center">
                <Icon name="Download" className="text-white" size={18} />
              </div>
              <span className="font-semibold">TubeDL © 2025</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">О сервисе</a>
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Поддержка</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
