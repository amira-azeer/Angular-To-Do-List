import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArray: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArray = [];
    this.getAllTasks();
    this.editTaskValue = '';
    this.addTaskValue = '';
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(
      (response) => {
        this.taskArray = response;
      },
      (error) => {
        alert("Unable to get a list of the tasks.");
      }
    );
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (response) => {
        this.ngOnInit();
        this.addTaskValue = ''
      },
      (error) => {
        alert(error);
      }
    );
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(response => {
      this.ngOnInit()
    }, error => {
      alert('Failed to update task')
    })
  }

  deleteTask(eTask : Task){
    this.crudService.deleteTask(eTask).subscribe(response => {
      this.ngOnInit()
    }, error => {
      alert('Failed to delete the task')
    })
  }

  callTask(eTask: Task){
    this.taskObj = eTask;
    this.editTaskValue = eTask.task_name;
  }

}
