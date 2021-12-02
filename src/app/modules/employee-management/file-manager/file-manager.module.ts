import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { FileManagerComponent } from './file-manager.component';
import { FileManagerDetailsComponent } from 'app/modules/employee-management/file-manager/details/details.component';
import { FileManagerListComponent } from 'app/modules/employee-management/file-manager/list/list.component';
import {fileManagerRoutes} from './file-manager.routing';
import {MatMenuModule} from '@angular/material/menu';
import {FuseCardModule} from '../../../../@fuse/components/card';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [
        FileManagerComponent,
        FileManagerDetailsComponent,
        FileManagerListComponent
    ],
    exports: [
        FileManagerComponent,
        FileManagerListComponent
    ],
    imports: [
        RouterModule.forChild(fileManagerRoutes),
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule,
        SharedModule,
        MatMenuModule,
        FuseCardModule,
        TooltipModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class FileManagerModule
{
}
