import React, { FC } from 'react';
import { useStores } from '../../utils';
import { Wrapper } from './styles';

const Login: FC = () => {
  const { example } = useStores();
  return <Wrapper />;
};

export default Login;
