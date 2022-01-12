import { Yup } from '~/modules';

type Params = {
  data: Record<string, string>;
  scheme: any;
};

type ValidateResult = {
  hasError: boolean;
  errors: Record<string, string>;
};

export async function validateForm({
  data,
  scheme,
}: Params): Promise<ValidateResult> {
  try {
    await scheme.validate(data, {
      abortEarly: false,
    });
    return {
      hasError: false,
      errors: {},
    };
  } catch (err) {
    const validationErrors: Record<string, string> = {};
    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        validationErrors[error?.path as string] = error.message;
      });
      return {
        hasError: true,
        errors: validationErrors,
      };
    }
    throw err;
  }
}
