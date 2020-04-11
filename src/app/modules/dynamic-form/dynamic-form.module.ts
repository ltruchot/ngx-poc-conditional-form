// ng
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// primeng
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';

// custom
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
