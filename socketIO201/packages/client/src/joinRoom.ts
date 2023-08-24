import { buildMessageHtml } from './buildMessageHtml';
import { nameSpaceSockets } from './scripts';

interface AckResponse {
  thisRoomHistory: string[];
  numUsers: string;
  newMessage: string;
  userName: string;
  date: Date;
  avatar: string;
}

const joinRoom = async (roomTitle: string, namespaceId: number) => {
  console.log(roomTitle, namespaceId);
  const ackResp: AckResponse = await nameSpaceSockets[namespaceId].emitWithAck(
    'joinRoom',
    {
      roomTitle,
      namespaceId,
    },
  );

  //console.log(ackResp);

  const currRoomNumUsers = document.querySelector(
    '.curr-room-num-users',
  ) as HTMLElement;
  const leaveRooms = document.querySelector('.curr-room-text') as HTMLElement;

  if (currRoomNumUsers) {
    currRoomNumUsers.innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user">`;
    leaveRooms.innerHTML = roomTitle;
  }
  //we get back the room history in the acknowledgement as well
  const roomMsgHistory = document.querySelector('#messages') as HTMLElement;
  roomMsgHistory.innerHTML = '';
  ackResp.thisRoomHistory.forEach(
    (message: {
      newMessage: string;
      userName: string;
      date: Date;
      avatar: string;
    }) => {
      roomMsgHistory.innerHTML += buildMessageHtml(message); // Append to roomMsgHistory
    },
  );
};

export { joinRoom };
