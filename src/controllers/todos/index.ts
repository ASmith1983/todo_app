// need to import types from express so that we can have explicit values
// another option is to let Ts infer for you

import { Response, Request } from "express";
import { ITodo } from "../../types/todo";
import Todo from "../../models/todo";

// Setting up CRUD.. note about promise<void> it may be used to create future<void> objects which have no value. In addition, a promise<void> can be constructed from a promise<T> where T is any type. This allows a promise<void> to be used by code which only needs to be able to renege on a promise and not fulfill it.

const getTodos =async (req: Request, res: Response): Promise<void> => {
   try{
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({ todos})
   }  catch (error){
      throw error
      }
}

const addTodo =async (req: Request, res: Response): Promise<void> => {
   try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">

    const todo: ITodo = new Todo({
        name: body.name,
        description: body.description,
        status: body.status,
    })

    const newTodo: ITodo = await todo.save()
    const allTodos: ITodo[] = await Todo.find()

    res
        .status(200)
        .json({ message: "Todo added", todo: newTodo, todos: allTodos })
   } catch (error) {
    throw error
   }
}

const updateTodo =async (req:Request, res: Response): Promise<void> => {
   try{
    const{ params: { id }, body, } = req
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
        { _id: id },
        body,
    )
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
        message: "Todo updated",
        todo: updateTodo,
        todos: allTodos,
    })
   } catch (error){
    throw error
   }
}

const deleteTodo =async (req:Request, res: Response): Promise<void> => {
   try{

    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
        req.params.id
    )
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
        todos: allTodos,
    })
   } catch (error){
    throw error
   }

   } 
}

export { getTodos, addTodo, updateTodo, deleteTodo }