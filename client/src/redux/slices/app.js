import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT",    //The sidebar will open contact info by default, so setting it as initial state
    },
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Toggle Sidebar.
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },

        updateSidebar(state, action) {
            state.sidebar.type = action.payload.type;
        }
    }
})

export default slice.reducer;   //Only export the reducer from slice.


// THUNK FUNCTIONS
export function ToggleSidebar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSidebar());
    }
}

export function UpdateSidebar(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateSidebar({type}))
    }
}