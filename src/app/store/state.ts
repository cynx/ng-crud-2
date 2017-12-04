import {
    DoctorsModel,
    PatientsModel,
  }  from '../models';

export interface State {
    doctors: Array<DoctorsModel>
    patients: Array<PatientsModel>
  }

export const defaultState = {
    doctors: [],
    patients: [],
  }
