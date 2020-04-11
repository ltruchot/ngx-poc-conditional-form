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
  @Input()
  flow: Flow;
  objectKeys = Object.keys;
  dynamicForm: FormGroup;

  // getters
  get formExtras(): FormGroup {
    return this.dynamicForm.get('extras') as FormGroup;
  }

  // methods
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
      // find chosen one in between options
      const flowStep = e.options.find(
        (el: FlowStep) => el.value === e.event.value
      );

      // add an extra field if needed
      if (flowStep && flowStep.next && this.flow.extras[flowStep.next]) {
        this.addFormExtra(flowStep.next, this.flow.extras[flowStep.next]);
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
    Object.keys(this.formExtras.controls).forEach((key) =>
      this.formExtras.removeControl(key)
    );
  }

  // -- event handlers methods
  onSubmit() {
    const { main, extras } = this.dynamicForm.value;
    console.log('SEND', { ...main, ...extras });
  }
}
