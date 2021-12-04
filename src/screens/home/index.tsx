import React, { FC } from 'react';
import { NavigationActions } from '~/services';
import { Button, Container, Text, TextButton, Wrapper } from './styles';

const Home: FC = () => {
  return (
    <Container>
      <Wrapper>
        <Text>Home Screen</Text>
        <Button onPress={NavigationActions.goBack}>
          <TextButton>Voltar para Login</TextButton>
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Home;
