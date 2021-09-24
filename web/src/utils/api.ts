import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ApiMessage, ApiRoom, ApiUser } from 'hooks/useChat';

dayjs.extend(utc);

const users: ApiUser[] = [
  {
    id: '2d7afe94-2f9a-47b5-9805-49324dd63948',
    name: 'Lethicia Cunha de Souza',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no',
  },
  {
    id: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
    name: 'Raul Duarte Pereira',
    picture: 'https://avatars.githubusercontent.com/u/62621701?s=400&v=4',
  },
  {
    id: 'a00c7d65-e0d9-4652-8df3-d25635946b37',
    name: 'Raul Seixas Cunha de Souza',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Raul_Seixas_%281972%29_colorized.tif/lossy-page1-1200px-Raul_Seixas_%281972%29_colorized.tif.jpg',
  },
];

const rooms: (ApiRoom & { lastMessage: ApiMessage })[] = [
  {
    id: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    name: 'Lethicia Cunha de Souza',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no',
    type: 'private',
    lastMessage: {
      id: 'ca5848e4-6204-4ce6-b68b-abccffcc1e40',
      type: 'text',
      content: 'Sonhei que a gente estava nas Ilhas Maldivas. Nossa, incrível.',
      roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
      createdAt: dayjs.utc().subtract(38, 'minutes').format(),
      statusByUser: [
        {
          userId: '2d7afe94-2f9a-47b5-9805-49324dd63948',
          status: 'received',
        },
      ],
      user: {
        id: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
        name: 'Raul Duarte Pereira',
        picture: 'https://avatars.githubusercontent.com/u/62621701?s=400&v=4',
      },
    },
  },
];

