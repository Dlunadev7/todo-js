
export class Todo {

  static fromJSON({ id,tarea,completado,creado }) {

    const tempTodo = new Todo( tarea );

    tempTodo.id         = id;
    tempTodo.completado = completado;
    tempTodo.creado     = creado;

    return tempTodo;
  }


  constructor( tarea ) {

    this.tarea = tarea;

    this.id         = new Date().getTime(); // 12843654
    this.completado = false;
    this.creado     = new Date();

  }

}
















