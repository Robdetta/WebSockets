import { Room } from './Room';

class Namespace {
  id: number;
  name: string;
  image: string;
  endpoint: string;
  rooms: Room[]; // Assuming you have a Room class defined

  constructor(id: number, name: string, image: string, endpoint: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.endpoint = endpoint;
    this.rooms = [];
  }

  addRoom(roomObj: Room): void {
    this.rooms.push(roomObj);
  }
}

export { Namespace };
