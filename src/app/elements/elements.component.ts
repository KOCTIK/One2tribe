import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../_services/items.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  elements: any = [];

  elementForm = this.fb.group({
    newItiem: ['']
  });

  constructor(
    private fb: FormBuilder,
    private itemsServise: ItemsService
  ) { }

  ngOnInit() {
    this.getElements();
  }

  getElements() {
    this.itemsServise.getItems()
      .subscribe(data => this.elements = data.reverse());
  }

  // convenience getter for easy access to form fields
  get f() { return this.elementForm.controls; }


  onSubmit() {
    this.itemsServise.addItem(this.f.newItiem.value)
      .subscribe(element => this.elements.splice(0, 0, element));

    this.elementForm.patchValue({ newItiem: '' });
  }

}
