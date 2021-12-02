import {Component, OnInit} from '@angular/core';
import {ColumnMode} from "@swimlane/ngx-datatable";
import {environment} from "../../../../../environments/environment";
import {Page} from "../../../services/page";
import {PaginationResponse} from "../../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {CompaniesService} from "./services/companies.service";
import {Companies} from "./models/companies";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare let alertify: any;
declare const $: any;
@Component({
    selector: 'companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/ServiceCompanies`;
    loadingIndicator = true;
    page = new Page();
    companies = new Array<Companies>();
    ColumnMode = ColumnMode;
    addCompanyForm: FormGroup;
    editCompanyForm: FormGroup;
    userId: any;
    editId: any;
    tempId: any;
    updateId: any;

    constructor(private paginationResponse: PaginationResponse<Companies>,
                private httpService: HttpClient,
                private formBuilder: FormBuilder,
                private companiesService: CompaniesService) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }

    ngOnInit() {
        this.setPage({offset: 0});
        this.addCompanyForm = this.formBuilder.group({
            Id: [''],
            Name: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Address: ['', [Validators.required]],
        });
        this.editCompanyForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Address: ['', [Validators.required]],
        });
    }

    addCompany() {
        const obj = {
            id: this.addCompanyForm.value.Id,
            name: this.addCompanyForm.value.Name,
            description: this.addCompanyForm.value.Description,
            address: this.addCompanyForm.value.Address
        };
        this.companiesService.insert(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset: 0});
        $('#add_company').modal('hide');
        alertify.success("New company is added.");
    }

    editCompany() {
        const obj = {
            id: this.editCompanyForm.value.EditId,
            name: this.editCompanyForm.value.Name,
            description: this.editCompanyForm.value.Description,
            address: this.editCompanyForm.value.Address
        };
        this.companiesService.update(obj, this.apiUrl).subscribe(() => {});
        this.setPage({offset: 0});
        $('#edit_company').modal('hide');
        alertify.warning("Chosen company is updated.");
    }

    setCompany(value) {
        this.editId = value;
        const index = this.companies.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.companies[index];
        this.editCompanyForm.get('EditId').setValue(toSetValues.id);
        this.editCompanyForm.get('Name').setValue(toSetValues.name);
        this.editCompanyForm.get('Description').setValue(toSetValues.description);
        this.editCompanyForm.get('Address').setValue(toSetValues.address);
    }

    deleteCompany() {
        // this.allServicesService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.apiUrl}/Delete/${this.tempId}`).subscribe(() => {
        });
        this.setPage({offset: 0});
        $('#delete_company').hide();
        alertify.error("Chosen company is deleted.");
    }

    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.companiesService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt52.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.companies = data.data;
            });
    }
}
