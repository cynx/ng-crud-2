import { Component } from '@angular/core';
import {
  DoctorsModel
} from '../models';

import {
  DoctorsService
} from '../services';

import { Store } from '../store';
import 'rxjs/Rx';

@Component({
  selector: 'doctors-container',
  template: `
    <div>
        <h1>Doctors</h1>                    
            <doctor-create-ui 
              
                (onSaveHandler)="onCreateDoctors($event)" >
            </doctor-create-ui>
    </div>
    <table class="table">
        <thead>
            <tr>
              <th>
                Id        
              </th>            
              <th>
                Name        
              </th>            
              <th>
                Address        
              </th>            
              <th>
                Available        
              </th>            
              <th>
                Edit
              </th>
              <th>
                Delete
              </th>
            </tr>
        </thead>
       
        <tbody>
            <tr doctor-ui 
                *ngFor="let doctor of doctors" 
                [doctor]="doctor" 
                
                (onEditHandler)="onEditDoctors($event)"
                (onDeleteHandler)="onDeleteDoctors($event)"
            >
            </tr>
        </tbody>
        </table> 
        
    `
})
export class DoctorsContainer {
  doctors: DoctorsModel[] = [];

  constructor(
    private store: Store,
    private doctorService: DoctorsService) {


    this.doctorService.getDoctors().subscribe();


    this.store.changes.pluck('doctors').subscribe((doctors: any) => this.doctors = doctors );
  }

  onCreateDoctors(doctor: DoctorsModel) {
    this.doctorService.createDoctors(doctor).subscribe();
  }

  onEditDoctors(payload) {
    this.doctorService.editDoctors(payload.id, payload.doctor).subscribe();
  }

  onDeleteDoctors(id: string) {
    this.doctorService.deleteDoctors(id).subscribe();
  }

}
