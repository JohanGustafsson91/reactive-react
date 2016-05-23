import React, { PropTypes } from 'react';
import DragElement from '../reactive/Rx_DragElement';

class Ball extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      positionX: Math.floor((Math.random() * document.body.clientWidth) + 1),
      positionY: Math.floor((Math.random() * document.body.clientHeight) + 1),
      isMoving: false
    };
  }

  componentDidMount() {
    DragElement(this.refs.ball, document.body, (position) => {
      position.isMoving = true;
      this.setState(position);
    }, () => {
      this.setState({
        isMoving: false
      });
    });
  }

  render () {
    const { positionX, positionY } = this.state;
    const { color } = this.props;

    let moveStyle = {left: positionX, top: positionY, backgroundColor: color};
    let theClass = this.state.isMoving ? 'ball dragging' : 'ball';

    return (
      <div className={theClass} ref="ball" style={moveStyle} />
    );
  }
}

export default Ball;
