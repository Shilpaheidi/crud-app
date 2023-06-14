//import { NgIfContext } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  ordertype = ["Delivery", "Pick-Up"];
  productForm !: FormGroup;
  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]

    })

    //console.log(this.editData);

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['address'].setValue(this.editData.address);
      this.productForm.controls['city'].setValue(this.editData.city);
      this.productForm.controls['state'].setValue(this.editData.state);
      this.productForm.controls['zipcode'].setValue(this.editData.zipcode);
      this.productForm.controls['phone'].setValue(this.editData.phone);
      this.productForm.controls['email'].setValue(this.editData.phone);
    }
  }

  addOrder() {
    console.log(this.productForm.value);

    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postOrder(this.productForm.value)
          .subscribe({
            next: (res) => {
              alert("Order added successfully");
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the order")
            }
          })

      }

    } else {
      this.updateOrder()
    }
  }

  updateOrder() {
    this.api.putOrder(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Order updated successfully");
          this.productForm.reset();
          this.dialogRef.close('update');

        },
        error: () => {
          alert("error while updating the record");
        }
      })
  }
}


