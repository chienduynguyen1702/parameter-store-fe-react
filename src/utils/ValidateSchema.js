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

// fix after having api koc (thong)
export const AddKOCschema = Yup.object({
  // avatar_url: Yup.string(),
  username: Yup.string().required('KOCname is required'),
  email: Yup.string()
    .email('Please enter correct email format	')
    .required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string(),
  country: Yup.string(),
  roles: Yup.array()
    .required('Role is required')
    .of(
      Yup.object().shape({
        id: Yup.string(),
        text: Yup.string(),
      }),
    ),

  color: Yup.string(),
  bio: Yup.string(),
  newPassword: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must match',
  ),
  category: Yup.string(),
  tier: Yup.string(),
});

export const AddTasksSchema = Yup.object({
  taskName: Yup.string().required('Task name is required'),
  description: Yup.string(),
  airingDay: Yup.date().required().typeError('Airing Day is required'),
  kocName: Yup.string().required('KOC is required'),
  platform: Yup.string().required('Platform is required'),
  type: Yup.string().required('Type is required'),
  status: Yup.string().required('Status is required'),
  hashtag: Yup.array()
    .required('Hashtag is required')
    // .of(Yup.string())
    .min(1, 'Hashtag must have at least 1 item')
    .typeError('Hashtag is required'),
  affiliatePlatform: Yup.string().required('Affiliate Platform is required'),
  products: Yup.array()
    .min(1, 'Product Name must have at least 1 item')
    .required()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        text: Yup.string(),
      }),
    )
    .typeError('Role is required'),
  targetViews: Yup.string().required('TargetViews is required'),
  targetComments: Yup.string().required('TargetComments is required'),
  targetLikes: Yup.string().required('TargetLikes is required'),
  targetShare: Yup.string().required('TargetShare is required'),
});

export const UploadEvidenceSchema = Yup.object({
  platform: Yup.string().required('Platform is required'),
  type: Yup.string().required('Type is required'),
  // evidence: Yup.string().required('Evidence is required'),
});

export const UploadProductSchema = (length) =>
  Yup.object().shape({
    upload: Yup.mixed()
      .required('File is required')
      .test('fileType', 'Only xlsx files are allowed', (value) => {
        return (
          value &&
          [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ].includes(value.type)
        );
      }),
    ...Array.from({ length }, (_, index) => `field-${index}`).reduce(
      (acc, curr) => {
        acc[curr] = Yup.string().required(`field is required`);
        return acc;
      },
      {},
    ),
  });

export const UploadOrdersSchema = (length) =>
  Yup.object().shape({
    upload: Yup.mixed()
      .required('File is required')
      .test('fileType', 'Only xlsx files are allowed', (value) => {
        return (
          value &&
          [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ].includes(value.type)
        );
      }),
    ...Array.from({ length }, (_, index) => `field-${index}`).reduce(
      (acc, curr) => {
        acc[curr] = Yup.string().required(`Field is required`);
        return acc;
      },
      {},
    ),
  });

export const FilterCalendarSchema = Yup.object({
  year: Yup.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear())
    .typeError('Year must be a number from 2000 to current year'),
  month: Yup.number()
    .integer()
    .min(1)
    .max(12)
    .typeError('Month must be a number from 1 to 12'),
});

export const AddOtherContentSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  type: Yup.string(),
  platform: Yup.string(),
});

export const AddLiquidationSchema = Yup.object({
  liquidationName: Yup.string().required('Liquidation name is required'),
  cost: Yup.string().required('Cost is required'),
  fromDate: Yup.date().required().typeError('From date is required'),
  toDate: Yup.date()
    .required()
    .typeError('To date is required')
    .min(
      Yup.ref('fromDate'),
      'To date must be greater than or equal to From date',
    ),
  category: Yup.string().required('Category is required'),
  pic: Yup.string().required('P.I.C is required'),
  status: Yup.string().required('Status is required'),
  receivers: Yup.string().required('Receiver is required'),
});

export const ImportLiquidationSchema = Yup.object({
  name: Yup.string().required(),
  from: Yup.string().required(),
  to: Yup.string().required(),
  category: Yup.object().shape({
    id: Yup.string(),
    name: Yup.string(),
  }),
  receiver: Yup.string(),
  status: Yup.object().shape({
    id: Yup.string(),
    name: Yup.string(),
  }),
  cost: Yup.number().required(),
  pic: Yup.object().shape({
    id: Yup.string(),
    name: Yup.string(),
  }),
});

export const AddLiquidationItemSchema = Yup.object({
  liquidationName: Yup.string().required('Liquidation name is required'),
  description: Yup.string().required('Scope of Work is required'),
  fromDate: Yup.date().required().typeError('From date is required'),
  toDate: Yup.date()
    .required()
    .typeError('To date is required')
    .min(
      Yup.ref('fromDate'),
      'To date must be greater than or equal to From date',
    ),
  koc: Yup.array().required().typeError('KOC is required'),
  receivers: Yup.array().required().typeError('Receiver is required'),
  videos: Yup.array()
    .required('Select video is required')
    .typeError('Video is required'),
  category: Yup.string().required('Category is required'),
  status: Yup.string().required('Status is required'),
  cost: Yup.string().required('Cost is required'),
  pic: Yup.string().required('P.I.C is required'),
});

export const AddProductSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  code: Yup.string().required('SKU Code is required'),
  // category: Yup.object().shape({
  //   id: Yup.string(),
  //   text: Yup.string(),
  // }),
  // type: Yup.string().required('Type is required'),
  fullPrice: Yup.string().required('full price is required'),
  currentPrice: Yup.string().required('Current price is required'),
  discountedRate: Yup.string().required('Discounted Rate is required'),
});

export const AddPamperingsSchema = Yup.object({
  name: Yup.string().required('Pampering name is required'),
  date: Yup.date().required().typeError('Date is required'),
  category: Yup.string().required('Category is required'),
  pic: Yup.string().required('P.I.C is required'),
  status: Yup.string().required('Status is required'),
  cost: Yup.number()
    .integer()
    .min(0, 'Cost cannot be nagative')
    .typeError('Cost be a number'),
});

export const ImportPamperingsSchema = Yup.object({
  date: Yup.date().required().typeError('Date is required'),
  name: Yup.string().required('Pampering name is required'),
  category: Yup.object().shape({
    id: Yup.string(),
    name: Yup.string(),
  }),
  cost: Yup.number()
    .integer()
    .min(0, 'Cost cannot be nagative')
    .typeError('Cost be a number'),
  pic: Yup.object().shape({
    id: Yup.string(),
    name: Yup.string(),
  }),
  status: Yup.object().shape({
    id: Yup.string(),
    name: Yup.string(),
  }),
  evidence_url: Yup.string(),
});

export const ImportUsersSchema = Yup.object().shape({
  username: Yup.string().nullable(),
  email: Yup.string().when('note', {
    is: (note) => (note && note.toLowerCase() === 'new') || !note,
    then: Yup.string()
      .required('Email is required when note is "new"')
      .email('Please enter correct email format'),
    otherwise: Yup.string()
      .nullable()
      .email('Please enter correct email format'),
  }),
  note: Yup.string().nullable(),
});

export const AddCrawlerHashtagSchema = Yup.object({
  hashtag: Yup.string().required('Hashtag is required'),
});
