import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
}

interface State {
    user: User[];
}

const initialState: State = {
    user: [],
};

const slice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<string>) => {
            const data: User = {
                id: nanoid(),
                name: action.payload,
            };
            state.user.push(data);
        },
    },
});

export const { addUser } = slice.actions;
export default slice.reducer;
