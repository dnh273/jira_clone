import { GET_TASK_API } from "../constants/ToDoListConst"


const initialState = {
    taskList: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_API:
            state.taskList = action.taskList;
            return { ...state }

        default: return { ...state }
    }
}