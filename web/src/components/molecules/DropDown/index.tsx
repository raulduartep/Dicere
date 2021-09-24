import { IconButton } from 'components/atoms/IconButton';
import React, {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { FiX } from 'react-icons/fi';

import { Container, Content, Header } from './styles';

type Props = {
  isOpen: boolean;
  onRequestToClose?: () => void;
  children?: ReactNode;
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  horizontalPosition?: 'left' | 'middle' | 'right';
  verticalPosition?: 'top' | 'middle' | 'bottom';
};

export const DropDown = ({
  isOpen,
  onRequestToClose,
  children,
  anchorRef,
  horizontalPosition = 'middle',
  verticalPosition = 'middle',
}: Props): JSX.Element => {
  const happenMouseDownRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleRequestClose() {
    if (onRequestToClose) {
      onRequestToClose();
    }
  }

  function handleMouseDownInContent(event: MouseEvent) {
    event.stopPropagation();
  }

  function handleMouseUpInContainer() {
    if (happenMouseDownRef.current) {
      handleRequestClose();
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

  const getHorizontalPosition = useCallback(
    (contentElement: HTMLDivElement, anchorElement: HTMLElement): number => {
      const contentElementRect = contentElement.getBoundingClientRect();
      const anchorRect = anchorElement.getBoundingClientRect();

      if (horizontalPosition === 'left') {
        return anchorRect.x;
      }

      if (horizontalPosition === 'middle') {
        return (
          anchorRect.x + anchorRect.width / 2 - contentElementRect.width / 2
        );
      }

      return anchorRect.x + anchorRect.width;
    },
    [horizontalPosition]
  );

  const getVerticalPosition = useCallback(
    (contentElement: HTMLDivElement, anchorElement: HTMLElement): number => {
      const contentElementRect = contentElement.getBoundingClientRect();
      const anchorRect = anchorElement.getBoundingClientRect();

      if (verticalPosition === 'bottom') {
        return anchorRect.y - contentElementRect.height;
      }

      if (verticalPosition === 'middle') {
        return (
          anchorRect.y + anchorRect.height / 2 - contentElementRect.height / 2
        );
      }

      return anchorRect.y;
    },
    [verticalPosition]
  );

  const setPositions = useCallback(() => {
    if (isOpen) {
      const anchor = anchorRef.current;
      const content = contentRef.current;

      if (anchor && content) {
        const verticalPositionValue = getVerticalPosition(content, anchor);
        const horizontalPositionValue = getHorizontalPosition(content, anchor);

        content.style.top = `${verticalPositionValue}px`;
        content.style.left = `${horizontalPositionValue}px`;
      }
    }
  }, [anchorRef, getHorizontalPosition, getVerticalPosition, isOpen]);

  useLayoutEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    const content = contentRef.current;

    if (body && content) {
      new ResizeObserver(setPositions).observe(body);
      new ResizeObserver(setPositions).observe(content);
    }
  }, [anchorRef, setPositions]);

  return (
    <>
      {isOpen && (
        <Container
          onMouseUp={handleMouseUpInContainer}
          onMouseDown={handleMouseDownInContainer}
          onKeyDown={handleOnKeyPress}
          ref={containerRef}
        >
          <Content ref={contentRef} onMouseDown={handleMouseDownInContent}>
            <Header>
              <IconButton icon={FiX} size="small" onClick={onRequestToClose} />
            </Header>
            {children}
          </Content>
        </Container>
      )}
    </>
  );
};
