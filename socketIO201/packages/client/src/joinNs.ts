import { Namespace } from './classes/Namespace';

const joinNs = (element: Element, nsData: Namespace[]) => {
  const nsEndPoint = element.getAttribute('ns') || '';
  console.log(nsEndPoint);

  const clickedNs = nsData.find(
    (ns) => ns.endpoint === nsEndPoint,
  ) as Namespace;
  const rooms = clickedNs.rooms;

  //get the room list div
  let roomList = document.querySelector('.room-list') as HTMLElement;
  //clear it out
  roomList.innerHTML = '';
  //loop through each room, and add it to the DOM
  rooms.forEach((room: { roomTitle: string }) => {
    roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
  });

  localStorage.setItem('lastNs', nsEndPoint);
};

export { joinNs };
