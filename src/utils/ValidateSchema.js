import * as Yup from 'yup';

export const SigninSchema = Yup.object({
  email: Yup.string()
    .email('Please re-enter your email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rePassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('rePassword is required'),
});

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Please enter correct email format')
    .required('Email is required'),
});

export const AddUserSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(2, 'Username must be at least 2 characters long'),
  email: Yup.string()
    .email('Please enter correct email format')
    .required('Email is required'),
  birthday: Yup.date('Birthday is required')
    .required('Birthday is required')
    .typeError('Birthday is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(
      /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/,
      'Please enter correct phone number format',
    ),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  userType: Yup.string().required('User type is required'),
  agency: Yup.string().when('userType', {
    is: (val) => val === 'KOC',
    then: Yup.string().required('Agency is required'),
  }),
  roles: Yup.array()
    .min(1)
    .required()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        text: Yup.string(),
      }),
    )
    .typeError('Role is required'),
  color: Yup.string(),
  bio: Yup.string(),
  newPassword: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    'Passwords do not match	',
  ),
  category: Yup.string().required('Category is required'),
  tier: Yup.string().required('Tier is required'),
  platforms: Yup.array()
    .min(1)
    .required()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        text: Yup.string(),
      }),
    )
    .typeError('Platforms is required'),
});

export const EditUserSchema = Yup.object().shape(
  {
    username: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 2 characters long'),
    email: Yup.string()
      .email('Please enter correct email format')
      .required('Email is required'),
    birthday: Yup.date('Birthday is required')
      .required('Birthday is required')
      .typeError('Birthday is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(
        /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/,
        'Please enter correct phone number format',
      ),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    userType: Yup.string().required('User type is required'),
    agency: Yup.string().when('userType', {
      is: (val) => val === 'KOC',
      then: Yup.string().nullable().required().typeError('Agency is required'),
      otherwise: Yup.string().nullable(),
    }),
    roles: Yup.array()
      .min(1)
      .required()
      .of(
        Yup.object().shape({
          id: Yup.string(),
          text: Yup.string(),
        }),
      )
      .typeError('Role is required'),
    color: Yup.string(),
    bio: Yup.string(),
    // newPassword: Yup.string()
    //   .nullable()
    //   .min(6, 'Password must be at least 6 characters'),
    // confirmNewPassword: Yup.string().oneOf(
    //   [Yup.ref('newPassword'), null],
    //   'Passwords must match',
    // ),
    category: Yup.string().required('Category is required'),
    tier: Yup.string().required('Tier is required'),
    platforms: Yup.array()
      .min(1)
      .required()
      .of(
        Yup.object().shape({
          id: Yup.string(),
          text: Yup.string(),
        }),
      )
      .typeError('Platforms is required'),
  },
  [
    // Add Cyclic deps here because when require itself
    ['newPassword', 'confirmNewPassword'],
  ],
);

export const AddRoleSchema = Yup.object({
  name: Yup.string().required('Role name is required'),
  description: Yup.string().required('Role description is required'),
});

export const AddSettingSchema = Yup.object({
  name: Yup.string().required('Setting name is required'),
  color: Yup.string().required('Color is required'),
});

export const EditSettingSchema = Yup.object({
  name: Yup.string().required('Setting name is required'),
  color: Yup.string().required('Color is required'),
});

export const AddSecretSchema = Yup.object({
  name: Yup.string(),
  value: Yup.string(),
  description: Yup.string(),
  projectId: Yup.number(),
});

export const AddProjectSchema = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
});
