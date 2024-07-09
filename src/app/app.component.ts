// Import required Angular core features
import { Component, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

// Import route table
import { routes } from './app.routes';

// Import NavBarComponent
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


// Define the standalone AppComponent
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AIML-Frontend';
}

// Bootstrap the application and provide RouterModule with routes
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));
