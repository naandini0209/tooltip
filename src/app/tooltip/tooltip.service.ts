import { Injectable, ViewRef } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@Injectable({
    providedIn: 'root',
})
export class ToolTipService {
    public activeTooltip:TooltipDirective;
}