export interface EmbeddedAppDescriptor {
  copyFrom: string;
  source: () => Promise<unknown>;
  urlName: string;
}
