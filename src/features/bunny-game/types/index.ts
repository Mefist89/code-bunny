export interface Position {
  x: number;
  y: number;
}

export interface Level {
  id: number;
  bunny: Position;
  carrot: Position;
  name: string;
}

export type Command = 'up' | 'down' | 'left' | 'right';