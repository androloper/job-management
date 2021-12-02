import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'chat',
    templateUrl    : './chat.component.html',
    styleUrls      : ['./chat.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
