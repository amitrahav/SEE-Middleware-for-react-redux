import SSEConstants from '../sse/sseConstants'

const getPrefix = action => `MessagesActionTypes.${action}`;

const MessagesForVideo = SSEConstants.createSSERequestAction(getPrefix("Video"))

const  MessagesActionTypes = {
    MessagesForVideo
}

export default MessagesActionTypes;
