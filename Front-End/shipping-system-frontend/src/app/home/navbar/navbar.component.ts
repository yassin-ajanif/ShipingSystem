import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateService, TranslatePipe,TranslateDirective } from '@ngx-translate/core';
import { defaults } from '../../config';
import { Store } from '@ngrx/store';
import * as LoginSelectors from '../../pages/authentication-authorization/login/store/login.selectors';
import * as LoginActions from '../../pages/authentication-authorization/login/store/login.actions';
import { Observable, Subject } from 'rxjs';
import { pairwise, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    TranslatePipe,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private translate = inject(TranslateService);
  private router = inject(Router);
  private store = inject(Store);
  
  currentLanguage: 'ar' | 'en' = defaults.language;
  isDarkMode: boolean = false;
  isAuthenticated$: Observable<boolean> = this.store.select(LoginSelectors.IsAuthenticated);
  private destroy$ = new Subject<void>();
  
  // Language options for the dropdown
  languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' }
  ];

  constructor() {

      this.translate.addLangs(['en', 'ar']);
        this.translate.setFallbackLang('en');
        this.translate.use(this.currentLanguage);
        
        // Set default theme to light
        this.applyTheme();
  }

  ngOnInit(): void {
    this.store
      .select(LoginSelectors.IsLoggedOut)
      .pipe(pairwise(), takeUntil(this.destroy$))
      .subscribe(([previouslyLoggedOut, currentlyLoggedOut]) => {
        if (!previouslyLoggedOut && currentlyLoggedOut) {
          this.router.navigate(['/login']);
        }
      });
  }

  onFeaturesClick(): void {
    console.log('Features clicked');
    // TODO: Implement navigation to features section
  }

  onPricingClick(): void {
    console.log('Pricing clicked');
    // TODO: Implement navigation to pricing section
  }

  onSupportClick(): void {
    console.log('Support clicked');
    // TODO: Implement navigation to support section
  }

  onLoginClick(): void {
    this.router.navigate(['/login']);
  }

  onLogoutClick(): void {
    this.store.dispatch(LoginActions.logout());
  }

  onLogoClick(): void {
    console.log('Logo clicked');
    // TODO: Implement navigation to home page
  }

  onLanguageChange(language: 'ar' | 'en'): void {
    this.currentLanguage = language;
    
    // Change the translate service language
    this.translate.use(language);
  
    // Apply RTL/LTR direction
    const htmlElement = document.documentElement;
    if (language === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
      htmlElement.setAttribute('lang', 'en');
    }
  }

  getCurrentLanguageDisplay(): { name: string; flag: string } {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang || this.languages[0];
  }

  /**
   * Toggle between dark and light theme
   */
  onThemeToggle(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  /**
   * Apply the current theme to the HTML root element
   */
  private applyTheme(): void {
    const htmlElement = document.documentElement;
    
    if (this.isDarkMode) {
      htmlElement.classList.remove('light-theme');
      htmlElement.classList.add('dark-theme');
    } else {
      htmlElement.classList.remove('dark-theme');
      htmlElement.classList.add('light-theme');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
