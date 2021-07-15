import { Buffer } from 'buffer';
import { sha512 as SHA512 } from 'js-sha512';

export class Hasher {
  public static create = {
    SHA512: (
      elementToHash: string | number[] | ArrayBuffer | Uint8Array
    ): string => SHA512.create().update(elementToHash).hex(),
  }
  public static encode = {
    Base64: (
      data: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string }
    ): string => Buffer.from(data).toString('base64'),
  }
  public static decode = {
    Base64: (
      data: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string },
      encoding: BufferEncoding = 'base64'
    ): string => Buffer.from(data, encoding).toString('ascii'),
  }
}
