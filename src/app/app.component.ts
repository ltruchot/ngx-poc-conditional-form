import { Component } from '@angular/core';
import { Flow } from './modules/dynamic-form/dynamic-form/dynamic-form-models';
import { flow } from './data/flow.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  flow: Flow = flow;
}
