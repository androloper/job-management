import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FuseNavigationItem} from "../../../../../@fuse/components/navigation";
import {FuseMediaWatcherService} from "../../../../../@fuse/services/media-watcher";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'violation-reports',
  templateUrl: './violation-reports.component.html',
  styleUrls: ['./violation-reports.component.scss']
})
export class ViolationReportsComponent implements OnInit {
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    menuData: FuseNavigationItem[];

    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
        this.menuData = [
            {
                title   : 'Violation Reports',
                type    : 'group',
                children: [
                    {
                        type: 'divider'
                    },
                    {
                        title   : 'Acceleration Violation Reports',
                        tooltip : 'AVR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:plus-circle',
                        link    : '/vehicle-management/reports/violation-reports/acceleration-violation-reports'
                    },
                    {
                        title   : 'Speed Limit Violation Reports',
                        tooltip : 'SLVR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:user-group',
                        link    : '/vehicle-management/reports/violation-reports/speed-limit-violation-reports'
                    },
                    {
                        title   : 'Sudden Brake Reports',
                        tooltip : 'SBR',
                        type    : 'basic',
                        icon    : 'heroicons_outline:briefcase',
                        link    : '/vehicle-management/reports/violation-reports/sudden-brake-reports'
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
