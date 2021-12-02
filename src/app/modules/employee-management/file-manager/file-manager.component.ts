import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {Contact} from '../chat/chat.types';
import {Subject} from 'rxjs';
import {FuseMediaWatcherService} from '../../../../@fuse/services/media-watcher';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector       : 'file-manager',
    templateUrl    : './file-manager.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent
{
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    contacts: Contact[] = [
        //@ts-ignore
        {id: 1, name:'Ricky Martin'},
        //@ts-ignore
        {id: 2, name:'Richie Martin'},
        //@ts-ignore
        {id: 3, name:'Ronald Martin'},
        //@ts-ignore
        {id: 4, name:'Donald Martin'},
        //@ts-ignore
        {id: 5, name:'asdsadasda asdasd'},
        //@ts-ignore
        {id: 6, name:'dasdasdasdsad'},
        //@ts-ignore
        {id: 7, name:'smt smt smt'},
        //@ts-ignore
        {id: 8, name:'Something Something Something'},
        //@ts-ignore
        {id: 9, name:'Ricky Martin'},
        //@ts-ignore
        {id: 10, name:'Ricky Martin'},
        //@ts-ignore
        {id: 11, name:'Ricky Martin'},
        //@ts-ignore
        {id: 12, name:'Ricky Martin'},
        //@ts-ignore
        {id: 13, name:'Ricky Martin'},
        //@ts-ignore
        {id: 14, name:'Ricky Martin'},
        //@ts-ignore
        {id: 15, name:'Ricky Martin'},
        //@ts-ignore
        {id: 16, name:'Ricky Martin'},
        //@ts-ignore
        {id: 17, name:'Ricky Martin'},
        //@ts-ignore
        {id: 18, name:'Ricky Martin'},
        //@ts-ignore
        {id: 19, name:'Ricky Martin'},
        //@ts-ignore
        {id: 20, name:'Ricky Martin'},
        //@ts-ignore
        {id: 21, name:'Ricky Martin'},
    ];
    /**
     * Constructor
     */
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit(): void
    {
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened if
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

    /**
     * On destroy
     */
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
