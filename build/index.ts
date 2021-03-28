export interface EmbeddedAppDescriptor {
  source: () => Promise<unknown>;
  slug: string;
}
