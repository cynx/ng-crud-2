import { Component } from '@angular/core';
import {
  DoctorsModel,
  PatientsModel
} from '../models';

import {
  DoctorsService,
  PatientsService
} from '../services';

import { Store } from '../store';
import 'rxjs/Rx';

@Component({
  selector: 'patients-container',
  template: `
    <div>
        <h1>Patients</h1>                    
            <patient-create-ui 
                [doctors]="doctors"
              
                (onSaveHandler)="onCreatePatients($event)" >
            </patient-create-ui>
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
                Age        
              </th>            
              <th>
                History        
              </th>            
              <th>
                Doctors Name        
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
            <tr patient-ui 
                *ngFor="let patient of patients" 
                [patient]="patient" 
                [doctors]="doctors"                
                [doctor]="getDoctor(patient.DoctorId)"
                
                (onEditHandler)="onEditPatients($event)"
                (onDeleteHandler)="onDeletePatients($event)"
            >
            </tr>
        </tbody>
        </table> 
        
    `
})
export class PatientsContainer {
  patients: PatientsModel[] = [];
  doctors: DoctorsModel[] = [];

  constructor(
    private store: Store,
    private doctorService: DoctorsService,
    private patientService: PatientsService) {

    this.doctorService.getDoctors().subscribe();

    this.patientService.getPatients().subscribe();

    this.store.changes.pluck('doctors').subscribe((doctors: any) => this.doctors = doctors );

    this.store.changes.pluck('patients').subscribe((patients: any) => this.patients = patients );
  }

  onCreatePatients(patient: PatientsModel) {
    this.patientService.createPatients(patient).subscribe();
  }

  onEditPatients(payload) {
    this.patientService.editPatients(payload.id, payload.patient).subscribe();
  }

  onDeletePatients(id: string) {
    this.patientService.deletePatients(id).subscribe();
  }

  getDoctor(id: string): DoctorsModel {
    return this.doctors.find(f => f.Id === id );
  }
}
