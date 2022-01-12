import React, { FC } from 'react';
import { Env } from '~/modules';
import { Analytics, Crashlytics, NavigationActions, Sentry } from '~/services';
import { useTheme } from '~/theme';
import { useAlerts, useStores } from '../../utils';
import {
  Button,
  Container,
  DevText,
  Text,
  TextButton,
  Wrapper,
} from './styles';

const Home: FC = () => {
  const { example } = useStores();
  const { setDark, setLight } = useTheme();
  const { showError } = useAlerts();

  const showAlert = () => {
    showError('Teste de Mensagem de erro');
  };

  const logout = () => {
    NavigationActions.goBack();
  };

  return (
    <Container>
      <Wrapper>
        <Text>Template Alisson</Text>
        <DevText>{`Ambiente: ${Env.ENV}`}</DevText>
        <DevText>{`DevMode: ${__DEV__}`}</DevText>
        <Button onPress={setDark}>
          <TextButton>DarkTheme</TextButton>
        </Button>
        <Button onPress={setLight}>
          <TextButton>LightTheme</TextButton>
        </Button>
        <Button onPress={Crashlytics.test}>
          <TextButton>Test Crashlytics</TextButton>
        </Button>
        <Button onPress={Analytics.test}>
          <TextButton>Test Analytics</TextButton>
        </Button>
        <Button onPress={Sentry.test}>
          <TextButton>Test Sentry</TextButton>
        </Button>
        <Button onPress={showAlert}>
          <TextButton>Test Alerts</TextButton>
        </Button>
        <Button onPress={logout}>
          <TextButton>Deslogar</TextButton>
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Home;
