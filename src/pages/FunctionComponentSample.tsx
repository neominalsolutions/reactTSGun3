import { useEffect, useState } from "react";

type FunctionComponentProps = {
  title:string
}

type FunctionComponentState = {
  todos:any[]
}

function FunctionComponentSample(props:FunctionComponentProps){

  const [todos, setTodos] = useState<any[]>([]);  // referance type state
  const [number,setNumber] = useState<number>(0); // value type state
 
  const todoData = [{name:'ali'},{name:'can'},{name:'ahmet'}];

  useEffect(() => { // componentDidUpdate
    console.log('use Effect sayfa girişinde ve her bir state değişiminde tetiklenir => 1.blok');
    // sayfada ne kadar state varsa hepsinin değişiminde tetiklenir.
  }) 

  useEffect(()=> { // componentDidMount
    // sayfa açılışında apiden veri çekerken tercih ederiz
    console.log('sayfa açılışında sadece 1 kez çalışır => 2.blok')
    setTodos(todoData);
  }, []) // [] işareti useEffect hangi durumlarda tetikleneceğini söyler [] için sadece sayfa ilk doma basılırken çalışır

  useEffect(()=> { // componentDidUpdate
    // state değişiminde bir işlem takibi veya state değişimine bağlı bir veri çekme işlemi varsa kodlar buraya yazılır
    console.log('sayfa doma basıldığında ve todos state değiştiğinde tetiklenir => 3.blok');

  }, [todos]) // [state] tanımı ise component doma yüklenirken 1 kez ve her bir todos state edğişimde ise 1 kez tetiklenir. [depencies] => içine takip edeceğimiz stateleri tanımlıyoruz. sadece todos state değişiminde tetiklenir.

  // referans typelar ile çalışırken dizi, object eğer farklı bir nesne referansı set edilirse aşağıdaki örnekteki gibi, dizi içindeki değerler değişmese bile referanslar farklı olduğu için render alınacaktır.
  // setNumber state de ise value type çalıştığında state değeri aynı ise component tekrar render almayacaktır.

  return <> Title: {props.title} 
  <button onClick={() => {
    setNumber(1)
  }}>Number Değiştir</button>

  {/* {todos.map((item:any, index:number) => {
    return <div key={index}>{item.name}</div>
  })} */}

  <button onClick={()=> {
    let todo2 = todos;
    todo2.push({name:"hakan"})
    // console.log('todo2', todo2);
    // setTodos(todo2)
    // todo2 referansını kopardım state güncellensin arayüz render olsun diye
    setTodos([...todo2])
    // setTodos([...todo2]) // herhangi bir diziye ekleme ve silme işlemi yapılmadı referans aynı kaldığından render olmadı
    // setTodos([...todos]) // ... spread operator kullanıldığı için yeni bir referans oluştu ve render aldı.
    // spread operatörü ile state güncellemek her zaman nesnenin statedeki referansı koparacağından dolayı render işlemlerinde hata almamamızı sağlar.
  }}>Todos Değiştir</button>
  </>
}
export default FunctionComponentSample;