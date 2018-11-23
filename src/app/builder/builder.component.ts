import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { BuilderService } from '../builder.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Dragger } from '../states';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit, AfterViewInit {
  @ViewChild('first') firstImageWrapperRef: ElementRef;
  @ViewChild('second') secondImageWrapperRef: ElementRef;
  @ViewChild('handler') handlerRef: ElementRef;
  @ViewChild('wrapper') wrapperRef: ElementRef;
  @ViewChild('dragHandler') dragHandlerRef: ElementRef;
  @ViewChild('contentArea') contentAreaRef: ElementRef;
  @Input() handlerId;
  @Input() draggerType: Dragger = Dragger.Horizontal;
  @Output() stateChange = new EventEmitter();
  mouseEventCapturing = false;
  panEventCapturing = false;
  private firstImageWrapper;
  private secondImageWrapper;
  private handler;
  private wrapper;
  private dragHandler;
  private contentArea;
  private rectProps: ClientRect;
  private left = 0;
  private right = 0;
  private top = 0;
  private bottom = 0;
  state: any = null;

  constructor(
    private appService: AppService,
    private builderService: BuilderService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loadMarkers();
    this.builderService.state$.subscribe((data) => {
      this.loadState(data);
    });
  }
  loadMarkers() {
    if (this.state && this.state.leftPage && this.state.leftPage.markers && this.state.leftPage.markers.length > 0) {
      this.state.leftPage.markers.forEach(mark => {
        mark.uid = `marker_${Math.floor(Math.random() * 10e6)}`;
      });
    }
    if (this.state && this.state.rightPage && this.state.rightPage.markers && this.state.rightPage.markers.length > 0) {
      this.state.rightPage.markers.forEach(mark => {
        mark.uid = `marker_${Math.floor(Math.random() * 10e6)}`;
      });
    }
  }
  loadState(state) {
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
        this.loadMarkers();
        this.processMarkers();
        setTimeout(() => {
          this.loadImages();
        }, 1);
      });
    }
  }
  loadImages() {
    if (this.state && this.state.leftPage) {
      const leftImg = document.createElement('img');
      leftImg.style.opacity = '0';
      leftImg.src = this.state.leftPage.src;
      leftImg.onload = () => {
        (this.state.leftPage as any).url = this.sanitizer.bypassSecurityTrustStyle(`url('${this.state.leftPage.src}')`);
        setTimeout(() => {
          const elem = (this.firstImageWrapper as Element).querySelector('.image');
          if (elem) {
            elem.classList.add('active');
          }
          leftImg.remove();
        }, 16);
      };
    }
    if (this.state && this.state.rightPage) {
      const rightImg = document.createElement('img');
      rightImg.style.opacity = '0';
      rightImg.src = this.state.rightPage.src;
      rightImg.onload = () => {
        (this.state.rightPage as any).url = this.sanitizer.bypassSecurityTrustStyle(`url('${this.state.rightPage.src}')`);
        setTimeout(() => {
          const elem = (this.secondImageWrapper as Element).querySelector('.image');
          if (elem) {
            elem.classList.add('active');
          }
          rightImg.remove();
        }, 16);
      };
    }
  }

  processMarkers() {
  }

  ngAfterViewInit() {
    this.loadImages();
    this.firstImageWrapper = this.firstImageWrapperRef.nativeElement;
    this.secondImageWrapper = this.secondImageWrapperRef.nativeElement;
    this.handler = this.handlerRef.nativeElement;
    this.wrapper = this.wrapperRef.nativeElement;
    this.dragHandler = this.dragHandlerRef.nativeElement;
    this.contentArea = this.contentAreaRef.nativeElement;
    const isDeviceWrapperShown = this.appService.showDeviceMock();
    if (!isDeviceWrapperShown) {
      const props: ClientRect = (this.contentArea as HTMLElement).getBoundingClientRect();
      if (props) {
        const dimensions = this.getDimensions(props);
        (this.wrapper as HTMLElement).style.height = dimensions.height + 'px';
        (this.wrapper as HTMLElement).style.width = dimensions.width + 'px';
      }
    }
    setTimeout(() => {
      this.initer();
    });
  }
  getDimensions(props: ClientRect) {
    let width = props.width;
    let height = props.width * this.appService.RATIO;
    if (height > props.height) {
      height = props.height;
      width = props.height / this.appService.RATIO;
    }
    return {
      width: width,
      height: height
    };
  }

  initer() {
    this.rectProps = (this.wrapper as HTMLElement).getBoundingClientRect();
    if (this.draggerType === Dragger.Horizontal) {
      this.left = this.rectProps.left;
      const width = this.rectProps.width;
      this.right = this.rectProps.left + width;
      const position = width / 2;
      (this.handler as HTMLElement).style.left = `${position}px`;
      (this.dragHandler as HTMLElement).style.left = `${position}px`;
      (this.firstImageWrapper as HTMLElement).style.width = `${width / 2}px`;
      (this.secondImageWrapper as HTMLElement).style.width = `${width / 2}px`;
    } else if (this.draggerType === Dragger.Vertical) {
      this.top = this.rectProps.top;
      const height = this.rectProps.height;
      this.bottom = this.rectProps.left + height;
      const position = height / 2;
      (this.handler as HTMLElement).style.top = `${position}px`;
      (this.dragHandler as HTMLElement).style.top = `${position}px`;
      (this.firstImageWrapper as HTMLElement).style.height = `${position}px`;
      (this.secondImageWrapper as HTMLElement).style.height = `${position}px`;
    }
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

  onMouseMove(e: MouseEvent) {
    if (this.mouseEventCapturing) {
      window.requestAnimationFrame(() => {
        this.process(e.clientX, e.clientY);
      });
    }
  }

  process(eventClientX, eventClientY) {
    if (this.draggerType === Dragger.Horizontal) {
      let clientX = eventClientX;
      clientX = clientX < this.left ? this.left : clientX;
      clientX = clientX > this.rectProps.width ? this.rectProps.width : clientX;
      let position = eventClientX - this.left;
      position = position < 0 ? 0 : position;
      position = position > this.rectProps.width ? this.rectProps.width : position;
      (this.handler as HTMLElement).style.left = `${position}px`;
      (this.dragHandler as HTMLElement).style.left = `${position}px`;
      const firstImageWrapperWidth = position;
      (this.firstImageWrapper as HTMLElement).style.width = `${firstImageWrapperWidth}px`;
      position = this.right - eventClientX;
      position = position < 0 ? 0 : position;
      position = position > this.rectProps.width ? this.rectProps.width : position;
      const secondImageWrapperWidth = position;
      (this.secondImageWrapper as HTMLElement).style.width = `${secondImageWrapperWidth}px`;
    } else if (this.draggerType === Dragger.Vertical) {
      let clientY = eventClientY;
      clientY = clientY < this.top ? this.top : clientY;
      clientY = clientY > this.rectProps.height ? this.rectProps.height : clientY;
      let position = eventClientY - this.top;
      position = position < 0 ? 0 : position;
      position = position > this.rectProps.height ? this.rectProps.height : position;
      (this.handler as HTMLElement).style.top = `${position}px`;
      (this.dragHandler as HTMLElement).style.top = `${position}px`;
      const firstImageWrapperHeight = position;
      (this.firstImageWrapper as HTMLElement).style.height = `${firstImageWrapperHeight}px`;
      position = this.rectProps.bottom - eventClientY;
      position = position < 0 ? 0 : position;
      position = position > this.rectProps.height ? this.rectProps.height : position;
      const secondImageWrapperHeight = position;
      (this.secondImageWrapper as HTMLElement).style.height = `${secondImageWrapperHeight}px`;
    }
  }

  onMouseOut() {
    this.mouseEventCapturing = false;
  }

  onMouseDown() {
    // this.mouseEventCapturing = true;
  }

  onMouseDownOnDragHandler() {
    this.mouseEventCapturing = true;
  }

  onMouseUp() {
    this.mouseEventCapturing = false;
  }

  onPanMove(e) {
    if (this.panEventCapturing && !this.mouseEventCapturing) {
      window.requestAnimationFrame(() => {
        this.process(e.center.x, e.center.y);
      });
    }
  }

  onPanStart() {
    // this.panEventCapturing = true;
  }

  onPanEnd() {
    this.panEventCapturing = false;
  }

  onConfigChange($event, i, alignment) {
    if (alignment === 'left') {
      this.state.leftPage.markers[i] = $event;
    }
    if (alignment === 'right') {
      this.state.rightPage.markers[i] = $event;
    }
    this.stateChange.emit(this.state);
  }

}
