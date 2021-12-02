import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Vehicle} from "../models/vehicle";
import {Page} from "../../../services/page";
import { ColumnMode } from "@swimlane/ngx-datatable";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {PaginationResponse} from "../../../services/pagination-response";
import {Rule} from "../../rules/models/rule";
import {Group} from "../../groups/models/group";
import {Subject} from "rxjs";
import {FuseNavigationItem} from "../../../../../@fuse/components/navigation";
import {FuseMediaWatcherService} from "../../../../../@fuse/services/media-watcher";
import {takeUntil} from "rxjs/operators";
import {SharedService} from "../../../../shared/shared.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RuleService} from "../../rules/services/rule.service";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
// @ts-ignore
import * as js from '../../speedometer';

declare let alertify: any;
declare const $: any;
declare var google: any;

@Component({
    selector: 'vehicle-profile',
    templateUrl: './vehicle-profile.component.html',
    styleUrls: ['../vehicles.component.scss']
})
export class VehicleProfileComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/Vehicles`;
    private ruleUrl: string = `${environment.vehicleTrackingUrl}/VehicleRules`;
    private groupUrl: string = `${environment.vehicleTrackingUrl}/Groups`;
    private accidentUrl: string = `${environment.vehicleTrackingUrl}/VehicleAccidents`;
    private serviceUrl: string = `${environment.vehicleTrackingUrl}/VehicleServices`;
    private hubUrl: string = `${environment.hubUrl}`;
    vehiclesInfo = new Array<Vehicle>();
    rulesInfo:any;
    groupInfo:any;
    groupVehicles:any;
    accidentsInfo:any;
    servicesInfo:any;
    page = new Page();
    loadingIndicator = true;
    vehicleId= this.activatedRoute.snapshot.paramMap.get('id');
    groupId: any;
    deleteId: string;
    ColumnMode = ColumnMode;
    addRuleForm: FormGroup;
    editRuleForm: FormGroup;
    userId: any;
    editId:any;
    tempId: any;
    updateId: any;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    ctr: number=0;
    menuData: FuseNavigationItem[];
    lat = 51.2;
    lng = 7;
    ew: string;
    ns: string;
    sn: string;
    ign: string;
    speed: number;
    cog: string;
    activeTab:any;
    vehicleMarker:any;
    hubConn:HubConnection;
    symbolMove: any;
    map:any;

    constructor(private httpService: HttpClient,
                private activatedRoute: ActivatedRoute,
                private ruleService: RuleService,
                private formBuilder: FormBuilder,
                private _fuseMediaWatcherService: FuseMediaWatcherService,
                private sharedService: SharedService) {
        this.page.pageNumber = 1;
        this.page.size = 10;
        this.menuData = [
            {
                title   : 'Vehicle Reports',
                type    : 'group',
                children: [
                    {
                        type: 'divider'
                    },
                    {
                        title   : 'Activity Reports',
                        type    : 'collapsable',
                        icon    : 'heroicons_outline:plus-circle',
                        children: [
                            {
                                type: 'divider'
                            },
                            {
                                title   : 'Activity Detail Reports',
                                tooltip : 'ADR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:plus-circle',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/adr`,
                            },
                            {
                                title   : 'Engine Hours Detail Reports',
                                tooltip : 'EHDR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-group',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/ehdr`,
                            },
                            {
                                title   : 'Ignition O/C Reports',
                                tooltip : 'IOCR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:briefcase',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/iocr`,
                            },
                            {
                                title   : 'Travel Reports',
                                tooltip : 'TR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-add',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/tr`
                            },
                            {
                                title   : 'Wait Reports',
                                tooltip : 'WR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:badge-check',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/wr`
                            }
                        ]
                    },
                    {
                        title   : 'Violation Reports',
                        type    : 'collapsable',
                        icon    : 'heroicons_outline:plus-circle',
                        children: [
                            {
                                type: 'divider'
                            },
                            {
                                title   : 'Acceleration Violation Reports',
                                tooltip : 'AVR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:plus-circle',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/avr`
                            },
                            {
                                title   : 'Speed Limit Violation Reports',
                                tooltip : 'SLVR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-group',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/slvr`
                            },
                            {
                                title   : 'Sudden Brake Reports',
                                tooltip : 'SBR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:briefcase',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/sbr`
                            }
                        ]
                    },
                    {
                        title   : 'Region Reports',
                        type    : 'collapsable',
                        icon    : 'heroicons_outline:plus-circle',
                        children: [
                            {
                                type: 'divider'
                            },
                            {
                                title   : 'Intra Regional Activity Reports',
                                tooltip : 'IRAR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:plus-circle',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/irar`
                            },
                            {
                                title   : 'Region Activity Reports',
                                tooltip : 'RAR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-group',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/rar`
                            },
                            {
                                title   : 'Region Activity Summary Reports',
                                tooltip : 'RASR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:briefcase',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/rasr`
                            },
                        ]
                    },
                    {
                        title   : 'Sensor Reports',
                        type    : 'collapsable',
                        icon    : 'heroicons_outline:plus-circle',
                        children: [
                            {
                                type: 'divider'
                            },
                            {
                                title   : 'Acceleration Sensor Detail Reports',
                                tooltip : 'ASDR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:plus-circle',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/asdr`
                            },
                            {
                                title   : 'Acceleration Sensor Summary Reports',
                                tooltip : 'ASSR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-group',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/assr`
                            },
                        ]
                    },
                    {
                        title   : 'Summary Reports',
                        type    : 'collapsable',
                        icon    : 'heroicons_outline:plus-circle',
                        children: [
                            {
                                type: 'divider'
                            },
                            {
                                title   : 'Mileage Reports',
                                type    : 'collapsable',
                                icon    : 'heroicons_outline:plus-circle',
                                children: [
                                    {
                                        type: 'divider'
                                    },
                                    {
                                        title   : 'Total Mileage Reports',
                                        tooltip : 'TMR',
                                        type    : 'basic',
                                        icon    : 'heroicons_outline:user-group',
                                        link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/tmr`
                                    },
                                    {
                                        title   : 'Hour-based Mileage Reports',
                                        tooltip : 'HbMR',
                                        type    : 'basic',
                                        icon    : 'heroicons_outline:user-group',
                                        link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/hbmr`
                                    },
                                    {
                                        title   : 'Weekly Day-based Mileage Reports',
                                        tooltip : 'WDbMR',
                                        type    : 'basic',
                                        icon    : 'heroicons_outline:user-group',
                                        link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/wdbmr`
                                    },
                                ]

                            },
                            {
                                title   : 'Vehicle-based Activity Summary Reports',
                                tooltip : 'VbASR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-group',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/vbasr`
                            },
                            {
                                title   : 'Day-based Activity Summary Reports',
                                tooltip : 'DbASR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:briefcase',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/dbasr`
                            },
                            {
                                title   : 'Engine Summary Reports',
                                tooltip : 'ESR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:user-add',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/esr`
                            },
                            {
                                title   : 'Violation Summary Reports',
                                tooltip : 'VSR',
                                type    : 'basic',
                                icon    : 'heroicons_outline:badge-check',
                                link    : `/vehicle-management/vehicles/vehicle-profile/${this.vehicleId}/vsr`
                            }
                        ]
                    },
                ]
            },
        ];
    }

    ngOnInit(): void {
        this.vehicleId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getVehicleInfos();
        this.sharedService.setId(this.vehicleId);
        this.getGroupVehiclesByGroupId({offset:0});
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
            });
        this.addRuleForm = this.formBuilder.group({
            Id: [''],
            Name: ['', [Validators.required]],
            Value: ['',[Validators.required]],
            VehicleId: ['',[Validators.required]],
            Vehicle: [''],
        });
        this.editRuleForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            Value: ['', [Validators.required]],
            VehicleId: ['', [Validators.required]],
            Vehicle: [''],
        });
    }

    getVehicleInfos() {
        this.vehicleId = this.activatedRoute.snapshot.paramMap.get('id');
        this.httpService.get<Vehicle>(`${this.apiUrl}/GetById/${this.vehicleId}`).subscribe(data=>{
            this.vehiclesInfo = data['data'];
            this.sn = this.vehiclesInfo['serialNumber'];
            console.log(this.sn);
        });
    }

    getGroupVehiclesByGroupId(pageInfo) {
        this.page.pageNumber = (pageInfo.offset+1)
        this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
        this.httpService.get<PaginationResponse<Group>>(`${this.groupUrl}/GetByIdWithVehicleListPagination?Id=${this.groupId}&pageNumber=${this.page.pageNumber}&pageSize=${this.page.size}`)
            .subscribe(data=>{
                setTimeout(async () => {
                    this.loadingIndicator=false;
                    $('#ngx-dt1.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.groupInfo = data['data'];
                this.groupVehicles = data['data']['vehicles'];
            });
    }

    getRulesByVehicleId(pageInfo) {
        this.page.pageNumber = (pageInfo.offset+1)
        this.vehicleId = this.activatedRoute.snapshot.paramMap.get('id');
        this.httpService.get<PaginationResponse<Rule>>(`${this.ruleUrl}/GetListPaginationByVehicleId?VehicleId=${this.vehicleId}&pageNumber=${this.page.pageNumber}&pageSize=${this.page.size}`)
            .subscribe(data=>{
            setTimeout(async () => {
                $('#ngx-dt2.datatable-scroll').width('100%');
                this.loadingIndicator=false;
            }, 2000)
            this.page.pageNumber = data.pageNumber - 1;
            this.page.size = data.pageSize;
            this.page.totalPages = data.totalPages;
            this.page.totalElements = data['data'].length;
            this.rulesInfo = data['data'];
        });
    }
    addRule() {
        const obj = {
            id: this.addRuleForm.value.Id,
            name: this.addRuleForm.value.Name,
            value: this.addRuleForm.value.Value,
            vehicleId: this.addRuleForm.value.VehicleId,
            vehicle: this.addRuleForm.value.Vehicle,
        };
        this.ruleService.insert(obj, this.ruleUrl).subscribe(() =>{});
        this.getRulesByVehicleId({offset:0});
        $('#add_rule').modal('hide');
        alertify.success("New rule is added.");
    }
    editRule() {
        const obj = {
            id: this.editRuleForm.value.EditId,
            name: this.editRuleForm.value.Name,
            value: this.editRuleForm.value.Value,
            vehicleId: this.editRuleForm.value.VehicleId,
            vehicle: this.editRuleForm.value.Vehicle,
        };
        this.ruleService.update(obj, this.ruleUrl).subscribe(() =>{});
        this.getRulesByVehicleId({offset:0});
        $('#edit_rule').modal('hide');
        alertify.warning("Chosen rule is updated.");
    }
    setRule(value) {
        this.editId = value;
        const index = this.rulesInfo.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.rulesInfo[index];
        this.editRuleForm.get('EditId').setValue(toSetValues.id);
        this.editRuleForm.get('Name').setValue(toSetValues.name);
        this.editRuleForm.get('Value').setValue(toSetValues.value);
        this.editRuleForm.get('VehicleId').setValue(toSetValues.vehicleId);
        this.editRuleForm.get('Vehicle').setValue(toSetValues.vehicle);
    }
    deleteRule() {
        //this.ruleService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.ruleUrl}/Delete/${this.tempId}`).subscribe(() =>{});
        this.getRulesByVehicleId({offset:0});
        $('#delete_rule').hide();
        alertify.error("Chosen rule is deleted.");
    }

    getAccidentsByVehicleId(pageInfo) {
        this.page.pageNumber = (pageInfo.offset+1)
        this.vehicleId = this.activatedRoute.snapshot.paramMap.get('id');
        this.httpService.get<PaginationResponse<Rule>>(`${this.accidentUrl}/GetListPaginationByVehicleId?VehicleId=${this.vehicleId}&pageNumber=${this.page.pageNumber}&pageSize=${this.page.size}`)
            .subscribe(data=>{
                console.log(data['data']);
                setTimeout(async () => {
                    $('#ngx-dt3.datatable-scroll').width('100%');
                    this.loadingIndicator=false;
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.accidentsInfo = data['data'];
            });
    }

    getServicesByVehicleId(pageInfo) {
        this.page.pageNumber = (pageInfo.offset+1)
        this.vehicleId = this.activatedRoute.snapshot.paramMap.get('id');
        this.httpService.get<PaginationResponse<Rule>>(`${this.serviceUrl}/GetListPaginationByVehicleId?VehicleId=${this.vehicleId}&pageNumber=${this.page.pageNumber}&pageSize=${this.page.size}`)
            .subscribe(data=>{
                console.log(data['data']);
                setTimeout(async () => {
                    $('#ngx-dt4.datatable-scroll').width('100%');
                    this.loadingIndicator=false;
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.servicesInfo = data['data'];
            });
    }

    liveTracking() {
        $('#tabs a[href="#live-tracking"]').tab('show');
        this.hubConn = new HubConnectionBuilder().withUrl(this.hubUrl).build();
        // {accessTokenFactory: () => this.authService.accessToken}
        // .withAutomaticReconnect().build();
        // .configureLogging(LogLevel.Error).build();
        this.hubConn.start().then(() => {})
            .catch((err) => { console.log(err)});
        // this.hubConn.on(`${this.sn}`, (response) => {
        this.hubConn.on(`20090062`, (response) => {
            //console.log(response);
            let resp = JSON.parse(response);
            console.log(resp);
            // let latlng= {
            //     lat:parseFloat(resp['Latitude']),
            //     lng: parseFloat(resp['Longitude'])
            // };
            // $('#AgmMap').setCenter(latlng);
            const position = new google.maps.LatLng(resp['Latitude'],resp['Longitude']);
            this.map.panTo(position);
            this.lat = resp['Latitude'];
            this.lng = resp['Longitude'];
            this.ew = resp['Ew'];
            this.ns = resp['Ns'];
            this.sn = resp['SerialNumber'];
            this.speed = resp['Speed'];
            this.ign = resp['Ign'];
            this.cog = resp['Cog'];
            this.symbolMove = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                fillColor: "white",
                fillOpacity: 0.9,
                strokeWeight: 6,
                scale: 10,
                rotation: parseInt(resp['Cog']),
            };
        });
        console.log(js);
        const legend = document.getElementById("legend") as HTMLElement;
        let needleId = document.getElementById("needleId") as HTMLElement;
        // const div = document.createElement('div');
        // div.innerHTML = '';
        // legend.appendChild(div);
        this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);
    }
    public loadAPIWrapper(map) {
        this.map = map;

    }
}
