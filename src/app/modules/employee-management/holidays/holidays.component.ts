import {Component} from '@angular/core';
import { ColumnMode } from "@swimlane/ngx-datatable";
import {HolidayService} from "./services/holiday.service";
import {Holiday} from "./models/holiday";
import {PaginationResponse} from "../../services/pagination-response";
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare let alertify: any;
declare const $: any;
@Component({
    selector: 'holidays',
    providers: [HolidayService],
    templateUrl: 'holidays.component.html',
    styleUrls: ['./holidays.component.scss'],
})
export class HolidaysComponent {
    private apiUrl: string = `${environment.taskManagementUrl}/Holidays`;
    loadingIndicator = true;
    page = new Page();
    holidays = new Array<Holiday>();
    ColumnMode = ColumnMode;
    addHolidayForm: FormGroup;
    editHolidayForm: FormGroup;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Holiday>, private holidayService: HolidayService, private formBuilder: FormBuilder) {
       this.page.pageNumber = 1;
       this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addHolidayForm = this.formBuilder.group({
            Id: [''],
            Title: ['', [Validators.required]],
            StartDate: ['', [Validators.required]],
            EndDate: ['', [Validators.required]],
            Day: ['', [Validators.required]],
            CreatedDate: ['', [Validators.required]],
            UpdatedDate: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
        });
        this.editHolidayForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Title: ['', [Validators.required]],
            StartDate: ['', [Validators.required]],
            EndDate: ['', [Validators.required]],
            Day: ['', [Validators.required]],
            CreatedDate: ['', [Validators.required]],
            UpdatedDate: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
        });
    }
    addHoliday() {
        const obj = {
            id: this.addHolidayForm.value.Id,
            title: this.addHolidayForm.value.Title,
            startDate: this.addHolidayForm.value.StartDate,
            endDate: this.addHolidayForm.value.EndDate,
            day: this.addHolidayForm.value.Day,
            createdDate: this.addHolidayForm.value.CreatedDate,
            updatedDate: this.addHolidayForm.value.UpdatedDate,
            isActive: this.addHolidayForm.value.IsActive,
        };
        this.holidayService.insert(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#add_holiday').modal('hide');
        alertify.success("New holiday is added.");
    }
    editHoliday() {
        const obj = {
            title: this.editHolidayForm.value.Title,
            startDate: this.editHolidayForm.value.StartDate,
            endDate: this.editHolidayForm.value.EndDate,
            day: this.editHolidayForm.value.Day,
            createdDate: this.editHolidayForm.value.CreatedDate,
            updatedDate: this.editHolidayForm.value.UpdatedDate,
            isActive: this.editHolidayForm.value.IsActive,
            id: this.editHolidayForm.value.EditId,
        };
        this.holidayService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#edit_holiday').modal('hide');
        alertify.warning("Chosen holiday is updated.");
    }
    setHoliday(value) {
        this.updateId = value;
        const index = this.holidays.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.holidays[index];
        this.editHolidayForm.get('EditId').setValue(toSetValues.id);
        this.editHolidayForm.get('Title').setValue(toSetValues.title);
        this.editHolidayForm.get('StartDate').setValue(toSetValues.startDate);
        this.editHolidayForm.get('EndDate').setValue(toSetValues.endDate);
        this.editHolidayForm.get('Day').setValue(toSetValues.day);
        this.editHolidayForm.get('CreatedDate').setValue(toSetValues.createdDate);
        this.editHolidayForm.get('UpdatedDate').setValue(toSetValues.updatedDate);
        this.editHolidayForm.get('IsActive').setValue(toSetValues.isActive);
    }
    deleteHoliday() {
        this.holidayService.delete(this.tempId, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#delete_holiday').hide();
        alertify.error("Chosen holiday is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset+1)
        this.holidayService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator=false;
                    $('#ngx-dt65.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.holidays = data.data;
            });
    }
}
