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
import {DataTablesModule} from 'angular-datatables';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectContentComponent} from './project-content/project-content.component';
import {ProjectViewComponent} from './project-view/project-view.component';
import {TaskBoardComponent} from './task-board/task-board.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgxPaginationModule} from "ngx-pagination";


export const projectsRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'project-list'
    },
    {
        path: 'project-list',
        component: ProjectListComponent
    },
    {
        path: 'project-content',
        component: ProjectContentComponent
    },
    {
        path: 'project-view/:id',
        component: ProjectViewComponent
    },
    {
        path: 'task-board/:id',
        component: TaskBoardComponent
    },
];


@NgModule({
    declarations: [
        ProjectListComponent,
        ProjectContentComponent,
        ProjectViewComponent,
        TaskBoardComponent
    ],
    imports: [
        RouterModule.forChild(projectsRoutes),
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
        DragDropModule,
        NgxDatatableModule,
        NgxPaginationModule
    ]
})
export class ProjectsModule
{
}
