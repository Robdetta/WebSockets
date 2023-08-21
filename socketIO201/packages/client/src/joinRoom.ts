import { nameSpaceSockets } from './scripts';

const joinRoom = (roomTitle: string, namespaceId: number) => {
  console.log(roomTitle, namespaceId);
  nameSpaceSockets[namespaceId].emit(
    'joinRoom',
    roomTitle,
    (ackResp: { numUsers: number }) => {
      console.log(ackResp);

      const currRoomNumUsers = document.querySelector(
        '.curr-room-num-users',
      ) as HTMLElement;

      const leaveRooms = document.querySelector(
        '.curr-room-text',
      ) as HTMLElement;

      if (currRoomNumUsers) {
        currRoomNumUsers.innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user">`;
        leaveRooms.innerHTML = roomTitle;
      }
    },
  );
};

export { joinRoom };
