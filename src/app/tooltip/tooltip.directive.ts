import { Component, Directive, Input, ElementRef, HostListener, Renderer2, ComponentRef, TemplateRef, Injector, ComponentFactoryResolver, ViewContainerRef, ReflectiveInjector, ViewChild, QueryList, Inject, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { TooltipComponent, TooltipContainerDirective } from './tooltip.component';
import { DOCUMENT } from '@angular/common';
import { ToolTipService } from './tooltip.service';


@Directive({
	selector: '[tooltip]'
})

export class TooltipDirective {
	// We can pass string, template or component
	@Input('tooltip') content: string;

	isOpen:boolean = false;


	public componentRef: ComponentRef<TooltipComponent>;
	
	constructor(private element: ElementRef,
		private renderer: Renderer2,
		private injector: Injector,
		private toolTipService:ToolTipService,
		private applicationRef: ApplicationRef,
		private componentFactoryResolver: ComponentFactoryResolver) {
	}
	

	@HostListener('mousedown')
	mousedown() {
		if(this.isOpen){
			this.destroy(this.componentRef.hostView);
			this.isOpen = false;
		}else{

			const activeTooltip = this.toolTipService.activeTooltip;

			if (activeTooltip && activeTooltip.isOpen &&  activeTooltip.componentRef.hostView) {
				activeTooltip.isOpen = false;
				this.destroy(activeTooltip.componentRef.hostView);
			}

			this.isOpen = true;
			this.showToolTip()
		}
		
	}

	@HostListener('document:mousedown', ['$event']) docMouseDown(event: Event) {
		
	}

	@HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		if (this.componentRef && this.componentRef.hostView) {
			this.destroy(this.componentRef.hostView);
		}
	}
	

	showToolTip(){
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
		this.injector = ReflectiveInjector.resolveAndCreate([
			{
				provide: 'tooltipConfig',
				useValue: {
					host: this.element.nativeElement,
					destroy:this.destroy
				}
			}
		]);
		this.componentRef = componentFactory.create(this.injector, [[this.renderer.createText(this.content)]]);

		this.toolTipService.activeTooltip = this;
		this.applicationRef.attachView(this.componentRef.hostView);

		const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
			.rootNodes[0] as HTMLElement;

		document.body.appendChild(domElem);
	}

	destroy(ref=null) {
		if (ref){
			this.applicationRef.detachView(ref);
		}
	}
	

	ngOnDestroy() {
		this.destroy();
		
	}
}