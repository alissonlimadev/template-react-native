import { TextInput } from 'react-native';
import { DefaultTheme, Icon, MaskedTextInput, styled } from '~/modules';
export const ContainerInput = styled.View``;

export const WrapperInput = styled.View`
  min-height: ${({ theme }) => theme.metrics.inputHeight}px;
  border-radius: ${({ theme }) => theme.themeRadius.input}px;
  border-width: ${({ theme }) => theme.borderWidth.xs}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const getInputTheme = (theme: DefaultTheme) => `
color: ${theme.pallete.text.main}px;
font-size: ${theme.fontSizes.md}px;
flex:1;
height: 100%;
`;

export const InputStyled = styled(TextInput)`
  ${({ theme }) => getInputTheme(theme)};
`;

export const MaskedInputStyled = styled(MaskedTextInput)`
  ${({ theme }) => getInputTheme(theme)};
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.pallete.text.main}px;
`;

export const IconLeft = styled(Icon).attrs({
  size: 20,
})`
  padding-right: ${({ theme }) => theme.spacing.md}px;
`;

export const IconRight = styled(Icon).attrs({
  size: 20,
})`
  padding-left: ${({ theme }) => theme.spacing.md}px;
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.pallete.danger.main};
  padding-top: ${({ theme }) => theme.spacing.xxs}px;
`;
