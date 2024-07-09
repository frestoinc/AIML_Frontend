// Import necessary providers
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// Import the routes defined in your project
import { routes } from './app.routes';

// Application-wide configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),   // Router configuration
    provideHttpClient()      // HttpClient provider setup
  ]
};
