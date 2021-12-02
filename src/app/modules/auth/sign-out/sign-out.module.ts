import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignOutComponent } from 'app/modules/auth/sign-out/sign-out.component';
import { authSignOutRoutes } from 'app/modules/auth/sign-out/sign-out.routing';
import {TranslocoCoreModule} from "../../../core/transloco/transloco.module";

@NgModule({
    declarations: [
        AuthSignOutComponent
    ],
    imports: [
        RouterModule.forChild(authSignOutRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule,
        TranslocoCoreModule
    ]
})
export class AuthSignOutModule
{
}
