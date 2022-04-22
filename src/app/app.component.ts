import { Component } from '@angular/core';

import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  contact = {
    name: 'Сергей Клевакин',
    phone: '+7 (908) 632 72 01',
    email: 'justerest@gmail.com',
    telegramName: 'justerest',
  };

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
