
export const FollowerReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FOLLOWER':
            return [...state, {
                name: action.follower.name,
                email: action.follower.email,
                id: action.follower.id,
                following: action.follower.following
            }]
        case 'REMOVE_FOLLOWER': 
            return state.filter((follower) => follower.id !== action.id)
        default:
            return state
    }
} 