import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslatePipe,TranslateDirective } from '@ngx-translate/core';
import { AppSettings, defaults } from '../../config';

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
    TranslatePipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private translate = inject(TranslateService);
  
  currentLanguage: 'ar' | 'en' = defaults.language;
  
  // Language options for the dropdown
  languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' }
  ];

  constructor() {

      this.translate.addLangs(['en', 'ar']);
        this.translate.setFallbackLang('en');
        this.translate.use(this.currentLanguage);
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
    console.log('Login clicked');
    // TODO: Implement navigation to login page
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
}