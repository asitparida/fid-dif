import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device-wrapper',
  templateUrl: './device-wrapper.component.html',
  styleUrls: ['./device-wrapper.component.scss']
})
export class DeviceWrapperComponent implements OnInit {

  @Input() device = 'macbook';
  @Input() handlerId;

  constructor() { }

  ngOnInit() {
  }

}
