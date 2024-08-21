import React, { useState } from "react";

export default function TodoApps() {
  return (
    <div
      className="cont"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "200px",
        background: "linear-gradient(to right , blue,purple)",
      }}
    >
      <div
        className="app"
        style={{
          padding: "20px",
          backgroundColor: "#eee",
          display: "flex",
          flexDirection: "column",
          width: "500px",
          borderRadius: "5px",
          alignItems: "center",
          boxShadow: "0 0  10px gray",
        }}
      >
        <h1
          style={{
            fontFamily: "arial",
            textDecorationLine: "underline",
            fontWeight: "800",
            margin: "0 0 15px 0",
          }}
        >
          Grocery Shoping
        </h1>
        <TodoApp />
      </div>
    </div>
  );
}

let index = 4;
let dummyData = [
  { id: 1, fruit: "Apple" },
  { id: 2, fruit: "Kiwi" },
  { id: 3, fruit: "Dragonfruit" },
];
export function TodoApp() {
  const [todo, setTodo] = useState(dummyData);
  const handleDelete = (xyz) => {
    setTodo(
      todo.filter((v) => {
        return v.id !== xyz;
      })
    );
  };

  const handleEdit = (nextOBJECT) => {
    setTodo(
      todo.map((v) => {
        if (nextOBJECT.id == v.id) {
          return nextOBJECT;
        } else {
          return v;
        }
      })
    );
  };

  const handleAdd = (xyz) => {
    setTodo([...todo, { id: index++, fruit: xyz }]);
  };
  return (
    <div
      className="todoapp"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <TaskList x={todo} obID={handleDelete} newObj={handleEdit} />
      <AddTodo f={handleAdd} />
      <button
        onClick={() => setTodo([])}
        style={{
          margin: "15px 170px 0",
          padding: "6px",
          fontWeight: "600",
          borderRadius: "5px",
        }}
      >
        Delete ALL
      </button>
    </div>
  );
}

export function AddTodo({ f }) {
  const [fruitName, setFruitName] = useState("");
  return (
    <div
      className="addtodo"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <input
        placeholder="Add Something To Your List"
        style={{ margin: "0 10px", padding: "2px", width: "320px" }}
        type="text"
        value={fruitName}
        onChange={(e) => {
          setFruitName(e.target.value);
        }}
      />
      <button
        style={{ padding: "3px 15px", borderRadius: "3px", fontWeight: "600" }}
        onClick={() => {
          f(fruitName);
        }}
      >
        Add
      </button>
    </div>
  );
}

export function TaskList({ x, obID, newObj }) {
  return (
    <div
      className="tasklist"
      style={{
        display: "flex",
        flexDirection: "column",
        float: "left",
        padding: "10px",
      }}
    >
      {x.map((v, i) => (
        <div key={v.id}>
          <li style={{ listStyle: "none" }}>
            {" "}
            <Tasks obj={v} objId={obID} nextObj={newObj} />
          </li>
        </div>
      ))}
    </div>
  );
}

export function Tasks({ obj, objId, nextObj }) {
  const [show, setShow] = useState(false);
  let x;
  if (show) {
    x = (
      <>
        <input
          style={{ width: "310px", padding: "3px" }}
          type="text"
          value={obj.fruit}
          onChange={(e) => {
            e.target.style.outline = "none";
            e.target.style.border = "2px solid green";
            nextObj({
              ...obj,
              fruit: e.target.value,
            });
          }}
        />
        <button
          style={{ border: "none", margin: "0 4px" }}
          onClick={() => {
            setShow(false);
          }}
        >
          <i
            className="fa-solid fa-floppy-disk"
            style={{ fontSize: "larger", color: "green" }}
          ></i>
        </button>
      </>
    );
  } else {
    x = (
      <>
        <div
          className="fruits"
          style={{
            width: "310px",
            display: "inline-block",
            textAlign: "left",
            border: "1px solid gray",
            padding: "2px",
          }}
        >
          {obj.fruit}
        </div>
        <button
          style={{ border: "none", margin: "0 4px" }}
          onClick={() => {
            setShow(true);
          }}
        >
          <i
            class="fa-solid fa-pen-to-square"
            style={{ fontSize: "larger", color: "green" }}
          ></i>
        </button>
      </>
    );
  }

  return (
    <div className="task" style={{ padding: "5px" }}>
      {x}

      <button
        style={{ border: "none", margin: "0 4px" }}
        onClick={() => {
          objId(obj.id);
        }}
      >
        <i
          class="fa-solid fa-trash"
          style={{ fontSize: "larger", color: "red" }}
        ></i>
      </button>
    </div>
  );
}
