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

    case MessagesActionTypes.Video.OPEN: {
        const newVideos = [...state.allVideos]; //Create a state copy
        newVideos[payload.indexIdentifier] = { // Manpulate specific indexed video status
          ...newVideos[payload.indexIdentifier],
          ...payload.data,
          status: "connected",
        };
        // Return the new state
        return {
          ...state,
          allVideos: newVideos,
        };
    }
    case MessagesActionTypes.Video.CLOSE: {
        const newVideos = [...state.allVideos];  // Create a state copy
        newVideos[payload.indexIdentifier] = { // Manpulate specific indexed video status
          ...newVideos[payload.indexIdentifier],
          status: "disconnected",
        };
        // Return the new state
        return {
          ...state,
          allVideos: newVideos,
        };
    }
    case MessagesActionTypes.Video.FAILURE: {
      const newVideos = [...state.allVideos];  // Create a state copy
      newVideos[payload.indexIdentifier] = { // Manpulate specific indexed video status
        ...newVideos[payload.indexIdentifier],
        status: "failed",
      };
      // Return the new state
      return {
        ...state,
        allVideos: newVideos,
      };
    }
    case MessagesActionTypes.CreateVideo.RECIVED: {
      const newVideos = [...state.allVideos];  // Create a state copy
      newVideos[payload.indexIdentifier] = { // Manpulate specific indexed video status
        ...newVideos[payload.indexIdentifier],
        status: "proccessing",
      };
      // Return the new state
      return {
        ...state,
        allVideos: newVideos,
      };
    }
    case MessagesActionTypes.CreateVideo.CONNECTING: {
      const newVideos = [...state.allVideos];  // Create a state copy
      newVideos[payload.indexIdentifier] = { // Manpulate specific indexed video status
        ...newVideos[payload.indexIdentifier],
        status: "connecting",
      };
      // Return the new state
      return {
        ...state,
        allVideos: newVideos,
      };
    }
  }

}

export default MessagesReducer