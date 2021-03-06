import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamicFormModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
