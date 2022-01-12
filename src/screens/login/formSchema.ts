import { Yup } from '~/modules';
import { ERROR_MESSAGE } from '~/utils';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(ERROR_MESSAGE.INVALID_EMAIL)
    .required(ERROR_MESSAGE.REQUIRED),
  password: Yup.string().required(ERROR_MESSAGE.REQUIRED),
});
