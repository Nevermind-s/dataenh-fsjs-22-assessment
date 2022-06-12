import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MailComponent } from './mail/mail.component';

const routes: Routes = [
  {path: "", redirectTo: "mail", pathMatch: "full"},
  {path: "mail", component: MailComponent},
  {path: "analytics", component: AnalyticsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
