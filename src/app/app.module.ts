import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TooltipDirective } from '../app/tooltip/tooltip.directive';
import { TooltipModule } from "./tooltip/tooltip.module";
import { RouterModule, Routes } from '@angular/router';
import { TooltipDemoComponent } from './tooltip-demo/tooltip-demo.component';

const appRoutes: Routes = [
  { path: 'tooltip', component: TooltipDemoComponent },
  { path: '**', redirectTo:'tooltip'}
];


@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    TooltipDemoComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    TooltipModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
