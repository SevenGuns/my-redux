import React, { PureComponent } from 'react';
import random from 'lodash/random';
import { connect } from '../../my-react-redux';

class User extends PureComponent {
  onBtnClick = () => {
    setTimeout(() => {
      this.props.save(random(100));
    }, 2000);
  };
  render() {
    return (
      <div>
        <button onClick={this.onBtnClick}>测试</button>
        <div>{this.props.name}</div>
      </div>
    );
  }
}

export default connect(
  // mapStateToProps
  state => ({
    name: state
  }),
  // mapDispatchToProps
  {
    save: payload => ({ type: 'SAVE', payload })
  }
)(User);
