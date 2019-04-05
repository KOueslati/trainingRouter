export function reducer(state, action) {
  switch (action.type) {
    case 'CHOICE-CRISIS-CENTER': {
      return {
        ...state,
        crisisId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
