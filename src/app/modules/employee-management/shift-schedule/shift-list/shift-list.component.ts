import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Page} from "../../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../../services/pagination-response";
import {ShiftService} from "../services/shift.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import {Shift} from "../models/shift";
import {HttpClient, HttpHeaders} from "@angular/common/http";

declare let alertify: any;
declare const $: any;
@Component({
    selector: 'shift-list',
    providers: [ShiftService],
    templateUrl: './shift-list.component.html',
    styleUrls: ['./shift-list.component.scss']
})
export class ShiftListComponent implements OnInit {
    private apiUrl: string = `${environment.taskManagementUrl}/ShiftTypes`;
    loadingIndicator = true;
    page = new Page();
    shifts = new Array<Shift>();
    ColumnMode = ColumnMode;
    addShiftForm: FormGroup;
    editShiftForm: FormGroup;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Shift>,
                private shiftService: ShiftService,
                private formBuilder: FormBuilder,
                private httpService: HttpClient) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addShiftForm = this.formBuilder.group({
            Id: [''],
            Title: ['', [Validators.required]],
            StartDate: ['', [Validators.required]],
            EndDate: ['', [Validators.required]],
            CreateBy: ['', [Validators.required]],
            CreatedDate: [''],
            UpdateBy: [''],
            UpdatedDate: [''],
            BreakTime: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
            Attendances: [''],
        });
        this.editShiftForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Title: ['', [Validators.required]],
            StartDate: ['', [Validators.required]],
            EndDate: ['', [Validators.required]],
            CreateBy: [''],
            CreatedDate: [''],
            UpdateBy: ['', [Validators.required]],
            UpdatedDate: [''],
            BreakTime: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
            Attendances: [''],
        });
    }
    addShift() {
        const obj = {
            id: this.addShiftForm.value.Id,
            title: this.addShiftForm.value.Title,
            startDate: this.addShiftForm.value.StartDate,
            endDate: this.addShiftForm.value.EndDate,
            createBy: this.addShiftForm.value.CreateBy,
            createdDate: this.addShiftForm.value.CreatedDate,
            updateBy: this.addShiftForm.value.UpdateBy,
            updatedDate: this.addShiftForm.value.UpdatedDate,
            breakTime: this.addShiftForm.value.BreakTime,
            isActive: this.addShiftForm.value.IsActive,
            attendances: this.addShiftForm.value.Attendances,
        };
        this.shiftService.insert(obj, this.apiUrl).subscribe((data) => {console.log(data)});
        this.setPage({offset:0});
        $('#add_shift').modal('hide');
        alertify.success("New shift is added.");
    }
    editShift() {
        const obj = {
            title: this.editShiftForm.value.Title,
            startDate: this.editShiftForm.value.StartDate,
            endDate: this.editShiftForm.value.EndDate,
            createBy: this.editShiftForm.value.CreateBy,
            createdDate: this.editShiftForm.value.CreatedDate,
            updateBy: this.editShiftForm.value.UpdateBy,
            updatedDate: this.editShiftForm.value.UpdatedDate,
            breakTime: this.editShiftForm.value.BreakTime,
            isActive: this.editShiftForm.value.IsActive,
            attendances: this.editShiftForm.value.Attendances,
            id: this.editShiftForm.value.EditId,
        };
        this.shiftService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#edit_shift').modal('hide');
        alertify.warning("Chosen shift is updated.");
    }
    setShift(value) {
        this.updateId = value;
        const index = this.shifts.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.shifts[index];
        this.editShiftForm.get('EditId').setValue(toSetValues.id);
        this.editShiftForm.get('Title').setValue(toSetValues.title);
        this.editShiftForm.get('StartDate').setValue(toSetValues.startDate);
        this.editShiftForm.get('EndDate').setValue(toSetValues.endDate);
        this.editShiftForm.get('CreateBy').setValue(toSetValues.createBy);
        this.editShiftForm.get('CreatedDate').setValue(toSetValues.createdDate);
        this.editShiftForm.get('UpdateBy').setValue(toSetValues.updateBy);
        this.editShiftForm.get('UpdatedDate').setValue(toSetValues.updatedDate);
        this.editShiftForm.get('BreakTime').setValue(toSetValues.breakTime);
        this.editShiftForm.get('IsActive').setValue(toSetValues.isActive);
        this.editShiftForm.get('Attendances').setValue(toSetValues.attendances);
    }
    deleteShift() {
        //this.shiftService.delete(this.tempId, this.apiUrl).subscribe(() => {});
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.tempId},
        };
        this.httpService.delete(`${this.apiUrl}/Delete`, httpOptions).subscribe(() => {});
        this.setPage({offset:0});
        $('#delete_shift').hide();
        alertify.error("Chosen shift is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset+1)
        this.shiftService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator=false;
                    $('#ngx-dt70.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.shifts = data.data;
            });
    }
}
