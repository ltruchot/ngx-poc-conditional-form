import { Component } from '@angular/core';
import { Flow } from './modules/dynamic-form/dynamic-form/dynamic-form-models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  flow: Flow = {
    main: {
      type: 'select',
      label: '',
      validators: [Validators.required],
      value: null,
      items: [
        {
          label: 'What is your level of satisfaction?',
          value: null,
        },
        {
          label: '😞',
          value: { id: 0 },
          next: 'explanation',
        },
        { label: '😐', value: { id: 1 } },
        { label: '😊', value: { id: 2 } },
      ],
    },
    extras: {
      explanation: {
        type: 'textarea',
        label: 'Why are you disapointed?',
        value: '',
        validators: [Validators.required],
      },
    },
  };
}
