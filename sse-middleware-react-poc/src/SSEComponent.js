import React from 'react'
import { connect } from 'react-redux';

class SSEComponent extends React.Component{

    componentDidMount(){
        // Open SSE connection with server - listen to every message
    }

    componentWillUnmount(){
        // Close SSE connection with server
    }

    render(){
        return(
            <p>Hello</p>
        )
    }

}


const mapStateToProps = (state) => ({
    allVideos: state.allVideos
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SSEComponent);
