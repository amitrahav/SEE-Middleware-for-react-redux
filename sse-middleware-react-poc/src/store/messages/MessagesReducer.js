import MessagesActionTypes from "./MessagesActionTypes";

const initialState = {
  allVideos: [],
};

const MessagesReducer = (state, action) => {
  if (!state) {
    return initialState;
  }
	const {type, payload} = action;

  switch(type){

    case MessagesActionTypes.MessagesForVideo.OPEN: {
        const newVideos = [...state.allVideos]; //Create a state copy
        newVideos[payload.indexIdentifier - 1] = { // Manpulate specific indexed video status
          ...newVideos[payload.indexIdentifier - 1],
          status: "connected",
        };
        // Return the new state
        return {
          ...state,
          allVideos: newVideos,
        };
    }
    case MessagesActionTypes.MessagesForVideo.CLOSE: {
        const newVideos = [...state.allVideos];  // Create a state copy
        newVideos[payload.indexIdentifier - 1] = { // Manpulate specific indexed video status
          ...newVideos[payload.indexIdentifier - 1],
          status: "disconnected",
        };
        // Return the new state
        return {
          ...state,
          allVideos: newVideos,
        };
    }
    case MessagesActionTypes.MessagesForVideo.FAILURE: {
      const newVideos = [...state.allVideos];  // Create a state copy
      newVideos[payload.indexIdentifier - 1] = { // Manpulate specific indexed video status
        ...newVideos[payload.indexIdentifier - 1],
        status: "failed",
      };
      
      // Return the new state
      return {
        ...state,
        allVideos: newVideos,
      };
    }
    case MessagesActionTypes.MessagesForVideo.RECIVED: {
      const newVideos = [...state.allVideos];  // Create a state copy
      newVideos[payload.indexIdentifier - 1] = { // Manpulate specific indexed video status
        ...newVideos[payload.indexIdentifier - 1],
        progress: payload.progress,
        status: "proccessing",
      };
      // Return the new state
      return {
        ...state,
        allVideos: newVideos,
      };
    }
    case MessagesActionTypes.MessagesForVideo.CONNECTING: {
      const newVideos = [...state.allVideos];  // Create a state copy
      newVideos[payload.indexIdentifier - 1] = { // Manpulate specific indexed video status
        ...newVideos[payload.indexIdentifier - 1],
        progress: "0",
        status: "connecting",
      };
      // Return the new state
      return {
        ...state,
        allVideos: newVideos,
      };
    }

    default:
      // Do nothing
      return state;

  }

}

export default MessagesReducer