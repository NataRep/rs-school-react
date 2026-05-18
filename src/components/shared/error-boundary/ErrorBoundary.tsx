import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '../button/Button';
import style from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  resetCondition: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.resetCondition !== this.props.resetCondition) {
      this.resetError();
    }
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  handleReload = () => {
    window.location.reload();
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }


  static componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack:', info.componentStack);
    console.error({
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.wrapper}>
          <h2>Oops! Something went wrong.</h2>
          <Button
            text="Reload This Page"
            callback={this.handleReload}
            disabled={false}
            className="blue"
            icon="reload"
            iconPosition="right"
          />
        </div>
      );
    }

    return this.props.children;
  }
}