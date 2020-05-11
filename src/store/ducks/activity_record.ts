// Action Types
export const Types = {
    NEW: 'activity_record/NEW',
    DELETE_ALL: 'activity_record/DELETE_ALL'
};

// Reducer
const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.NEW:
            return [...state, action.payload];
        case Types.DELETE_ALL:
            return [];
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
    },
    deleteAllActivityRecords: () => {
        return {
            type: Types.DELETE_ALL,
            payload: null
        }
    }
}