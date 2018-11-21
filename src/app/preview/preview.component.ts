import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {
  title = 'diff-fi';
  handlerIdOne = 'handler_' + Math.floor(Math.random() * 10e6);
  handlerIdTwo = 'handler_' + Math.floor(Math.random() * 10e6);
  devices = [
    'macbook',
    'ipad'
  ];
  selectedDevice = null;
  showFullWrapper = false;
  constructor(private appService: AppService) {
  }
  ngOnInit() {
    this.selectedDevice = 'ipad';
    this.showFullWrapper = !this.appService.showDeviceMock();
    if (!this.appService.isIpad()) {
      this.selectedDevice = 'ipad';
    }
  }
  ngAfterViewInit() {
    if (this.showFullWrapper) {
      document.body.classList.add('dark-bg');
    } else {
      document.body.classList.remove('dark-bg');
    }
  }
  toggleSkin() {
    if (this.selectedDevice === 'macbook') {
      this.selectedDevice = 'ipad';
    } else {
      this.selectedDevice = 'macbook';
    }
  }
}
