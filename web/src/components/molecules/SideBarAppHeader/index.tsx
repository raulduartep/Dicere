import React, { useRef, useState } from 'react';
import { IconButton } from 'components/atoms/IconButton';
import { Title } from 'components/atoms/Title';
import { Type } from 'components/organisms/SideBarApp';
import {
  BiArrowFromLeft,
  BiArrowFromRight,
  BiPlus,
  BiSearch,
} from 'react-icons/bi';
import { Input } from '../Input';
import { Tooltip } from '../Tooltip';
import { DropDown } from '../DropDown';

import {
  Container,
  TitleContainer,
  IconButtonSearchContainer,
  SearchInputContainer,
  AssetsChatCard,
  SearchInputDropdownContainer,
} from './styles';
import { DropdownNewChat } from '../DropdownNewChat';

type Props = {
  type: Type;
  withBorder: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SideBarAppHeader = ({
  onClick,
  type,
  withBorder,
}: Props): JSX.Element => {
  const buttonSearchRef = useRef<HTMLButtonElement>(null);
  const buttonNewChatRef = useRef<HTMLButtonElement>(null);
  const [searchDropdownIsOpen, setSearchDropdownIsOpen] = useState(false);
  const [newChatDropdownIsOpen, setNewChatDropdownIsOpen] = useState(false);

  return (
    <Container type={type} withBorder={withBorder}>
      <TitleContainer>
        <Title type="h3">ÚLTIMAS CONVERSAS</Title>
        <Tooltip
          content={type === 'contracted' ? 'Expandir' : 'Ocultar'}
          position="right"
        >
          <IconButton
            icon={type === 'contracted' ? BiArrowFromLeft : BiArrowFromRight}
            onClick={onClick}
          />
        </Tooltip>
      </TitleContainer>
      <AssetsChatCard>
        <IconButtonSearchContainer>
          <Tooltip content="Buscar conversa" position="right">
            <IconButton
              ref={buttonSearchRef}
              icon={BiSearch}
              onClick={() => setSearchDropdownIsOpen(true)}
            />
          </Tooltip>
          <DropDown
            isOpen={searchDropdownIsOpen}
            anchorRef={buttonSearchRef}
            horizontalPosition="right"
            verticalPosition="top"
            onRequestToClose={() => setSearchDropdownIsOpen(false)}
          >
            <SearchInputDropdownContainer>
              <Input
                name="search-dropdown"
                placeholder="Pesquisar"
                icon={BiSearch}
              />
            </SearchInputDropdownContainer>
          </DropDown>
        </IconButtonSearchContainer>
        <SearchInputContainer>
          <Input name="search" placeholder="Pesquisar" icon={BiSearch} />
        </SearchInputContainer>

        <Tooltip content="Nova conversa" position="right">
          <IconButton
            icon={BiPlus}
            ref={buttonNewChatRef}
            onClick={() => setNewChatDropdownIsOpen(true)}
          />
        </Tooltip>
        <DropdownNewChat
          isOpen={newChatDropdownIsOpen}
          anchorRef={buttonNewChatRef}
          onRequestToClose={() => setNewChatDropdownIsOpen(false)}
        />
      </AssetsChatCard>
    </Container>
  );
};
