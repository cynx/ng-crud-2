import {
    Component, Output, Input, EventEmitter, OnInit
} from '@angular/core'

import {
    DoctorsModel
} from '../../models';

@Component({
    selector: '[doctor-edit-ui]',
    template: `
        <button class="btn btn-default" data-toggle="modal" [attr.data-target]="'#modelEdit-' + doctor.Id">Edit</button>
        
        <!-- Modal -->
        <div class="modal fade" [id]="'modelEdit-' + doctor.Id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">Edit Doctor</h4>
                    </div>
                    <div class="modal-body">
                        <form>
 
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Id</label>
                                <div class="col-sm-10">
                                    <input type="text"
 class="form-control" 
 
                                    disabled [ngModel]="doctor.Id" name="Id"/>
                                </div>
                            </div>
 
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input type="text"
 class="form-control" 
                                    [(ngModel)]="editDoctor.Name" name="Name"/>
                                </div>
                            </div>
 
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Address</label>
                                <div class="col-sm-10">
                                    <input type="text"
 class="form-control" 
                                    [(ngModel)]="editDoctor.Address" name="Address"/>
                                </div>
                            </div>
 
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Available</label>
                                <div class="col-sm-10">
                                    <input type="checkbox"
 class="form-control" 
                                    [(ngModel)]="editDoctor.Available" name="Available"/>
                                </div>
                            </div>

                        </form> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" (click)="onSave()" data-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>       
    `
})
export class DoctorsEdit  implements OnInit {
    @Input() doctor: DoctorsModel;

    @Output() onEditHandler = new EventEmitter();

    editDoctor: DoctorsModel;

    ngOnInit() {
      // clone the user object
      this.editDoctor = {
        Id: '',
        Name: this.doctor.Name
,
        Address: this.doctor.Address
,
        Available: this.doctor.Available
      };
    }

    onSave() {
        this.onEditHandler.next({id: this.doctor.Id, doctor : this.editDoctor});
    }
}
