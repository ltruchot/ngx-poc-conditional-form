import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';
import { moduleMetadata } from '@storybook/angular';
import { DynamicFormComponent } from 'src/app/modules/dynamic-form/dynamic-form/dynamic-form.component';
import { flow } from 'src/app/data/flow.data';

export default {
  title: 'Conditional Select',
  decorators: [
    moduleMetadata({
      imports: [DynamicFormModule],
    }),
  ],
};
export const OptionOne = () => ({
  component: DynamicFormComponent,
  props: {
    flow,
  },
});
