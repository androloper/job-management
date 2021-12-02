import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';

@Component({
    selector       : 'languages',
    templateUrl    : './languages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy
{
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {

            // Get the active lang
            this.activeLang = activeLang;

            // Update the navigation
            this._updateNavigation(activeLang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'en': 'us',
            'tr': 'tr',
            'de': 'de'
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void
    {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void
    {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        // Return if the navigation component does not exist
        if ( !navComponent )
        {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        const employeeManagement = this._fuseNavigationService.getItem('employee-management', navigation);
        if ( employeeManagement )
        {
            this._translocoService.selectTranslate('employee-management').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    employeeManagement.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const dashboardOfEmpMng = this._fuseNavigationService.getItem('employee-management.dashboard', navigation);
        if ( dashboardOfEmpMng )
        {
            this._translocoService.selectTranslate('dashboard').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    dashboardOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const allEmployeesOfEmpMng = this._fuseNavigationService.getItem('employee-management.all-employees.employee-list', navigation);
        if ( allEmployeesOfEmpMng )
        {
            this._translocoService.selectTranslate('all-employees').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    allEmployeesOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const departmentsOfEmpMng = this._fuseNavigationService.getItem('employee-management.departments', navigation);
        if ( departmentsOfEmpMng )
        {
            this._translocoService.selectTranslate('departments').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    departmentsOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const jobsOfEmpMng = this._fuseNavigationService.getItem('employee-management.jobs', navigation);
        if ( jobsOfEmpMng )
        {
            this._translocoService.selectTranslate('jobs').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    jobsOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const attendanceOfEmpMng = this._fuseNavigationService.getItem('employee-management.attendance', navigation);
        if ( attendanceOfEmpMng )
        {
            this._translocoService.selectTranslate('attendance').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    attendanceOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const shiftsOfEmpMng = this._fuseNavigationService.getItem('employee-management.shift-schedule.shift-list', navigation);
        if ( shiftsOfEmpMng )
        {
            this._translocoService.selectTranslate('shift-schedule').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    shiftsOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const leavesOfEmpMng = this._fuseNavigationService.getItem('employee-management.leaves', navigation);
        if ( leavesOfEmpMng )
        {
            this._translocoService.selectTranslate('leave').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    leavesOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const overtimesOfEmpMng = this._fuseNavigationService.getItem('employee-management.overtime', navigation);
        if ( overtimesOfEmpMng )
        {
            this._translocoService.selectTranslate('overtime').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    overtimesOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const holidayOfEmpMng = this._fuseNavigationService.getItem('employee-management.holidays', navigation);
        if ( holidayOfEmpMng )
        {
            this._translocoService.selectTranslate('holidays').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    holidayOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const fileManagerOfEmpMng = this._fuseNavigationService.getItem('employee-management.file-manager', navigation);
        if ( fileManagerOfEmpMng )
        {
            this._translocoService.selectTranslate('file-manager').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    fileManagerOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const projectsOfEmpMng = this._fuseNavigationService.getItem('employee-management.projects.projects-list', navigation);
        if ( projectsOfEmpMng )
        {
            this._translocoService.selectTranslate('projects').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    projectsOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const chatOfEmpMng = this._fuseNavigationService.getItem('employee-management.chat', navigation);
        if ( chatOfEmpMng )
        {
            this._translocoService.selectTranslate('chat').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    chatOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const notesOfEmpMng = this._fuseNavigationService.getItem('employee-management.notes', navigation);
        if ( notesOfEmpMng )
        {
            this._translocoService.selectTranslate('notes').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    notesOfEmpMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const vehicleManagement = this._fuseNavigationService.getItem('vehicle-management', navigation);
        if ( vehicleManagement )
        {
            this._translocoService.selectTranslate('vehicle-management').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    vehicleManagement.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const dashboardOfVehMng = this._fuseNavigationService.getItem('vehicle-management.dashboard', navigation);
        if ( dashboardOfVehMng )
        {
            this._translocoService.selectTranslate('dashboard').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    dashboardOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const trackingOfVehMng = this._fuseNavigationService.getItem('vehicle-management.tracking', navigation);
        if ( trackingOfVehMng )
        {
            this._translocoService.selectTranslate('tracking').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    trackingOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const vehiclesOfVehMng = this._fuseNavigationService.getItem('vehicle-management.vehicles', navigation);
        if ( vehiclesOfVehMng )
        {
            this._translocoService.selectTranslate('vehicles').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    vehiclesOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const rulesOfVehMng = this._fuseNavigationService.getItem('vehicle-management.rules', navigation);
        if ( rulesOfVehMng )
        {
            this._translocoService.selectTranslate('rules').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    rulesOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const devicesOfVehMng = this._fuseNavigationService.getItem('vehicle-management.devices', navigation);
        if ( devicesOfVehMng )
        {
            this._translocoService.selectTranslate('devices').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    devicesOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const groupsOfVehMng = this._fuseNavigationService.getItem('vehicle-management.groups', navigation);
        if ( groupsOfVehMng )
        {
            this._translocoService.selectTranslate('groups').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    groupsOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const reportsOfVehMng = this._fuseNavigationService.getItem('vehicle-management.reports', navigation);
        if ( reportsOfVehMng )
        {
            this._translocoService.selectTranslate('reports').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    reportsOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const activityReportsOfVehMng = this._fuseNavigationService.getItem('vehicle-management.reports.activity-reports.activity-detail-reports', navigation);
        if ( activityReportsOfVehMng )
        {
            this._translocoService.selectTranslate('activity-reports').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    activityReportsOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const violationReportsOfVehMng = this._fuseNavigationService.getItem('vehicle-management.reports.violation-reports.acceleration-violation-reports', navigation);
        if ( violationReportsOfVehMng )
        {
            this._translocoService.selectTranslate('violation-reports').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    violationReportsOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const regionReportsOfVehMng = this._fuseNavigationService.getItem('vehicle-management.reports.region-reports.intra-regional-activity-reports', navigation);
        if ( regionReportsOfVehMng )
        {
            this._translocoService.selectTranslate('region-reports').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    regionReportsOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const sensorReportsOfVehMng = this._fuseNavigationService.getItem('vehicle-management.reports.sensor-reports.acceleration-sensor-detail-reports', navigation);
        if ( sensorReportsOfVehMng )
        {
            this._translocoService.selectTranslate('sensor-reports').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    sensorReportsOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const summaryReportsOfVehMng = this._fuseNavigationService.getItem('vehicle-management.reports.summary-reports/total-mileage-reports', navigation);
        if ( summaryReportsOfVehMng )
        {
            this._translocoService.selectTranslate('summary-reports').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    summaryReportsOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const servicesOfVehMng = this._fuseNavigationService.getItem('vehicle-management.services', navigation);
        if ( servicesOfVehMng )
        {
            this._translocoService.selectTranslate('services').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    servicesOfVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const allServicesofVehMng = this._fuseNavigationService.getItem('vehicle-management.services.all-services', navigation);
        if ( allServicesofVehMng )
        {
            this._translocoService.selectTranslate('all-services').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    allServicesofVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const serviceTypesofVehMng = this._fuseNavigationService.getItem('vehicle-management.services.service-types', navigation);
        if ( serviceTypesofVehMng )
        {
            this._translocoService.selectTranslate('service-types').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    serviceTypesofVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const companiesofVehMng = this._fuseNavigationService.getItem('vehicle-management.services.companies', navigation);
        if ( companiesofVehMng )
        {
            this._translocoService.selectTranslate('companies').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    companiesofVehMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const stockManagement = this._fuseNavigationService.getItem('stock-management', navigation);
        if ( stockManagement )
        {
            this._translocoService.selectTranslate('stock-management').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    stockManagement.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const categoriesOfStoMng = this._fuseNavigationService.getItem('stock-management.categories', navigation);
        if ( categoriesOfStoMng )
        {
            this._translocoService.selectTranslate('categories').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    categoriesOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const productsOfStoMng = this._fuseNavigationService.getItem('stock-management.products', navigation);
        if ( productsOfStoMng )
        {
            this._translocoService.selectTranslate('products').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    productsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const ordersOfStoMng = this._fuseNavigationService.getItem('stock-management.orders', navigation);
        if ( ordersOfStoMng )
        {
            this._translocoService.selectTranslate('orders').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    ordersOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const shipmentsOfStoMng = this._fuseNavigationService.getItem('stock-management.shipments', navigation);
        if ( shipmentsOfStoMng )
        {
            this._translocoService.selectTranslate('shipments').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    shipmentsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const warehousesOfStoMng = this._fuseNavigationService.getItem('stock-management.warehouses', navigation);
        if ( warehousesOfStoMng )
        {
            this._translocoService.selectTranslate('warehouses').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    warehousesOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const citiesOfStoMng = this._fuseNavigationService.getItem('stock-management.cities', navigation);
        if ( citiesOfStoMng )
        {
            this._translocoService.selectTranslate('cities').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    citiesOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const countriesOfStoMng = this._fuseNavigationService.getItem('stock-management.countries', navigation);
        if ( countriesOfStoMng )
        {
            this._translocoService.selectTranslate('countries').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    countriesOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const customersOfStoMng = this._fuseNavigationService.getItem('stock-management.customers', navigation);
        if ( customersOfStoMng )
        {
            this._translocoService.selectTranslate('customers').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    customersOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const addressesOfStoMng = this._fuseNavigationService.getItem('stock-management.addresses', navigation);
        if ( addressesOfStoMng )
        {
            this._translocoService.selectTranslate('addresses').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    addressesOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const taxesOfStoMng = this._fuseNavigationService.getItem('stock-management.taxes', navigation);
        if ( taxesOfStoMng )
        {
            this._translocoService.selectTranslate('taxes').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    taxesOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const stateProvinceOfStoMng = this._fuseNavigationService.getItem('stock-management.state-province', navigation);
        if ( stateProvinceOfStoMng )
        {
            this._translocoService.selectTranslate('state-province').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    stateProvinceOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const financeManagement = this._fuseNavigationService.getItem('finance-management', navigation);
        if ( financeManagement )
        {
            this._translocoService.selectTranslate('finance-management').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    financeManagement.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const phoneTracking = this._fuseNavigationService.getItem('phone-tracking', navigation);
        if ( phoneTracking )
        {
            this._translocoService.selectTranslate('phone-tracking').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    phoneTracking.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const settings = this._fuseNavigationService.getItem('settings', navigation);
        if ( settings )
        {
            this._translocoService.selectTranslate('settings').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    settings.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const companySettingsOfStoMng = this._fuseNavigationService.getItem('settings.company-settings', navigation);
        if ( companySettingsOfStoMng )
        {
            this._translocoService.selectTranslate('company-settings').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    companySettingsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const localizationOfStoMng = this._fuseNavigationService.getItem('settings.localization', navigation);
        if ( localizationOfStoMng )
        {
            this._translocoService.selectTranslate('localization').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    localizationOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const themeSettingsOfStoMng = this._fuseNavigationService.getItem('settings.theme-settings', navigation);
        if ( themeSettingsOfStoMng )
        {
            this._translocoService.selectTranslate('theme-settings').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    themeSettingsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const rolesPermissionsOfStoMng = this._fuseNavigationService.getItem('settings.roles-permissions', navigation);
        if ( rolesPermissionsOfStoMng )
        {
            this._translocoService.selectTranslate('roles-permissions').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    rolesPermissionsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const emailSettingsOfStoMng = this._fuseNavigationService.getItem('settings.email-settings', navigation);
        if ( emailSettingsOfStoMng )
        {
            this._translocoService.selectTranslate('email-settings').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    emailSettingsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const invoiceSettingsOfStoMng = this._fuseNavigationService.getItem('settings.invoice-settings', navigation);
        if ( invoiceSettingsOfStoMng )
        {
            this._translocoService.selectTranslate('invoice-settings').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    invoiceSettingsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const salarySettingsOfStoMng = this._fuseNavigationService.getItem('settings.salary-settings', navigation);
        if ( salarySettingsOfStoMng )
        {
            this._translocoService.selectTranslate('salary-settings').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    salarySettingsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const notificationsOfStoMng = this._fuseNavigationService.getItem('settings.notifications', navigation);
        if ( notificationsOfStoMng )
        {
            this._translocoService.selectTranslate('notifications').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    notificationsOfStoMng.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const changePasswordOfSett = this._fuseNavigationService.getItem('settings.change-password', navigation);
        if ( changePasswordOfSett )
        {
            this._translocoService.selectTranslate('change-password').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    changePasswordOfSett.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const leaveTypeOfSett = this._fuseNavigationService.getItem('settings.leave-type', navigation);
        if ( leaveTypeOfSett )
        {
            this._translocoService.selectTranslate('leave-type').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    leaveTypeOfSett.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

    }
}
