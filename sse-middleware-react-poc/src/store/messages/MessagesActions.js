import MessagesActionTypes from './MessagesActionTypes';
import SSEConstants from '../sse/sseConstants';

const videoMessages = (indexIdentifier) => ({
  type: SSEConstants.SSE_REQUEST,
  payload: {indexIdentifier},
  url: `videos/subscribe`,
  baseAction: MessagesActionTypes.MessagesForVideo,
  stopSreamingOn: {
    key: "progress",
    value: "100"
  }, 
  channel: "pipeline_progress"
});


const MessagesActions = {
  videoMessages
};

export default MessagesActions;
