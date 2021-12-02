import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'employee-management/dashboard'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'employee-management/dashboard'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'employee-management', children: [
                    {path: 'dashboard', loadChildren: () => import('app/modules/employee-management/dashboard/dashboard.module').then(m => m.DashboardModule)},
                    {path: 'all-employees', loadChildren: () => import('app/modules/employee-management/all-employees/all-employees.module').then(m => m.AllEmployeesModule)},
                    {path: 'departments', loadChildren: () => import('app/modules/employee-management/departments/departments.module').then(m => m.DepartmentsModule)},
                    {path: 'jobs', loadChildren: () => import('app/modules/employee-management/jobs/jobs.module').then(m => m.JobsModule)},
                    {path: 'attendance', loadChildren: () => import('app/modules/employee-management/attendance/attendance.module').then(m => m.AttendanceModule)},
                    {path: 'shift-schedule', loadChildren: () => import('app/modules/employee-management/shift-schedule/shift-schedule.module').then(m => m.ShiftScheduleModule)},
                    {path: 'leaves', loadChildren: () => import('app/modules/employee-management/leaves/leaves.module').then(m => m.LeavesModule)},
                    {path: 'overtime', loadChildren: () => import('app/modules/employee-management/overtime/overtime.module').then(m => m.OvertimeModule)},
                    {path: 'holidays', loadChildren: () => import('app/modules/employee-management/holidays/holidays.module').then(m => m.HolidaysModule)},
                    {path: 'file-manager', loadChildren: () => import('app/modules/employee-management/file-manager/file-manager.module').then(m => m.FileManagerModule)},
                    {path: 'projects', loadChildren: () => import('app/modules/employee-management/projects/projects.module').then(m => m.ProjectsModule)},
                    {path: 'chat', loadChildren: () => import('app/modules/employee-management/chat/chat.module').then(m => m.ChatModule)},
                    {path: 'notes', loadChildren: () => import('app/modules/employee-management/notes/notes.module').then(m => m.NotesModule)},
                ]}, //tamamlandı

            {path: 'vehicle-management', children: [
                    {path: 'dashboard', loadChildren: () => import('app/modules/vehicle-management/dashboard/dashboard.module').then(m => m.DashboardModule)},
                    {path: 'tracking', loadChildren: () => import('app/modules/vehicle-management/tracking/tracking.module').then(m => m.TrackingModule)},
                    {path: 'vehicles', loadChildren: () => import('app/modules/vehicle-management/vehicles/vehicles.module').then(m => m.VehiclesModule)},
                    {path: 'rules', loadChildren: () => import('app/modules/vehicle-management/rules/rules.module').then(m => m.RulesModule)},
                    {path: 'devices', loadChildren: () => import('app/modules/vehicle-management/devices/devices.module').then(m => m.DevicesModule)},
                    {path: 'groups', loadChildren: () => import('app/modules/vehicle-management/groups/groups.module').then(m => m.GroupsModule)},
                    {path: 'reports', loadChildren: () => import('app/modules/vehicle-management/reports/reports.module').then(m => m.ReportsModule)},
                    {path: 'services', loadChildren: () => import('app/modules/vehicle-management/services/services.module').then(m => m.ServicesModule)},
                ]}, //tamamlandı

            {path: 'stock-management', children: [
                    {path: 'categories', loadChildren: () => import('app/modules/stock-management/categories/categories.module').then(m => m.CategoriesModule)},
                    {path: 'products', loadChildren: () => import('app/modules/stock-management/products/products.module').then(m => m.ProductsModule)},
                    {path: 'orders', loadChildren: () => import('app/modules/stock-management/orders/orders.module').then(m => m.OrdersModule)},
                    {path: 'shipments', loadChildren: () => import('app/modules/stock-management/shipments/shipments.module').then(m => m.ShipmentsModule)},
                    {path: 'warehouses', loadChildren: () => import('app/modules/stock-management/warehouses/warehouses.module').then(m => m.WarehousesModule)},
                    {path: 'cities', loadChildren: () => import('app/modules/stock-management/cities/cities.module').then(m => m.CitiesModule)},
                    {path: 'countries', loadChildren: () => import('app/modules/stock-management/countries/countries.module').then(m => m.CountriesModule)},
                    {path: 'customers', loadChildren: () => import('app/modules/stock-management/customers/customers.module').then(m => m.CustomersModule)},
                    {path: 'addresses', loadChildren: () => import('app/modules/stock-management/addresses/addresses.module').then(m => m.AddressesModule)},
                    {path: 'taxes', loadChildren: () => import('app/modules/stock-management/taxes/taxes.module').then(m => m.TaxesModule)},
                    {path: 'state-province', loadChildren: () => import('app/modules/stock-management/state-province/state-province.module').then(m => m.StateProvinceModule)},
                ]}, //tamamlandı

            {path: 'settings', children: [
                    {path: 'company-settings', loadChildren: () => import('app/modules/settings/company-settings/company-settings.module').then(m => m.CompanySettingsModule)},
                    {path: 'localization', loadChildren: () => import('app/modules/settings/localization/localization.module').then(m => m.LocalizationModule)},
                    {path: 'theme-settings', loadChildren: () => import('app/modules/settings/theme-settings/theme-settings.module').then(m => m.ThemeSettingsModule)},
                    {path: 'roles-permissions', loadChildren: () => import('app/modules/settings/roles-permissions/roles-permissions.module').then(m => m.RolesPermissionsModule)},
                    {path: 'email-settings', loadChildren: () => import('app/modules/settings/email-settings/email-settings.module').then(m => m.EmailSettingsModule)},
                    {path: 'invoice-settings', loadChildren: () => import('app/modules/settings/invoice-settings/invoice-settings.module').then(m => m.InvoiceSettingsModule)},
                    {path: 'salary-settings', loadChildren: () => import('app/modules/settings/salary-settings/salary-settings.module').then(m => m.SalarySettingsModule)},
                    {path: 'notifications', loadChildren: () => import('app/modules/settings/notifications/notifications.module').then(m => m.NotificationsModule)},
                    {path: 'change-password', loadChildren: () => import('app/modules/settings/change-password/change-password.module').then(m => m.ChangePasswordModule)},
                    {path: 'leave-type', loadChildren: () => import('app/modules/settings/leave-type/leave-type.module').then(m => m.LeaveTypeModule)},
                ]}, //tamamlandı
            {path: 'example', loadChildren: () => import('./modules/admin/example/example.module').then(m => m.ExampleModule)},
        ]
    }
];
