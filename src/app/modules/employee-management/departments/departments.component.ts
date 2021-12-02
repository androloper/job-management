import { Component } from '@angular/core';
import { ColumnMode } from "@swimlane/ngx-datatable";
import {DepartmentService} from "./services/department.service";
import {Department} from "./models/department"
import {PaginationResponse} from "../../services/pagination-response";
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare let alertify: any;
declare const $: any;
@Component({
    selector: 'departments',
    providers: [DepartmentService],
    templateUrl: 'departments.component.html',
    styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent {
    private apiUrl: string = `${environment.taskManagementUrl}/Departments`;
    loadingIndicator = true;
    page = new Page();
    departments = new Array<Department>()
    ColumnMode = ColumnMode;
    addDepartmentForm: FormGroup;
    editDepartmentForm: FormGroup;
    tempId: any;
    updateId: any;
    editId:any;
    constructor(private paginationResponse: PaginationResponse<Department>, private departmentService: DepartmentService, private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addDepartmentForm = this.formBuilder.group({
            Id: [''],
            Name: ['', [Validators.required]],
            CreateBy: ['', [Validators.required]],
            CreatedDate: [''],
            UpdateBy: [''],
            UpdatedDate: [''],
            IsActive: ['', [Validators.required]],
            DepartmentManagers: [''],
        });
        this.editDepartmentForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            CreateBy: [''],
            CreatedDate: [''],
            UpdateBy: ['', [Validators.required]],
            UpdatedDate: [''],
            IsActive: ['', [Validators.required]],
            DepartmentManagers: [''],
        });
    }
    addDepartment() {
        const obj = {
            id: this.addDepartmentForm.value.Id,
            name: this.addDepartmentForm.value.Name,
            createBy: this.addDepartmentForm.value.CreateBy,
            createdDate: this.addDepartmentForm.value.CreatedDate,
            updateBy: this.addDepartmentForm.value.UpdateBy,
            updatedDate: this.addDepartmentForm.value.UpdatedDate,
            isActive: this.addDepartmentForm.value.IsActive,
            departmentManagers: this.addDepartmentForm.value.DepartmentManagers,
        };
        this.departmentService.insert(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#add_department').modal('hide');
        alertify.success("New department is added.");
    }
    editDepartment() {
        const obj = {
            name: this.editDepartmentForm.value.Name,
            createBy: this.editDepartmentForm.value.CreateBy,
            createdDate: this.editDepartmentForm.value.CreatedDate,
            updateBy: this.editDepartmentForm.value.UpdateBy,
            updatedDate: this.editDepartmentForm.value.UpdatedDate,
            isActive: this.editDepartmentForm.value.IsActive,
            departmentManagers: this.editDepartmentForm.value.DepartmentManagers,
            id: this.editDepartmentForm.value.EditId,
        };
        this.departmentService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#edit_department').modal('hide');
        alertify.warning("Chosen department is updated.");
    }
    setDepartment(value) {
        this.editId = value;
        const index = this.departments.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.departments[index];
        this.editDepartmentForm.setValue({
            EditId: toSetValues.id,
            Name: toSetValues.name,
            CreateBy: toSetValues.createBy,
            CreatedDate: toSetValues.createdDate,
            UpdateBy: toSetValues.updateBy,
            UpdatedDate: toSetValues.updatedDate,
            IsActive: toSetValues.isActive,
            DepartmentManagers: toSetValues.departmentManagers,
        });
    }
    deleteDepartment() {
        this.departmentService.delete(this.tempId, this.apiUrl).subscribe(() => {});
        this.setPage({offset:0});
        $('#delete_department').hide();
        alertify.error("Chosen department is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.departmentService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                console.log(data)
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt64.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.departments = data.data;
            });
    }
}
