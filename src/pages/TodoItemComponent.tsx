export type TodoItemProps = {
  completed:boolean;
  title:string;
  id:number;
  onDeleteItem:(id:number) => void;
}

export default function TodoItemComponent(props: TodoItemProps) {

  const {completed, title, id, onDeleteItem} = props;

  const deleteItem = (id:number) => {
    const result = window.confirm("silmek istediğinize emin misiniz");

    if(result){
      onDeleteItem(id);
    }
  }

  return <>
  <li style={completed ? { color: 'white', background: 'green' } : { color: 'red', background: 'gray' }} >
        {title}
        {' '} {completed ? 'Tamamlandı' : 'Tamamlanmadı'}

        <button onClick={() => deleteItem(id)}>Sil</button>
      </li>
  </>
}