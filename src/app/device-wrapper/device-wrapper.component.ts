import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-device-wrapper',
  templateUrl: './device-wrapper.component.html',
  styleUrls: ['./device-wrapper.component.scss']
})
export class DeviceWrapperComponent {

  @Input() device = 'macbook';
  @Input() handlerId;

  constructor(private appService: AppService) { }

}
