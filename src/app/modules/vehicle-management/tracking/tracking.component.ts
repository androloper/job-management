import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {VehicleService} from "../vehicles/services/vehicle.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {AuthService} from "../../../core/auth/auth.service";

declare let alertify: any;

@Component({
    selector: 'tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['tracking.component.scss']
})
export class TrackingComponent implements OnInit {
    private vehicleUrl: string = `${environment.vehicleTrackingUrl}/Vehicles`;
    private groupUrl: string = `${environment.vehicleTrackingUrl}/Groups`;
    private hubUrl: string = `${environment.hubUrl}`;
    vehiclesForMarker: any[] = [];
    watchableCarForMarker: any;
    vehicleId: any;
    groupId: any;
    hubConnection: HubConnection;
    focusedCar: boolean = false;
    markers: any[];
    markerInfo: any;
    symbolStop: any;
    symbolMove: any;
    map: any;
    lat = 51.2;
    lng = 7;
    greenMarker = '../../../assets/icons/moved.png';
    redMarker = '../../../assets/icons/stopped.png';

    constructor(private vehicleService: VehicleService,
                private httpService: HttpClient,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getVehicles();
        this.startHubConnection();
    }

    getVehiclesForMarker(state) {
        return state.vehiclesForMarker;
    }

    setVehiclesForMarker(state, value) {
        state.vehiclesForMarker = value;
    }

    getWatchableCarForMarker(state) {
        return state.watchableCarForMarker;
    }

    setWatchableCarForMarker(state, value) {
        state.watchableCarForMarker = value;
    }

    getVehicles() {
        this.vehicleService.getList(this.vehicleUrl).subscribe(data => {
            // this.vehiclesForMarker = data['data'];
        })
    }

    getVehiclesById(vehicleId) {
        this.httpService.get(`${this.vehicleUrl}/GetById/${vehicleId}`).subscribe(data => {
            console.log(data['data']);
            this.watchableCarForMarker = data['data'];
        })
    }

    getVehiclesByGroupId(groupId) {
        this.httpService.get(`${this.groupUrl}/GetByIdWithVehicleList/${groupId}`).subscribe(data => {
            console.log(data['data']['vehicles']);
            this.vehiclesForMarker = data['data']['vehicles'];
        })
    }

    startHubConnection() {
        this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl).build();
            // {accessTokenFactory: () => this.authService.accessToken}
            // .withAutomaticReconnect().build();
            // .configureLogging(LogLevel.Error).build();
        this.hubConnection.start().then(()=>{
            //hubConnection.invoke('GetCurrentLocation', 'ip', '20090137');
        }).catch((err)=> { console.log(err)});
        this.hubConnection.on('STD',(response)=>{
            //console.log(response);
            let resp = JSON.parse(response);
            console.log(resp);
            console.log(resp['SerialNumber'], resp['Speed']);

            let counter = 0;
            if(this.vehiclesForMarker.length>0) {
                for (let i = 0; i < this.vehiclesForMarker.length; i++) {
                    if (resp['SerialNumber'] == this.vehiclesForMarker[i]['SerialNumber']) {
                        counter=1;
                        this.vehiclesForMarker[i]['Latitude'] = resp['Latitude'];
                        this.vehiclesForMarker[i]['Longitude'] = resp['Longitude'];
                        this.vehiclesForMarker[i]['Cog'] = resp['Cog'];
                        // this.symbolMove.rotation = parseInt(resp['Cog']);
                        // this.symbolStop.rotation = parseInt(resp['Cog']);
                        this.symbolStop = {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            fillColor: "red",
                            fillOpacity: 0.9,
                            strokeWeight: 6,
                            scale: 8,
                            rotation: parseInt(resp['Cog']),
                        };
                        this.symbolMove = {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            fillColor: "green",
                            fillOpacity: 0.9,
                            strokeWeight: 6,
                            scale: 8,
                            rotation: parseInt(resp['Cog']),
                        };
                        // this.vehiclesForMarker[i]['iconUrl'] = symbolMove;
                    }
                }
                if(counter==0){
                    this.vehiclesForMarker.push(resp);
                }
            }
            else { this.vehiclesForMarker.push(resp);
                console.log(this.vehiclesForMarker);
            }
            // if(resp['SerialNumber'] != this.vehiclesForMarker['SerialNumber']){
            //     // if(resp['Ign']===0) return this.redMarker;
            //     // if(resp['Ign']===1) return this.greenMarker;
            //     this.vehiclesForMarker.push(resp);
            //     console.log(this.vehiclesForMarker);
            // }
            // else {
            //     this.vehiclesForMarker['Latitude'] = resp['Latitude'];
            //     this.vehiclesForMarker['Longitude'] = resp['Longitude'];
            //     this.vehiclesForMarker['Speed'] = resp['Speed'];
            // }
        });
    }

    focusCar() {
        if(this.focusedCar && this.markerInfo) {
            this.map.center = this.markerInfo.position;
            this.map.zoom = 18;
        }
    }
    /*
    markerInfo(){
        if(this.focusedCar && this.markerInfo){
            this.map.center = this.markerInfo.position;
            this.map.zoom = 18;
        }
        if(this.markerInfo == undefined) {
            this.map.zoom = 10;
        }
    }
    */
    clickHandleMarker(marker) {
        this.map.center = marker.position;
        this.map.zoom = 14;
        this.markerInfo = marker;
    }

    checkMarker(response) {
        if (this.markers.length === 0) {
            this.map.center = {
                lat: parseFloat(response.Latitude),
                lng: parseFloat(response.Longtitude)
            };
            this.map.zoom = 9;
        }
        let searchMarker = this.markers.filter((marker: any) => {
            return marker.serialNumber === response.serialNumber;
        });
        let Latitude = parseFloat(response.Latitude);
        let Longitude = parseFloat(response.Longitude);
        let vehicleSpeed = Math.ceil(response.Speed);

        if (searchMarker.length === 0) {
            this.markers.push({
                position: {lat: Latitude, lng: Longitude},
                Speed: vehicleSpeed,
                ...response,
            });
        }
    }
}
