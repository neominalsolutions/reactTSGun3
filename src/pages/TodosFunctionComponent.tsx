// arrow function style function component

import axios from "axios";
import { useEffect, useState } from "react";
import {TodoAxiosApi, TodoFetchApi} from "../api/todo.api";
import TodoItemComponent from "./TodoItemComponent";
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

  // dış global bir değişken oldu.
  const api = new TodoAxiosApi('https://jsonplaceholder.typicode.com','todos');

  const initialTodos: Todo[] = [
    { id: 1, title: 'T-1', completed: false },
    { id: 2, title: 'T-2', completed: true },
    { id: 3, title: 'T-3', completed: true }
  ];
  // elimizdeki listeyi ekrana nasıl render ediyoruz
  // completed true olan itemların arka planı yeşil olsun yazı beyaz olsun
  // not completed olanlar ise arkaplan gri yazı kırmızı olsun
  // completed olanlar tamamlandı diye ekranda görünsün, not completed olanlar ise ekranda tamamlanacak olarak görünsün.
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined);
  const [todoForm, setTodoForm] = useState<TodoForm>({ title: '', completed: false });

  useEffect(()=> {

    // artık orta ölçelikli ve büyük ölçekli uygulamalarda bir servisi başka componentlerden veri çekebilir diye veri çekme işlemlerimizi servisleştirip, tek bir dosyadan merkezi olarak yöntebiliyoruz.
    // sayfalar arası api bağlantılarını standartlaştırmak içinde kullanılyor.
    api.getTodos()
    .then(todos => {
      console.log('todos from api', todos);
    })
    .catch(err => {
      console.log('hata', err);
    });

  },[])


   useEffect(() => {
    // component ilk doma girdiğinde veri çekeceğiz.
    // promise ile veri çekme axios ile veri çektik.
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
      console.log('response', response)
      // setTodos([...response.data])
    })
    .catch(err => {
      console.log('err', err);
    });

    // useEffect async functionları çalıştırmamıza await ile bekletmemize izin vermiyor bu sebeple useEffect içerisinde await yapısı kullanmak isterse aşağıdaki gibi async çalışan bir function tanımı yapıp bunu çağırmalıyız.
    (async () => {
      try {
        let res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        console.log('async-await axios response', res);
  
        setTodos([...res.data])
  
        let res2 = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log('async-await axios post response', res2);
      } catch (error) {
        console.log('err', error);
      }
    })(); // self invoked functions


    // JS de fetchAPI dediğimiz pure js ait bir kullanım var. network istekleri atmamız sağlar. axios daha gelişmiş özeliklere sahiptir.Kurumsal projelerde tercihimiz axiosdan yana oluyor.

    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
    }).catch(err => {
      console.log('fetch-err', err);
    })

  }, [])

  const deleteItem = (id:number) => {
    // const result = window.confirm("silmek istediğinize emin misiniz");

    // if(result){
    //   const filteredTodos = todos?.filter(x=> x.id !== id) as Todo[];
    //   setTodos([...filteredTodos])
    // }

    const filteredTodos = todos?.filter(x=> x.id !== id) as Todo[];
    setTodos([...filteredTodos])
  }

  // todos && değer undefined veya null değilse o zaman domda göster
  return <> { todos &&  <ul style={{ listStyle: 'none' }}>

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

    {/* <TodoForm onSubmited={(formData) => {
       setTodos();
    }}/> */}

    {/* {todos.map((item: Todo) => { // map içinde bir html kod blogu döndürmek zorundayız
      return <li key={item.id} style={item.completed ? { color: 'white', background: 'green' } : { color: 'red', background: 'gray' }} >
        {item.title}
        {' '} {item.completed ? 'Tamamlandı' : 'Tamamlanmadı'}

        <button onClick={() => deleteItem(item.id)}>Sil</button>
      </li>
    })} */}
    {
      todos.map((item:Todo) => {
        // map içerisinde dönerken parametre gönderme işlemlerin () => funcName(paramteres) formatında yazmalıyız.
        return <TodoItemComponent onDeleteItem={() => deleteItem(item.id)} id={item.id} title={item.title} completed={item.completed} />
      })
    }
  </ul> } </>
}

export default TodosFunctionComponent;


// TodosFunctionComponent parent component oldu => TodoItemComponent child component oldu.



