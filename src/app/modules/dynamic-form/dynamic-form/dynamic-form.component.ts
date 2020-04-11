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
  // -- lifecycle methods
  ngOnInit(): void {
    this.dynamicForm = new FormGroup({
      main: new FormControl(
        this.flow.main.value,
        this.flow.main.validators || []
      ),
      extras: new FormGroup({}),
    });
    this.dynamicForm.get('main')?.valueChanges.subscribe((value) => {
      // clean old extra fields when main change
      this.removeFormExtras();
      // add an extra field if needed
      this.displayExtraForm(value);
    });
  }

  // -- custom methods
  displayExtraForm(value: any) {
    if (value) {
      const flowStep = this.flow.main.items?.find(
        (el: FlowStep) => el.value === value
      );
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
    if (this.dynamicForm.valid) {
      const { main, extras } = this.dynamicForm.value;
      console.log('SEND', { ...main, ...extras });
      this.dynamicForm.reset();
    } else {
      console.error('All fields are required.');
    }
  }
}
