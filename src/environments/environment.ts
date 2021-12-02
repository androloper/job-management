// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    rootUrl : "http://izersoft.online/api",
    taskManagementUrl : "http://izersoft.online/api/TaskManagementApi",
    identityServerUrl: "http://izersoft.online/api/IdentityServer",
    vehicleTrackingUrl: "http://izersoft.online/api/VehicleTrackingSystemApi",
    hubUrl: 'http://izersoft.online/VehicleTcpServerHub',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
