import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import {ShiftScheduleComponent} from './shift-schedule.component';
import {DataTablesModule} from 'angular-datatables';
import {MatTableModule} from '@angular/material/table';
import {ShiftListComponent} from './shift-list/shift-list.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


export const shiftScheduleRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'shift-schedule'
    },
    {
        path: '',
        component: ShiftScheduleComponent
    },
    {
        path: 'shift-list',
        component: ShiftListComponent
    },
];


@NgModule({
    declarations: [
        ShiftScheduleComponent,
        ShiftListComponent
    ],
    imports: [
        RouterModule.forChild(shiftScheduleRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        DataTablesModule,
        MatTableModule,
        NgxDatatableModule,
    ]
})
export class ShiftScheduleModule
{
}
