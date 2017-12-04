import { Injectable } from '@angular/core';
import { PatientsModel } from '../models'
import { ApiService } from '../api';
import { StoreHelper } from '../store/helper';
import 'rxjs/Rx';

@Injectable()
export class PatientsService {

    path: string = '/api/patients';

    constructor(private apiService: ApiService,
                private storeHelper: StoreHelper) {}

    getPatients() {
        return this.apiService.get(this.path)
                .do((res: any) => this.storeHelper.update('patients', res.data));
    }

    getPatient(id) {
        return this.apiService.get(`${this.path}/${id}`)
                .do(patient => this.storeHelper.findAndUpdate('patients', patient));
    }

    createPatients(patient: PatientsModel) {
        return this.apiService.post(this.path, patient)
                .do(savedPatient=> this.storeHelper.add('patients', savedPatient));
    }

    editPatients(id: string, patient: PatientsModel) {
        return this.apiService.put(`${this.path}/${id}`, patient)
                 .do(editedPatient => this.storeHelper.findAndUpdate('patients', editedPatient));
    }

    deletePatients(id: string) {
        return this.apiService.delete(`${this.path}/${id}`)
             .do((res: any) => this.storeHelper.findAndDelete('patients', res.id));
    }
};
