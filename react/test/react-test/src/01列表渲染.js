const arr = [
    {id:1,name:"name1"},
    {id:2,name:"name2"},
    {id:3,name:"name3"},
];

function InitList() {
  return (
    <div>
        <ul>
            {arr.map(info => <li key={info.id} id={info.id}>{info.name}</li>)}
        </ul>
    </div>
  );
}

export default InitList;
