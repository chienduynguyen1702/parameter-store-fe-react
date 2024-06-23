import React, { useContext, useEffect, useState } from 'react';
import { use100vh } from 'react-div-100vh';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../../context/AuthContext';

import cn from 'classnames';
import styles from './SignIn.module.sass';

import RHFTextInput from '../../../components/RHF/RHFTextInput';
import { LogoContainer } from '../../../components';
import AsyncButton from '../../../components/AsyncButton';

import { SigninSchema } from '../../../utils/ValidateSchema';
import { AiOutlineEye } from 'react-icons/ai';

const SignIn = () => {
  const heightWindow = use100vh();
  const { isAuthenticated, login, navigateWindowToGitHub } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeOfPassword, setTypeOfPassword] = useState('password');

  const method = useForm({
    resolver: yupResolver(SigninSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (data) => {
    const { organization_name, email, password } = data;
    setLoading(true);
    const isError = !(await login({ organization_name, email, password }));
    setLoading(false);
    setIsError(isError);
  };

  const handleShowPassword = () => {
    if (typeOfPassword === 'password') {
      setTypeOfPassword('text');
    } else {
      setTypeOfPassword('password');
    }
  };

  return (
    <div className={styles.login} style={{ minHeight: heightWindow }}>
      <div className={styles.wrapper}>
        <LogoContainer />
        <div className={cn('h2', styles.title)}>Sign in</div>
        <div className={styles.head}></div>
        <FormProvider {...method}>
          <form
            onSubmit={method.handleSubmit(handleSubmit)}
            className={styles.body}
          >
            <RHFTextInput
              name="organization_name"
              type="text"
              placeholder="Organization name"
              icon="edit"
            />
            <RHFTextInput
              name="email"
              type="text"
              placeholder="Email"
              icon="mail"
            />
            <div className="position-relative">
              <RHFTextInput
                name="password"
                type={typeOfPassword}
                placeholder="Password"
                icon="lock"
              />
              <div
                className={cn(styles.iconEyePassword, 'position-absolute')}
                onClick={handleShowPassword}
              >
                <AiOutlineEye />
              </div>
            </div>
            <AsyncButton loading={loading} value="Sign in" type="submit" />

            {isError ? (
              <p className={styles.redLine}>
                Incorrect Email Address or Password
              </p>
            ) : (
              <p className={cn(styles.redLine, styles.hidden)}>.</p>
            )}
            <div className={styles.note}>
              This site is protected by reCAPTCHA and the Google Privacy Policy.
            </div>
            <div className={styles.info}>
              <Link className={styles.link} to="/sign-up">
                Sign Up
              </Link>
            </div>
            <div className={styles.info}></div>
          </form>
        </FormProvider>
        <div className={styles.info}>
          <button
            loading={loading}
            // type="submit"
            onClick={() => navigateWindowToGitHub()}
          >
            Login with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
