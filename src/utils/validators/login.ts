import { Yup } from '~/modules';
import { ERROR_MESSAGE } from '../enums';

export const loginScheme = Yup.object().shape({
  email: Yup.string()
    .email(ERROR_MESSAGE.INVALID_EMAIL)
    .required(ERROR_MESSAGE.REQUIRED),
  password: Yup.string().required(ERROR_MESSAGE.REQUIRED),
});
