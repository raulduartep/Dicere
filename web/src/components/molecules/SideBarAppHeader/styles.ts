import { Type } from 'components/organisms/SideBarApp';
import styled, { css } from 'styled-components';

type Props = {
  type: Type;
  withBorder: boolean;
};

export const TitleContainer = styled.div`
  h3 {
    color: ${({ theme }) => theme.onSurface.disabled};
    white-space: nowrap;
    overflow-x: hidden;
  }
`;

export const IconButtonSearchContainer = styled.div`
  display: none;
`;

export const SearchInputContainer = styled.div``;

export const AssetsChatCard = styled.div``;

const contracted = css`
  border-bottom: 1px solid ${({ theme }) => theme.divider};
  align-items: center;
  row-gap: 1.6rem;

  ${TitleContainer} {
    h3 {
      display: none;
    }
  }

  ${SearchInputContainer} {
    display: none;
  }

  ${IconButtonSearchContainer} {
    display: block;
  }

  ${AssetsChatCard} {
    flex-direction: column;
    justify-content: center;
    align-items: unset;
    row-gap: 1.6rem;
  }
`;

export const Container = styled.header<Props>`
  display: flex;
  flex-direction: column;
  row-gap: 2.4rem;
  padding: 2.4rem;
  border-bottom: ${({ withBorder, theme }) =>
    withBorder && `1px solid ${theme.divider}`};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1.6rem;
  }

  ${({ type }) => type === 'contracted' && contracted}

  @media (max-width: 1000px) {
    ${contracted}

    ${TitleContainer} {
      display: none;
    }
  }
`;

export const SearchInputDropdownContainer = styled.div`
  min-width: 30rem;
  padding: 0.8rem;
`;
