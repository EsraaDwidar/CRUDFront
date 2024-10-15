import { Component, EventEmitter, Output, output } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import Item from '../../types/Items';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  constructor(private _itemsService: ItemsService, private route: ActivatedRoute){}
  items: Item[] = [];
  item: Item | any;

  @Output() itemMarkAsDone = new EventEmitter<string>();
handleMarkAsDone(item: Item)
{
  item.isDone = true;
  this.itemMarkAsDone.emit(item.task);
  this._itemsService.updateItem(item.id,item).subscribe({
    next:(data) => {
        this.item = data;
        console.log(item);
        this.items = this.items.map(t => t.id == item.id ? item : t);
    },
  });
}

  ngOnInit(): void {
    this._itemsService.getAll().subscribe({
      next:(result) =>{ 
        this.items = result;
        console.log(this.items);
        
      },
      error:()=>{},
    });
    this.addItem(this.item);
    this.deleteItem(this.item);
    this.handleMarkAsDone(this.item);
  }
  addItem(e: MouseEvent){
    e.preventDefault();
    if(this.todoForm.valid) 
    {
      this._itemsService.addItem(this.todoForm.value).subscribe({
      next:(result) =>{ 
        console.log(result);
        
      },
      error:()=>{},
    });
    }
  }
  todoForm = new FormGroup({
    task: new FormControl<string>('',[Validators.required]),
    isDone: new FormControl<boolean>(false),
  });

  AddItem(e: MouseEvent){
    e.preventDefault();
    let {task} = this.route.snapshot.params;
    if(this.todoForm.invalid) 
      return;
    this._itemsService.addItem(task).subscribe({
      next:(data) => this.item = data
    })
    this.item.push({
      task: this.todoForm.value.task!,
      isDone: this.todoForm.value.isDone ?? false
    });
    console.log(this.item);
    this.todoForm.reset();
  }

  deleteItem(item: Item): void {
    console.log(item);
    this._itemsService.deleteItem(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== i.id); 
      }
    });
  }
}
