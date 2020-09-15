type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
type FontStyle = 'normal' | 'italic' | undefined;

export type FontType = {
  headlineStyle: {
    fontSize: number;
    fontWeight: FontWeight;
    fontStyle: FontStyle;
    letterSpacing: number;
    color: string;
  };
  titleStyle: {
    fontSize: number;
    fontWeight: FontWeight;
    fontStyle: FontStyle;
    letterSpacing: number;
    color: string;
  };
  bodyStyle: {
    fontSize: number;
    fontWeight: FontWeight;
    fontStyle: FontStyle;
    letterSpacing: number;
    color: string;
  };
};

export type SpaceType = {
  name?: string;
  count: number;
  id: string;
  capacity?: number;
};

export enum DyIconType {
  Error = 'error',
  Info = 'info',
}
export enum Alerts {
  Error = 'error',
  Info = 'info',
}
