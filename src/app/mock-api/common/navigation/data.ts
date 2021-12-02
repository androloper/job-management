/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];

//menü dillerini değiştirmek için src/app/layout/common/languages/languages.component.ts
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'employee-management',
        title   : 'Employee Management',
        tooltip : 'Employee Management',
        type    : 'aside',
        icon    : 'heroicons_outline:qrcode',
        children: [{
            id   : 'employee-management.dashboard',
            title: 'Dashboard',
            type : 'basic',
            icon : 'heroicons_outline:home',
            link : '/employee-management/dashboard'
            },
            {
                id      : 'employee-management.all-employees.employee-list',
                title   : 'All Employees',
                type    : 'basic',
                icon    : 'heroicons_outline:calendar',
                link    : '/employee-management/all-employees/employee-list'
            },
            {
                id   : 'employee-management.departments',
                title: 'Departments',
                type : 'basic',
                icon : 'heroicons_outline:chat-alt',
                link : '/employee-management/departments'
            },
            {
                id   : 'employee-management.jobs',
                title: 'Jobs',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/employee-management/jobs'
            },
            {
                id      : 'employee-management.attendance',
                title   : 'Attendance',
                type    : 'basic',
                icon    : 'heroicons_outline:shopping-cart',
                link : '/employee-management/attendance'
            },
            {
                id      : 'employee-management.shift-schedule.shift-list',
                title   : 'Shift & Schedule',
                type    : 'basic',
                icon    : 'heroicons_outline:cloud',
                link    : '/employee-management/shift-schedule/shift-list'
            },
            {
                id      : 'employee-management.leaves',
                title   : 'Leave',
                type    : 'basic',
                icon    : 'heroicons_outline:support',
                link    : '/employee-management/leaves'
            },
            {
                id      : 'employee-management.overtime',
                title   : 'Overtime',
                type    : 'basic',
                icon    : 'heroicons_outline:support',
                link    : '/employee-management/overtime'
            },
            {
                id      : 'employee-management.holidays',
                title   : 'Holidays',
                type    : 'basic',
                icon    : 'heroicons_outline:support',
                link    : '/employee-management/holidays'
            },
            {
                id   : 'employee-management.file-manager',
                title: 'File Manager',
                type : 'basic',
                icon : 'heroicons_outline:cloud',
                link : '/employee-management/file-manager'
            },
            {
                id      : 'employee-management.projects.projects-list',
                title   : 'Projects',
                type    : 'basic',
                icon    : 'heroicons_outline:support',
                link    : '/employee-management/projects/project-list',
            },
            {
                id      : 'employee-management.chat',
                title   : 'Chat',
                type    : 'basic',
                icon    : 'heroicons_outline:support',
                link    : '/employee-management/chat'
            },
            {
                id      : 'employee-management.notes',
                title   : 'Notes',
                type    : 'basic',
                icon    : 'heroicons_outline:support',
                link    : '/employee-management/notes'
            },
        ] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }, //tamamlandı
    {
        id      : 'vehicle-management',
        title   : 'Vehicle Management',
        tooltip : 'Vehicle Management',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [{
            id   : 'vehicle-management.dashboard',
            title: 'Dashboard',
            type : 'basic',
            icon : 'heroicons_outline:menu-alt-2',
            link : '/vehicle-management/dashboard'
            },
            {
                id   : 'vehicle-management.tracking',
                title: 'Tracking',
                type : 'basic',
                icon : 'heroicons_outline:menu-alt-2',
                link : '/vehicle-management/tracking'
            },
            {
                id   : 'vehicle-management.vehicles',
                title: 'Vehicles',
                type : 'basic',
                icon : 'heroicons_outline:menu-alt-2',
                link : '/vehicle-management/vehicles'
            },
            {
                id   : 'vehicle-management.rules',
                title: 'Rules',
                type : 'basic',
                icon : 'heroicons_outline:menu-alt-2',
                link : '/vehicle-management/rules'
            },
            {
                id   : 'vehicle-management.devices',
                title: 'Devices',
                type : 'basic',
                icon : 'heroicons_outline:menu-alt-2',
                link : '/vehicle-management/devices'
            },
            {
                id   : 'vehicle-management.groups',
                title: 'Groups',
                type : 'basic',
                icon : 'heroicons_outline:menu-alt-2',
                link : '/vehicle-management/groups'
            },
            {
                id: 'vehicle-management.reports',
                title: 'Reports',
                type: 'collapsable',
                icon: 'heroicons_outline:menu-alt-2',
                children: [{
                    id: 'vehicle-management.reports.activity-reports.activity-detail-reports',
                    title: 'Activity Reports',
                    type: 'basic',
                    icon: 'heroicons_outline:menu-alt-2',
                    link: '/vehicle-management/reports/activity-reports/activity-detail-reports',
                },
                    {
                        id: 'vehicle-management.reports.violation-reports.acceleration-violation-reports',
                        title: 'Violation Reports',
                        type: 'basic',
                        icon: 'heroicons_outline:menu-alt-2',
                        link: '/vehicle-management/reports/violation-reports/acceleration-violation-reports'
                    },
                    {
                        id: 'vehicle-management.reports.region-reports.intra-regional-activity-reports',
                        title: 'Region Reports',
                        type: 'basic',
                        icon: 'heroicons_outline:menu-alt-2',
                        link: '/vehicle-management/reports/region-reports/intra-regional-activity-reports'
                    },
                    {
                        id: 'vehicle-management.reports.sensor-reports.acceleration-sensor-detail-reports',
                        title: 'Sensor Reports',
                        type: 'basic',
                        icon: 'heroicons_outline:menu-alt-2',
                        link: '/vehicle-management/reports/sensor-reports/acceleration-sensor-detail-reports'
                    },
                    {
                        id: 'vehicle-management.reports.summary-reports/total-mileage-reports',
                        title: 'Summary Reports',
                        type: 'basic',
                        icon: 'heroicons_outline:menu-alt-2',
                        link: '/vehicle-management/reports/summary-reports/total-mileage-reports'
                    },
                ]
            },
            {
                id: 'vehicle-management.services',
                title: 'Services',
                type: 'collapsable',
                icon: 'heroicons_outline:menu-alt-2',
                children: [{
                    id: 'vehicle-management.services.all-services',
                    title: 'All Services',
                    type: 'basic',
                    icon: 'heroicons_outline:menu-alt-2',
                    link: '/vehicle-management/services/all-services',
                },
                    {
                    id: 'vehicle-management.services.service-types',
                    title: 'Service Types',
                    type: 'basic',
                    icon: 'heroicons_outline:menu-alt-2',
                    link: '/vehicle-management/services/service-types',
                    },
                    {
                        id: 'vehicle-management.services.companies',
                        title: 'Companies',
                        type: 'basic',
                        icon: 'heroicons_outline:menu-alt-2',
                        link: '/vehicle-management/services/companies'
                    }
                ]
            }
            ] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }, //tamamlandı
    {
        id      : 'stock-management',
        title   : 'Stock Management',
        tooltip : 'Stock Management',
        type    : 'aside',
        icon    : 'heroicons_outline:collection',
        children: [{
            id   : 'stock-management.categories',
            title: 'Categories',
            type : 'basic',
            icon : 'heroicons_outline:chip',
            link : '/stock-management/categories'
            },
            {
                id   : 'stock-management.products',
                title: 'Products',
                type : 'basic',
                icon : 'heroicons_outline:chip',
                link : '/stock-management/products'
            },
            {
                id   : 'stock-management.orders',
                title: 'Orders',
                type : 'basic',
                icon : 'heroicons_outline:chip',
                link : '/stock-management/orders'
            },
            {
                id   : 'stock-management.shipments',
                title: 'Shipments',
                type : 'basic',
                icon : 'heroicons_outline:sparkles',
                link : '/stock-management/shipments'
            },
            {
                id   : 'stock-management.warehouses',
                title: 'Warehouses',
                type : 'basic',
                icon : 'heroicons_outline:search-circle',
                link : '/stock-management/warehouses'
            },
            {
                id   : 'stock-management.cities',
                title: 'Cities',
                type : 'basic',
                icon : 'heroicons_outline:play',
                link : '/stock-management/cities'
            },
            {
                id   : 'stock-management.countries',
                title: 'Countries',
                type : 'basic',
                icon : 'heroicons_outline:duplicate',
                link : '/stock-management/countries'
            },
            {
                id   : 'stock-management.customers',
                title: 'Customers',
                type : 'basic',
                icon : 'heroicons_outline:color-swatch',
                link : '/stock-management/customers'
            },
            {
                id   : 'stock-management.addresses',
                title: 'Addresses',
                type : 'basic',
                icon : 'heroicons_outline:question-mark-circle',
                link : '/stock-management/addresses'
            },
            {
                id   : 'stock-management.taxes',
                title: 'Taxes',
                type : 'basic',
                icon : 'heroicons_outline:view-list',
                link : '/stock-management/taxes'
            },
            {
                id      : 'stock-management.state-province',
                title   : 'State Province',
                type    : 'basic',
                icon    : 'heroicons_outline:pencil-alt',
                link : '/stock-management/state-province'
            }] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }, //tamamlandı
    {
        id      : 'finance-management',
        title   : 'Finance Management',
        tooltip : 'Finance Management',
        type    : 'aside',
        icon    : 'heroicons_outline:menu',
        children: [{
            id      : 'navigation-features.level.0',
            title   : 'Level 0',
            icon    : 'heroicons_outline:check-circle',
            type    : 'collapsable',
            children: [
                {
                    id      : 'navigation-features.level.0.1',
                    title   : 'Level 1',
                    type    : 'collapsable',
                    children: [
                        {
                            id      : 'navigation-features.level.0.1.2',
                            title   : 'Level 2',
                            type    : 'collapsable',
                            children: [
                                {
                                    id      : 'navigation-features.level.0.1.2.3',
                                    title   : 'Level 3',
                                    type    : 'collapsable',
                                    children: [
                                        {
                                            id      : 'navigation-features.level.0.1.2.3.4',
                                            title   : 'Level 4',
                                            type    : 'collapsable',
                                            children: [
                                                {
                                                    id      : 'navigation-features.level.0.1.2.3.4.5',
                                                    title   : 'Level 5',
                                                    type    : 'collapsable',
                                                    children: [
                                                        {
                                                            id   : 'navigation-features.level.0.1.2.3.4.5.6',
                                                            title: 'Level 6',
                                                            type : 'basic'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
            {
                id      : 'navigation-features.level.0',
                title   : 'Level 0',
                subtitle: 'With subtitle',
                icon    : 'heroicons_outline:check-circle',
                type    : 'collapsable',
                children: [
                    {
                        id   : 'navigation-features.level.0.1-1',
                        title: 'Level 1.1',
                        type : 'basic'
                    },
                    {
                        id   : 'navigation-features.level.0.1-2',
                        title: 'Level 1.2',
                        type : 'basic'
                    }
                ]
            },
            {
                id      : 'navigation-features.active',
                title   : 'Active item',
                subtitle: 'Manually marked as active',
                icon    : 'heroicons_outline:check-circle',
                type    : 'basic',
                active  : true
            },
            {
                id      : 'navigation-features.disabled-collapsable',
                title   : 'Disabled collapsable',
                subtitle: 'Some subtitle',
                icon    : 'heroicons_outline:check-circle',
                type    : 'collapsable',
                disabled: true,
                children: [
                    {
                        id   : 'navigation-features.disabled-collapsable.child',
                        title: 'You shouldn\'t be able to see this child',
                        type : 'basic'
                    }
                ]
            },
            {
                id      : 'navigation-features.disabled-basic',
                title   : 'Disabled basic',
                subtitle: 'Some subtitle',
                icon    : 'heroicons_outline:check-circle',
                type    : 'basic',
                disabled: true
            },
            {
                id   : 'navigation-features.badge-style-oval',
                title: 'Oval badge',
                icon : 'heroicons_outline:tag',
                type : 'basic',
                badge: {
                    title  : '8',
                    classes: 'w-5 h-5 bg-teal-400 text-black rounded-full'
                }
            },
            {
                id   : 'navigation-features.badge-style-rectangle',
                title: 'Rectangle badge',
                icon : 'heroicons_outline:tag',
                type : 'basic',
                badge: {
                    title  : 'Updated!',
                    classes: 'px-2 bg-teal-400 text-black rounded'
                }
            },
            {
                id   : 'navigation-features.badge-style-rounded',
                title: 'Rounded badge',
                icon : 'heroicons_outline:tag',
                type : 'basic',
                badge: {
                    title  : 'NEW',
                    classes: 'px-2.5 bg-teal-400 text-black rounded-full'
                }
            },
            {
                id   : 'navigation-features.badge-style-simple',
                title: 'Simple badge',
                icon : 'heroicons_outline:tag',
                type : 'basic',
                badge: {
                    title  : '87 Unread',
                    classes: 'text-teal-500'
                }
            },
            {
                id   : 'navigation-features.multi-line',
                title: 'A multi line navigation item title example which works just fine',
                icon : 'heroicons_outline:check-circle',
                type : 'basic'
            }] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'phone-tracking',
        title   : 'Phone Tracking',
        tooltip : 'Phone Tracking',
        type    : 'aside',
        icon    : 'heroicons_outline:menu',
        children: [{
            id      : 'navigation-features.level.0',
            title   : 'Level 0',
            icon    : 'heroicons_outline:check-circle',
            type    : 'collapsable',
            children: [
                {
                    id      : 'navigation-features.level.0.1',
                    title   : 'Level 1',
                    type    : 'collapsable',
                    children: [
                        {
                            id      : 'navigation-features.level.0.1.2',
                            title   : 'Level 2',
                            type    : 'collapsable',
                            children: [
                                {
                                    id      : 'navigation-features.level.0.1.2.3',
                                    title   : 'Level 3',
                                    type    : 'collapsable',
                                    children: [
                                        {
                                            id      : 'navigation-features.level.0.1.2.3.4',
                                            title   : 'Level 4',
                                            type    : 'collapsable',
                                            children: [
                                                {
                                                    id      : 'navigation-features.level.0.1.2.3.4.5',
                                                    title   : 'Level 5',
                                                    type    : 'collapsable',
                                                    children: [
                                                        {
                                                            id   : 'navigation-features.level.0.1.2.3.4.5.6',
                                                            title: 'Level 6',
                                                            type : 'basic'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
            {
                id      : 'navigation-features.level.0',
                title   : 'Level 0',
                subtitle: 'With subtitle',
                icon    : 'heroicons_outline:check-circle',
                type    : 'collapsable',
                children: [
                    {
                        id   : 'navigation-features.level.0.1-1',
                        title: 'Level 1.1',
                        type : 'basic'
                    },
                    {
                        id   : 'navigation-features.level.0.1-2',
                        title: 'Level 1.2',
                        type : 'basic'
                    }
                ]
            },
            {
                id      : 'navigation-features.active',
                title   : 'Active item',
                subtitle: 'Manually marked as active',
                icon    : 'heroicons_outline:check-circle',
                type    : 'basic',
                active  : true
            },
            {
                id      : 'navigation-features.disabled-collapsable',
                title   : 'Disabled collapsable',
                subtitle: 'Some subtitle',
                icon    : 'heroicons_outline:check-circle',
                type    : 'collapsable',
                disabled: true,
                children: [
                    {
                        id   : 'navigation-features.disabled-collapsable.child',
                        title: 'You shouldn\'t be able to see this child',
                        type : 'basic'
                    }
                ]
            },
            {
                id      : 'navigation-features.disabled-basic',
                title   : 'Disabled basic',
                subtitle: 'Some subtitle',
                icon    : 'heroicons_outline:check-circle',
                type    : 'basic',
                disabled: true
            },
            {
                id   : 'navigation-features.badge-style-oval',
                title: 'Oval badge',
                icon : 'heroicons_outline:tag',
                type : 'basic',
                badge: {
                    title  : '8',
                    classes: 'w-5 h-5 bg-teal-400 text-black rounded-full'
                }
            },
            {
                id   : 'navigation-features.badge-style-rectangle',
                title: 'Rectangle badge',
                icon : 'heroicons_outline:tag',
                type : 'basic',
                badge: {
                    title  : 'Updated!',
                    classes: 'px-2 bg-teal-400 text-black rounded'
                }
            },
            {
                id   : 'navigation-features.badge-style-rounded',
                title: 'Rounded badge',
                icon : 'heroicons_outline:tag',
                type : 'basic',
                badge: {
                    title  : 'NEW',
                    classes: 'px-2.5 bg-teal-400 text-black rounded-full'
                }
            },
            {
                id   : 'navigation-features.badge-style-simple',
                title: 'Simple badge',
                icon : 'heroicons_outline:tag',
                type : 'basic',
                badge: {
                    title  : '87 Unread',
                    classes: 'text-teal-500'
                }
            },
            {
                id   : 'navigation-features.multi-line',
                title: 'A multi line navigation item title example which works just fine',
                icon : 'heroicons_outline:check-circle',
                type : 'basic'
            }] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'settings',
        title   : 'Settings',
        tooltip : 'Settings',
        type    : 'aside',
        icon    : 'heroicons_outline:adjustments',
        children: [{
            id   : 'settings.company-settings',
            title: 'Company Settings',
            type : 'basic',
            icon : 'heroicons_outline:chip',
            link : '/settings/company-settings'
            },
            {
                id   : 'settings.localization',
                title: 'Localization',
                type : 'basic',
                icon : 'heroicons_outline:chip',
                link : '/settings/localization'
            },
            {
                id   : 'settings.theme-settings',
                title: 'Theme Settings',
                type : 'basic',
                icon : 'heroicons_outline:chip',
                link : '/settings/theme-settings'
            },
            {
                id   : 'settings.roles-permissions',
                title: 'Roles & Permissions',
                type : 'basic',
                icon : 'heroicons_outline:chip',
                link : '/settings/roles-permissions'
            },
            {
                id   : 'settings.email-settings',
                title: 'Email Settings',
                type : 'basic',
                icon : 'heroicons_outline:sparkles',
                link : '/settings/email-settings'
            },
            {
                id   : 'settings.invoice-settings',
                title: 'Invoice Settings',
                type : 'basic',
                icon : 'heroicons_outline:search-circle',
                link : '/settings/invoice-settings'
            },
            {
                id   : 'settings.salary-settings',
                title: 'Salary Settings',
                type : 'basic',
                icon : 'heroicons_outline:play',
                link : '/settings/salary-settings'
            },
            {
                id   : 'settings.notifications',
                title: 'Notifications',
                type : 'basic',
                icon : 'heroicons_outline:color-swatch',
                link : '/settings/notifications'
            },
            {
                id   : 'settings.change-password',
                title: 'Change Password',
                type : 'basic',
                icon : 'heroicons_outline:question-mark-circle',
                link : '/settings/change-password'
            },
            {
                id   : 'settings.leave-type',
                title: 'Leave Type',
                type : 'basic',
                icon : 'heroicons_outline:view-list',
                link : '/settings/leave-type'
            }] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }, //tamamlandı
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
