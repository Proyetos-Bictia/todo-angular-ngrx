import { createReducer, on } from '@ngrx/store';
import { crear, toogle, editar, borrar, toogleAll, limpiarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos el rompe anos'),
    new Todo('Comprar el traje de IronMan'),
    new Todo('Robar escudo del capi'),
];

const _todoReducer = createReducer(
    estadoInicial,
    on(crear, (state, { texto }) => [...state, new Todo(texto)]),

    on(borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),

    on(toogleAll, (state, { completado }) => state.map((todo) => completado ? {...todo, completado} : {...todo, completado} )),

    on(toogle, (state, { id }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo
            }
        })
    }),

    on(editar, (state, { id, texto }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    texto
                }
            } else {
                return todo
            }
        })
    }),

    on(limpiarCompletados, (state) => state.filter((todo) => !todo.completado))

);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}