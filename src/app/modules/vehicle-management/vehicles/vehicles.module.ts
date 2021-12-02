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
import {VehiclesComponent} from './vehicles.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {VehicleProfileComponent} from "./vehicle-profile/vehicle-profile.component";
import {TranslocoCoreModule} from "../../../core/transloco/transloco.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FuseNavigationModule} from "../../../../@fuse/components/navigation";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {AdrComponent} from "./vehicle-profile/vehicle-report/activity-reports/adr/adr.component";
import {EhdrComponent} from "./vehicle-profile/vehicle-report/activity-reports/ehdr/ehdr.component";
import {IocrComponent} from "./vehicle-profile/vehicle-report/activity-reports/iocr/iocr.component";
import {TrComponent} from "./vehicle-profile/vehicle-report/activity-reports/tr/tr.component";
import {WrComponent} from "./vehicle-profile/vehicle-report/activity-reports/wr/wr.component";
import {AvrComponent} from "./vehicle-profile/vehicle-report/violation-reports/avr/avr.component";
import {SbrComponent} from "./vehicle-profile/vehicle-report/violation-reports/sbr/sbr.component";
import {SlvrComponent} from "./vehicle-profile/vehicle-report/violation-reports/slvr/slvr.component";
import {IrarComponent} from "./vehicle-profile/vehicle-report/region-reports/irar/irar.component";
import {RarComponent} from "./vehicle-profile/vehicle-report/region-reports/rar/rar.component";
import {RasrComponent} from "./vehicle-profile/vehicle-report/region-reports/rasr/rasr.component";
import {AsdrComponent} from "./vehicle-profile/vehicle-report/sensor-reports/asdr/asdr.component";
import {AssrComponent} from "./vehicle-profile/vehicle-report/sensor-reports/assr/assr.component";
import {TmrComponent} from "./vehicle-profile/vehicle-report/summary-reports/tmr/tmr.component";
import {HbmrComponent} from "./vehicle-profile/vehicle-report/summary-reports/hbmr/hbmr.component";
import {WdbmrComponent} from "./vehicle-profile/vehicle-report/summary-reports/wdbmr/wdbmr.component";
import {VbasrComponent} from "./vehicle-profile/vehicle-report/summary-reports/vbasr/vbasr.component";
import {DbasrComponent} from "./vehicle-profile/vehicle-report/summary-reports/dbasr/dbasr.component";
import {VsrComponent} from "./vehicle-profile/vehicle-report/summary-reports/vsr/vsr.component";
import {EsrComponent} from "./vehicle-profile/vehicle-report/summary-reports/esr/esr.component";
import {FuseCardModule} from "../../../../@fuse/components/card";
import {AgmCoreModule, GoogleMapsAPIWrapper} from "@agm/core";
import {MapContentComponent} from "./vehicle-profile/core-map-content.component";

export const vehiclesRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'vehicles'
    },
    {
        path     : '',
        component: VehiclesComponent
    },
    {
        path: 'vehicle-profile/:id',
        component: VehicleProfileComponent,
        children: [{
                path: 'adr',
                component: AdrComponent
                },
                {
                    path: 'ehdr',
                    component: EhdrComponent
                },
                {
                    path: 'iocr',
                    component: IocrComponent
                },
                {
                    path: 'tr',
                    component: TrComponent
                },
                {
                    path: 'wr',
                    component: WrComponent
                },
                {
                    path: 'avr',
                    component: AvrComponent
                },
                {
                    path: 'slvr',
                    component: SlvrComponent
                },
                {
                    path: 'sbr',
                    component: SbrComponent
                },
                {
                    path: 'irar',
                    component: IrarComponent
                },
                {
                    path: 'rar',
                    component: RarComponent
                },
                {
                    path: 'rasr',
                    component: RasrComponent
                },
                {
                    path: 'asdr',
                    component: AsdrComponent
                },
                {
                    path: 'assr',
                    component: AssrComponent
                },
                {
                    path: 'tmr',
                    component: TmrComponent
                },
                {
                    path: 'hbmr',
                    component: HbmrComponent
                },
                {
                    path: 'wdbmr',
                    component: WdbmrComponent
                },
                {
                    path: 'vbasr',
                    component: VbasrComponent
                },
                {
                    path: 'dbasr',
                    component: DbasrComponent
                },
                {
                    path: 'vsr',
                    component: VsrComponent
                },
                {
                    path: 'esr',
                    component: EsrComponent
                },
            ]
        },
];

@NgModule({
    declarations: [
        VehiclesComponent,
        VehicleProfileComponent,
        AdrComponent,
        EhdrComponent,
        IocrComponent,
        TrComponent,
        WrComponent,
        AvrComponent,
        SlvrComponent,
        SbrComponent,
        IrarComponent,
        RarComponent,
        RasrComponent,
        AsdrComponent,
        AssrComponent,
        TmrComponent,
        HbmrComponent,
        WdbmrComponent,
        VbasrComponent,
        DbasrComponent,
        VsrComponent,
        EsrComponent,
        MapContentComponent,
    ],
    imports: [
        RouterModule.forChild(vehiclesRoutes),
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
        NgxDatatableModule,
        TranslocoCoreModule,
        MatSidenavModule,
        FuseNavigationModule,
        TooltipModule,
        FuseCardModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAGXTKZ4hH0YPZRJ0BxObm_J_Cxfb0MWRQ'
        })
    ]
})
export class VehiclesModule
{
}
