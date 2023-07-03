import * as yup from 'yup';

export const forexTraderValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
});
