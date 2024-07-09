import { Routes } from '@angular/router';
import { TestComponent } from './pages/test/test.component';
import { DocumentIntelligenceComponent } from './pages/document-intelligence/document-intelligence.component';
import { DocumentWithOpenAIComponent } from './pages/document-with-open-ai/document-with-open-ai.component';

export const routes: Routes = [
    //This refers to the /path in the URL
    { path: '', redirectTo: 'test', pathMatch: 'full'},
    { path: 'test', component: TestComponent, title: 'Test' },
    { path: 'document-intelligence', component: DocumentIntelligenceComponent, title: 'Document Intelligent' },
    { path: 'document-with-openai', component: DocumentWithOpenAIComponent, title: 'Document Intelligent With OpenAI' },
];