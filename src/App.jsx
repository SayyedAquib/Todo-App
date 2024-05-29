import { useState, useEffect, useRef } from "react";
import { useToggle } from "./hooks/useToggle";

const App = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  const [id, setId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const { mode, handleToggle } = useToggle();

  useEffect(() => {
    fetchTodoData();
  }, []);

  const fetchTodoData = async () => {
    const data = await fetch("https://dummyjson.com/todos");
    const json = await data.json();
    setTodos(json.todos);
  };

  const addTodo = () => {
    if (inputRef.current.value) {
      const newTodo = {
        id: todos.length + 1,
        todo: inputRef.current.value,
        completed: false,
      };

      setTodos((todos) => [newTodo, ...todos]);
      inputRef.current.value = "";
    }
  };

  const handleEdit = (item) => {
    setId(item.id);
    setEditValue(item.todo);
  };

  const saveEdit = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editValue } : todo
      )
    );
    setId(null);
    setEditValue("");
  };

  return (
    <div>
      <h1>Todo Web Application</h1>
      <input type="text" ref={inputRef} placeholder="Add a new todo" />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={() => handleToggle()}>
        {!mode ? "View Mode" : "Edit Mode"}
      </button>
      <ul>
        {todos &&
          todos?.map((item) =>
            id === item?.id && mode ? (
              <div key={item?.id}>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(item.id)}>Save</button>
              </div>
            ) : (
              <li key={item?.id} onClick={() => handleEdit(item)}>
                {item?.todo}
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default App;
