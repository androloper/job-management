export class EmployeeProfile {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    departmentId: number;
    employeeId: string;
    company: string;
    passportNumber: string;
    passportExpiryDate: string;
    joiningDate: string;
    nationality: string;
    religion: string;
    maritalStatus: string;
    driverLicense: string;
    reporterId: string;
    reporterName: string;
    phoneNumber: string;
    email: string;
    isActive: boolean;
    expireDateOfTheDriverLicence: string;
    jobId: number;
    jobName: string;
    profileImagePath: string;
    emergencyContactInfos: EmergencyContactInfos;
    bankInformations: BankInformations;
    educationInformations: EducationInformations;
    experiences: Experiences;
    userVehicleInformations: UserVehicleInformations;
    addresses: Addresses;
    job: Job;
}
export class EmergencyContactInfos {
    id: number;
    name: string;
    relationShip: string;
    phone: string;
    applicationUserId: string;
}
export class BankInformations {
    id: number;
    bankName: string;
    accountNo: string;
    ifscNo: string;
    applicationUserId: string;
}
export class EducationInformations{
    id:number;
    schoolName: string;
    section: string;
    startDate: string;
    endDate: string;
    applicationUserId: string;
}
export class Experiences{
    id:number;
    job: string;
    company: string;
    startDate: string;
    endDate: string;
    applicationUserId: string;
}
export class UserVehicleInformations{
    id:number;
    deliveryArea: string;
    deliveryPackage: boolean;
    dispatcher: string;
    dispatcherId: string;
    employmentModel: string;
    applicationUserId: string;
}
export class Addresses {
    id:number;
    description: string;
    city: string;
    country: string;
    zipCode: string;
    createdDate: string;
    createBy: string;
    updatedDate: string;
    updateBy: string;
    isActive:boolean;
    userId: string;
}
export class Job {
    id:number;
    name: string;
    createBy:string;
    createdDate: string;
    updateBy:string;
    updatedDate:string;
    isActive:boolean;
}
