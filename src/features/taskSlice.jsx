import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  task: [],
  loading: false,
  error: null,
  status: "All", // ✅ for filtering
};

// Async thunk to fetch tasks
export const fetchTodo = createAsyncThunk("tasks/fetchTodo", async () => {
  const response = await fetch("http://localhost:3001/jobs"); // your API
  const data = await response.json();

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description || "",
    status: task.Completed ? "Completed" : "To do", // ✅ Exact status strings
  }));
});

// Slice
export const TaskSlice = createSlice({
  name: "TaskSlice",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task.push(action.payload);
    },
    editTask: (state, action) => {
      state.task = state.task.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action) => {
      state.task = state.task.filter((task) => task.id !== action.payload); // ✅ fix
    },
    setStatus: (state, action) => {
      state.status = action.payload; // ✅ for filtering
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTask, editTask, deleteTask, setStatus } = TaskSlice.actions;
export default TaskSlice.reducer;
