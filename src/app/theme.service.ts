import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

const ThemeClass: Record<Theme, string> = {
  [Theme.Light]: 'light-theme',
  [Theme.Dark]: 'dark-theme',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme$$ = new BehaviorSubject<Theme>(this.getPreferredTheme());

  theme$: Observable<Theme> = this.theme$$.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private getPreferredTheme(): Theme {
    return this.isDarkSchemePreferred() ? Theme.Dark : Theme.Light;
  }

  private isDarkSchemePreferred(): boolean {
    return this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  toggle(): void {
    if (this.theme$$.value === Theme.Light) {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  private enableDark(): void {
    this.document.body.classList.remove(ThemeClass.Light);
    this.document.body.classList.add(ThemeClass.Dark);
    this.theme$$.next(Theme.Dark);
  }

  private enableLight(): void {
    this.document.body.classList.add(ThemeClass.Light);
    this.document.body.classList.remove(ThemeClass.Dark);
    this.theme$$.next(Theme.Light);
  }
}
