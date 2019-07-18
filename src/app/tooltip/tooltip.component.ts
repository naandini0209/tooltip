import { Component, OnInit, ViewChild, Directive, ElementRef, Inject, OnDestroy, HostListener } from '@angular/core';
import { ToolTipService } from './tooltip.service';


@Directive({
	selector: '.tooltip-container'
})
export class TooltipContainerDirective {
}


@Component({
	templateUrl: 'tooltip.component.html',
	styleUrls: ['./tooltip.component.css']
})

export class TooltipComponent implements OnInit {
	top: string;
	left: string;
	@ViewChild(TooltipContainerDirective, { read: ElementRef, static: true }) private tooltipContainer;

	constructor(@Inject('tooltipConfig') private config, private toolTipService: ToolTipService) {}

	ngOnInit() {
		const { x, y, height} = this.config.host.getBoundingClientRect();
		this.left = `${x}px`;
		this.top = `${y + height}px`;
		
	}


}