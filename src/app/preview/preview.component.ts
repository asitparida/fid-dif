import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dragger } from '../states';

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
  dragTypes = [
    Dragger.Horizontal,
    Dragger.Vertical
  ];
  selectedDragType = Dragger.Horizontal;
  selectedDevice = null;
  showFullWrapper = false;
  configId;
  config = null;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit() {
    this.selectedDevice = 'ipad';
    this.showFullWrapper = !this.appService.showDeviceMock();
    if (!this.appService.isIpad()) {
      this.selectedDevice = 'ipad';
    }
    this.activatedRoute.params.subscribe((data) => {
      if (data && data.id) {
        this.configId = data.id;
        this.appService.getConfig(this.configId).subscribe((config: any) => {
          console.log(config);
          if (config && config.Item) {
            this.config = config.Item;
          }
        });
      }
    });
  }
  ngAfterViewInit() {
    if (this.showFullWrapper) {
      document.body.classList.add('dark-bg');
    } else {
      document.body.classList.remove('dark-bg');
    }
  }
  editPrototype() {
    this.router.navigate([`/authoring/${this.configId}`]);
  }
  toggleSkin() {
    if (this.selectedDevice === 'macbook') {
      this.selectedDevice = 'ipad';
    } else {
      this.selectedDevice = 'macbook';
    }
  }
}
