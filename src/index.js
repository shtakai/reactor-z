import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    counter: 0,
    nestedCounter: {
      counter: 0
    },
    activeComponent: {}
  };

  reset = () => {
    this.setState({
      counter: 0,
      nestedCounter: {
        counter: 0
      },
      activeComponent: {}
    });
  };

  handleNestedCounterAdd() {
    const { nestedCounter } = this.state;

    nestedCounter.counter++;
    this.setState({ nestedCounter });
  }

  toggleComponent(type) {
    return () => {
      const { activeComponent } = this.state;

      activeComponent[type] = !activeComponent[type];
      this.setState({ activeComponent });
    };
  }

  renderComponentCheckboxes() {
    const { activeComponent } = this.state;
    return (
      <div>
        <input
          type="checkbox"
          id="pure"
          checked={activeComponent.pure}
          onChange={this.toggleComponent("pure")}
        />
        <label htmlFor="pure">PureComponent</label>
        <input
          type="checkbox"
          id="stateless"
          checked={activeComponent.stateless}
          onChange={this.toggleComponent("stateless")}
        />
        <label htmlFor="stateless">StatelessComponent</label>
      </div>
    );
  }

  render() {
    const { counter, nestedCounter, activeComponent } = this.state;

    return (
      <div>
        {this.renderComponentCheckboxes()}
        <button
          onClick={() => {
            this.setState({ counter: counter + 1 });
          }}
        >
          counter++
        </button>
        <button onClick={this.handleNestedCounterAdd}>nested counter++</button>
        <button onClick={this.reset}>reset 💔</button>
        <div>
          <p>
            App <b>counts {counter}</b> <span className="spin">😂</span> and{" "}
            <b>nestedly counts {nestedCounter.counter}</b>{" "}
            <span className="spin">🤣</span>
          </p>
        </div>
        {activeComponent.pure && (
          <MyPureComponent counter={counter} nestedCounter={nestedCounter} />
        )}
        {activeComponent.stateless && (
          <StatelessComponent counter={counter} nestedCounter={nestedCounter} />
        )}
      </div>
    );
  }
}

class MyPureComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <p>
          Pure component <b>counts {this.props.counter}</b> and{" "}
          <b>nestedly counts {this.props.nestedCounter.counter}</b>
        </p>
      </div>
    );
  }
}

const StatelessComponent = props => (
  <div>
    <p>
      Stateless component <b>counts {props.counter}</b> and{" "}
      <b>nestedly counts {props.nestedCounter.counter}</b>
    </p>
  </div>
);

const container = document.getElementById("app");
ReactDOM.render(<App />, container);
