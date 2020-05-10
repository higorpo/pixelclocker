// Action Types
export const Types = {
    NEW: 'schedule/NEW',
};

// Reducer
const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.NEW:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

// Action Creators
export const Creators = {
    addNewEvent: (description, date) => {
        return {
            type: Types.NEW,
            payload: {
                description,
                date
            },
        }
    }
}