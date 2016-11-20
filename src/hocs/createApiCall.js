import React, { Component } from 'react';

function createApiCall(apiCall, callbackName, resultName) {
  return function (MyComponent) {
    class CallComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          data: []
        };
      }

      loadData(...args) {
        return apiCall(...args).then(data => {
          this.setState({
            data
          });
        });
      }

      render() {
        const newProps = {
          [callbackName]: this.loadData.bind(this),
          [resultName]: this.state.data
        };

        return (
          <MyComponent {...this.props} {...newProps} />
        );
      }
    }

    return CallComponent;
  };
}

export default createApiCall;
