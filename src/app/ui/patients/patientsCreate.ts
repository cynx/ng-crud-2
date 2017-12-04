import {
    Component, Output, Input, EventEmitter
} from '@angular/core';

import {
  DoctorsModel,
  PatientsModel
} from '../../models';

@Component({
    selector: 'patient-create-ui',
    template: `
        <div>
            <div *ngIf="!addNew"><button class="btn btn-primary" (click)="onAddNew()">Add New Patient</button></div>
            <form *ngIf="addNew">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                      <input type="text"
              class="form-control" [(ngModel)]="patient.Name" name="Name"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Address</label>
                  <div class="col-sm-10">
                      <input type="text"
              class="form-control" [(ngModel)]="patient.Address" name="Address"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Age</label>
                  <div class="col-sm-10">
                      <input type="number"
              class="form-control" [(ngModel)]="patient.Age" name="Age"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">History</label>
                  <div class="col-sm-10">
                    <textarea name="History" [(ngModel)]="patient.History" rows="10" cols="80"></textarea>
                  </div>
                </div>
                
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Doctor</label>
                    <div class="col-sm-10">
                        <select [(ngModel)]="patient.DoctorId" name="DoctorId">
                            <option *ngFor="let e of doctors" [ngValue]="e.Id">{{e.Name}}</option>
                        </select>  
                    </div>
                </div> 
            
                           
                <button class="btn btn-success" (click)="onSave()">Save</button>
                <button class="btn btn-default" (click)="onCancel()">Cancel</button>                
            </form>
       </div>
       <hr />       
    `
})
export class PatientsCreate {
    @Input() doctors: Array<DoctorsModel>;
    @Output() onSaveHandler = new EventEmitter();

    patient: PatientsModel = {
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
      this.onSaveHandler.next(this.patient);
      this.reset();
    }

    reset() {
      this.patient = {
        Id: '',
        Name: ''
      };
    }
}
