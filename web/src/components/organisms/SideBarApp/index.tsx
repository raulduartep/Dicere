import React, { useState } from 'react';
import { SideBarAppHeader } from 'components/molecules/SideBarAppHeader';

import { Container } from './styles';
import { ChatCardData, ChatCards } from '../ChatCards';

export type Type = 'contracted' | 'extended';

type Props = {
  data: ChatCardData[];
};

export const SideBarApp = ({ data }: Props): JSX.Element => {
  const [isOpen, setisOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  function handleOnScroll(event: React.UIEvent<HTMLElement, UIEvent>) {
    if (isOpen) {
      if (event.currentTarget.scrollTop > 0) {
        if (!isScrolled) {
          setIsScrolled(true);
        }
      } else {
        setIsScrolled(false);
      }
    }
  }

  const type: Type = isOpen ? 'extended' : 'contracted';

  return (
    <Container contracted={isOpen === false}>
      <SideBarAppHeader
        type={type}
        withBorder={isScrolled}
        onClick={() => setisOpen(!isOpen)}
      />
      <ChatCards data={data} type={type} onScroll={handleOnScroll} />
    </Container>
  );
};
