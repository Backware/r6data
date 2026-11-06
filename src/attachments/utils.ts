import { getAssetURL } from '../utils';

export const getAttachmentAssetURL = (path: string) =>
  getAssetURL(`/attachments${path}`);
