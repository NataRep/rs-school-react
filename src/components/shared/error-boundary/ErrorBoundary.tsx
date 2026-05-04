import { Component, type ErrorInfo, type ReactNode } from 'react';
import style from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.wrapper}>
          <h2>Oops! Something went wrong.</h2>
          <p>Try search in another category!</p>
        </div>
      );
    }

    return this.props.children;
  }
}