import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegisterComponent } from "./pages/authentication-authorization/register/register.component";
import { HomeComponent } from "./home/home.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import *  as uiSelectors from './store/ui/loading.selectors' ;
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AppState } from './store/app.state';


@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule,
     RegisterComponent,
     CommonModule,
      HomeComponent,
    MatProgressSpinnerModule,
    AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'shipping-system-frontend';
  private store = inject(Store<AppState>);
  private renderer = inject(Renderer2);
  private destroy$ = new Subject<void>();
  isLoading$: Observable<boolean> = this.store.select(uiSelectors.IsLoading);

  ngOnInit(): void {
    this.isLoading$
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(isLoading => {
        if (isLoading) {
          this.renderer.addClass(document.body, 'no-scroll');
          this.renderer.addClass(document.documentElement, 'no-scroll');
        } else {
          this.renderer.removeClass(document.body, 'no-scroll');
          this.renderer.removeClass(document.documentElement, 'no-scroll');
        }
      });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
    this.renderer.removeClass(document.documentElement, 'no-scroll');
    this.destroy$.next();
    this.destroy$.complete();
  }

}
