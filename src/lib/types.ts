// undefined : Filed itself hasn't been requested
// null : Filed requested in not available
export interface Viewer {
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}
