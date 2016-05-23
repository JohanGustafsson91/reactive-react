import * as RX from 'rx/dist/rx.all';

export default function DragElement (element, listenOn, onMove, onEnd) {
  const mouseDowns = RX.Observable.fromEvent(element, 'mousedown');
  const mouseMoves = RX.Observable.fromEvent(listenOn, 'mousemove');
  const mouseUps = RX.Observable.fromEvent(listenOn, 'mouseup');

  const drag = mouseDowns.map(down => {
    let startX = down.offsetX, startY = down.offsetY;
    return mouseMoves.map((move) => {
      move.preventDefault();
      return {
        x: move.clientX - startX,
        y: move.clientY - startY,
      };
    }).takeUntil(mouseUps.map(() => {
      onEnd();
    }));
  }).switchLatest();

  drag.forEach((position) => {
     onMove({
      positionX: position.x,
      positionY: position.y,
      isMoving: true
    });
  });
}
