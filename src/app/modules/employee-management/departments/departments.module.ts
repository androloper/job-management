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
import {DepartmentsComponent} from './departments.component';
import {MatTableModule} from "@angular/material/table";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


export const departmentsRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'departments'
    },
    {
        path     : '',
        component: DepartmentsComponent
    },
];


@NgModule({
    declarations: [
        DepartmentsComponent,
    ],
    imports: [
        RouterModule.forChild(departmentsRoutes),
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
        MatTableModule,
        NgxDatatableModule
    ]
})
export class DepartmentsModule
{
}
