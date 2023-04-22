export type Schema = [number, string][];

function getBit(bitIndex: number, view: DataView) {
  const byteIndex = bitIndex >> 3;
  const bitOffset = 7 - (bitIndex % 8);
  const byteValue = view.getUint8(byteIndex);
  return (byteValue >> bitOffset) & 0x01;
}

function getBufferSize(schema: Schema) {
  let size = 0;
  for (let i = 0; i < schema.length; i++) {
    size += schema[i][0];
  }
  return Math.ceil(size / 8);
}

export function encode(data: (number | boolean | string)[], schema: Schema) {
  const buffer = new ArrayBuffer(getBufferSize(schema));
  const view = new DataView(buffer);
  let bitIndex = 0;
  let byteIndex = 0;

  for (let i = 0; i < schema.length; i++) {
    const [length, type] = schema[i];
    const value = data[i];

    if (type === 'number') {
      if (!Number.isInteger(value)) {
        throw new Error(`Value ${value} at index ${i} is not a number`);
      }
      if (value < 0 || value >= 2 ** length) {
        throw new Error(`Value ${value} at index ${i} is out of range for ${length}-bit number`);
      }
      const binaryString = value.toString(2).padStart(length, '0');
      for (let j = 0; j < length; j++) {
        const bit = binaryString.charAt(j);
        view.setUint8(byteIndex, (view.getUint8(byteIndex) << 1) | (bit === '1' ? 1 : 0));
        bitIndex++;
        if (bitIndex % 8 === 0) {
          byteIndex++;
        }
      }
    } else if (type === 'boolean') {
      if (typeof value !== 'boolean') {
        throw new Error(`Value ${value} at index ${i} is not a boolean`);
      }
      const binaryValue = value ? 1 : 0;
      for (let j = 0; j < length; j++) {
        view.setUint8(byteIndex, (view.getUint8(byteIndex) << 1) | binaryValue);
        bitIndex++;
        if (bitIndex % 8 === 0) {
          byteIndex++;
        }
      }
    } else if (type === 'ascii') {
      if (typeof value !== 'string') {
        throw new Error(`Value ${value} at index ${i} is not a string`);
      }
      if (value.length > 2 ** length - 1) {
        throw new Error(`String at index ${i} is too long for ${length}-bit ASCII field`);
      }
      for (let j = 0; j < value.length; j++) {
        const asciiCode = value.charCodeAt(j);
        if (asciiCode >= 128) {
          throw new Error(`Non-ASCII character at index ${i}`);
        }
        for (let k = 0; k < 8; k++) {
          view.setUint8(byteIndex, (view.getUint8(byteIndex) << 1) | ((asciiCode >> (7 - k)) & 1));
          bitIndex++;
          if (bitIndex % 8 === 0) {
            byteIndex++;
          }
        }
      }
    } else {
      throw new Error(`Invalid type "${type}" at index ${i}`);
    }

    if (bitIndex % 8 === 0) {
      byteIndex++;
    }
  }

  return buffer;
}

export function decode(buffer: ArrayBuffer, schema: Schema) {
  const view = new DataView(buffer);
  let bitIndex = 0;
  const result = [];

  for (let i = 0; i < schema.length; i++) {
    const [bitCount, type] = schema[i];
    let value = 0;

    switch (type) {
      case 'number':
        for (let j = 0; j < bitCount; j++) {
          value = (value << 1) | getBit(bitIndex, view);
          bitIndex++;
        }
        result.push(value);
        break;
      case 'boolean':
        let str = '';
        for (let j = 0; i < bitCount; i++) {
          const byte = view.getUint8(bitIndex + i);
          if (byte === 0) break;
          str += String.fromCharCode(byte);
        }
        result.push(!!str);
        break;
      case 'ascii':
        result.push(String.fromCharCode(value));
        break;
      default:
        throw new Error(`Invalid schema type: ${type}`);
    }
  }

  return result;
}
