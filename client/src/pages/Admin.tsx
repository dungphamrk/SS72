import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, getUser, updateUser } from "../store/reducers/userReducer";
import User from "../interfaces/types";

export default function Admin() {
  const getData = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  console.log(getData);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const addNewUser = () => {
    let newUser = {
      name: "dungcuteee",
    };
    dispatch(addUser(newUser));
  };
  const delUser = (id: number) => {
    dispatch(deleteUser(id));
  };
  const updUser=(id:number)=>{
    let newUser={
        id:id,
        name:"dungupdate"
    }
    dispatch(updateUser(newUser))
  }
  return (
    <div>
      <button onClick={addNewUser}>Add</button>
      {getData.map((element: User) => {
        return (
          <p key={element.id}>
            {element.name}{" "}
            <button onClick={() => delUser(element.id)}>Delete</button>{" "}
            <button onClick={()=> updUser(element.id)}>Update</button>
          </p>
        );
      })}
    </div>
  );
}
