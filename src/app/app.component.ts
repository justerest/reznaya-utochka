import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('click')
  toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
