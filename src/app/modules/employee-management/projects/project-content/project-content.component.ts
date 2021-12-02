import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../services/project.service";
import {environment} from "../../../../../environments/environment";
import {Page} from "../../../services/page";
import {Project} from "../models/project";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../../services/pagination-response";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {parseInt} from "lodash-es";

declare let alertify: any;
declare const $: any;

@Component({
    selector: 'project-content',
    templateUrl: 'project-content.component.html',
    styleUrls: ['project-content.component.scss'],
    providers: [ProjectService]
})
export class ProjectContentComponent implements OnInit {
    private apiUrl: string = `${environment.taskManagementUrl}/Projects`;
    loadingIndicator = true;
    page = new Page();
    projects = new Array<Project>();
    teamsInfo : any;
    ColumnMode = ColumnMode;
    addProjectForm: FormGroup;
    editProjectForm: FormGroup;
    projectId: any;
    editId: any;
    userId: any;
    tempId: any;
    updateId: any;

    constructor(private paginationResponse: PaginationResponse<Project>,
                private httpService: HttpClient,
                private projectService: ProjectService,
                private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 12;
    }

    ngOnInit() {
        this.setPage({offset: 0});
        this.addProjectForm = this.formBuilder.group({
            AddId: [''],
            Title: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Priority: ['', [Validators.required]],
            StartDate: ['', [Validators.required]],
            EndDate: ['', [Validators.required]],
            CreatedDate: [''],
            CreateBy: ['', [Validators.required]],
            UpdatedDate: [''],
            UpdateBy: [''],
            IsActive: ['', [Validators.required]],
            Leaders: [''],
            ProjectTeams: [''],
            Tasks: [''],
        });
        this.editProjectForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Title: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Priority: ['', [Validators.required]],
            StartDate: ['', [Validators.required]],
            EndDate: ['', [Validators.required]],
            CreatedDate: [''],
            CreateBy: [''],
            UpdatedDate: [''],
            UpdateBy: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
            Leaders: [''],
            ProjectTeams: [''],
            Tasks: [''],
        });
    }

    addProject() {
        const obj = {
            id: this.addProjectForm.value.AddId,
            title: this.addProjectForm.value.Title,
            description: this.addProjectForm.value.Description,
            priority: this.addProjectForm.value.Priority,
            startDate: this.addProjectForm.value.StartDate,
            endDate: this.addProjectForm.value.EndDate,
            createdDate: this.addProjectForm.value.CreatedDate,
            createBy: this.addProjectForm.value.CreateBy,
            updatedDate: this.addProjectForm.value.UpdatedDate,
            updateBy: this.addProjectForm.value.UpdateBy,
            isActive: this.addProjectForm.value.IsActive,
            leaders: this.addProjectForm.value.Leaders,
            projectTeams: this.addProjectForm.value.ProjectTeams,
            tasks: this.addProjectForm.value.Tasks,
        };
        console.log(obj);
        this.projectService.insert(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset: 0});
        $('#add_project').modal('hide');
        alertify.success("New project is added.");
    }

    editProject() {
        const obj = {
            id: this.editProjectForm.value.EditId,
            title: this.editProjectForm.value.Title,
            description: this.editProjectForm.value.Description,
            priority: this.editProjectForm.value.Priority,
            startDate: this.editProjectForm.value.StartDate,
            endDate: this.editProjectForm.value.EndDate,
            createdDate: this.editProjectForm.value.CreatedDate,
            createBy: this.editProjectForm.value.CreateBy,
            updatedDate: this.editProjectForm.value.UpdatedDate,
            updateBy: this.editProjectForm.value.UpdateBy,
            isActive: this.editProjectForm.value.IsActive,
            leaders: this.editProjectForm.value.Leaders,
            projectTeams: this.editProjectForm.value.ProjectTeams,
            tasks: this.editProjectForm.value.Tasks,
        };
        this.projectService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset: 0});
        $('#edit_project').modal('hide');
        alertify.warning("Chosen project is updated.");
    }

    setProject(value) {
        this.editId = value;
        const index = this.projects.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.projects[index];
        this.editProjectForm.get('EditId').setValue(toSetValues.id);
        this.editProjectForm.get('Title').setValue(toSetValues.title);
        this.editProjectForm.get('Description').setValue(toSetValues.description);
        this.editProjectForm.get('Priority').setValue(toSetValues.priority);
        this.editProjectForm.get('StartDate').setValue(toSetValues.startDate);
        this.editProjectForm.get('EndDate').setValue(toSetValues.endDate);
        this.editProjectForm.get('CreatedDate').setValue(toSetValues.createdDate);
        this.editProjectForm.get('CreateBy').setValue(toSetValues.createBy);
        this.editProjectForm.get('UpdatedDate').setValue(toSetValues.updatedDate);
        this.editProjectForm.get('UpdateBy').setValue(toSetValues.updateBy);
        this.editProjectForm.get('IsActive').setValue(toSetValues.isActive);
        this.editProjectForm.get('Leaders').setValue(toSetValues.leaders);
        this.editProjectForm.get('ProjectTeams').setValue(toSetValues.projectTeams);
        this.editProjectForm.get('Tasks').setValue(toSetValues.tasks);
    }

    deleteProject() {
        //this.projectService.delete(this.tempId, this.apiUrl).subscribe(() => {});
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.tempId},
        };
        this.httpService.delete(`${this.apiUrl}/Delete`, httpOptions).subscribe(() => {});
        this.setPage({offset: 0});
        $('#delete_project').hide();
        alertify.error("Chosen project is deleted.");
    }


    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.projectService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.projects = data.data;
            });
    }

    test(x: any) {
        this.page.pageNumber = parseInt(x);
        this.setPage({offset: x});
    }
}
