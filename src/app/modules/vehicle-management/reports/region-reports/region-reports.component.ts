import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FuseNavigationItem} from "../../../../../@fuse/components/navigation";
import {FuseMediaWatcherService} from "../../../../../@fuse/services/media-watcher";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'region-reports',
  templateUrl: './region-reports.component.html',
  styleUrls: ['./region-reports.component.scss']
})
export class RegionReportsComponent implements OnInit {
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    menuData: FuseNavigationItem[];

    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
        this.menuData = [
            {
                title   : 'Region Reports',
                type    : 'group',
                children: [
                    {
                        type: 'divider'
                    },
                    {
                        title   : 'Intra Regional Activity Reports',
                        tooltip : 'IRAR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:plus-circle',
                        link    : '/vehicle-management/reports/region-reports/intra-regional-activity-reports'
                    },
                    {
                        title   : 'Region Activity Reports',
                        tooltip : 'RAR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:user-group',
                        link    : '/vehicle-management/reports/region-reports/region-activity-reports'
                    },
                    {
                        title   : 'Region Activity Summary Reports',
                        tooltip : 'RASR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:briefcase',
                        link    : '/vehicle-management/reports/region-reports/region-activity-summary-reports'
                    },
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
