import React from 'react';
import { IconType } from 'react-icons';
import {
  BiBug,
  BiFootball,
  BiFlag,
  BiDrink,
  BiWorld,
  BiGridAlt,
  BiFace,
  BiSmile,
  BiYen,
  BiTime,
} from 'react-icons/bi';
import { EmojisCategories } from 'components/organisms/Emojis';

import { Container, Button } from './styles';
import { Tooltip } from '../Tooltip';

type Props = {
  categories: EmojisCategories[];
  categoryActivated: EmojisCategories;
  onClick: (value: EmojisCategories) => void;
};

const categoriesIcons: Record<EmojisCategories, IconType> = {
  Recentes: BiTime,
  'Animais e natureza': BiBug,
  Atividades: BiFootball,
  Bandeiras: BiFlag,
  'Comidas e bebidas': BiDrink,
  'Viajens e Lugares': BiWorld,
  Objetos: BiGridAlt,
  Pessoas: BiFace,
  Smileys: BiSmile,
  Símbolos: BiYen,
};

export const EmojisHeader = ({
  categories,
  categoryActivated,
  onClick,
}: Props): JSX.Element => {
  return (
    <Container>
      {categories.map(category => (
        <Tooltip position="right" content={category} key={category}>
          <Button
            icon={categoriesIcons[category]}
            isActivated={categoryActivated === category}
            onClick={() => onClick(category)}
          />
        </Tooltip>
      ))}
    </Container>
  );
};
