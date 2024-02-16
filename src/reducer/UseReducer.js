export const initialState = null;
export const reducer = (State, action) => {
    if (action.type === "USER"){
        return action.payload;
    }
    return State;
}
