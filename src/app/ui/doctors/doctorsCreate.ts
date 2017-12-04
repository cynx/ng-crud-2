import {
    Component, Output, Input, EventEmitter
} from '@angular/core';

import {
  DoctorsModel
} from '../../models';

@Component({
    selector: 'doctor-create-ui',
    template: `
        <div>
            <div *ngIf="!addNew"><button class="btn btn-primary" (click)="onAddNew()">Add New Doctor</button></div>
            <form *ngIf="addNew">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                      <input type="text"
              class="form-control" [(ngModel)]="doctor.Name" name="Name"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Address</label>
                  <div class="col-sm-10">
                      <input type="text"
              class="form-control" [(ngModel)]="doctor.Address" name="Address"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Available</label>
                  <div class="col-sm-10">
                      <input type="checkbox"
              class="form-control" [(ngModel)]="doctor.Available" name="Available"/>
                  </div>
                </div>
                
            
                           
                <button class="btn btn-success" (click)="onSave()">Save</button>
                <button class="btn btn-default" (click)="onCancel()">Cancel</button>                
            </form>
       </div>
       <hr />       
    `
})
export class DoctorsCreate {
    @Output() onSaveHandler = new EventEmitter();

    doctor: DoctorsModel = {
      Id: '',
      Name: ''
    };

    addNew: boolean = false;

    onAddNew() {
      this.addNew = true;
    }

    onCancel() {
      this.addNew = false;
      this.reset();
    }

    onSave() {
      this.addNew = false;
      this.onSaveHandler.next(this.doctor);
      this.reset();
    }

    reset() {
      this.doctor = {
        Id: '',
        Name: ''
      };
    }
}
