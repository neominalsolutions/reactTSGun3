import { useState } from "react";


export type TodoForm = {
  title: string;
  completed: boolean
}

export type TodoFormProps = {
  onFormSubmit:(formValue:TodoForm) => void
}

export default function TodoFormComponent(props:TodoFormProps){

  const [todoForm, setTodoForm] = useState<TodoForm>({ title: '', completed: false });

  const formSubmit = (e:any) => {
    // formu gönderme
    // todos listesi üzerine yeni state değerini ekle
    // setTodos([{ id: todos.length + 1, title: todoForm.title, completed: todoForm.completed }, ...todos]);
    // state üzerinden form resetleme
    e.preventDefault(); 
    props.onFormSubmit(todoForm);
    setTodoForm({title:'', completed:false}); // form resetleme işlemi
  }

  const completedChange = (e:any) => {
    setTodoForm({ ...todoForm, completed: e.target.checked }) // todo form state güncelleme
  }

  const titleChanged = (e:any) => {
    setTodoForm({ ...todoForm, title: e.target.value })
  }

  return <> 
  
  <form method="post" onSubmit={formSubmit}>
    <input value={todoForm.title} type="text" placeholder="todo title" onChange={titleChanged} />
    <input checked={todoForm.completed} type="checkbox" onChange={completedChange} /> <label> Tamamlandı Mı ? </label>
    <input type="submit" value="Ekle" />
  </form>
  </>

}