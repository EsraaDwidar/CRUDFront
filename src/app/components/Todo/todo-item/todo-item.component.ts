import { Component, EventEmitter, Input, input, OnInit, Output, output } from '@angular/core';
import Item from '../../../types/Items';
import { ItemsService } from '../../../services/items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit{
  constructor(private route: ActivatedRoute, private itemsService: ItemsService){}
//   @Input() item: Item=
//   {
//     task: '',
//     isDone: false,
//   };
//   items: Item[]=[];
// @Output() itemMarkAsDone = new EventEmitter<string>();
// handleMarkAsDone(e:MouseEvent)
// {
//   this.item.isDone = true;
//   this.itemMarkAsDone.emit(this.item.task);
// }
item: Item | any;

  ngOnInit(): void {
      let {id} = this.route.snapshot.params;
      this.itemsService.getById(id).subscribe({
        next:(data) => this.item = data
      })
  }
   
}