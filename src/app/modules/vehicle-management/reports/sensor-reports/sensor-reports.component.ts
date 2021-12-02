import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FuseNavigationItem} from "../../../../../@fuse/components/navigation";
import {FuseMediaWatcherService} from "../../../../../@fuse/services/media-watcher";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'sensor-reports',
  templateUrl: './sensor-reports.component.html',
    styleUrls:['sensor-reports.component.scss']
})
export class SensorReportsComponent implements OnInit {
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    menuData: FuseNavigationItem[];

    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
        this.menuData = [
            {
                title   : 'Sensor Reports',
                type    : 'group',
                children: [
                    {
                        type: 'divider'
                    },
                    {
                        title   : 'Acceleration Sensor Detail Reports',
                        tooltip : 'ASDR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:plus-circle',
                        link    : '/vehicle-management/reports/sensor-reports/acceleration-sensor-detail-reports'
                    },
                    {
                        title   : 'Acceleration Sensor Summary Reports',
                        tooltip : 'ASSR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:user-group',
                        link    : '/vehicle-management/reports/sensor-reports/acceleration-sensor-summary-reports'
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
