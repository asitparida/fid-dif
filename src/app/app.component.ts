import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diff-fi';
  handlerIdOne = 'handler_' + Math.floor(Math.random() * 10e6);
  handlerIdTwo = 'handler_' + Math.floor(Math.random() * 10e6);
}
