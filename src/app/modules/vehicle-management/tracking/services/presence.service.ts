import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

@Injectable({
    providedIn: 'root'
})
export class PresenceService {
    hubUrl = environment.hubUrl;
    private hubConnection: HubConnection;
    constructor() {
    }
    createHubConnection(user: any) {
        this.hubConnection = new HubConnectionBuilder().withUrl(this.hubUrl, {
            accessTokenFactory: ()=> user.accessToken
        }).withAutomaticReconnect().build()

        this.hubConnection.start().catch(error => console.log(error));
        console.log(this.hubConnection);
    }
}
