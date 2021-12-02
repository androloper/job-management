import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {EmployeeProfile} from "../models/employee-profile";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BankService} from "../services/bank.service";
import {EmergencyService} from "../services/emergency.service";
import {EducationService} from "../services/education.service";
import {VehicleService} from "../services/vehicle.service";
import {ExperienceService} from "../services/experience.service";
import {AddressService} from "../services/address.service";
import {JobService} from "../services/job.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {EmployeeProfileService} from "../services/employee-profile.service";
import {Leave} from "../../leaves/models/leave";
import {Page} from "../../../services/page";
import { ColumnMode } from "@swimlane/ngx-datatable";
import {PaginationResponse} from "../../../services/pagination-response";
import {Attendance} from "../../attendance/models/attendance";
import {Project} from "../../projects/models/project";
import {parseInt} from "lodash-es";

declare let alertify: any;
declare const $: any;

@Component({
    selector: 'employee-profile',
    providers: [BankService, EmergencyService, EducationService, ExperienceService, VehicleService, AddressService, JobService],
    templateUrl: './employee-profile.component.html',
    styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
    private apiUrl: string = `${environment.identityServerUrl}/Users`;
    private bankUrl: string = `${environment.identityServerUrl}/BankInformations`;
    private emergencyUrl: string = `${environment.identityServerUrl}/EmergencyContactInfos`;
    private educationUrl: string = `${environment.identityServerUrl}/EducationInformations`;
    private experienceUrl: string = `${environment.identityServerUrl}/Experiences`;
    private vehicleUrl: string = `${environment.identityServerUrl}/UserVehicleInformations`;
    private addressUrl: string = `${environment.identityServerUrl}/Addresses`;
    private jobUrl: string = `${environment.identityServerUrl}/Jobs`;
    private leaveUrl: string = `${environment.taskManagementUrl}/UserLeaves`;
    private attendanceUrl: string = `${environment.taskManagementUrl}/Attendances`;
    private projectUrl: string = `${environment.taskManagementUrl}/Projects`;
    profileInfo = new Array<EmployeeProfile>();
    //profileInformations: any;
    //personalInformations: any;
    emergencyContactInfos: any;
    bankInformations: any;
    educationInformations: any;
    experiences: any;
    userVehicleInformations: any;
    addresses: any;
    job: any;
    userId: any;
    editId: any;
    deleteId: string;
    loadingIndicator = true;
    page = new Page();
    leaves = new Array<Leave>();
    attendance = new Array<Attendance>();
    projects = new Array<Project>();
    ColumnMode = ColumnMode;

    editProfileForm: FormGroup;
    editPersonalForm: FormGroup;
    editBankForm: FormGroup;
    addBankForm: FormGroup;
    editEmergencyForm: FormGroup;
    addEmergencyForm: FormGroup;
    editEducationForm: FormGroup;
    addEducationForm: FormGroup;
    editExperienceForm: FormGroup;
    addExperienceForm: FormGroup;
    editVehicleForm: FormGroup;
    addVehicleForm: FormGroup;
    editAddressForm: FormGroup;
    editJobForm: FormGroup;

    constructor(private httpService: HttpClient,
                private bankService: BankService,
                private emergencyService: EmergencyService,
                private educationService: EducationService,
                private experienceService: ExperienceService,
                private vehicleService: VehicleService,
                private addressService: AddressService,
                private jobService: JobService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private authService:AuthService,
                private employeeProfileService:EmployeeProfileService) {
        this.page.pageNumber = 1;
        this.page.size = 10;
    }

    ngOnInit(): void {
        this.getProfileInfos();
        this.editProfileForm = this.formBuilder.group({
            ProfileId: ['', [Validators.required]],
            ProfileImagePath: ['', [Validators.required]],
            FirstName: ['', [Validators.required]],
            LastName: ['', [Validators.required]],
            JobName: ['', [Validators.required]],
            EmployeeId: ['', [Validators.required]],
            DriverLicense: ['', [Validators.required]],
            JoiningDate: ['', [Validators.required]],
            Phone: ['', [Validators.required]],
            Email: ['', [Validators.required]],
            BirthDate: ['', [Validators.required]],
            Address: ['', [Validators.required]],
            Gender: ['', [Validators.required]],
            ReportsTo: ['', [Validators.required]],
        });
        this.editPersonalForm = this.formBuilder.group({
            PersonalId: ['', [Validators.required]],
            PassportNo: ['', [Validators.required]],
            PassportExpDate: ['', [Validators.required]],
            DriverLicenseExpDate: ['', [Validators.required]],
            Phone: ['', [Validators.required]],
            Nationality: ['', [Validators.required]],
            Religion: ['', [Validators.required]],
            MaritalStatus: ['', [Validators.required]],
        });
        this.addBankForm = this.formBuilder.group({
            AddBankId: [''],
            AddBankName: ['', [Validators.required]],
            AddAccountNo: ['', [Validators.required]],
            AddIfscNo: ['', [Validators.required]],
            AddBankApplicationUserId: ['', [Validators.required]],
        });
        this.editBankForm = this.formBuilder.group({
            BankId: ['', [Validators.required]],
            BankName: ['', [Validators.required]],
            AccountNo: ['', [Validators.required]],
            IfscNo: ['', [Validators.required]],
            BankApplicationUserId: ['', [Validators.required]],
        });
        this.editEmergencyForm = this.formBuilder.group({
            EmergencyId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            Relationship: ['', [Validators.required]],
            Phone: ['', [Validators.required]],
            EmergencyApplicationUserId:['', [Validators.required]],
        });
        this.addEmergencyForm = this.formBuilder.group({
            AddEmergencyId: [''],
            AddName: ['', [Validators.required]],
            AddRelationship: ['', [Validators.required]],
            AddPhone: ['', [Validators.required]],
            AddEmergencyApplicationUserId:['', [Validators.required]],
        });
        this.editEducationForm = this.formBuilder.group({
            EducationId: ['', [Validators.required]],
            SchoolName: ['', [Validators.required]],
            Section: ['', [Validators.required]],
            StartDate: ['', [Validators.required]],
            EndDate: ['', [Validators.required]],
            EducationApplicationUserId: ['', [Validators.required]],
        });
        this.addEducationForm = this.formBuilder.group({
            AddEducationId: [''],
            AddSchoolName: ['', [Validators.required]],
            AddSection: ['', [Validators.required]],
            AddStartDate: ['', [Validators.required]],
            AddEndDate: ['', [Validators.required]],
            AddEducationApplicationUserId: ['', [Validators.required]],
        });
        this.editExperienceForm = this.formBuilder.group({
            ExperienceId: ['', [Validators.required]],
            Job: ['', [Validators.required]],
            Company: ['', [Validators.required]],
            StartDate: ['', [Validators.required]],
            EndDate: ['', [Validators.required]],
            ExperienceApplicationUserId: ['', [Validators.required]],
        });
        this.addExperienceForm = this.formBuilder.group({
            AddExperienceId: [''],
            AddJob: ['', [Validators.required]],
            AddCompany: ['', [Validators.required]],
            AddStartDate: ['', [Validators.required]],
            AddEndDate: ['', [Validators.required]],
            AddExperienceApplicationUserId: ['', [Validators.required]],
        });
        this.editVehicleForm = this.formBuilder.group({
            VehicleId: ['', [Validators.required]],
            DeliveryArea: ['', [Validators.required]],
            DeliveryPackage: ['', [Validators.required]],
            Dispatcher: ['', [Validators.required]],
            DispatcherId: ['', [Validators.required]],
            EmploymentModel: ['', [Validators.required]],
            VehicleApplicationUserId: ['', [Validators.required]],
        });
        this.addVehicleForm = this.formBuilder.group({
            AddVehicleId: [''],
            AddDeliveryArea: ['', [Validators.required]],
            AddDeliveryPackage: ['', [Validators.required]],
            AddDispatcher: ['', [Validators.required]],
            AddDispatcherId: ['', [Validators.required]],
            AddEmploymentModel: ['', [Validators.required]],
            AddVehicleApplicationUserId: ['', [Validators.required]],
        });
        this.editAddressForm = this.formBuilder.group({
            AddressId: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            City: ['', [Validators.required]],
            Country: ['', [Validators.required]],
            ZipCode: ['', [Validators.required]],
            CreatedDate: ['', [Validators.required]],
            CreateBy: ['', [Validators.required]],
            UpdatedDate: ['', [Validators.required]],
            UpdateBy: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
            AddressUserId: ['', [Validators.required]],
        });
        this.editJobForm = this.formBuilder.group({
            JobId: ['', [Validators.required]],
            Name: ['', [Validators.required]],
            CreateBy: ['', [Validators.required]],
            CreatedDate: ['', [Validators.required]],
            UpdateBy: ['', [Validators.required]],
            UpdatedDate: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
        });
    }

    getProfileInfos() {
        this.userId = this.activatedRoute.snapshot.paramMap.get('id');
        this.httpService.get<EmployeeProfile>(`${this.apiUrl}/GetUserWithProfileInfoByUserId?userid=${this.userId}`).subscribe(data => {
            this.profileInfo = data['data'];
            this.profileImagePath = this.profileInfo['profileImagePath'];
            this.emergencyContactInfos = data['data']['emergencyContactInfos'];
            this.bankInformations = data['data']['bankInformations'];
            this.educationInformations = data['data']['educationInformations'];
            this.experiences = data['data']['experiences'];
            this.userVehicleInformations = data['data']['userVehicleInformations'];
            this.addresses = data['data']['addresses'];
            this.job = data['data'].job;
        });
    }

    getUserProjectsInfo(pageInfo){
        this.page.pageNumber = (pageInfo.offset+1)
        this.httpService.get<PaginationResponse<Project>>(`${this.projectUrl}/GetProjectsByUserId?id=${this.userId}&PageNumber=12&PageSize=${this.page.size}`)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator=false;
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.projects = data.data;
                console.log(this.projects);
            });
    }
    test(x:any) {
        console.log(typeof x);
        this.page.pageNumber=parseInt(x);
        this.getUserProjectsInfo({offset: x});
        console.log(x);
    }

    getUserAttendanceInfo(pageInfo){
        this.page.pageNumber = (pageInfo.offset+1)
        this.httpService.get<PaginationResponse<Attendance>>(`${this.attendanceUrl}/GetAttendaceByUserIdListPagination?UserId=${this.userId}&PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator=false;
                    $('#ngx-dt61.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.attendance = data.data;
            });
    }

    getUserLeavesInfo(pageInfo){
        this.page.pageNumber = (pageInfo.offset+1)
        this.httpService.get<PaginationResponse<Leave>>(`${this.leaveUrl}/GetListPaginationByUserId?userId=${this.userId}&PageNumber=${this.page.pageNumber}&PageSize=${this.page.size}`)
            .subscribe(data => {
                setTimeout(async () => {
                    this.loadingIndicator=false;
                    $('#ngx-dt62.datatable-scroll').width('100%');
                }, 2000)
                this.page.pageNumber = data.pageNumber - 1;
                this.page.size = data.pageSize;
                this.page.totalPages = data.totalPages;
                this.page.totalElements = data.totalRecords;
                this.leaves = data.data;
            });
    }

    updateProfileInfo() {
        const obj = {
            profileImagePath: this.editProfileForm.value.ProfileImagePath,
            firstName: this.editProfileForm.value.FirstName,
            lastName: this.editProfileForm.value.LastName,
            jobName: this.editProfileForm.value.JobName,
            employeeId: this.editProfileForm.value.EmployeeId,
            driverLicense: this.editProfileForm.value.DriverLicense,
            joiningDate: this.editProfileForm.value.JoiningDate,
            phone: this.editProfileForm.value.Phone,
            email: this.editProfileForm.value.Email,
            birthDate: this.editProfileForm.value.BirthDate,
            address: this.editProfileForm.value.Address,
            gender: this.editProfileForm.value.Gender,
            reportsTo: this.editProfileForm.value.ReportsTo,
            id: this.editProfileForm.value.ProfileId,
        };
        //this.httpService.put('').subscribe(() => {});
        this.getProfileInfos();
        $('#profile_info').modal('hide');
        alertify.warning("Personal Information is updated.");
    }

    setProfile(value) {
        this.editId = value;
        this.editProfileForm.get('ProfileId').setValue(this.profileInfo['id']);
        //this.editProfileForm.get('ProfileImagePath').setValue(this.profileInfo['profileImagePath']);
        this.profileImagePath = this.profileInfo['profileImagePath'];
        this.editProfileForm.get('FirstName').setValue(this.profileInfo['firstName']);
        this.editProfileForm.get('LastName').setValue(this.profileInfo['lastName']);
        this.editProfileForm.get('JobName').setValue(this.job['name']);
        this.editProfileForm.get('EmployeeId').setValue(this.profileInfo['employeeId']);
        this.editProfileForm.get('DriverLicense').setValue(this.profileInfo['driverLicense']);
        this.editProfileForm.get('JoiningDate').setValue(this.profileInfo['joiningDate']);
        this.editProfileForm.get('Phone').setValue(this.profileInfo['phoneNumber']);
        this.editProfileForm.get('Email').setValue(this.profileInfo['email']);
        this.editProfileForm.get('BirthDate').setValue(this.profileInfo['birthDate']);
        this.editProfileForm.get('Address').setValue(this.addresses[0]['description']);
        this.editProfileForm.get('Gender').setValue(this.profileInfo['gender']);
        this.editProfileForm.get('ReportsTo').setValue(this.profileInfo['reportsTo']);
    }

    updatePersonalInfo() {
        const obj = {
            passportNo: this.editPersonalForm.value.PassportNo,
            passportExpDate: this.editPersonalForm.value.PassportExpDate,
            driverLicenseExpDate: this.editPersonalForm.value.DriverLicenseExpDate,
            phone: this.editPersonalForm.value.Phone,
            nationality: this.editPersonalForm.value.Nationality,
            religion: this.editPersonalForm.value.Religion,
            maritalStatus: this.editPersonalForm.value.MaritalStatus,
            id: this.editPersonalForm.value.PersonalId,
        };
        //this.httpService.put('').subscribe(() => {});
        this.getProfileInfos();
        $('#personal_info_modal').modal('hide');
        alertify.warning("Personal Information is updated.");
    }

    setPersonal(value) {
        this.editId = value;
        this.editPersonalForm.get('PersonalId').setValue(this.profileInfo['id']);
        this.editPersonalForm.get('PassportNo').setValue(this.profileInfo['passportNumber']);
        this.editPersonalForm.get('PassportExpDate').setValue(this.profileInfo['passportExpiryDate']);
        this.editPersonalForm.get('DriverLicenseExpDate').setValue(this.profileInfo['expireDateOfTheDriverLicence']);
        this.editPersonalForm.get('Phone').setValue(this.profileInfo['phoneNumber']);
        this.editPersonalForm.get('Nationality').setValue(this.profileInfo['nationality']);
        this.editPersonalForm.get('Religion').setValue(this.profileInfo['religion']);
        this.editPersonalForm.get('MaritalStatus').setValue(this.profileInfo['maritalStatus']);
    }

    addEmergencyContact() {
        const obj = {
            id: this.addEmergencyForm.value.AddEmergencyId,
            name: this.addEmergencyForm.value.AddName,
            relationShip: this.addEmergencyForm.value.AddRelationship,
            phone: this.addEmergencyForm.value.AddPhone,
            applicationUserId: this.userId,
        };
        console.log(obj);
        this.emergencyService.insert(obj, this.emergencyUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#add_emergency_contact_modal').modal('hide');
        alertify.success("New emergency contact is added.");
    }

    updateEmergencyContact() {
        const obj = {
            id: this.editEmergencyForm.value.EmergencyId,
            name: this.editEmergencyForm.value.Name,
            relationShip: this.editEmergencyForm.value.Relationship,
            phone: this.editEmergencyForm.value.Phone,
            applicationUserId: this.editEmergencyForm.value.EmergencyApplicationUserId,
        };
        console.log(obj);
        this.emergencyService.update(obj, this.emergencyUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#emergency_contact_modal').modal('hide');
        alertify.warning("Emergency Contact is updated.");
    }

    setEmergency(value) {
        this.editId = value;
        const index = this.emergencyContactInfos.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.emergencyContactInfos[index];
        this.editEmergencyForm.get('EmergencyId').setValue(toSetValues.id);
        this.editEmergencyForm.get('Name').setValue(toSetValues.name);
        this.editEmergencyForm.get('Relationship').setValue(toSetValues.relationShip);
        this.editEmergencyForm.get('Phone').setValue(toSetValues.phone);
        this.editEmergencyForm.get('EmergencyApplicationUserId').setValue(toSetValues.applicationUserId);
    }

    deleteEmergency() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.deleteId},
        };
        this.httpService.delete(`${this.emergencyUrl}/Delete`, httpOptions).subscribe((data) => console.log(data));
        this.getProfileInfos();
        $('#delete_emergency_contact_modal').hide();
        alertify.error("Chosen emergency contact is deleted.");
    }

    addBankInfo() {
        const obj = {
            id: this.addBankForm.value.AddBankId,
            bankName: this.addBankForm.value.AddBankName,
            accountNo: this.addBankForm.value.AddAccountNo,
            ifscNo: this.addBankForm.value.AddIfscNo,
            applicationUserId: this.userId,
        };
        this.bankService.insert(obj, this.bankUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#add_bank_info_modal').modal('hide');
        alertify.success("New bank information is added.");
    }

    updateBankInfo() {
        const obj = {
            id: this.editBankForm.value.BankId,
            bankName: this.editBankForm.value.BankName,
            accountNo: this.editBankForm.value.AccountNo,
            ifscNo: this.editBankForm.value.IfscNo,
            applicationUserId: this.editBankForm.value.BankApplicationUserId,
        };
        console.log(obj);
        this.bankService.update(obj, this.bankUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#bank_info_modal').modal('hide');
        alertify.warning("Bank Information is updated.");
    }

    setBank(value) {
        this.editId = value;
        const index = this.bankInformations.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.bankInformations[index];
        this.editBankForm.get('BankId').setValue(toSetValues.id);
        this.editBankForm.get('BankName').setValue(toSetValues.bankName);
        this.editBankForm.get('AccountNo').setValue(toSetValues.accountNo);
        this.editBankForm.get('IfscNo').setValue(toSetValues.ifscNo);
        this.editBankForm.get('BankApplicationUserId').setValue(toSetValues.applicationUserId);
    }

    deleteBank() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.deleteId},
        };
        this.httpService.delete(`${this.bankUrl}/Delete`, httpOptions).subscribe((data) => console.log(data));
        this.getProfileInfos();
        $('#delete_bank_info_modal').hide();
        alertify.error("Chosen bank information is deleted.");

    }

    addVehicleInfo() {
        const obj = {
            id: this.addVehicleForm.value.AddVehicleId,
            deliveryArea: this.addVehicleForm.value.AddDeliveryArea,
            deliveryPackage: this.addVehicleForm.value.AddDeliveryPackage,
            dispatcher: this.addVehicleForm.value.AddDispatcher,
            dispatcherId: this.addVehicleForm.value.AddDispatcherId,
            employmentModel: this.addVehicleForm.value.AddEmploymentModel,
            applicationUserId: this.userId,
        };
        console.log(obj);
        this.vehicleService.insert(obj, this.vehicleUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#add_vehicle_info_modal').modal('hide');
        alertify.success("New vehicle Iinformation is added.");
    }

    updateVehicleInfo() {
        const obj = {
            id: this.editVehicleForm.value.VehicleId,
            deliveryArea: this.editVehicleForm.value.DeliveryArea,
            deliveryPackage: this.editVehicleForm.value.DeliveryPackage,
            dispatcher: this.editVehicleForm.value.Dispatcher,
            dispatcherId: this.editVehicleForm.value.DispatcherId,
            employmentModel: this.editVehicleForm.value.EmploymentModel,
            applicationUserId: this.editVehicleForm.value.VehicleApplicationUserId,
        };
        console.log(obj);
        this.vehicleService.update(obj, this.vehicleUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#vehicle_info_modal').modal('hide');
        alertify.warning("Vehicle Information is updated.");
    }

    setVehicle(value) {
        this.editId = value;
        const index = this.userVehicleInformations.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.userVehicleInformations[index];
        this.editVehicleForm.get('VehicleId').setValue(toSetValues.id);
        this.editVehicleForm.get('DeliveryArea').setValue(toSetValues.deliveryArea);
        this.editVehicleForm.get('DeliveryPackage').setValue(toSetValues.deliveryPackage);
        this.editVehicleForm.get('Dispatcher').setValue(toSetValues.dispatcher);
        this.editVehicleForm.get('DispatcherId').setValue(toSetValues.dispatcherId);
        this.editVehicleForm.get('EmploymentModel').setValue(toSetValues.employmentModel);
        this.editVehicleForm.get('VehicleApplicationUserId').setValue(toSetValues.applicationUserId);
    }

    deleteVehicle() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.deleteId},
        };
        this.httpService.delete(`${this.vehicleUrl}/Delete`, httpOptions).subscribe((data) => console.log(data));
        this.getProfileInfos();
        $('#delete_vehicle_info_modal').hide();
        alertify.error("Chosen vehicle information is deleted.");
    }

    addEducationInfo() {
        const obj = {
            id: this.addEducationForm.value.AddEducationId,
            schoolName: this.addEducationForm.value.AddSchoolName,
            section: this.addEducationForm.value.AddSection,
            startDate: this.addEducationForm.value.AddStartDate,
            endDate: this.addEducationForm.value.AddEndDate,
            applicationUserId: this.userId,
        };
        console.log(obj);
        this.educationService.insert(obj, this.educationUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#add_education_info').modal('hide');
        alertify.warning("New education information is added.");
    }

    updateEducationInfo() {
        const obj = {
            id: this.editEducationForm.value.EducationId,
            schoolName: this.editEducationForm.value.SchoolName,
            section: this.editEducationForm.value.Section,
            startDate: this.editEducationForm.value.StartDate,
            endDate: this.editEducationForm.value.EndDate,
            applicationUserId: this.editEducationForm.value.EducationApplicationUserId,
        };
        console.log(obj);
        this.educationService.update(obj, this.educationUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#education_info').modal('hide');
        alertify.warning("Education Information is updated.");
    }

    setEducation(value) {
        this.editId = value;
        const index = this.educationInformations.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.educationInformations[index];
        this.editEducationForm.get('EducationId').setValue(toSetValues.id);
        this.editEducationForm.get('SchoolName').setValue(toSetValues.schoolName);
        this.editEducationForm.get('Section').setValue(toSetValues.section);
        this.editEducationForm.get('StartDate').setValue(toSetValues.startDate);
        this.editEducationForm.get('EndDate').setValue(toSetValues.endDate);
        this.editEducationForm.get('EducationApplicationUserId').setValue(toSetValues.applicationUserId);
    }

    deleteEducation() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.deleteId},
        };
        this.httpService.delete(`${this.educationUrl}/Delete`, httpOptions).subscribe((data) => console.log(data));
        this.getProfileInfos();
        $('#delete_education_info').hide();
        alertify.error("Chosen education information is deleted.");
    }

    addExperienceInfo() {
        const obj = {
            id: this.addExperienceForm.value.AddExperienceId,
            job: this.addExperienceForm.value.AddJob,
            company: this.addExperienceForm.value.AddCompany,
            startDate: this.addExperienceForm.value.AddStartDate,
            endDate: this.addExperienceForm.value.AddEndDate,
            applicationUserId: this.userId,
        };
        console.log(obj);
        this.experienceService.insert(obj, this.experienceUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#add_experience_info').modal('hide');
        alertify.success("New experience is added.");
    }

    updateExperienceInfo() {
        const obj = {
            id: this.editExperienceForm.value.ExperienceId,
            job: this.editExperienceForm.value.Job,
            company: this.editExperienceForm.value.Company,
            startDate: this.editExperienceForm.value.StartDate,
            endDate: this.editExperienceForm.value.EndDate,
            applicationUserId: this.editExperienceForm.value.ExperienceApplicationUserId,
        };
        console.log(obj);
        this.experienceService.update(obj, this.experienceUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#experience_info').modal('hide');
        alertify.warning("Experience is updated.");
    }

    setExperience(value) {
        this.editId = value;
        const index = this.experiences.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.experiences[index];
        this.editExperienceForm.get('ExperienceId').setValue(toSetValues.id);
        this.editExperienceForm.get('Job').setValue(toSetValues.job);
        this.editExperienceForm.get('Company').setValue(toSetValues.company);
        this.editExperienceForm.get('StartDate').setValue(toSetValues.startDate);
        this.editExperienceForm.get('EndDate').setValue(toSetValues.endDate);
        this.editExperienceForm.get('ExperienceApplicationUserId').setValue(toSetValues.applicationUserId);
    }

    deleteExperience() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.deleteId},
        };
        this.httpService.delete(`${this.experienceUrl}/Delete`, httpOptions).subscribe((data) => console.log(data));
        this.getProfileInfos();
        $('#delete_experience_info').hide();
        alertify.error("Chosen experience is deleted.");
    }

    updateJobInfo() {
        const obj = {
            id: this.editJobForm.value.JobId,
            name: this.editJobForm.value.Name,
            createdDate: this.editJobForm.value.CreatedDate,
            createBy: this.editJobForm.value.CreateBy,
            updatedDate: this.editJobForm.value.UpdatedDate,
            updateBy: this.editJobForm.value.UpdateBy,
            isActive: this.editJobForm.value.IsActive,
        };
        console.log(obj);
        this.jobService.update(obj, this.jobUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#job_modal').modal('hide');
        alertify.warning("Education Information is updated.");
    }

    setJob(value) {
        this.editId = value;
        this.editJobForm.get('JobId').setValue(this.job.id);
        this.editJobForm.get('Name').setValue(this.job.name);
        this.editJobForm.get('CreatedDate').setValue(this.job.createdDate);
        this.editJobForm.get('CreateBy').setValue(this.job.createBy);
        this.editJobForm.get('UpdatedDate').setValue(this.job.updatedDate);
        this.editJobForm.get('UpdateBy').setValue(this.job.updateBy);
        this.editJobForm.get('IsActive').setValue(this.job.isActive);
    }

    updateAddressInfo() {
        const obj = {
            id: this.editAddressForm.value.AddressId,
            description: this.editAddressForm.value.Description,
            city: this.editAddressForm.value.City,
            country: this.editAddressForm.value.Country,
            zipCode: this.editAddressForm.value.ZipCode,
            createdDate: this.editAddressForm.value.CreatedDate,
            createBy: this.editAddressForm.value.CreateBy,
            updatedDate: this.editAddressForm.value.UpdatedDate,
            updateBy: this.editAddressForm.value.UpdateBy,
            isActive: this.editAddressForm.value.IsActive,
            userId: this.editAddressForm.value.AddressUserId,
        };
        console.log(obj);
        this.addressService.update(obj, this.addressUrl).subscribe(data => console.log(data));
        this.getProfileInfos();
        $('#address_info_modal').modal('hide');
        alertify.warning("Address Information is updated.");
    }

    setAddress(value) {
        this.editId = value;
        const index = this.addresses.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.addresses[index];
        this.editAddressForm.get('AddressId').setValue(toSetValues.id);
        this.editAddressForm.get('Description').setValue(toSetValues.description);
        this.editAddressForm.get('City').setValue(toSetValues.city);
        this.editAddressForm.get('Country').setValue(toSetValues.country);
        this.editAddressForm.get('ZipCode').setValue(toSetValues.zipCode);
        this.editAddressForm.get('CreatedDate').setValue(toSetValues.createdDate);
        this.editAddressForm.get('CreateBy').setValue(toSetValues.createBy);
        this.editAddressForm.get('UpdatedDate').setValue(toSetValues.updatedDate);
        this.editAddressForm.get('UpdateBy').setValue(toSetValues.updateBy);
        this.editAddressForm.get('IsActive').setValue(toSetValues.isActive);
        this.editAddressForm.get('AddressUserId').setValue(toSetValues.userId);
    }

    profileImagePath:string;
    isCompleted: boolean = false;
    uploadFile(event) {
        const httpOptions = {
            headers: new HttpHeaders({
                //'Content-Type': 'multipart/form-data; boundary=MINE_BOUNDARY;',
                //'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                //'encType':"multipart/form-data",
                "Accept": "application/json",
                "Authorization":"Bearer"+ this.authService.accessToken
            })
        };
        if(event.target.files && event.target.files.length>0) {
            this.isCompleted = true;
            const file=event.target.files[0];
            const formData= new FormData();
            console.log(file);
            formData.append('FormFile',file);
            // formData.append('UserId',this.userId);
            // this.httpService.post<ProfileFileUpload>(`${this.apiUrl}/UploadUserProfileByUserId?UserId=${this.profileInfo['id']}`, formData, httpOptions).subscribe(data=>
            //    console.log(data));
            const obj = {
                UserId : this.userId,
                FormFile: file,
            }
            console.log(obj);
            this.employeeProfileService.profileImageUpload(this.userId,formData,this.apiUrl)
            .subscribe(response => {
                console.log(response["data"]);
                this.profileImagePath = response["data"];
                console.log(this.profileImagePath);
                this.profileInfo['profileImagePath'] = response["data"];
                //this.editProfileForm.get('ProfileImagePath').setValue(response["data"]);
                setTimeout(async ()=>{

                },5000);
                this.isCompleted = false;
            });
        }
    }
}
