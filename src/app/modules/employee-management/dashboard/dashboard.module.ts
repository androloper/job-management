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
import {DashboardComponent} from './dashboard.component';
import {TranslocoCoreModule} from '../../../core/transloco/transloco.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgApexchartsModule} from 'ng-apexcharts';
import {DashboardResolver} from './dashboard.resolvers';

export const dashboardRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'dashboard'
    },
    {
        path     : '',
        component: DashboardComponent,
        resolve: {
            data: DashboardResolver
        }
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        RouterModule.forChild(dashboardRoutes),
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
        TranslocoCoreModule,
        MatButtonToggleModule,
        NgApexchartsModule
    ]
})
export class DashboardModule
{
}
