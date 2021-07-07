import React, { ComponentType } from 'react';

export default function withChrome<T extends {}>(
  Component: ComponentType<T>,
  timeout = 200,
) {
  return class extends React.Component<T> {
    static displayName = 'Chrome';

    state = { isLoaded: false };
    timer: number | null = null;

    componentDidMount() {
      this.timer = window.setTimeout(() => {
        this.setState({ isLoaded: true });
      }, timeout);
    }

    componentWillUnmount() {
      if (this.timer) clearTimeout(this.timer);
    }

    render() {
      return (
        <div className={this.state.isLoaded ? 'is-loaded' : ''}>
          <Component {...(this.props as T)} />
        </div>
      );
    }
  };
}
