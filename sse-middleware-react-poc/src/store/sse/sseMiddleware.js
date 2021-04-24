import SSEConstants from "./sseConstants";

const sseMiddleware = ({ dispatch }) => {
	// This middleware will handle all requests, so we need to identify only the sse ones
  return (next) => async (action) => {
		// The way of desiding if it's a sse request we need to handle - is by the action type
    if (action.type !== SSEConstants.SSE_REQUEST) {
      return next(action);
    }

    const { url, baseAction, payload, stopSreamingOn, chanel } = action;
		// All sse type action should indlude all of those keys:
		// Url: strign of server endpoint to send connection request to
		// BaseAction: string of the action name the reducer knows (including it's deiffernt stages)
		// payload: object of data the reducer or the middleware will need
		// StopStreaminOn: object {key: str, value: str} witch represent the a data part that if recived - will trigger a close connection event
		// Chanel: string represnting the messaging chanel name this communication will listen to
		
    // trigger CONNECTING - let the user know we are starting to handle thier request.
    dispatch({
      type: baseAction.CONNECTING,
      payload,
    });
		
		// set the event source stream by connection the server base url and our specific action endpoint
    const messagingUrl = `${SSEConstants.BASE_URL}${url}`;
    const evtSource = new EventSource(messagingUrl, { withCredentials: true });

    // trigger OPEN - let the user know the connection is open, and now we can show proggress bar if we want
    evtSource.onopen = function () {
      dispatch({
        type: baseAction.OPEN,
        payload,
      });
    };

    // when messages arrive we handle two possible events here: closing request, and message requset.
    evtSource.addEventListener(chanel, (e) => {

      // Check if data object holds a key and value we described on stopSreamingOn event property
      if (e.data.has(stopSreamingOn.key) &&  e.data[stopSreamingOn.key]=== stopSreamingOn.value) {

				evtSource.close(); // Close this communication chanle 

				// trigger CLOSE - let the user know the connection with server has stoped. mostly used when server task is done.
				dispatch({
	        type: baseAction.CLOSE,
	        payload: {
	          ...payload,
	          ...e.data,
	        },
	      });
        
      }

			// If this is not a closing request
			// trigger RECIVED - let the user know what they waana know!
      dispatch({
        type: baseAction.RECIVED,
        payload: {
          ...payload,
          ...e.data,
        },
      });
    });

    // trigger FAILURE - let the user know we couldnt get what they needed.
    evtSource.onerror = function (e) {
			// This is a good place for more complex or logical error handeling
      console.error("SSE got error", e);
      dispatch({
        type: baseAction.FAILURE,
        payload,
      });
    };

  };
};

export default sseMiddleware;