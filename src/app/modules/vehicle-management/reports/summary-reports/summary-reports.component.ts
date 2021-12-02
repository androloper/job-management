import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FuseNavigationItem} from "../../../../../@fuse/components/navigation";
import {FuseMediaWatcherService} from "../../../../../@fuse/services/media-watcher";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'summary-reports',
  templateUrl: './summary-reports.component.html',
    styleUrls: ['summary-reports.component.scss']
})
export class SummaryReportsComponent implements OnInit {
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    menuData: FuseNavigationItem[];

    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
        this.menuData = [
            {
                title   : 'Summary Reports',
                type    : 'group',
                children: [
                    {
                        type: 'divider'
                    },
                    {
                        title   : 'Mileage Reports',
                        type    : 'collapsable',
                        icon    : 'heroicons_outline:plus-circle',
                        children: [
                            {
                                type: 'divider'
                            },
                            {
                            title   : 'Total Mileage Reports',
                            tooltip : 'TMR',
                            type    : 'basic',
                            icon    : 'heroicons_outline:user-group',
                            link    : '/vehicle-management/reports/summary-reports/total-mileage-reports'
                        },
                            {
                                title   : 'Hour-based Mileage Reports',
                                tooltip : 'HMR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-group',
                                link    : '/vehicle-management/reports/summary-reports/hourbased-mileage-reports'
                            },
                            {
                                title   : 'Weekly Day-based Mileage Reports',
                                tooltip : 'WDMR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-group',
                                link    : '/vehicle-management/reports/summary-reports/weekly-daybased-mileage-reports'
                            },
                        ]

                    },
                    {
                        title   : 'Vehicle-based Activity Summary Reports',
                        tooltip : 'VASR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:user-group',
                        link    : '/vehicle-management/reports/summary-reports/vehiclebased-activity-summary-reports'
                    },
                    {
                        title   : 'Day-based Activity Summary Reports',
                        tooltip : 'DASR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:briefcase',
                        link    : '/vehicle-management/reports/summary-reports/daybased-activity-summary-reports'
                    },
                    {
                        title   : 'Engine Summary Reports',
                        tooltip : 'ESR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:user-add',
                        link    : '/vehicle-management/reports/summary-reports/engine-summary-reports'
                    },
                    {
                        title   : 'Violation Summary Reports',
                        tooltip : 'VSR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:badge-check',
                        link    : '/vehicle-management/reports/summary-reports/violation-summary-reports'
                    }
                ]
            },
        ];
    }

    ngOnInit(): void
    {
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
