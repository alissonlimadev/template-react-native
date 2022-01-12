import styled from 'styled-components/native';
import { Input, ScreenWrapper } from '~/components';

export const Container = styled(ScreenWrapper).attrs({})``;

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.pallete.text.main};
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.pallete.text.main};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: bold;
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  border-width: ${({ theme }) => theme.borderWidth.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-color: ${({ theme }) => theme.pallete.primary.main};
`;

export const Button = styled.TouchableOpacity``;

export const DevText = styled.Text`
  color: ${({ theme }) => theme.pallete.text.main};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const WrapperForm = styled.View`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const InputEmail = styled(Input)`
  text-transform: lowercase;
`;
