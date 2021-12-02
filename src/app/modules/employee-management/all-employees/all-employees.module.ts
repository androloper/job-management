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
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeePageContentComponent} from './employee-page-content/employee-page-content.component';
import {DataTablesModule} from 'angular-datatables';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import {NotesModule} from '../notes/notes.module';
import {FileManagerModule} from '../file-manager/file-manager.module';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgxPaginationModule} from "ngx-pagination";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TranslocoCoreModule} from "../../../core/transloco/transloco.module";
import {TooltipModule} from "ngx-bootstrap/tooltip";


export const allEmployeeRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'employee-list'
    },
    {
        path: 'employee-list',
        component: EmployeeListComponent
    },
    {
        path: 'employee-page',
        component: EmployeePageContentComponent
    },
    {
        path: 'employee-profile/:id',
        component: EmployeeProfileComponent
    },
];


@NgModule({
    declarations: [
        EmployeeListComponent,
        EmployeePageContentComponent,
        EmployeeProfileComponent
    ],
    imports: [
        RouterModule.forChild(allEmployeeRoutes),
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
        NotesModule,
        FileManagerModule,
        NgxDatatableModule,
        NgxPaginationModule,
        MatCardModule,
        MatProgressSpinnerModule,
        TranslocoCoreModule,
        TooltipModule,
    ]
})
export class AllEmployeesModule
{
}
