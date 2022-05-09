export const browserReducer = (state, { type, payload }) => {
    switch (type) {
      case "USER_NAME":
        return {
          ...state,
          name: payload
        };
  
      case "SUBMIT":
        return {
          ...state,
          isFlag: true
        };
  
      case "TIME":
        return {
          ...state,
          time: payload
        };
  
      case "MESSAGE":
        return {
          ...state,
          message:
            payload >= 0 && payload < 12
              ? "Good morning"
              : payload >= 12 && payload <= 17
              ? "Good afternoon"
              : "Good evening"
        };
  
      case "TASK":
        return {
          ...state,
          task: payload
        };
  
      case "ADD_TASK":
        return {
          ...state,
          isTaskAdded: !state.isTaskAdded
        };
  
      case "CLEAR":
        return {
          ...state,
          task: null
        };
  
      case "QUOTE":
        return {
          ...state,
          textQuote: payload
        };
  
      default:
        return state;
    }
  };
  