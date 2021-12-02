import {Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ProjectService} from "../services/project.service";
import {Project} from "../models/project";
import {Page} from "../../../services/page";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import moment from "moment";

declare let alertify: any;
declare const $: any;
@Component({
    selector       : 'project-view',
    providers      : [ProjectService],
    templateUrl    : 'project-view.component.html',
    styleUrls      : ['project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
    private apiUrl: string = `${environment.taskManagementUrl}/Projects`;
    projectInfo = new Array<Project>();
    leadersInfo:any;
    teamsInfo: any;
    tasksInfo: any;
    inpTasks:any;
    compTasks: any;
    projectId: any;
    firstDate:any;
    secondDate: any;
    totalHours: any;
    editId: any;
    deleteId: string;
    loadingIndicator = true;
    page = new Page();
    constructor(private projectService:ProjectService,
                private activatedRoute: ActivatedRoute,
                private httpService: HttpClient,
        ) {
    }

    ngOnInit(): void {
        this.getProjectInfos();
        this.inpTasks=[];
        this.compTasks=[];
    }

    getProjectInfos() {
        this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
        this.httpService.get<Project>(`${this.apiUrl}/GetProjectDetailById?Id=${this.projectId}`).subscribe(data => {
            this.projectInfo = data['data'][0];
            this.leadersInfo = data['data'][0]['leaders'];
            this.teamsInfo = data['data'][0]['projectTeams'];
            this.tasksInfo = data['data'][0]['tasks'];
            this.firstDate = moment(this.projectInfo['endDate']);
            this.secondDate = moment(this.projectInfo['startDate']);
            this.totalHours = Math.abs(this.firstDate.diff(this.secondDate, 'hours'));
            for(let i=0;i<=this.tasksInfo.length; i++) {
                if (this.tasksInfo[i]['taskStatusId'] === 42){
                    this.inpTasks.push(this.tasksInfo[i]);
                }
                else if (this.tasksInfo[i]['taskStatusId'] === 43) {
                    this.inpTasks.push(this.tasksInfo[i]);
                }
                else if (this.tasksInfo[i]['taskStatusId'] === 44) {
                    this.inpTasks.push(this.tasksInfo[i]);
                }
                else if (this.tasksInfo[i]['taskStatusId'] === 45) {
                    this.inpTasks.push(this.tasksInfo[i]);
                }
                else if (this.tasksInfo[i]['taskStatusId'] === 46) {
                    this.compTasks.push(this.tasksInfo[i]);
                }
                else {
                    this.inpTasks.push(this.tasksInfo[i]);
                }
            }
        });
    }

}
