import React, { FC, useCallback, useEffect, useRef } from 'react';
import { StyleProp, TextInput, TextStyle } from 'react-native';
import { MaskedTextInputProps, unMask, useField } from '~/modules';
import { parseCurrency } from '~/utils';
import If from '../if';
import {
  ContainerInput,
  ErrorMessage,
  IconLeft,
  IconRight,
  InputStyled,
  Label,
  MaskedInputStyled,
  WrapperInput,
} from './styles';

type Props = Omit<MaskedTextInputProps, 'onChangeText'> & {
  name: string;
  label?: string;
  isRawValue?: boolean;
  onChangeText?: (text: string, rawText: string) => void;
  leftIcon?: string;
  rightIcon?: string;
  leftIconStyle?: StyleProp<TextStyle>;
  rightIconStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
};

type InputReference = TextInput & {
  value: string;
};

const Input: FC<Props> = ({
  name,
  label,
  isRawValue = false,
  onChangeText,
  leftIcon,
  rightIcon,
  leftIconStyle,
  rightIconStyle,
  labelStyle,
  errorStyle,
  ...props
}) => {
  const inputRef = useRef<InputReference>(null);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (isRawValue) {
          const rawText = unMask(inputRef?.current?.value || '', props?.type);
          if (props?.type === 'currency')
            return parseCurrency({ value: rawText });
          return rawText;
        }
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    (value: string, rawValue: string) => {
      if (inputRef.current) inputRef.current.value = value;
      if (onChangeText) onChangeText(value, rawValue);
    },
    [onChangeText],
  );

  return (
    <ContainerInput>
      <If condition={!!label}>
        <Label style={labelStyle}>{label}</Label>
      </If>
      <WrapperInput>
        <If condition={!!leftIcon}>
          <IconLeft name={leftIcon as string} style={leftIconStyle} />
        </If>
        <If condition={!props?.type && !props?.mask}>
          <InputStyled
            ref={inputRef}
            onChangeText={(text) => handleChangeText(text, text)}
            defaultValue={defaultValue}
            {...props}
          />
        </If>
        <If condition={!!props?.type || !!props?.mask}>
          <MaskedInputStyled
            ref={inputRef}
            defaultValue={defaultValue}
            onChangeText={handleChangeText}
            {...props}
          />
        </If>
        <If condition={!!rightIcon}>
          <IconRight name={rightIcon as string} style={rightIconStyle} />
        </If>
      </WrapperInput>
      <If condition={!!error}>
        <ErrorMessage style={errorStyle}>{error}</ErrorMessage>
      </If>
    </ContainerInput>
  );
};

export default Input;
