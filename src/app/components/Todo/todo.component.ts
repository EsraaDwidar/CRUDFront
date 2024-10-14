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
handleMarkAsDone(e:MouseEvent, item: Item)
{
  item.isDone = true;
  this.itemMarkAsDone.emit(item.task);
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
    this.updateItem(this.item);
    this.deleteItem(this.item);
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
        this.items = this.items.filter(i => i.id !== i.id); // Remove the item from the list
      }
    });
  }
  updateItem(item: Item): void {
    item.isDone = true;
    let {id} = this.route.snapshot.params;
    this._itemsService.updateItem('id').subscribe({
      next: (data) => {
        this.itemMarkAsDone.emit(data.task);
      },
      error: () => {
        console.error('Error updating item');
      },
    });
  }
}
