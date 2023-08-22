let selectedNsId: number = 0;

function getSelectedNsId(): number {
  return selectedNsId;
}

function setSelectedNsId(id: number): void {
  selectedNsId = id;
}

export { getSelectedNsId, setSelectedNsId };
