import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'app/shared/shared.module';

import { ContentScrollComponent } from 'app/layout/layouts/page-layouts/fullwidth/content-scroll/content-scroll.component';


export const overviews = {
    simple: {
        fullwidth    : {
            title           : 'Fullwidth #1',
            description     : 'Layout that spans the entire width of the content area with a dedicated header and 3 different scroll modes.',
            availableOptions: [
                {
                    value: 'contentScroll',
                    title: 'Content Scroll'
                }
            ],
            selectedOption  : 'contentScroll',
            options         : {
                contentScroll: {
                    description: 'Only the content area of the page scrolls making everything else to stick into their positions.',
                    link       : '/layouts/page-layouts/fullwidth/content-scroll',
                    component  : ContentScrollComponent
                }
            }
        }
    }
};

export const routes: Route[] = [

    // Simple
    {
        path    : 'simple',
        children: [
            {
                path    : 'fullwidth',
                children: [
                    {
                        path      : '',
                        pathMatch : 'full',
                        redirectTo: 'content-scroll'
                    },
                    {
                        path     : 'content-scroll',
                        component: ContentScrollComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    declarations: [
        ContentScrollComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        SharedModule,
    ]
})
export class PageLayoutsModule
{
}
