import SSEConstants from "./sseConstants";

const sseMiddleware = ({ dispatch }) => {
	// This middleware will handle all requests, so we need to identify only the sse ones
  return (next) => async (action) => {
		// The way of desiding if it's a sse request we need to handle - is by the action type
    if (action.type !== SSEConstants.SSE_REQUEST) {
      return next(action);
    }

    const { url, baseAction, payload, stopSreamingOn, channel } = action;
		// All sse type action should indlude all of those keys:
		// url: strign of server endpoint to send connection request to
		// baseAction: string of the action name the reducer knows (including it's deiffernt stages)
		// payload: object of data the reducer or the middleware will need
		// stopStreaminOn: object {key: str, value: str} witch represent the a data part that if recived - will trigger a close connection event
		// cannel: string represnting the messaging channel name this communication will listen to
		
    // trigger CONNECTING - let the user know we are starting to handle thier request.
    dispatch({
      type: baseAction.CONNECTING,
      payload,
    });
		
		// set the event source stream by connection the server base url and our specific action endpoint
    const messagingUrl = `${SSEConstants.BASE_URL}${url}/`;
    const evtSource = new EventSource(messagingUrl,{withCredentials: true });

    // trigger OPEN - let the user know the connection is open, and now we can show proggress bar if we want
  evtSource.addEventListener('open', function (e) {
      dispatch({
        type: baseAction.OPEN,
        payload,
      });
    });

    // when messages arrive we handle two possible events here: closing request, and message requset.
    evtSource.addEventListener(channel, e => {
      const data = JSON.parse(e.data)
			// trigger RECIVED - let the user know what they waana know!
      dispatch({
        type: baseAction.RECIVED,
        payload: {
          ...payload,
          ... data,
        },
      });

      // Check if data object holds a key and value we described on stopSreamingOn event property
      if (data.hasOwnProperty(stopSreamingOn.key) &&  data[stopSreamingOn.key]=== stopSreamingOn.value) {

				// trigger CLOSE - let the user know the connection with server has stoped. mostly used when server task is done.
				dispatch({
	        type: baseAction.CLOSE,
	        payload: {
	          ...payload,
	          ...data,
	        },
	      });

				evtSource.close(); // Close this communication chanle 
        
      }
    });

    // trigger FAILURE - let the user know we couldnt get what they needed.
    evtSource.onerror = function (e) {
			// This is a good place for more complex or logical error handeling

      dispatch({
        type: baseAction.FAILURE,
        payload,
      });
    };

  };
};

export default sseMiddleware;