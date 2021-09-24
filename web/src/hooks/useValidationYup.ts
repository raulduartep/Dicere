import * as Yup from 'yup';

export const useValidationYup = (shape: Record<string, Yup.AnySchema>) => {
  async function validate(data: Record<string, unknown>) {
    const validationErrors: Record<string, string> = {};

    try {
      const schema = Yup.object().shape(shape);

      await schema.validate(data, { abortEarly: false });

      return undefined;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });

        return validationErrors;
      }

      throw error;
    }
  }

  return {
    validate,
  };
};
