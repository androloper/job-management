import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CustomDatePipe} from './pipes/custom-date.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CustomDatePipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomDatePipe
    ]
})
export class SharedModule
{
}
