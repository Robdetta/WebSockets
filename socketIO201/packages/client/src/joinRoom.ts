import { nameSpaceSockets } from './scripts';

const joinRoom = (roomTitle: string, namespaceId: number) => {
  //console.log(roomTitle, namespaceId);
  nameSpaceSockets[namespaceId].emit('joinRoom', roomTitle);
};

export { joinRoom };
