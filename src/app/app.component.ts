import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
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
    this.selectedDevice = null;
    this.showFullWrapper = !this.appService.showDeviceMock();
    if (!this.appService.isIpad()) {
      this.selectedDevice =  'ipad';
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
