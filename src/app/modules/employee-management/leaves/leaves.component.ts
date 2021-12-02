import { Component, OnInit } from '@angular/core';
import {LeaveService} from "./services/leave.service";
import {PaginationResponse} from "../../services/pagination-response";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import { ColumnMode } from "@swimlane/ngx-datatable";
import {Leave} from "./models/leave";
import {HttpClient, HttpHeaders} from "@angular/common/http";

declare let alertify: any;
declare const $: any;
@Component({
    selector       : 'leaves',
    providers      : [LeaveService],
    templateUrl    : './leaves.component.html',
    styleUrls      : ['./leaves.component.scss'],
})
export class LeavesComponent implements OnInit {
    private apiUrl: string = `${environment.taskManagementUrl}/UserLeaves`;
    loadingIndicator = true;
    page = new Page();
    leaves = new Array<Leave>();
    ColumnMode = ColumnMode;
    addLeaveForm: FormGroup;
    editLeaveForm: FormGroup;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Leave>,
                private leaveService: LeaveService,
                private formBuilder: FormBuilder,
                private httpService: HttpClient) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit(): void {
        this.setPage({ offset: 0 });
        this.addLeaveForm = this.formBuilder.group({
            AddId: [''],
            Type: ['', [Validators.required]],
            DateFrom:['',[Validators.required]],
            DateTo:['',[Validators.required]],
            Reason: ['', [Validators.required]],
            Status: ['', [Validators.required]],
            ApprovedBy: ['', [Validators.required]],
            CreateBy: ['', [Validators.required]],
            CreatedDate: [''],
            UpdateBy: [''],
            UpdatedDate: [''],
            IsActive: ['', [Validators.required]],
            AddUserId: ['', [Validators.required]],
            AddUser: [''],
            AddLeavesTypeId: ['', [Validators.required]],
            LeavesType: [''],
        });
        this.editLeaveForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Type: ['', [Validators.required]],
            DateFrom:['',[Validators.required]],
            DateTo:['',[Validators.required]],
            Reason: ['', [Validators.required]],
            Status: ['', [Validators.required]],
            ApprovedBy: ['', [Validators.required]],
            CreateBy: [''],
            CreatedDate: [''],
            UpdateBy: ['', [Validators.required]],
            UpdatedDate: [''],
            IsActive: ['', [Validators.required]],
            EditUserId: ['', [Validators.required]],
            EditUser: [''],
            EditLeavesTypeId: ['', [Validators.required]],
            LeavesType: [''],
        });
    }
    addLeave() {
        const obj = {
            id: this.addLeaveForm.value.AddId,
            type: this.addLeaveForm.value.Type,
            dateFrom: this.addLeaveForm.value.DateFrom,
            dateTo: this.addLeaveForm.value.DateTo,
            reason: this.addLeaveForm.value.Reason,
            status: this.addLeaveForm.value.Status,
            approvedBy: this.addLeaveForm.value.ApprovedBy,
            createBy: this.addLeaveForm.value.CreateBy,
            createdDate: this.addLeaveForm.value.CreatedDate,
            updateBy: this.addLeaveForm.value.UpdateBy,
            updatedDate: this.addLeaveForm.value.UpdatedDate,
            isActive: this.addLeaveForm.value.IsActive,
            userId: this.leaves[0]["userId"],
            user: this.addLeaveForm.value.AddUser,
            leavesTypeId: this.addLeaveForm.value.AddLeavesTypeId,
            leavesType: this.addLeaveForm.value.LeavesType,
        };
        console.log('leave obje',obj);
        this.leaveService.insert(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#add_leave').modal('hide');
        alertify.success("New leave is added.");
    }
    editLeave() {
        const obj = {
            id: this.editLeaveForm.value.EditId,
            type: this.editLeaveForm.value.Type,
            dateFrom: this.editLeaveForm.value.DateFrom,
            dateTo: this.editLeaveForm.value.DateTo,
            reason: this.editLeaveForm.value.Reason,
            status: this.editLeaveForm.value.Status,
            approvedBy: this.editLeaveForm.value.ApprovedBy,
            createBy: this.editLeaveForm.value.CreateBy,
            createdDate: this.editLeaveForm.value.CreatedDate,
            updateBy: this.editLeaveForm.value.UpdateBy,
            updatedDate: this.editLeaveForm.value.UpdatedDate,
            isActive: this.editLeaveForm.value.IsActive,
            userId: this.editLeaveForm.value.EditUserId,
            user: this.editLeaveForm.value.EditUser,
            leavesTypeId: this.editLeaveForm.value.EditLeavesTypeId,
            leavesType: this.editLeaveForm.value.LeavesType,
        };
        this.leaveService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#edit_leave').modal('hide');
        alertify.warning("Chosen leave is updated.");
    }
    setLeave(value) {
        this.updateId = value;
        const index = this.leaves.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.leaves[index];
        this.editLeaveForm.get('EditId').setValue(toSetValues.id);
        this.editLeaveForm.get('Type').setValue(toSetValues.type);
        this.editLeaveForm.get('DateFrom').setValue(toSetValues.dateFrom);
        this.editLeaveForm.get('DateTo').setValue(toSetValues.dateTo);
        this.editLeaveForm.get('Reason').setValue(toSetValues.reason);
        this.editLeaveForm.get('Status').setValue(toSetValues.status);
        this.editLeaveForm.get('ApprovedBy').setValue(toSetValues.approvedBy);
        this.editLeaveForm.get('CreateBy').setValue(toSetValues.createBy);
        this.editLeaveForm.get('CreatedDate').setValue(toSetValues.createdDate);
        this.editLeaveForm.get('UpdateBy').setValue(toSetValues.updateBy);
        this.editLeaveForm.get('UpdatedDate').setValue(toSetValues.updatedDate);
        this.editLeaveForm.get('IsActive').setValue(toSetValues.isActive);
        this.editLeaveForm.get('EditUserId').setValue(toSetValues.userId);
        this.editLeaveForm.get('EditUser').setValue(toSetValues.user);
        this.editLeaveForm.get('EditLeavesTypeId').setValue(toSetValues.leavesTypeId);
        this.editLeaveForm.get('LeavesType').setValue(toSetValues.leavesType);
    }
    deleteLeave() {
        //this.leaveService.delete(this.tempId, this.apiUrl).subscribe(() => {});
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.tempId},
        };
        this.httpService.delete(`${this.apiUrl}/Delete`, httpOptions).subscribe(() => {});
        this.setPage({offset:0});
        $('#delete_leave').hide();
        alertify.error("Chosen leave is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset+1)
        this.leaveService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator=false;
                    $('#ngx-dt67.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.leaves = data.data;
            });
    }
}
