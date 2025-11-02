import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegisterComponent } from "./pages/authentication-authorization/register/register.component";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  imports: [MatSlideToggleModule, RegisterComponent, HomeComponent],
  templateUrl: './app.component.html',
 
})
export class AppComponent {
  title = 'shipping-system-frontend';
}
