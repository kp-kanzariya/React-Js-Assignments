import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./actions";

function Home() {
  const x = useSelector((state) => state.xyz);
  const dispatch = useDispatch();
  return (
    <div className="bg-info p-4 text-center ">
      <h1>Hello Redux</h1>
      <h3>count :  {x}</h3>
      <button className="rounded m-1" onClick={() => dispatch(increment())}>Increment</button>
      <button className="rounded m-1" onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}

export default Home;
