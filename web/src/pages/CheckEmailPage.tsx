import React from 'react';
import { CheckEmailBox } from 'components/organisms/CheckEmailBox';
import { MainTemplate } from 'components/templates/MainTemplate';
import background from '../assets/static/backgroundCheckEmail.svg';

export const CheckEmailPage = (): JSX.Element => {
  return (
    <MainTemplate
      featureImage={background}
      pageTitle="Dicere - Check seu email"
      content={<CheckEmailBox />}
    />
  );
};
