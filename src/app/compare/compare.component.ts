import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { BunBunStates } from '../states';
import { stat } from 'fs';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements AfterViewInit, OnInit {

  @ViewChild('first') firstImageWrapperRef: ElementRef;
  @ViewChild('second') secondImageWrapperRef: ElementRef;
  @ViewChild('handler') handlerRef: ElementRef;
  @ViewChild('wrapper') wrapperRef: ElementRef;
  @ViewChild('dragHandler') dragHandlerRef: ElementRef;
  @Input() handlerId;
  capturing = false;
  private firstImageWrapper;
  private secondImageWrapper;
  private handler;
  private wrapper;
  private dragHandler;
  private rectProps: ClientRect;
  private left = 0;
  private right = 0;
  private state: any = BunBunStates[0];

  constructor() { }

  ngOnInit() {
    this.state.leftPage.markers.forEach(mark => {
      mark.uid = `marker_${Math.floor(Math.random() * 10e6)}`;
    });
    this.state.rightPage.markers.forEach(mark => {
      mark.uid = `marker_${Math.floor(Math.random() * 10e6)}`;
    });
  }
  loadImages() {
    const leftImg = document.createElement('img');
    leftImg.style.opacity = '0';
    leftImg.src = this.state.leftPage.src;
    leftImg.onload = () => {
      (this.state.leftPage as any).url = `url('${this.state.leftPage.src}')`;
      setTimeout(() => {
        const elem = (this.firstImageWrapper as Element).querySelector('.image');
        if (elem) {
          elem.classList.add('active');
        }
        leftImg.remove();
      }, 16);
    };
    const rightImg = document.createElement('img');
    rightImg.style.opacity = '0';
    rightImg.src = this.state.rightPage.src;
    rightImg.onload = () => {
      (this.state.rightPage as any).url = `url('${this.state.rightPage.src}')`;
      setTimeout(() => {
        const elem = (this.secondImageWrapper as Element).querySelector('.image');
        if (elem) {
          elem.classList.add('active');
        }
        rightImg.remove();
      }, 16);
    };
  }

  ngAfterViewInit() {
    this.loadImages();
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

  onWrapperClick() {
    const markers = document.querySelectorAll('.image-marker');
    if (markers && markers.length > 0) {
      Array.prototype.slice.call(markers).forEach(mark => {
        (mark as any).classList.add('active');
      });
      setTimeout(() => {
        Array.prototype.slice.call(markers).forEach(mark => {
          (mark as any).classList.remove('active');
        });
      }, 500);
    }
  }

  onMarkActivate(marker) {
    const state = BunBunStates.find(x => x.state === marker.targetState);
    if (state) {
      this.state = null;
      let elem = (this.secondImageWrapper as Element).querySelector('.image');
      if (elem) {
        elem.classList.remove('active');
      }
      elem = (this.firstImageWrapper as Element).querySelector('.image');
      if (elem) {
        elem.classList.remove('active');
      }
      setTimeout(() => {
        this.state = state;
        this.ngOnInit();
        setTimeout(() => {
          this.loadImages();
        }, 1);
      });
    }
  }

  onMouseMove(e: MouseEvent) {
    if (this.capturing) {
      window.requestAnimationFrame(() => {
        let clientX = e.clientX;
        clientX = clientX < this.left ? this.left : clientX;
        clientX = clientX > this.rectProps.width ? this.rectProps.width : clientX;
        let position = e.clientX - this.left;
        position = position < 0 ? 0 : position;
        position = position > this.rectProps.width ? this.rectProps.width : position;
        (this.handler as HTMLElement).style.left = `${position}px`;
        (this.dragHandler as HTMLElement).style.left = `${position}px`;
        const firstImageWrapperWidth = position;
        (this.firstImageWrapper as HTMLElement).style.width = `${firstImageWrapperWidth}px`;
        position = this.right - e.clientX;
        position = position < 0 ? 0 : position;
        position = position > this.rectProps.width ? this.rectProps.width : position;
        const secondImageWrapperWidth = position;
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
