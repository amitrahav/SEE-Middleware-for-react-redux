const BASE_URL = "https://localhost:8000/api/v1/"; // My server base url 

const SSE_REQUEST = "SSE_REQUEST"; // This will be the identifier for the middlware to process that request.

// All states of requests the reducers will need to know
const createSSERequestAction = (actionType) => ({
  OPEN: `${actionType}_OPEN`,
  CLOSE: `${actionType}_CLOSE`,
  RECIVED: `${actionType}_RECIVED`,
  FAILURE: `${actionType}_FAILURE`,
  CONNECTING: `${actionType}_CONNECTING`,
  BASE: actionType,
});

const SSEConstants = {
  BASE_URL,
  SSE_REQUEST,
  createSSERequestAction,
};

export default SSEConstants;