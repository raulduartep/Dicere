import React, {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useLayoutEffect,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import { BiX } from 'react-icons/bi';
import { IconButton } from '../IconButton';

import { Container, Content, Header, ProvidedHeader } from './styles';

type Props = {
  isOpen: boolean;
  onRequestToClose?: () => void;
  children?: ReactNode;
  header?: ReactNode;
};

const ModalComponents = ({
  isOpen,
  onRequestToClose,
  children,
  header,
}: Props): JSX.Element => {
  const happenMouseDownRef = useRef<boolean>(false);

  function handleMouseDownInContent(event: MouseEvent) {
    event.stopPropagation();
  }

  function handleMouseUpInContainer() {
    if (happenMouseDownRef.current && onRequestToClose) {
      onRequestToClose();
      happenMouseDownRef.current = false;
    }
  }

  function handleMouseDownInContainer() {
    happenMouseDownRef.current = true;
  }

  function handleOnKeyPress(event: KeyboardEvent) {
    if (event.code === 'Escape' && onRequestToClose) {
      onRequestToClose();
    }
  }

  function handleMouseDownHeader(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <>
      {isOpen && (
        <Container
          onMouseUp={handleMouseUpInContainer}
          onMouseDown={handleMouseDownInContainer}
          onKeyDown={handleOnKeyPress}
          tabIndex={0}
          className="Modal"
          ref={containerRef}
        >
          <Header onMouseDown={handleMouseDownHeader}>
            {!!header && <ProvidedHeader>{header}</ProvidedHeader>}
            <IconButton icon={BiX} size="big" />
          </Header>
          <Content onMouseDown={handleMouseDownInContent}>{children}</Content>
        </Container>
      )}
    </>
  );
};

export const Modal = (props: Props): JSX.Element => {
  const modalRoot = document.querySelector('body') as HTMLBodyElement;

  return ReactDOM.createPortal(<ModalComponents {...props} />, modalRoot);
};
