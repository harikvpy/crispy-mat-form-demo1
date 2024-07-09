import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  errorTailorImports,
  provideErrorTailorConfig,
} from '@ngneat/error-tailor';
import {
  CRISPY_FORMS_CONFIG_PROVIDER,
  CrispyBuilder,
  CrispyDiv,
  CrispyForm,
  CrispyMatFormModule,
  CrispyRow,
  CrispyText,
  MatErrorTailorControlErrorComponent,
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
    errorTailorImports,
    CrispyMatFormModule,
    MatButtonModule,
  ],
  template: `
    <h1>Crispy Forms Demo 1</h1>
    <form [formGroup]="crispy.form">
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
      CrispyDiv('container', [
        CrispyRow([
          CrispyText('firstName', 'Peter', {
            label: 'First name',
            validators: Validators.required,
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
    console.log(
      `onSubmit - form.value: ${JSON.stringify(this.crispy.form?.value)}`
    );
  }
}

bootstrapApplication(App, {
  providers: [
    provideAnimationsAsync(),
    { provide: CRISPY_FORMS_CONFIG_PROVIDER, useValue: {} },
    provideErrorTailorConfig({
      blurPredicate(element) {
        return (
          element.tagName === 'INPUT' ||
          element.tagName === 'SELECT' ||
          element.tagName === 'MAT-SELECT'
        );
      },
      controlErrorComponent: MatErrorTailorControlErrorComponent,
      errors: {
        useValue: {
          required: 'This field is required',
          pattern: "Doesn't match the required pattern",
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: (error: any) => `Address isn't valid`,
        },
      },
    }),
  ],
});
