import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {environment} from "../../../../../environments/environment";
import {Page} from "../../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../../services/pagination-response";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {Employee} from "../models/employee";
import {HttpClient} from "@angular/common/http";

declare let alertify: any;
declare const $: any;
@Component({
    selector: 'employee-list',
    providers: [EmployeeService],
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
})
 export class EmployeeListComponent implements OnInit {
    private apiUrl: string = `${environment.identityServerUrl}/Users`;
    loadingIndicator = true;
    page = new Page();
    employees = new Array<Employee>();
    ColumnMode = ColumnMode;
    addEmployeeForm: FormGroup;
    editEmployeeForm: FormGroup;
    userId: any;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Employee>, private http: HttpClient, private employeeService: EmployeeService, private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addEmployeeForm = this.formBuilder.group({
            ProfileImagePath: ['', [Validators.required]],
            Id: ['', [Validators.required]],
            FirstName: ['', [Validators.required]],
            LastName: ['',[Validators.required]],
            Email: ['',[Validators.required]],
            EmployeeId: ['',[Validators.required]],
            IsActive: ['',[Validators.required]],
            JobName: ['',[Validators.required]],
        });
        this.editEmployeeForm = this.formBuilder.group({
            ProfileImagePath: ['', [Validators.required]],
            Id: ['', [Validators.required]],
            FirstName: ['', [Validators.required]],
            LastName: ['',[Validators.required]],
            Email: ['',[Validators.required]],
            EmployeeId: ['',[Validators.required]],
            IsActive: ['',[Validators.required]],
            JobName: ['',[Validators.required]],
        });
    }
    addEmployee() {
        const obj = {
            id: this.addEmployeeForm.value.Id,
            profileImagePath: this.addEmployeeForm.value.ProfileImagePath,
            firstName: this.addEmployeeForm.value.FirstName,
            lastName: this.addEmployeeForm.value.LastName,
            email: this.addEmployeeForm.value.Email,
            employeeId: this.addEmployeeForm.value.EmployeeId,
            isActive: this.addEmployeeForm.value.IsActive,
            jobName: this.addEmployeeForm.value.JobName,
        };
        this.employeeService.insert(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#add_employee').modal('hide');
        alertify.success("New employee is added.");
    }
    editEmployee() {
        const obj = {
            profileImagePath: this.editEmployeeForm.value.ProfileImagePath,
            firstName: this.editEmployeeForm.value.FirstName,
            lastName: this.editEmployeeForm.value.LastName,
            email: this.editEmployeeForm.value.Email,
            employeeId: this.editEmployeeForm.value.EmployeeId,
            isActive: this.editEmployeeForm.value.IsActive,
            jobName: this.editEmployeeForm.value.JobName,
            id: this.updateId,
        };
        this.employeeService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#edit_employee').modal('hide');
        alertify.warning("Chosen employee is updated.");
    }
    deleteEmployee() {
        this.employeeService.delete(this.tempId, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#delete_employee').hide();
        alertify.error("Chosen employee is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.employeeService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt60.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.employees = data.data;
            });
    }
}
