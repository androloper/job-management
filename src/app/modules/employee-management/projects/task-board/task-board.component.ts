import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
import {Tasks} from "../models/task";
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../services/task.service";

declare let alertify: any;
declare const $: any;
@Component({
    selector       : 'task-board',
    templateUrl    : 'task-board.component.html',
    styleUrls      : ['task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit{
    private apiUrl: string = `${environment.taskManagementUrl}/Tasks`;
    tasksList = new Array<Tasks>();
    projectId: any;
    tempId:any;
    updateId:any;
    editId:any;
    backlogItems: any[];
    lstSelectedForDevelopment: any[];
    lstInProgress: any[];
    lstTest: any[];
    lstDone: any[];
    lstCancelled: any[];
    addTaskForm: FormGroup;
    editTaskForm: FormGroup;
    addTaskboardForm: FormGroup;
    editTaskboardForm: FormGroup;

    constructor(private httpService: HttpClient,
                private taskService: TaskService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.getListByProjectId();
        this.addTaskForm = this.formBuilder.group({
            AddTaskId: [''],
            Title: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Priority: ['', [Validators.required]],
            ApprovedBy: ['', [Validators.required]],
            DueDate: ['', [Validators.required]],
            Status: ['', [Validators.required]],
            CreatedDate: [''],
            CreateBy: ['', [Validators.required]],
            UpdatedDate: [''],
            UpdateBy: [''],
            IsActive: ['', [Validators.required]],
            AddTaskProjectId: ['', [Validators.required]],
            Project: [''],
            AddTaskStatusId: ['', [Validators.required]],
            TaskStatus: [''],
            UserAssignments: [''],
            TaskComments: [''],
            TaskFiles: [''],
        });
        this.editTaskForm = this.formBuilder.group({
            EditTaskId: ['', [Validators.required]],
            Title: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Priority: ['', [Validators.required]],
            ApprovedBy: ['', [Validators.required]],
            DueDate: ['', [Validators.required]],
            Status: ['', [Validators.required]],
            CreatedDate: [''],
            CreateBy: [''],
            UpdatedDate: [''],
            UpdateBy: ['', [Validators.required]],
            IsActive: ['', [Validators.required]],
            EditTaskProjectId: ['', [Validators.required]],
            Project: [''],
            EditTaskStatusId: ['', [Validators.required]],
            TaskStatus: [''],
            UserAssignments: [''],
            TaskComments: [''],
            TaskFiles: [''],
        });
        this.backlogItems = [];
        this.lstSelectedForDevelopment = [];
        this.lstInProgress = [];
        this.lstTest = [];
        this.lstDone = [];
        this.lstCancelled = [];
        // if ($('[data-toggle="tooltip"]').length > 0) {
        //     $('[data-toggle="tooltip"]').tooltip();
        // }
    }

    getListByProjectId() {
        this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
        this.httpService.get(`${this.apiUrl}/GetListByProjectId?id=${this.projectId}`).subscribe(data=>{
                this.tasksList=data['data'];
                for(let i=0;i<this.tasksList.length; i++) {
                    if (this.tasksList[i]['taskStatusId'] === 42){
                        this.backlogItems.push(this.tasksList[i]);
                    }
                    else if (this.tasksList[i]['taskStatusId'] === 43) {
                        this.lstSelectedForDevelopment.push(this.tasksList[i]);
                    }
                    else if (this.tasksList[i]['taskStatusId'] === 44) {
                        this.lstInProgress.push(this.tasksList[i]);
                    }
                    else if (this.tasksList[i]['taskStatusId'] === 45) {
                        this.lstTest.push(this.tasksList[i]);
                    }
                    else if (this.tasksList[i]['taskStatusId'] === 46) {
                        this.lstDone.push(this.tasksList[i]);
                    }
                    else {
                        this.lstCancelled.push(this.tasksList[i]);
                    }
                }
        })
    }

    addTask(){
        const obj = {
            id: this.addTaskForm.value.AddTaskId,
            title: this.addTaskForm.value.Title,
            description: this.addTaskForm.value.Description,
            priority: this.addTaskForm.value.Priority,
            approvedBy: this.addTaskForm.value.ApprovedBy,
            dueDate: this.addTaskForm.value.DueDate,
            status: this.addTaskForm.value.Status,
            createdDate: this.addTaskForm.value.CreatedDate,
            createBy: this.addTaskForm.value.CreateBy,
            updatedDate: this.addTaskForm.value.UpdatedDate,
            updateBy: this.addTaskForm.value.UpdateBy,
            isActive: this.addTaskForm.value.IsActive,
            projectId: this.tasksList[0]['projectId'],
            project: this.addTaskForm.value.Project,
            taskStatusId: this.tempId,
            taskStatus: this.addTaskForm.value.TaskStatus,
            userAssignments: this.addTaskForm.value.UserAssignments,
            taskComments: this.addTaskForm.value.TaskComments,
            taskFiles: this.addTaskForm.value.TaskFiles,
        };
        this.taskService.insert(obj, this.apiUrl).subscribe(() => {});
        this.getListByProjectId();
        $('#add_task').modal('hide');
        alertify.success("New task is added.");
    }

    editTask(){
        const obj = {
            id: this.editTaskForm.value.EditTaskId,
            title: this.editTaskForm.value.Title,
            description: this.editTaskForm.value.Description,
            priority: this.editTaskForm.value.Priority,
            approvedBy: this.editTaskForm.value.ApprovedBy,
            dueDate: this.editTaskForm.value.DueDate,
            status: this.editTaskForm.value.Status,
            createdDate: this.editTaskForm.value.CreatedDate,
            createBy: this.editTaskForm.value.CreateBy,
            updatedDate: this.editTaskForm.value.UpdatedDate,
            updateBy: this.editTaskForm.value.UpdateBy,
            isActive: this.editTaskForm.value.IsActive,
            projectId: this.tasksList[0]['projectId'],
            project: this.editTaskForm.value.Project,
            taskStatusId: this.tempId,
            taskStatus: this.editTaskForm.value.TaskStatus,
            userAssignments: this.editTaskForm.value.UserAssignments,
            taskComments: this.editTaskForm.value.TaskComments,
            taskFiles: this.editTaskForm.value.TaskFiles,
        };
        this.taskService.update(obj, this.apiUrl).subscribe(() => {});
        this.getListByProjectId();
        $('#edit_task').modal('hide');
        alertify.warning("Chosen task is updated.");
    }

    setTask(value){
        this.editId = value;
        const index = this.tasksList.findIndex((item) => {
            return item.id === value;
        });
        const toSetValues = this.tasksList[index];
        this.editTaskForm.get('EditTaskId').setValue(toSetValues.id);
        this.editTaskForm.get('Title').setValue(toSetValues.title);
        this.editTaskForm.get('Description').setValue(toSetValues.description);
        this.editTaskForm.get('Priority').setValue(toSetValues.priority);
        this.editTaskForm.get('ApprovedBy').setValue(toSetValues.approvedBy);
        this.editTaskForm.get('DueDate').setValue(toSetValues.dueDate);
        this.editTaskForm.get('Status').setValue(toSetValues.status);
        this.editTaskForm.get('CreatedDate').setValue(toSetValues.createdDate);
        this.editTaskForm.get('CreateBy').setValue(toSetValues.createBy);
        this.editTaskForm.get('UpdatedDate').setValue(toSetValues.updatedDate);
        this.editTaskForm.get('UpdateBy').setValue(toSetValues.updateBy);
        this.editTaskForm.get('IsActive').setValue(toSetValues.isActive);
        this.editTaskForm.get('EditTaskProjectId').setValue(toSetValues.projectId);
        this.editTaskForm.get('Project').setValue(toSetValues.project);
        this.editTaskForm.get('EditTaskStatusId').setValue(toSetValues.taskStatusId);
        this.editTaskForm.get('TaskStatus').setValue(toSetValues.taskStatus);
        this.editTaskForm.get('UserAssignments').setValue(toSetValues.userAssignments);
        this.editTaskForm.get('TaskComments').setValue(toSetValues.taskComments);
        this.editTaskForm.get('TaskFiles').setValue(toSetValues.taskFiles);
    }

    deleteTask(){
        //this.taskService.delete(this.tempId, this.apiUrl).subscribe(() => {});
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {id: this.tempId},
        };
        this.httpService.delete(`${this.apiUrl}/Delete`, httpOptions).subscribe(() => {});
        this.getListByProjectId();
        $('#delete_task').modal('hide');
        alertify.error("Chosen task is deleted.");
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    onItemDrop(e: any) {
        // Get the dropped data here
        this.backlogItems.push(e.dragData);
    }
    onDrop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }
}
