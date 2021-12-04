import React, { FC } from 'react';

import { ResetButton, Text, Wrapper } from './styles';

type Props = {
  reset(): void;
};

const CustomError: FC<Props> = ({ reset }) => (
  <Wrapper>
    <Text>Ops! Algo não saiu como esperado.</Text>
    <ResetButton onPress={reset}>
      <Text>Tentar novamente</Text>
    </ResetButton>
  </Wrapper>
);

export default CustomError;
