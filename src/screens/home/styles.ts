import styled from 'styled-components/native';
import { ScreenWrapper } from '~/components';

export const Container = styled(ScreenWrapper).attrs({
  fullWidth: true,
})``;

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
