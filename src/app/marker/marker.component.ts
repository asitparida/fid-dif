import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { config } from 'rxjs';
import { Dragger } from '../states';

// tslint:disable component-selector

@Component({
  selector: 'marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit, AfterViewInit {

  boxId = 'box_' + Math.floor(Math.random() * 10e6);
  handleId = 'handler_' + Math.floor(Math.random() * 10e6);
  moverId = 'mover_' + Math.floor(Math.random() * 10e6);
  boxProps: ClientRect;
  initialBoxProps: ClientRect;
  @Input() config;
  @Output() configChange = new EventEmitter();
  @Input() alignment = 'left';
  @Input() draggerType: Dragger = Dragger.Horizontal;
  @Input() wrapperId = null;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.initializeBoxProps();
    const box = document.getElementById(this.boxId);
    this.boxProps = box.getBoundingClientRect();
    this.initialBoxProps = box.getBoundingClientRect();
    this.onResizerResize();
    this.onMoverMove();
  }

  initializeBoxProps() {
    if (this.config) {
      if (this.wrapperId) {
        const wrapper = document.getElementById(this.wrapperId);
        const dimensions: ClientRect = (wrapper as HTMLElement).getBoundingClientRect();
        const box = document.getElementById(this.boxId);
        const heightPosition = `${dimensions.height * (this.config.height / 100)}px`;
        box.style.height = heightPosition;
        if (this.alignment === 'left') {
          const topPosition = `${dimensions.height * (this.config.top / 100)}px`;
          box.style.top = topPosition;
          const leftPosition = `${dimensions.width * (this.config.left / 100)}px`;
          box.style.left = leftPosition;
          const widthPosition = `${dimensions.width * (this.config.width / 100)}px`;
          box.style.width = widthPosition;
          delete box.style.right;
        }
        if (this.alignment === 'right') {
          const rightPosition = `${dimensions.width * ((100 - this.config.right) / 100)}px`;
          box.style.right = rightPosition;
          const widthPosition = `${dimensions.width * (this.config.width / 100)}px`;
          box.style.width = widthPosition;
          delete box.style.left;
          if (this.draggerType === Dragger.Horizontal) {
            const topPosition = `${dimensions.height * (this.config.top / 100)}px`;
            box.style.top = topPosition;
          }
          if (this.draggerType === Dragger.Vertical) {
            const bottomPosition = `${dimensions.height * ((100 - this.config.top - this.config.height) / 100)}px`;
            box.style.bottom = bottomPosition;
          }
        }
      }
    }
  }

  savePosition() {
    const newConfig = Object.assign({}, this.config);
    const wrapper = document.getElementById(this.wrapperId);
    const wrapperProps = wrapper.getBoundingClientRect();
    const topPositer = (this.boxProps.top - wrapperProps.top) / (wrapperProps.height);
    const topPosition = Math.floor(topPositer * 10000) / 100;
    newConfig.top = topPosition;
    const heightPositer = (this.boxProps.bottom - this.boxProps.top) / wrapperProps.height;
    const heightPosition = Math.floor(heightPositer * 10000) / 100;
    newConfig.height = heightPosition;
    const widthPositer = (this.boxProps.right - this.boxProps.left) / (wrapperProps.width);
    const widthPosition = Math.floor(widthPositer * 10000) / 100;
    newConfig.width = widthPosition;
    if (this.alignment === 'left') {
      const leftPositer = (this.boxProps.left - wrapperProps.left) / (wrapperProps.width);
      const leftPosition = Math.floor(leftPositer * 10000) / 100;
      newConfig.left = leftPosition;
    }
    if (this.alignment === 'right') {
      const rightPositer = ((wrapperProps.right - this.boxProps.right) / wrapperProps.width);
      const rightPosition = 100 - Math.floor(rightPositer * 10000) / 100;
      newConfig.right = rightPosition;
    }
    this.config = newConfig;
    this.configChange.emit(this.config);
  }

  onResizerResize() {
    const initialiseResizeForHandler = (e) => {
      window.addEventListener('mousemove', startResizingForHandler, false);
      window.addEventListener('mouseup', stopResizingForHandler, false);
    };

    const startResizingForHandler = (e) => {
      let height = 0;
      if (this.draggerType === Dragger.Horizontal) {
        height = e.clientY - wrapperProps.top - (this.boxProps.top - wrapperProps.top);
        height = height < 48 ? 48 : height;
      } else if (this.draggerType === Dragger.Vertical) {
        // console.log(e.clientY);
        // console.log(wrapperProps);
        // console.log(this.boxProps);
        // height = e.clientY - wrapperProps.top - (this.boxProps.top - wrapperProps.top);
        // height = height < 48 ? 48 : height;
      }
      box.style.height = height + 'px';
      if (this.alignment === 'left') {
        let width = e.clientX - wrapperProps.left - (this.boxProps.left - wrapperProps.left);
        width = width < 48 ? 48 : width;
        box.style.width = width + 'px';
      }
      if (this.alignment === 'right') {
        let width = this.boxProps.right - e.clientX;
        width = width < 48 ? 48 : width;
        box.style.width = width + 'px';
      }
      this.boxProps = box.getBoundingClientRect();
    };

    const stopResizingForHandler = (e) => {
      window.removeEventListener('mousemove', startResizingForHandler, false);
      window.removeEventListener('mouseup', stopResizingForHandler, false);
      this.savePosition();
    };

    const resizeHandle = document.getElementById(this.handleId);
    const box = document.getElementById(this.boxId);
    const wrapper = document.getElementById(this.wrapperId);
    const wrapperProps = wrapper.getBoundingClientRect();
    resizeHandle.addEventListener('mousedown', initialiseResizeForHandler, false);
  }

  onMoverMove() {

    const initialiseResize = (e) => {
      window.addEventListener('mousemove', startResizing, false);
      window.addEventListener('mouseup', stopMoving, false);
    };

    const startResizing = (e) => {
      let height = e.clientY - wrapperProps.top - (this.boxProps.height / 2);
      height = height < 0 ? 0 : height;
      box.style.top = height + 'px';
      if (this.alignment === 'left') {
        let left = e.clientX - wrapperProps.left - (this.boxProps.width / 2);
        left = left < 0 ? 0 : left;
        box.style.left = left + 'px';
      }
      if (this.alignment === 'right') {
        let right = (wrapperProps.right - e.clientX) - (this.boxProps.width / 2);
        right = right < 0 ? 0 : right;
        box.style.right = right + 'px';
      }
      this.boxProps = box.getBoundingClientRect();
    };

    const stopMoving = (e) => {
      window.removeEventListener('mousemove', startResizing, false);
      window.removeEventListener('mouseup', stopMoving, false);
      this.savePosition();
    };

    const box = document.getElementById(this.boxId);
    const mover = document.getElementById(this.moverId);
    const wrapper = document.getElementById(this.wrapperId);
    const wrapperProps = wrapper.getBoundingClientRect();
    mover.addEventListener('mousedown', initialiseResize, false);

  }

}
