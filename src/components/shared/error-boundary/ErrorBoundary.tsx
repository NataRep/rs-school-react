import { Component } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { reloadPage } from '../../../utils/navigation';
import { NotFoundPage } from '../../not-found-page/NotFoundPage';
import Button from '../button/Button';
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

    return this.props.children;
  }
}

export function RouterErrorCatch() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  return (
    <ErrorBoundary>
      <TriggerError error={error} />
    </ErrorBoundary>
  );
}

function TriggerError({ error }: { error: unknown }): never {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(String(error || 'Rendering Error'));
}