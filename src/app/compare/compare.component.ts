import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements AfterViewInit {

  @ViewChild('first') firstImageWrapperRef: ElementRef;
  @ViewChild('second') secondImageWrapperRef: ElementRef;
  @ViewChild('handler') handlerRef: ElementRef;
  @ViewChild('wrapper') wrapperRef: ElementRef;
  @ViewChild('dragHandler') dragHandlerRef: ElementRef;
  @Input() handlerId;
  capturing =  false;
  private firstImageWrapper;
  private secondImageWrapper;
  private handler;
  private wrapper;
  private dragHandler;
  private rectProps: ClientRect;
  private xPosition = 0;
  private left = 0;
  private right = 0;

  constructor() { }

  ngAfterViewInit() {
    this.firstImageWrapper = this.firstImageWrapperRef.nativeElement;
    this.secondImageWrapper = this.secondImageWrapperRef.nativeElement;
    this.handler = this.handlerRef.nativeElement;
    this.wrapper = this.wrapperRef.nativeElement;
    this.dragHandler = this.dragHandlerRef.nativeElement;
    this.rectProps = (this.wrapper as HTMLElement).getBoundingClientRect();
    this.left = this.rectProps.left;
    const width = this.rectProps.width;
    this.right = this.rectProps.left + width;
    const position = width / 2;
    (this.handler as HTMLElement).style.left = `${position}px`;
    (this.dragHandler as HTMLElement).style.left = `${position}px`;
    (this.firstImageWrapper as HTMLElement).style.width = `${width / 2}px`;
    (this.secondImageWrapper as HTMLElement).style.width = `${width / 2}px`;
  }

  onMouseMove(e: MouseEvent) {
    if (this.capturing) {
      window.requestAnimationFrame(() => {
        let clientX = e.clientX;
        clientX = clientX < this.left ? this.left : clientX;
        clientX  = clientX > this.rectProps.width ? this.rectProps.width : clientX;
        const position = e.clientX - this.left;
        (this.handler as HTMLElement).style.left = `${position}px`;
        (this.dragHandler as HTMLElement).style.left = `${position}px`;
        const firstImageWrapperWidth = e.clientX - this.left;
        (this.firstImageWrapper as HTMLElement).style.width = `${firstImageWrapperWidth}px`;
        const secondImageWrapperWidth = this.right - e.clientX;
        (this.secondImageWrapper as HTMLElement).style.width = `${secondImageWrapperWidth}px`;
      });
    }
  }

  onMouseOut() {
    this.capturing = false;
  }

  onMouseDown() {
    this.capturing = true;
  }

  onMouseUp() {
    this.capturing = false;
  }

}
