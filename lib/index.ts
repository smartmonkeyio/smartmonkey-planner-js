import { IHighwayOptions } from './common/interfaces/common';
import { Highway } from './src/Highway';

export function createHighway(apiKey: string, options?: IHighwayOptions): Highway {
  return new Highway(apiKey, options || {});
}
