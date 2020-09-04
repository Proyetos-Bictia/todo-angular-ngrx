import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { limpiarCompletados } from '../todo.actions';
import * as actions from 'src/app/filtro/filtro.action';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes: number = 0

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe(({ filtro, todos }) => {
      this.filtroActual = filtro;
      this.pendientes = todos.filter(todo => !todo.completado).length;
    })
    // this.store.select('filtro').subscribe(filtro => this.filtroActual = filtro)
  }

  cambiarFiltro(filtro: actions.filtrosValidos) {
    this.filtroActual = filtro
    this.store.dispatch(actions.setFiltro({ filtro }))
  }

  limpiarTodosCompletados() {
    this.store.dispatch(limpiarCompletados())
  }

}
