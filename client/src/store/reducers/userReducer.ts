import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../interfaces/types";
import axios from "axios";
export const getUser: any = createAsyncThunk("user/getAllUser", async () => {
  const response = await axios.get(" http://localhost:3000/users");
  return response.data;
});
const initialState: User[] = [];
export const addUser: any = createAsyncThunk("user/addUser", async (user) => {
  const response = await axios.post("http://localhost:3000/users", user);
  return response.data;
});

export const deleteUser: any = createAsyncThunk(
  "user/deleteUser",
  async (id) => {
    const response = await axios.delete(`http://localhost:3000/users/${id}`);
    return id;
  }
);
export const updateUser: any = createAsyncThunk(
  "user/updateUser",
  async (user: User) => {
    const response = await axios.patch(
      `http://localhost:3000/users/${user.id}`,
      { name: user.name }
    );
    return user;
  }
);

const userReducer = createSlice({
  name: "User",
  initialState: {
    user: initialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state: any, action: any) => {
        // chờ lấy dữ liệu
      })
      .addCase(getUser.fulfilled, (state, action) => {
        //lấy dữ liệu thành công
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        // thất bại khi lấy dữ liệu >.<
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.user.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userToDelete = action.payload;

        const updatedUsers = state.user.filter(
          (user) => user.id !== userToDelete
        );
        state.user = updatedUsers;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const userIdToUpdate = action.payload.id;
        console.log(state.user);
        
        state.user = state.user.map((user) =>
          user.id === userIdToUpdate ? action.payload : user
        );
      });
  },
});
export {};
export default userReducer.reducer;
