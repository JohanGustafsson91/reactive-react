import React, {PropTypes} from 'react';
import Ball from './components/Ball';
import * as _ from 'lodash';
require('./style/base.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { balls: [{color: 'red', id: _.uniqueId('ball_')} ]};
  }

  _addBall() {
    let {balls} = this.state;
    balls.push({
      color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
      id: _.uniqueId('ball_')
    });
    this.setState({balls });
  }

  render() {
    let balls = this.state.balls.map((ball) => {
      return <Ball color={ball.color} key={ball.id} />;
    });

    return (
      <div>
        <h1>Reactive React example</h1>
        <button
          className="add-btn"
          onClick={() => this._addBall()}>Add ball</button>
        {balls}
      </div>
    );
  }
}

export default App;
