import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoItemComponent } from './components/Todo/todo-item/todo-item.component';
import { TodoComponent } from './components/Todo/todo.component';
import { DeleteItemComponent } from './components/Todo/delete-item/delete-item.component';

const routes: Routes = [
  {path:"todo", component: TodoComponent},
  {path:"", component: TodoComponent},
  {path:"todoitem/:id",component: TodoItemComponent},
  {path:"delete/:id",component: DeleteItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
