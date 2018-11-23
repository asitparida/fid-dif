import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { BunBunConfig } from '../states';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  @ViewChild('contentArea') contentAreaRef: ElementRef;
  @Input() handlerId;
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
  state: any = BunBunConfig.config[0];

  constructor(
    private appService: AppService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  loadImages() {
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

  processMarkers() {
    this.state.leftPage.markers.forEach(mark => {
      mark.uid = `marker_${Math.floor(Math.random() * 10e6)}`;
    });
    this.state.rightPage.markers.forEach(mark => {
      mark.uid = `marker_${Math.floor(Math.random() * 10e6)}`;
    });
    const dimensions: ClientRect = (this.wrapper as HTMLElement).getBoundingClientRect();
    this.state.leftPage.markers.forEach(x => {
      x.leftPosition = `${dimensions.width * (x.left / 100)}px`;
      x.topPosition = `${dimensions.height * (x.top / 100)}px`;
      x.widthPosition =  `${dimensions.width * (x.width / 100)}px`;
      x.heightPosition =  `${dimensions.height * (x.height / 100)}px`;
      // x.active = true;
    });
    this.state.rightPage.markers.forEach(x => {
      x.rightPosition = `${dimensions.width * ((100 - x.right) / 100)}px`;
      x.topPosition = `${dimensions.height * (x.top / 100)}px`;
      x.widthPosition =  `${dimensions.width * (x.width / 100)}px`;
      x.heightPosition =  `${dimensions.height * (x.height / 100)}px`;
      // x.active = true;
    });
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
      this.processMarkers();
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
    const state = BunBunConfig.config.find(x => x.state === marker.targetState);
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
        this.processMarkers();
        setTimeout(() => {
          this.loadImages();
        }, 1);
      });
    }
  }

  onMouseMove(e: MouseEvent) {
    if (this.mouseEventCapturing) {
      window.requestAnimationFrame(() => {
        this.process(e.clientX);
      });
    }
  }

  process(eventCientX) {
    let clientX = eventCientX;
    clientX = clientX < this.left ? this.left : clientX;
    clientX = clientX > this.rectProps.width ? this.rectProps.width : clientX;
    let position = eventCientX - this.left;
    position = position < 0 ? 0 : position;
    position = position > this.rectProps.width ? this.rectProps.width : position;
    (this.handler as HTMLElement).style.left = `${position}px`;
    (this.dragHandler as HTMLElement).style.left = `${position}px`;
    const firstImageWrapperWidth = position;
    (this.firstImageWrapper as HTMLElement).style.width = `${firstImageWrapperWidth}px`;
    position = this.right - eventCientX;
    position = position < 0 ? 0 : position;
    position = position > this.rectProps.width ? this.rectProps.width : position;
    const secondImageWrapperWidth = position;
    (this.secondImageWrapper as HTMLElement).style.width = `${secondImageWrapperWidth}px`;
  }

  onMouseOut() {
    this.mouseEventCapturing = false;
  }

  onMouseDown() {
    this.mouseEventCapturing = true;
  }

  onMouseUp() {
    this.mouseEventCapturing = false;
  }

  onPanMove(e) {
    if (this.panEventCapturing && !this.mouseEventCapturing) {
      window.requestAnimationFrame(() => {
        this.process(e.center.x);
      });
    }
  }

  onPanStart() {
    this.panEventCapturing = true;
  }

  onPanEnd() {
    this.panEventCapturing = false;
  }

}
