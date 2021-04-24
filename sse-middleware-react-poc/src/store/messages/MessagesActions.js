import MessagesActionTypes from './MessagesActionTypes';
import SSEConstants from '../sse/sseConstants';

const videoMessages = () => ({
  type: SSEConstants.SSE_REQUEST,
  payload: {},
  url: `videos/subscribe`,
  baseAction: MessagesActionTypes.MessagesForVideo,
});


const MessagesActions = {
  videoMessages
};

export default MessagesActions;
