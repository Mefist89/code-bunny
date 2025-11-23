export interface Position {
  x: number;
  y: number;
}

export interface Obstacle {
  x: number;
  y: number;
  type: 'rock' | 'wood' | 'water' | 'bush';
}

export interface Flying {
  x: number;
  y: number;
  type: 'catapult';
}

export interface Level {
  id: number;
  bunny: Position;
  carrot: Position;
  name: string;
  obstacles?: Obstacle[];
  flying?: Flying[];
}

export type Command = 'up' | 'down' | 'left' | 'right';