const messages: ApiMessage[] = [
  {
    id: 'd64cc29a-943c-49e9-a4dc-b529e3c07993',
    type: 'text',
    content: 'Bom dia, meu amorzão!',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(50, 'minutes').format(),
    statusByUser: [
      {
        userId: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
        status: 'received',
      },
    ],
    user: {
      id: '2d7afe94-2f9a-47b5-9805-49324dd63948',
      name: 'Lethicia Cunha de Souza',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no',
    },
  },
  {
    id: 'e03f13ef-f25c-43c0-bdf9-8c6df0064137',
    type: 'text',
    content: 'Dormiu bem ?',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(48, 'minutes').format(),
    statusByUser: [
      {
        userId: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
        status: 'received',
      },
    ],
    user: {
      id: '2d7afe94-2f9a-47b5-9805-49324dd63948',
      name: 'Lethicia Cunha de Souza',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no',
    },
  },
  {
    id: '6a994054-d81c-4c78-b22a-84ce2105751f',
    type: 'text',
    content: 'Dormi sim e você ?',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(40, 'minutes').format(),
    statusByUser: [
      {
        userId: '2d7afe94-2f9a-47b5-9805-49324dd63948',
        status: 'received',
      },
    ],
    user: {
      id: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
      name: 'Raul Duarte Pereira',
      picture: 'https://avatars.githubusercontent.com/u/62621701?s=400&v=4',
    },
  },
  {
    id: 'caf99b91-d9df-4c7e-befb-b27cb693222c',
    type: 'text',
    content: 'Sonhei com você kkkkk Foi demais.',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(39, 'minutes').format(),
    statusByUser: [
      {
        userId: '2d7afe94-2f9a-47b5-9805-49324dd63948',
        status: 'received',
      },
    ],
    user: {
      id: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
      name: 'Raul Duarte Pereira',
      picture: 'https://avatars.githubusercontent.com/u/62621701?s=400&v=4',
    },
  },
  {
    id: 'ca5848e4-6204-4ce6-b68b-abccffcc1e40',
    type: 'text',
    content: 'Sonhei que a gente estava nas Ilhas Maldivas. Nossa, incrível.',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(38, 'minutes').format(),
    statusByUser: [
      {
        userId: '2d7afe94-2f9a-47b5-9805-49324dd63948',
        status: 'received',
      },
    ],
    user: {
      id: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
      name: 'Raul Duarte Pereira',
      picture: 'https://avatars.githubusercontent.com/u/62621701?s=400&v=4',
    },
  },
  {
    id: 'https://media.makeameme.org/created/meu-deus-vc.jpg',
    type: 'media',
    typeMedia: 'image',
    mediaPath: 'https://media.makeameme.org/created/meu-deus-vc.jpg',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(35, 'minutes').format(),
    statusByUser: [
      {
        userId: '2d7afe94-2f9a-47b5-9805-49324dd63948',
        status: 'received',
      },
    ],
    user: {
      id: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
      name: 'Raul Duarte Pereira',
      picture: 'https://avatars.githubusercontent.com/u/62621701?s=400&v=4',
    },
  },
  {
    id: '05320df3-15cf-42eb-b774-ab38810c05c7',
    type: 'media',
    typeMedia: 'image',
    mediaPath:
      'https://ichef.bbci.co.uk/news/1024/branded_portuguese/F1F2/production/_118283916_b19c5a1f-162b-410b-8169-f58f0d153752.jpg',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(25, 'minutes').format(),
    statusByUser: [
      {
        userId: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
        status: 'received',
      },
    ],
    user: {
      id: '2d7afe94-2f9a-47b5-9805-49324dd63948',
      name: 'Lethicia Cunha de Souza',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no',
    },
  },
  {
    id: '687cef74-b2a0-48b1-b283-be27e4808fb4',
    type: 'media',
    typeMedia: 'video',
    mediaPath:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(35, 'minutes').format(),
    statusByUser: [
      {
        userId: '2d7afe94-2f9a-47b5-9805-49324dd63948',
        status: 'received',
      },
    ],
    user: {
      id: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
      name: 'Raul Duarte Pereira',
      picture: 'https://avatars.githubusercontent.com/u/62621701?s=400&v=4',
    },
  },
  {
    id: '7f547320-6a95-4eca-a4b1-d57577410f95',
    type: 'media',
    typeMedia: 'video',
    mediaPath:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(25, 'minutes').format(),
    statusByUser: [
      {
        userId: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
        status: 'received',
      },
    ],
    user: {
      id: '2d7afe94-2f9a-47b5-9805-49324dd63948',
      name: 'Lethicia Cunha de Souza',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no',
    },
  },
  {
    id: '56df9ec9-e31f-4283-9274-3b525cabe02e',
    type: 'media',
    typeMedia: 'audio',
    mediaPath:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(25, 'minutes').format(),
    statusByUser: [
      {
        userId: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
        status: 'received',
      },
    ],
    user: {
      id: '2d7afe94-2f9a-47b5-9805-49324dd63948',
      name: 'Lethicia Cunha de Souza',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GjuDaLPnOnWZyYhIpWiDB4Bk5ZnLKsPVVfTCsH1=s288-p-rw-no',
    },
  },
  {
    id: '71bdc742-fcdd-4a35-9285-a8a16175cfe1',
    type: 'media',
    typeMedia: 'video',
    mediaPath:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    roomId: '6457cd15-56f5-47ac-a38b-7c3e77b3a03f',
    createdAt: dayjs.utc().subtract(35, 'minutes').format(),
    statusByUser: [
      {
        userId: '2d7afe94-2f9a-47b5-9805-49324dd63948',
        status: 'received',
      },
    ],
    user: {
      id: '8b8d9862-bce0-42ac-b18a-18bbd2e513a5',
      name: 'Raul Duarte Pereira',
      picture: 'https://avatars.githubusercontent.com/u/62621701?s=400&v=4',
    },
  },
];

function getRooms() {
  return new Promise<(ApiRoom & { lastMessage: ApiMessage })[]>(resolve => {
    setTimeout(() => resolve(rooms));
  });
}

function getMessages(roomId: string, page: number) {
  return new Promise<ApiMessage[]>(resolve => {
    const roomsMessages = messages.filter(item => item.roomId === roomId);

    const messagesObtained = roomsMessages.filter(
      (_item, index) => index >= 10 * (page - 1) && index < 10 * page
    );

    setTimeout(() => resolve(messagesObtained));
  });
}

export const api = {
  getMessages,
  getRooms,
};
