// arrow function style function component

import { useState } from "react";
type TodosFunctionComponentProps = {}
// API'dan gelen istekleri karşılamak için interface kullanırız. Apidaki ismi Dto
// burada ise interface olarak kullanılıyor.
// instance almadığımızdan dolayı Dto daki verileri class'a doldurmanın bir avantajı yok. sadece apidan çekilen veri bir mapping işlemi olduğu için interface tercih ederiz.
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type TodoForm = {
  title: string;
  completed: boolean
}

const TodosFunctionComponent = (props: TodosFunctionComponentProps) => {

  const initialTodos: Todo[] = [
    { id: 1, title: 'T-1', completed: false },
    { id: 2, title: 'T-2', completed: true },
    { id: 3, title: 'T-3', completed: true }
  ];
  // elimizdeki listeyi ekrana nasıl render ediyoruz
  // completed true olan itemların arka planı yeşil olsun yazı beyaz olsun
  // not completed olanlar ise arkaplan gri yazı kırmızı olsun
  // completed olanlar tamamlandı diye ekranda görünsün, not completed olanlar ise ekranda tamamlanacak olarak görünsün.
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [todoForm, setTodoForm] = useState<TodoForm>({ title: '', completed: false });

  return <><ul style={{ listStyle: 'none' }}>

    <form method="post" onSubmit={(e) => {
      e.preventDefault(); // formu gönderme
      // todos listesi üzerine yeni state değerini ekle
      setTodos([{ id: todos.length + 1, title: todoForm.title, completed: todoForm.completed }, ...todos]);
      // state üzerinden form resetleme
      setTodoForm({title:'', completed:false});
    }}>

      <input value={todoForm.title} type="text" placeholder="todo title" onChange={(e) => {
        // todoForm içerisinde target alından input value todoForm set et.
        setTodoForm({ ...todoForm, title: e.target.value })
      }} />

      <input checked={todoForm.completed} type="checkbox" onChange={(e) => {
        setTodoForm({ ...todoForm, completed: e.target.checked })
      }} /> <label> Tamamlandı Mı ? </label>

      <input type="submit" value="Ekle" />
    </form>

    <hr></hr>

    {todos.map((item: Todo) => { // map içinde bir html kod blogu döndürmek zorundayız
      return <li key={item.id} style={item.completed ? { color: 'white', background: 'green' } : { color: 'red', background: 'gray' }} >
        {item.title}
        {' '} {item.completed ? 'Tamamlandı' : 'Tamamlanmadı'}
      </li>
    })}
  </ul> </>
}

export default TodosFunctionComponent;

