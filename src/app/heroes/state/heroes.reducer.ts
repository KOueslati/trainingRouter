export function reducer(state, action) {
  console.log(`action type ${action.type}`);
  console.log(`preloading state ${state}`);
  switch (action.type) {
    case 'HERO-DETAIL':
      return {
        ...state,
        heroId: action.payload
      };

    default:
      break;
  }
}
