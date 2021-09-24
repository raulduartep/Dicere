import React, { useState, ReactNode, HTMLAttributes } from 'react';

import { Container, Content } from './styles';

type Position = 'bottom' | 'right' | 'left' | 'top';

type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  position?: Position;
  content: string;
  children?: ReactNode;
  isDisabled?: boolean;
};

export const Tooltip = ({
  position = 'bottom',
  content,
  children,
  isDisabled = false,
  ...props
}: TooltipProps): JSX.Element => {
  let timeout: NodeJS.Timeout;
  const [isOpen, setIsOpen] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setIsOpen(false);
  };

  function handleOnClick() {
    hideTip();
  }

  return (
    <Container
      onMouseEnter={isDisabled ? undefined : showTip}
      onMouseLeave={isDisabled ? undefined : hideTip}
      onClick={isDisabled ? undefined : handleOnClick}
      {...props}
    >
      {children}
      <Content position={position} isActive={isOpen} onMouseEnter={hideTip}>
        {content}
      </Content>
    </Container>
  );
};
