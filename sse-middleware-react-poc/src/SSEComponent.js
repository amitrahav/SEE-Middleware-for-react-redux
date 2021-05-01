import React from 'react'
import { connect } from 'react-redux';
import MessagesActions from './store/messages/MessagesActions';

class SSEComponent extends React.Component{

    componentDidMount(){
        // Open SSE connection with server - listen to every message
        this.props.openVideoConnection(1)
    }

    render(){
        return (
            <ul>
            {this.props.allVideos.map(video => 
                <li> video progress: {video?.progress}</li>
            )}
            </ul>
        )
    }

}


const mapStateToProps = (state) => ({
    allVideos: state.allVideos
});

const mapDispatchToProps = {
    openVideoConnection: MessagesActions.videoMessages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SSEComponent);
