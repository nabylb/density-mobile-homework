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

type FontType = {
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

type SpacesType = {
  name: string;
  count: number;
  id: string;
};

enum DyIconType {
  Error = 'error',
  Info = 'info',
}
enum Alerts {
  Error = 'error',
  Info = 'info',
}

export {Alerts, DyIconType, SpacesType, FontType};
