import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Page} from "../../services/page";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationResponse} from "../../services/pagination-response";
import {HttpClient} from "@angular/common/http";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {RuleService} from "./services/rule.service";
import {Rule} from "./models/rule";

declare let alertify: any;
declare const $: any;
@Component({
  selector: 'rules',
  providers: [RuleService],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
    private apiUrl: string = `${environment.vehicleTrackingUrl}/VehicleRules`;
    loadingIndicator = true;
    page = new Page();
    rules = new Array<Rule>();
    ColumnMode = ColumnMode;
    addRuleForm: FormGroup;
    editRuleForm: FormGroup;
    userId: any;
    editId:any;
    tempId: any;
    updateId: any;
    constructor(private paginationResponse: PaginationResponse<Rule>,
                private httpService: HttpClient,
                private ruleService: RuleService,
                private formBuilder: FormBuilder) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }
    ngOnInit() {
        this.setPage({ offset: 0 });
        this.addRuleForm = this.formBuilder.group({
            Id: [''],
            Name: ['', [Validators.required]],
            Value: ['',[Validators.required]],
            VehicleId: ['',[Validators.required]],
            Vehicle: [''],
        });
        this.editRuleForm = this.formBuilder.group({
            EditId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            Value: ['',[Validators.required]],
            VehicleId: ['',[Validators.required]],
            Vehicle: [''],
        });
    }
    addRule() {
        const obj = {
            id: this.addRuleForm.value.Id,
            name: this.addRuleForm.value.Name,
            value: this.addRuleForm.value.Value,
            vehicleId: this.addRuleForm.value.VehicleId,
            vehicle: this.addRuleForm.value.Vehicle,
        };
        this.ruleService.insert(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#add_rule').modal('hide');
        alertify.success("New rule is added.");
    }
    editRule() {
        const obj = {
            id: this.editRuleForm.value.EditId,
            name: this.editRuleForm.value.Name,
            value: this.editRuleForm.value.Value,
            vehicleId: this.editRuleForm.value.VehicleId,
            vehicle: this.editRuleForm.value.Vehicle,
        };
        this.ruleService.update(obj, this.apiUrl).subscribe(() =>{});
        this.setPage({offset:0});
        $('#edit_rule').modal('hide');
        alertify.warning("Chosen rule is updated.");
    }
    setRule(value) {
        this.editId = value;
        const index = this.rules.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.rules[index];
        this.editRuleForm.get('EditId').setValue(toSetValues.id);
        this.editRuleForm.get('Name').setValue(toSetValues.name);
        this.editRuleForm.get('Value').setValue(toSetValues.value);
        this.editRuleForm.get('VehicleId').setValue(toSetValues.vehicleId);
        this.editRuleForm.get('Vehicle').setValue(toSetValues.vehicle);
    }
    deleteRule() {
        //this.ruleService.delete(this.tempId, this.apiUrl).subscribe((data) => {console.log(data)});
        this.httpService.delete(`${this.apiUrl}/Delete/${this.tempId}`).subscribe(() =>{});
        this.setPage({offset:0});
        $('#delete_rule').hide();
        alertify.error("Chosen rule is deleted.");
    }
    /**
     * Populate the table with new data based on the page number
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.page.pageNumber = (pageInfo.offset + 1)
        this.ruleService.getListPagination(this.page.pageNumber, this.page.size, this.apiUrl)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator = false;
                    $('#ngx-dt8.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.rules = data.data;
            });
    }
}
