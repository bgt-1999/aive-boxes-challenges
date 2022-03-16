export interface Apparence {
    objectClass: string;
    id: string;
    appearance: Appearance;
    intervalApparence: IntervalApparence;
  }
  export interface Appearance {
    boxes: BoxesEntity[];
  }
  export interface BoxesEntity {
    box: Box;
    time: number;
  }
  export interface Box {
    bottomRight: BottomRightOrTopLeft;
    topLeft: BottomRightOrTopLeft;
  }
  export interface BottomRightOrTopLeft {
    x: number;
    y: number;
  }
  export interface IntervalApparence {
    begin: number;
    end: number;
  }
  