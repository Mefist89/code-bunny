export interface Position {
  x: number;
  y: number;
}

export interface Obstacle {
  x: number;
  y: number;
  type: 'rock' | 'wood' | 'water' | 'bush' | 'catapult';
}

export interface Level {
  id: number;
  bunny: Position;
  carrot: Position;
  name: string;
  obstacles?: Obstacle[];
}

export type Command = 'up' | 'down' | 'left' | 'right';