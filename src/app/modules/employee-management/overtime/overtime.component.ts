import { Component, OnInit } from '@angular/core';
import {OvertimeService} from "./services/overtime.service";
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ColumnMode } from "@swimlane/ngx-datatable";
import {PaginationResponse} from "../../services/pagination-response";
import {Overtime} from "./models/overtime";
import {HttpClient, HttpHeaders} from "@angular/common/http";

declare let alertify: any;
declare const $: any;
@Component({
    selector: 'overtime',
    providers: [OvertimeService],
    templateUrl: './overtime.component.html',
    styleUrls: ['./overtime.component.scss']
})
export class OvertimeComponent implements OnInit {
    private apiUrl: string = `${environment.taskManagementUrl}/Overtimes`;
    loadingIndicator = true;
    page = new Page();
    overtimes = new Array<Overtime>()
    ColumnMode = ColumnMode;
    addOvertimeForm: FormGroup;
    editOvertimeForm: FormGroup;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Overtime>,
                private overtimeService: OvertimeService,
                private httpService: HttpClient,
                private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }

    ngOnInit(): void {
        this.setPage({ offset: 0 });
        this.addOvertimeForm = this.formBuilder.group({
            Id: [''],
            OvertimeDate: ['', [Validators.required]],
            OvertimeHours: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            UserId: ['', [Validators.required]],
            User: [''],
        });
        this.editOvertimeForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            OvertimeDate: ['', [Validators.required]],
            OvertimeHours: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            EditUserId: ['', [Validators.required]],
            EditUser: [''],
        });
    }
    addOvertime() {
        const obj = {
            id: this.addOvertimeForm.value.Id,
            overTimeDate: this.addOvertimeForm.value.OvertimeDate,
            overTimeHours: this.addOvertimeForm.value.OvertimeHours,
            description: this.addOvertimeForm.value.Description,
            userId: this.addOvertimeForm.value.UserId,
            user: this.addOvertimeForm.value.User,
        };
        console.log(obj);
        this.overtimeService.insert(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#add_overtime').modal('hide');
        alertify.success("New overtime is added.");
    }
    editOvertime() {
        const obj = {
            overTimeDate: this.editOvertimeForm.value.OvertimeDate,
            overTimeHours: this.editOvertimeForm.value.OvertimeHours,
            description: this.editOvertimeForm.value.Description,
            userId: this.updateId,
            user: this.editOvertimeForm.value.EditUser,
            id: this.editOvertimeForm.value.EditId,
        };
        this.overtimeService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#edit_overtime').modal('hide');
        alertify.warning("Chosen overtime is updated.");
    }
    setOvertime(value) {
        this.updateId = value;
        const index = this.overtimes.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.overtimes[index];
        this.editOvertimeForm.get('EditId').setValue(toSetValues.id);
        this.editOvertimeForm.get('OvertimeDate').setValue(toSetValues.overTimeDate);
        this.editOvertimeForm.get('OvertimeHours').setValue(toSetValues.overTimeHours);
        this.editOvertimeForm.get('Description').setValue(toSetValues.description);
        this.editOvertimeForm.get('EditUserId').setValue(toSetValues.userId);
        this.editOvertimeForm.get('EditUser').setValue(toSetValues.user);
    }
    deleteOvertime() {
        //this.overtimeService.delete(this.tempId, this.apiUrl).subscribe(() => {});
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.tempId},
        };
        this.httpService.delete(`${this.apiUrl}/Delete`, httpOptions).subscribe(() => {});
        this.setPage({offset:0});
        $('#delete_overtime').hide();
        alertify.error("Chosen overtime is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.overtimeService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt68.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.overtimes = data.data;
            });
    }
}
