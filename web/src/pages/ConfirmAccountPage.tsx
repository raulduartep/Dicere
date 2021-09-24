import React from 'react';
import { ConfirmAccountBox } from 'components/organisms/ConfirmAccountBox';
import { MainTemplate } from 'components/templates/MainTemplate';
import background from '../assets/static/backgroundConfirmAccount.svg';

export const ConfirmAccountPage = (): JSX.Element => {
  return (
    <MainTemplate
      pageTitle="Dicere - Confirme sua conta"
      featureImage={background}
      content={<ConfirmAccountBox />}
    />
  );
};
