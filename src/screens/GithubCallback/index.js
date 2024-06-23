import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function GithubHandleCallback() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const { navigate } = useNavigate();

  const { loginWithGithub } = useContext(AuthContext);
  const handleLoginGithub = async (code) => {
    await loginWithGithub(code);
  };

  useEffect(() => {
    if (code) {
      handleLoginGithub(code);
    }
  }, [code]);

  return <div> Waiting for minutes, authorizing with Github ... </div>;
}
