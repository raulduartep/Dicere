import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const Container = styled(ToastContainer)`
  .Toastify__toast--info {
    background: ${({ theme }) => theme.info};
  }
  .Toastify__toast--success {
    background: ${({ theme }) => theme.success};
  }
  .Toastify__toast--warning {
    background: ${({ theme }) => theme.warning};
  }
  .Toastify__toast--error {
    background: ${({ theme }) => theme.error};
  }
`;
