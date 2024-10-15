import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoItemComponent } from './components/Todo/todo-item/todo-item.component';
import { TodoComponent } from './components/Todo/todo.component';

const routes: Routes = [
  {path:"todo", component: TodoComponent},
  {path:"", component: TodoComponent},
  {path:"todoitem/:id",component: TodoItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
