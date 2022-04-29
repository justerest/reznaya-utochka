import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export class StringLocalStorage<T extends string> {
  constructor(private key: string) {}

  getVal(): T | undefined {
    return (globalThis.localStorage?.getItem(this.key) ?? undefined) as T;
  }

  setVal(val: T): void {
    globalThis.localStorage?.setItem(this.key, val);
  }
}

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

const ThemeClass: Record<Theme, string> = {
  [Theme.Light]: 'light-theme',
  [Theme.Dark]: 'dark-theme',
};

const THEME_LOCAL_STORAGE = new StringLocalStorage<Theme>('theme');

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly initialTheme = THEME_LOCAL_STORAGE.getVal() ?? this.getPreferredTheme();

  private theme$$ = new BehaviorSubject<Theme>(this.initialTheme);

  theme$: Observable<Theme> = this.theme$$.asObservable();

  isDarkTheme$: Observable<boolean> = this.theme$$.pipe(map((theme) => theme === Theme.Dark));

  constructor(@Inject(DOCUMENT) private document: Document) {
    const savedTheme = THEME_LOCAL_STORAGE.getVal();
    if (savedTheme === Theme.Light) {
      this.installLightThemeBodyClass();
    } else if (savedTheme === Theme.Dark) {
      this.installDarkThemeBodyClass();
    }
  }

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
    this.installDarkThemeBodyClass();
    THEME_LOCAL_STORAGE.setVal(Theme.Dark);
    this.theme$$.next(Theme.Dark);
  }

  private installDarkThemeBodyClass() {
    this.document.body.classList.remove(ThemeClass.Light);
    this.document.body.classList.add(ThemeClass.Dark);
  }

  private enableLight(): void {
    this.installLightThemeBodyClass();
    THEME_LOCAL_STORAGE.setVal(Theme.Light);
    this.theme$$.next(Theme.Light);
  }

  private installLightThemeBodyClass() {
    this.document.body.classList.add(ThemeClass.Light);
    this.document.body.classList.remove(ThemeClass.Dark);
  }
}
