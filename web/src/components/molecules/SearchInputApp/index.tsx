import { IconButton } from 'components/atoms/IconButton';
import React, { ChangeEvent, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

import { Container, Input, IconButtonCustom } from './styles';

export const SearchInputApp = (): JSX.Element => {
  const [isSearching, setIsSearching] = useState(false);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (!value) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
  }

  return (
    <Container>
      <Input
        type="text"
        name="search"
        placeholder="Procurar..."
        onChange={handleOnChange}
      />

      {isSearching && <IconButton icon={FaTimes} size="tiny" />}
      <IconButtonCustom icon={BiSearch} size="small" disabled={!isSearching} />
    </Container>
  );
};
