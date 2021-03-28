import {exec as nexec} from 'child_process';
import util from 'util';

export function exec(cmd: string) {
  const _exec = util.promisify(nexec);
  return _exec(cmd);
}
