const initialState = {
    isLoading: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case 'DISPLAY_LOADING':
            state.isLoading = true;
            return { ...state }
        case 'HIDE_LOADING':
            state.isLoading = false;
            return { ...state }

        default:
            return { ...state }

    }
}
