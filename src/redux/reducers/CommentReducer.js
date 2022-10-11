import { GET_ALL_COMMENTS } from "../constants/Cyberbugs/CommentConstans"

const initialState = {
    listComment: [
        {
            "user": {
                "userId": 2507,
                "name": "Hoài Thanh",
                "avatar": "https://ui-avatars.com/api/?name=Hoài Thanh"
            },
            "id": 5183,
            "userId": 2507,
            "taskId": 5587,
            "contentComment": "demo comment",
            "deleted": false,
            "alias": "demo-comment"
        }
    ]
}


export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_COMMENTS:
            state.listComment = action.listComment


            return { ...state }

        default:
            return state
    }
}
