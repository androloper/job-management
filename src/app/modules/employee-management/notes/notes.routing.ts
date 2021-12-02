import { Route } from '@angular/router';
import { NotesComponent } from 'app/modules/employee-management/notes/notes.component';
import { NotesListComponent } from 'app/modules/employee-management/notes/list/list.component';

export const notesRoutes: Route[] = [
    {
        path     : '',
        component: NotesComponent,
        children : [
            {
                path     : '',
                component: NotesListComponent
            }
        ]
    }
];
