import { ToolTipService } from './tooltip.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';


import { TooltipComponent, TooltipContainerDirective } from "./tooltip.component";
import { TooltipDirective } from './tooltip.directive';

@NgModule({
    declarations: [
        TooltipContainerDirective,
        TooltipComponent,
    ],
    imports: [
        BrowserModule
    ],
    providers: [ToolTipService],
    exports: [TooltipComponent],
    entryComponents: [TooltipComponent]
})
export class TooltipModule {
}
