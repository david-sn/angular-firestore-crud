import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item-service.service';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item = {
    title: '',
    description: ''
  };

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.itemService.addItem(this.item);
  }

  uploadFile(event:any){
    this.itemService.uploadFile(event);
  }
}
