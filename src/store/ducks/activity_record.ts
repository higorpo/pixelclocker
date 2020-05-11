// Action Types
export const Types = {
    NEW: 'activity_record/NEW',
};

// Reducer
const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.NEW:
            return [...state, action.payload];
        default:
            return state;
    }
}

// Action Creators
export const Creators = {
    addNewRecord: (description, time) => {
        return {
            type: Types.NEW,
            payload: {
                description,
                time
            },
        }
    }
}