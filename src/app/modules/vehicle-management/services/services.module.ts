import {Route, RouterModule} from "@angular/router";
import {AllServicesComponent} from "./all-services/all-services.component";
import {CompaniesComponent} from "./companies/companies.component";
import {NgModule} from "@angular/core";
import {ServiceTypesComponent} from "./service-types/service-types.component";
import {MatButtonModule} from "@angular/material/button";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MatIconModule} from "@angular/material/icon";
import {CdkScrollableModule} from "@angular/cdk/scrolling";
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../../../shared/shared.module";
import {ServiceTypeAttributesComponent} from "./service-types/service-type-attributes/service-type-attributes.component";

export const servicesRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all-services'
    },
    {
        path: 'all-services',
        component: AllServicesComponent,
    },
    {
        path: 'service-types',
        component: ServiceTypesComponent
    },
    {
        path: 'service-type-attributes',
        component: ServiceTypeAttributesComponent
    },
    {
        path: 'companies',
        component: CompaniesComponent
    }
];

@NgModule({
    declarations: [
        AllServicesComponent,
        ServiceTypesComponent,
        ServiceTypeAttributesComponent,
        CompaniesComponent,
    ],
    imports: [
        RouterModule.forChild(servicesRoutes),
        MatButtonModule,
        NgxDatatableModule,
        MatIconModule,
        CdkScrollableModule,
        MatMenuModule,
        SharedModule,
    ]
})

export class ServicesModule {}
