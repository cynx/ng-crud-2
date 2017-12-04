import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import {
  DoctorsModel,
  PatientsModel
} from '../../models';

@Component({
    selector: '[patient-ui]',
    template: `
        <td>{{patient.Id}}</td>
        <td>{{patient.Name}}</td>
        <td>{{patient.Address}}</td>
        <td>{{patient.Age}}</td>
        <td>{{patient.History}}</td>
        
        <td *ngIf="doctor">{{doctor.Name || "No Doctor"}}</td>
        <td *ngIf="!doctor"></td>
        
        <td patient-edit-ui 
                [patient]="patient" 
 
                [doctors]="doctors"
                (onEditHandler)="onEditPatients($event)">
        </td>
        <td patient-delete-ui 
            [patient]="patient"
            (onDeleteHandler)="onDeletePatients($event)">
        </td>
    `
})
export class Patients {
    @Input() patient: PatientsModel;
    @Input() doctor: DoctorsModel;
    @Input() doctors: Array<DoctorsModel>;

    @Output() onEditHandler = new EventEmitter();
    @Output() onDeleteHandler = new EventEmitter();

    onEditPatients(data) {
        this.onEditHandler.next(data);
    }

    onDeletePatients() {
        this.onDeleteHandler.next(this.patient.Id);
    }
}
