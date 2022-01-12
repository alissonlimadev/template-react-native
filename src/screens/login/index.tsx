import React, { FC, useRef } from 'react';
import { Input } from '~/components';
import { Form, FormHandles, SubmitHandler } from '~/modules';
import { NavigationActions } from '~/services';
import {
  Routes,
  Stacks,
  currencyOptions,
  useAlerts,
  validateForm,
} from '~/utils';
import { validationSchema } from './formSchema';
import {
  Button,
  Container,
  InputEmail,
  TextButton,
  Wrapper,
  WrapperForm,
} from './styles';

type FormData = {
  email: string;
  password: string;
};

const EMAIL = 'test@test.com';

const Login: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { showError } = useAlerts();

  const goToHome = () => {
    NavigationActions.navigate(Stacks.PRIVATE, { screen: Routes.HOME });
  };

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      formRef?.current?.setErrors({});
      const result = await validateForm({ data, scheme: validationSchema });
      if (result.hasError) {
        formRef?.current?.setErrors(result.errors);
        return;
      }
      if (data.email.toLowerCase() === EMAIL) {
        goToHome();
      } else {
        showError('Usuário inválido');
      }
    } catch (_) {
      showError('Ocorreu um erro');
    }
  };

  return (
    <Container>
      <Wrapper>
        <WrapperForm>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputEmail
              name="email"
              label="Email"
              placeholder={EMAIL}
              leftIcon="rocket"
              rightIcon="rocket"
            />
            <Input
              name="password"
              label="Password"
              options={currencyOptions}
              placeholder="any"
              secureTextEntry
            />
          </Form>
        </WrapperForm>
        <Button onPress={() => formRef?.current?.submitForm()}>
          <TextButton>Ir para Home</TextButton>
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Login;
