import React from 'react';
import { ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Container } from './styles';

export const Toast = (props: ToastContainerProps): JSX.Element => {
  return <Container position="top-right" hideProgressBar={false} {...props} />;
};
