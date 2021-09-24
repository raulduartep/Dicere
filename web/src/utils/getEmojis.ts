import emojis from '../assets/static/emojis.json';

export type EmojiItem = {
  name: string;
  shortname: string;
  unicode: string;
  html: string;
};

// type EmojiGroup = Record<string, EmojiItem[]>;

// const refactorEmojis = {};

// Object.keys(emojis).forEach(group => {
//   const emojisByGroup = (emojis as EmojiGroup)[group].map(emoji);
// });

// console.log('cheguei');

// export default refactorEmojis;
