import React, { FC } from 'react';
import { useErrorBoundary } from '~/modules';
import { Crashlytics, NavigationActions } from '~/services';
import CustomError from './CustomError';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const ErrorBoundary: FC<Props> = ({ children }) => {
  const { ErrorBoundary, reset } = useErrorBoundary({
    onDidCatch: (error: Error) => {
      const currentRoute = NavigationActions.getCurrentRoute();
      error.message = `${error?.message} - route: ${currentRoute}`;
      Crashlytics.recordError(error);
    },
  });

  return (
    <ErrorBoundary renderError={() => <CustomError reset={reset} />}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
