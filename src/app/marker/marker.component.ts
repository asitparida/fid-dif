import { Component, OnInit, AfterViewInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.onHandleMove();
    this.onMoverMove();
  }

  onHandleMove() {
    const resizeHandle = document.getElementById(this.handleId);
    const box = document.getElementById(this.boxId);
    const wrapper = box.closest('.image-wrapper-holder');
    const wrapperProps = wrapper.getBoundingClientRect();
    resizeHandle.addEventListener('mousedown', initialiseResizeForHandler, false);

    function initialiseResizeForHandler(e) {
      window.addEventListener('mousemove', startResizingForHandler, false);
      window.addEventListener('mouseup', stopResizingForHandler, false);
    }

    function startResizingForHandler(e) {
      let width = e.clientX - wrapperProps.left;
      let height =  e.clientY - wrapperProps.top;
      width = width < 100 ? 100 : width;
      height = height < 100 ? 100 : height;
      box.style.width = width + 'px';
      box.style.height = height + 'px';
    }
    function stopResizingForHandler(e) {
      window.removeEventListener('mousemove', startResizingForHandler, false);
      window.removeEventListener('mouseup', stopResizingForHandler, false);
    }
  }

  onMoverMove() {
    const box = document.getElementById(this.boxId);
    const mover = document.getElementById(this.moverId);
    const wrapper = mover.closest('.image-wrapper-holder');
    const wrapperProps = wrapper.getBoundingClientRect();
    mover.addEventListener('mousedown', initialiseResize, false);

    function initialiseResize(e) {
      window.addEventListener('mousemove', startResizing, false);
      window.addEventListener('mouseup', stopResizing, false);
    }

    function startResizing(e) {
      let width = e.clientX - wrapperProps.left;
      let height =  e.clientY - wrapperProps.top;
      width = width < 0 ? 0 : width;
      height = height < 0 ? 0 : height;
      box.style.top = height + 'px';
      box.style.left = width + 'px';
    }
    function stopResizing(e) {
      window.removeEventListener('mousemove', startResizing, false);
      window.removeEventListener('mouseup', stopResizing, false);
    }
  }

}
