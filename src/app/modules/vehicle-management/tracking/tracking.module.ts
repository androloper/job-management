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
import {TrackingComponent} from './tracking.component';
import {AgmCoreModule} from "@agm/core";
import {AgmMarkerClustererModule} from "@agm/markerclusterer";


export const trackingRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'tracking'
    },
    {
        path     : '',
        component: TrackingComponent
    },
];


@NgModule({
    declarations: [
        TrackingComponent,
    ],
    imports     : [
        RouterModule.forChild(trackingRoutes),
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
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAGXTKZ4hH0YPZRJ0BxObm_J_Cxfb0MWRQ'
        }),
        AgmMarkerClustererModule
    ]
})
export class TrackingModule
{
}
