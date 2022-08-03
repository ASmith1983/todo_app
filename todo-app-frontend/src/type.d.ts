// the ITodo interface needs to mirror the shape of data from the API. 
// And since we don't have mongoose here, we need to add additional properties to match the type defined on the API. 

interface ITodo {

    _id: string
    name: string
    description: string
    status: boolean
    createdAt?: string
    updatedAt?: string

}

interface TodoProps {

    todo: ITodo

  }
  
  type ApiDataType = {

    message: string
    status: string
    todos: ITodo[]
    todo?: ITodo

  }