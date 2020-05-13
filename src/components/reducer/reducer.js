import initialState from "../store/store";

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "OPENCLOSE_PROFIL":
      newState.ProfilIsOpen = newState.ProfilIsOpen ? false : true;
      return newState;

    case "CREATE_USER_DATA":
      newState.user.id = action.value.returnData.id;
      newState.user.login = action.value.returnData.login;
      newState.user.token = action.value.token;
      return newState;

    case "FETCHING_USER_DATA":
      const data = action.value;
      return {
        ...newState,
        user: {
          id: data.user.id,
          name: data.user.name,
          avatar: data.user.avatar,
          login: data.user.login,
          token: data.token,
        }
      };

    case "DATA_NEXT_TRIP":
      const dataNext = action.data;
      newState.NextTrip = [];
      dataNext.map(obj => {
        return newState.NextTrip.push(obj);
      });
      return newState;

    case "DATA_LAST_TRIP":
      const dataLast = action.data;
      newState.LastTrip = [];
      dataLast.map(obj => {
        return newState.LastTrip.push(obj);
      });
      return newState;

    default:
      return newState;
  }
};
export default reducer;