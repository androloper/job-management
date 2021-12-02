import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ActivityReportsComponent} from "./activity-reports/activity-reports.component";
import {ViolationReportsComponent} from "./violation-reports/violation-reports.component";
import {RegionReportsComponent} from "./region-reports/region-reports.component";
import {SensorReportsComponent} from "./sensor-reports/sensor-reports.component";
import {SummaryReportsComponent} from "./summary-reports/summary-reports.component";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {FuseNavigationModule} from "../../../../@fuse/components/navigation";
import {ActivityDetailReportsComponent} from "./activity-reports/activity-detail-reports/activity-detail-reports.component";
import {EngineHoursDetailReportsComponent} from "./activity-reports/engine-hours-detail-reports/engine-hours-detail-reports.component";
import {IgnitionOpenCloseReportsComponent} from "./activity-reports/ignition-open-close-reports/ignition-open-close-reports.component";
import {TravelReportsComponent} from "./activity-reports/travel-reports/travel-reports.component";
import {WaitReportsComponent} from "./activity-reports/wait-reports/wait-reports.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatRippleModule} from "@angular/material/core";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedModule} from "../../../shared/shared.module";
import {DataTablesModule} from "angular-datatables";
import {NotesModule} from "../../employee-management/notes/notes.module";
import {FileManagerModule} from "../../employee-management/file-manager/file-manager.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgxPaginationModule} from "ngx-pagination";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TranslocoCoreModule} from "../../../core/transloco/transloco.module";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {AccelerationViolationReportsComponent} from "./violation-reports/acceleration-violation-reports/acceleration-violation-reports.component";
import {SpeedLimitViolationReportsComponent} from "./violation-reports/speed-limit-violation-reports/speed-limit-violation-reports.component";
import {SuddenBrakeReportsComponent} from "./violation-reports/sudden-brake-reports/sudden-brake-reports.component";
import {RegionActivitySummaryReportsComponent} from "./region-reports/region-activity-summary-reports/region-activity-summary-reports.component";
import {RegionActivityReportsComponent} from "./region-reports/region-activity-reports/region-activity-reports.component";
import {IntraRegionalActivityReportsComponent} from "./region-reports/intra-regional-activity-reports/intra-regional-activity-reports.component";
import {AccelerationSensorDetailReportsComponent} from "./sensor-reports/acceleration-sensor-detail-reports/acceleration-sensor-detail-reports.component";
import {AccelerationSensorSummaryReportsComponent} from "./sensor-reports/acceleration-sensor-summary-reports/acceleration-sensor-summary-reports.component";
import {WeeklyDaybasedMileageReportsComponent} from "./summary-reports/mileage-reports/weekly-daybased-mileage-reports/weekly-daybased-mileage-reports.component";
import {HourbasedMileageReportsComponent} from "./summary-reports/mileage-reports/hourbased-mileage-reports/hourbased-mileage-reports.component";
import {TotalMileageReportsComponent} from "./summary-reports/mileage-reports/total-mileage-reports/total-mileage-reports.component";
import {ViolationSummaryReportsComponent} from "./summary-reports/violation-summary-reports/violation-summary-reports.component";
import {EngineSummaryReportsComponent} from "./summary-reports/engine-summary-reports/engine-summary-reports.component";
import {DaybasedActivitySummaryReportsComponent} from "./summary-reports/daybased-activity-summary-reports/daybased-activity-summary-reports.component";
import {VehiclebasedActivitySummaryReportsComponent} from "./summary-reports/vehiclebased-activity-summary-reports/vehiclebased-activity-summary-reports.component";

export const reportsRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'activity-reports'
    },
    {
        path     : 'activity-reports',
        component: ActivityReportsComponent,
        children: [
            {
            path: 'activity-detail-reports',
            component: ActivityDetailReportsComponent
            },
            {
                path: 'engine-hours-detail-reports',
                component: EngineHoursDetailReportsComponent
            },
            {
                path: 'ignition-open-close-reports',
                component: IgnitionOpenCloseReportsComponent
            },
            {
                path: 'travel-reports',
                component: TravelReportsComponent
            },
            {
                path: 'wait-reports',
                component: WaitReportsComponent
            },
        ]
    },
    {
        path: 'violation-reports',
        component: ViolationReportsComponent,
        children: [
            {
                path: 'acceleration-violation-reports',
                component: AccelerationViolationReportsComponent
            },
            {
                path: 'speed-limit-violation-reports',
                component: SpeedLimitViolationReportsComponent
            },
            {
                path: 'sudden-brake-reports',
                component: SuddenBrakeReportsComponent
            },
            ]
    },
    {
        path: 'region-reports',
        component: RegionReportsComponent,
        children: [
            {
                path: 'intra-regional-activity-reports',
                component: IntraRegionalActivityReportsComponent
            },
            {
                path: 'region-activity-reports',
                component: RegionActivityReportsComponent
            },
            {
                path: 'region-activity-summary-reports',
                component: RegionActivitySummaryReportsComponent
            },
        ]
    },
    {
        path: 'sensor-reports',
        component: SensorReportsComponent,
        children: [
            {
                path: 'acceleration-sensor-detail-reports',
                component: AccelerationSensorDetailReportsComponent
            },
            {
                path: 'acceleration-sensor-summary-reports',
                component: AccelerationSensorSummaryReportsComponent
            },
        ]
    },
    {
        path: 'summary-reports',
        component: SummaryReportsComponent,
        children: [
            {
                path: 'total-mileage-reports',
                component: TotalMileageReportsComponent
            },
            {
                path: 'hourbased-mileage-reports',
                component: HourbasedMileageReportsComponent
            },
            {
                path: 'weekly-daybased-mileage-reports',
                component: WeeklyDaybasedMileageReportsComponent
            },
            {
                path: 'vehiclebased-activity-summary-reports',
                component: VehiclebasedActivitySummaryReportsComponent
            },
            {
                path: 'daybased-activity-summary-reports',
                component: DaybasedActivitySummaryReportsComponent
            },
            {
                path: 'engine-summary-reports',
                component: EngineSummaryReportsComponent
            },
            {
                path: 'violation-summary-reports',
                component: ViolationSummaryReportsComponent
            },
        ]
    },
];


@NgModule({
    declarations: [
        ActivityReportsComponent,
        ViolationReportsComponent,
        RegionReportsComponent,
        SensorReportsComponent,
        SummaryReportsComponent,
        ActivityDetailReportsComponent,
        EngineHoursDetailReportsComponent,
        IgnitionOpenCloseReportsComponent,
        TravelReportsComponent,
        WaitReportsComponent,
        AccelerationViolationReportsComponent,
        SpeedLimitViolationReportsComponent,
        SuddenBrakeReportsComponent,
        IntraRegionalActivityReportsComponent,
        RegionActivityReportsComponent,
        RegionActivitySummaryReportsComponent,
        AccelerationSensorDetailReportsComponent,
        AccelerationSensorSummaryReportsComponent,
        TotalMileageReportsComponent,
        HourbasedMileageReportsComponent,
        WeeklyDaybasedMileageReportsComponent,
        VehiclebasedActivitySummaryReportsComponent,
        DaybasedActivitySummaryReportsComponent,
        EngineSummaryReportsComponent,
        ViolationSummaryReportsComponent
    ],
    imports: [
        RouterModule.forChild(reportsRoutes),
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        FuseNavigationModule,
        MatCheckboxModule,
        MatFormFieldModule,
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
export class ReportsModule
{
}
