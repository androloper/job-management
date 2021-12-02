import { Component, OnInit } from '@angular/core';
import {FuseMediaWatcherService} from "../../../../../@fuse/services/media-watcher";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {FuseNavigationItem} from "../../../../../@fuse/components/navigation";

@Component({
  selector: 'activity-reports',
  templateUrl: './activity-reports.component.html',
})
export class ActivityReportsComponent implements OnInit {
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    menuData: FuseNavigationItem[];

    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
        this.menuData = [
            {
                title   : 'Activity Reports',
                type    : 'group',
                children: [
                    {
                        type: 'divider'
                    },
                    {
                        title   : 'Activity Detail Reports',
                        tooltip : 'ADR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:plus-circle',
                        link    : '/vehicle-management/reports/activity-reports/activity-detail-reports',
                    },
                    {
                        title   : 'Engine Hours Detail Reports',
                        tooltip : 'EHDR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:user-group',
                        link    : '/vehicle-management/reports/activity-reports/engine-hours-detail-reports'
                    },
                    {
                        title   : 'Ignition O/C Reports',
                        tooltip : 'IOCR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:briefcase',
                        link    : '/vehicle-management/reports/activity-reports/ignition-open-close-reports'
                    },
                    {
                        title   : 'Travel Reports',
                        tooltip : 'TR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:user-add',
                        link    : '/vehicle-management/reports/activity-reports/travel-reports'
                    },
                    {
                        title   : 'Wait Reports',
                        tooltip : 'WR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:badge-check',
                        link    : '/vehicle-management/reports/activity-reports/wait-reports'
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
