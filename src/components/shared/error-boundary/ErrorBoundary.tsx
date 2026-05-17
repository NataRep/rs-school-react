// ErrorBoundary.tsx
import { Component } from 'react';
import Button from '../button/Button';
import { reloadPage } from '../utils/navigation';
import style from './ErrorBoundary.module.scss';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  handleReload = () => {
    reloadPage();
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error('ErrorBoundary caught an error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.wrapper}>
          <h2>Oops! Something went wrong.</h2>
          <Button
            type='button'
            text="Reload This Page"
            callback={this.handleReload}
            disabled={false}
            variant="blue"
            icon="reload"
            iconPosition="right"
          />
        </div>
      );
    }
    return this.props.children || null;
  }
}