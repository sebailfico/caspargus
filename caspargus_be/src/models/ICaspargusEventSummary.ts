export interface ICaspargusEventSummary {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface ICaspargusEvent extends ICaspargusEventSummary {
  graphics: ICaspargusEventGraphic[];
}

export interface ICaspargusEventGraphic {
  name: string; // Vue component name
  config: {
    [key: string]: string; // Field can be text or asset path
  };
}
