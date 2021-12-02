import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseMasonryModule } from '@fuse/components/masonry';
import { SharedModule } from 'app/shared/shared.module';
import { NotesComponent } from 'app/modules/employee-management/notes/notes.component';
import { NotesDetailsComponent } from 'app/modules/employee-management/notes/details/details.component';
import { NotesListComponent } from 'app/modules/employee-management/notes/list/list.component';
import { NotesLabelsComponent } from 'app/modules/employee-management/notes/labels/labels.component';
import { notesRoutes } from 'app/modules/employee-management/notes/notes.routing';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FuseScrollbarModule} from '../../../../@fuse/directives/scrollbar';

@NgModule({
    declarations: [
        NotesComponent,
        NotesDetailsComponent,
        NotesListComponent,
        NotesLabelsComponent
    ],
    exports: [
        NotesListComponent
    ],
    imports: [
        RouterModule.forChild(notesRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSidenavModule,
        FuseMasonryModule,
        SharedModule,
        TooltipModule,
        FuseScrollbarModule,
    ]
})
export class NotesModule
{
}
