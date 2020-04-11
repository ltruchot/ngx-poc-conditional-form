import { ValidatorFn } from '@angular/forms';
export type FlowStep = {
  type?: 'textarea' | 'select' | 'option';
  value: any;
  items?: FlowStep[];
  label: string;
  next?: string;
  validators?: ValidatorFn[];
};

export type Flow = { main: FlowStep; extras: { [key: string]: FlowStep } };
