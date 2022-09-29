const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_ALL_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_DOGS_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "FILTER_DOGS_BY_TEMPERAMENTS":
      const dogs = state.allDogs;
      const temperamentsFiltered =
        action.payload === "temp"
          ? dogs
          : dogs.filter((el) =>
              el.temperament
                ?.toLowerCase()
                .includes(action.payload.toLowerCase())
            );
      return {
        ...state,
        dogs: temperamentsFiltered,
      };
    case "FILTER_CREATED":
      const dogs2 = state.allDogs;
      const createdFilter =
        action.payload == "created"
          ? dogs2.filter((el) => el.createdInDb)
          : dogs2.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: action.payload === "all" ? dogs2 : createdFilter,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };
    case "POST_DOGS":
      return {
        ...state,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
