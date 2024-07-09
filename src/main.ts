import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  FORM_ERRORS,
} from '@ngneat/error-tailor';
import {
  CrispyBuilder,
  CrispyDiv,
  CrispyForm,
  CrispyMatFormModule,
  CrispyRow,
  CrispyText,
} from '@smallpearl/crispy-mat-form';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CrispyMatFormModule,
    MatButtonModule,
  ],
  providers: [
    {
      // Errors that the form's fields would raise. These errors could
      // be a result of local validators or from server side validation.
      provide: FORM_ERRORS, useValue: {
        required: 'This field is required',
        minlength: (error: { requiredLength: number, actualLength: number }) =>
          `Expected ${error.requiredLength} charactres, but got ${error.actualLength}`,
      },
    },
  ],
  template: `
    <h1>Crispy Forms Demo 1</h1>
    <form [formGroup]="crispy.form" (ngSubmit)="onSubmit()">
      <crispy-mat-form [crispy]="crispy"></crispy-mat-form>

      <div>
        <button
          mat-raised-button
          color="primary"
          type="button"
          (click)="onReset()"
        >
          Reset</button
        >&nbsp;
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="crispy.form.invalid"
        >
          Submit
        </button>
      </div>

    </form>
  `,
})
export class App {
  crispy!: CrispyForm;
  constructor(crispyBuilder: CrispyBuilder) {
    this.crispy = crispyBuilder.build(
      CrispyDiv('', [
        CrispyRow([
          CrispyText('firstName', 'Peter', {
            label: 'First name',
            validators: [Validators.required, Validators.minLength(5)],
          }),
          CrispyText('lastName', 'Parker', {
            validators: Validators.required,
            label: 'Last name',
          }),
        ]),
      ])
    );
  }

  onReset() {
    this.crispy.form?.reset();
  }

  onSubmit() {
    window.alert(
      `Form.value: ${JSON.stringify(this.crispy.form?.value)}`
    );
  }
}

bootstrapApplication(App, {
  providers: [
    provideAnimationsAsync(),
  ],
});
