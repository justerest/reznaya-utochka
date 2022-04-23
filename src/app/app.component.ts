import { Component } from '@angular/core';

import { ThemeService } from './theme.service';

interface Idea {
  imageUrl: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkTheme$ = this.themeService.isDarkTheme$;

  contact = {
    name: 'Сергей Клевакин',
    phone: '+7 (908) 632 72 01',
    email: 'justerest@gmail.com',
    telegramUsername: 'justerest',
  };

  groups = {
    vk: 'https://vk.com/carvedduck',
    telegramChannel: 'https://t.me/carvedduck',
  };

  ideas: Idea[] = [
    {
      imageUrl:
        'https://na-dache.pro/uploads/posts/2021-08/1630195047_71-p-nalichniki-na-okna-v-derevyannom-dome-foto-88.jpg',
      title: 'Наличники',
      subtitle: 'Счастливое лицо вашего дома',
    },
    {
      imageUrl: 'https://i.pinimg.com/originals/2f/68/ba/2f68ba86f34244b4297808f61a560de5.jpg',
      title: 'Подставка-держатель',
      subtitle: 'Можно собрать любой размер и формат',
    },
  ];

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
