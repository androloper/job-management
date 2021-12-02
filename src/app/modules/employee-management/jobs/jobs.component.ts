import {Component, OnInit} from '@angular/core';
import {JobService} from "./services/job.service";
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../services/pagination-response";
import { ColumnMode } from "@swimlane/ngx-datatable";
import {Job} from "./models/job";
import {HttpClient, HttpHeaders} from "@angular/common/http";

declare let alertify: any;
declare const $: any;

@Component({
    selector: 'jobs',
    providers: [JobService],
    styleUrls: ['jobs.component.scss'],
    templateUrl: 'jobs.component.html',
})
export class JobsComponent implements OnInit {
    private apiUrl: string = `${environment.identityServerUrl}/Jobs`;
    loadingIndicator = true;
    page = new Page();
    jobs = new Array<Job>();
    ColumnMode = ColumnMode;
    addJobForm: FormGroup;
    editJobForm: FormGroup;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Job>, private jobService:JobService,private httpService: HttpClient, private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addJobForm = this.formBuilder.group({
            Id: [''],
            Name: ['', [Validators.required]],
            CreateBy: ['', [Validators.required]],
            CreatedDate: ['', [Validators.required]],
            UpdateBy: ['', [Validators.required]],
            UpdatedDate: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
        });
        this.editJobForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            CreateBy: ['', [Validators.required]],
            CreatedDate: ['', [Validators.required]],
            UpdateBy: ['', [Validators.required]],
            UpdatedDate: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
        });
    }
    addJob() {
        const obj = {
            id: this.addJobForm.value.Id,
            name: this.addJobForm.value.Name,
            createBy: this.addJobForm.value.CreateBy,
            createdDate: this.addJobForm.value.CreatedDate,
            updateBy: this.addJobForm.value.UpdateBy,
            updatedDate: this.addJobForm.value.UpdatedDate,
            isActive: this.addJobForm.value.IsActive,
        };
        this.jobService.insert(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#add_job').modal('hide');
        alertify.success("New job is added.");
    }
    editJob() {
        const obj = {
            id: this.editJobForm.value.EditId,
            name: this.editJobForm.value.Name,
            createBy: this.editJobForm.value.CreateBy,
            createdDate: this.editJobForm.value.CreatedDate,
            updateBy: this.editJobForm.value.UpdateBy,
            updatedDate: this.editJobForm.value.UpdatedDate,
            isActive: this.editJobForm.value.IsActive,
        };
        this.jobService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#edit_job').modal('hide');
        alertify.warning("Chosen job is updated.");
    }
    setJob(value) {
        this.updateId = value;
        const index = this.jobs.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.jobs[index];
        this.editJobForm.get('EditId').setValue(toSetValues.id);
        this.editJobForm.get('Name').setValue(toSetValues.name);
        this.editJobForm.get('CreateBy').setValue(toSetValues.createBy);
        this.editJobForm.get('CreatedDate').setValue(toSetValues.createdDate);
        this.editJobForm.get('UpdateBy').setValue(toSetValues.updateBy);
        this.editJobForm.get('UpdatedDate').setValue(toSetValues.updatedDate);
        this.editJobForm.get('IsActive').setValue(toSetValues.isActive);
    }
    deleteJob() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.tempId},
        };
        this.httpService.delete(`${this.apiUrl}/Delete`, httpOptions).subscribe((data) => console.log(data));
        this.setPage({offset:0});
        $('#delete_education_info').hide();
        alertify.error("Chosen job is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset+1)
        this.jobService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator=false;
                    $('#ngx-dt66.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.jobs = data.data;
            });
    }
}
