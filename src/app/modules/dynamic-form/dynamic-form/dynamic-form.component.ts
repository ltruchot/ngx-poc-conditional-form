import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Flow, FlowStep } from './dynamic-form-models';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  // props
  objectKeys = Object.keys;
  dynamicForm: FormGroup;
  @Input()
  flow: Flow;

  // getters
  get formExtras(): FormGroup {
    return this.dynamicForm.get('extras') as FormGroup;
  }

  // methods
  constructor() {}

  // -- lifecycle
  ngOnInit(): void {
    this.dynamicForm = new FormGroup({
      main: new FormControl(
        this.flow.main.value,
        this.flow.main.validators || []
      ),
      extras: new FormGroup({}),
    });
  }

  // -- custom methods
  displayDependantForm(e: any) {
    // clean old extra fields
    this.removeFormExtras();

    if (e.event.value) {
      // find concerned in between options
      const flowStep = e.options.find((el: FlowStep) => {
        return el.value && el.value === e.event.value;
      });

      // add an extra field if needed
      if (flowStep && flowStep.next) {
        const nextStep = this.flow.extras[flowStep.next];
        this.addFormExtra(flowStep.next, nextStep);
      }
    }
  }

  addFormExtra(name: string, step: FlowStep) {
    this.formExtras.addControl(
      name,
      new FormControl(step.value, step.validators || [])
    );
  }

  removeFormExtras() {
    Object.keys(this.formExtras.controls).forEach((key: string) => {
      this.formExtras.removeControl(key);
    });
  }

  // -- event handlers methods
  onSubmit() {
    const { main, extras } = this.dynamicForm.value;
    console.log('SEND', { ...main, ...extras });
  }
}
