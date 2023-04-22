export type Schema = [number, string][];

function getBufferSize(schema: Schema) {
  let size = 0;
  for (let i = 0; i < schema.length; i++) {
    size += schema[i][0];
  }
  return Math.ceil(size / 8);
}
export function encode(data: any, schema: Schema) {
  let bitOffset = 0; // смещение в битах
  let byteOffset = 0; // смещение в байтах
  const buffer = new ArrayBuffer(getBufferSize(schema)); // буфер для закодированных данных
  const view = new DataView(buffer); // DataView для работы с буфером

  // функция для кодирования числа заданной длины
  function encodeNumber(value: any, bitLength: any) {
    if (bitLength % 8 !== 0) {
      throw new Error('Длина числа должна быть кратна 8');
    }
    const byteLength = bitLength / 8;
    const maxValue = 2 ** bitLength - 1;
    if (value < 0 || value > maxValue) {
      throw new Error(`Значение числа должно быть в диапазоне от 0 до ${maxValue}`);
    }
    for (let i = 0; i < byteLength; i++) {
      const byteValue = (value >> (8 * (byteLength - 1 - i))) & 0xff;
      view.setUint8(byteOffset, byteValue);
      byteOffset++;
      bitOffset += 8;
    }
  }

  // функция для кодирования булевого значения
  function encodeBoolean(value: any) {
    view.setUint8(byteOffset, value ? 1 : 0);
    byteOffset++;
    bitOffset += 8;
  }

  // функция для кодирования ASCII-строки
  function encodeAsciiString(value: any, bitLength: any) {
    if (bitLength % 8 !== 0) {
      throw new Error('Длина строки должна быть кратна 8');
    }
    const byteLength = bitLength / 8;
    if (value.length > byteLength) {
      throw new Error(`Длина строки не должна превышать ${byteLength} байт`);
    }
    for (let i = 0; i < value.length; i++) {
      view.setUint8(byteOffset, value.charCodeAt(i));
      byteOffset++;
      bitOffset += 8;
    }
    for (let i = value.length; i < byteLength; i++) {
      view.setUint8(byteOffset, 0);
      byteOffset++;
      bitOffset += 8;
    }
  }

  // проходим по схеме и кодируем каждое значение из data
  // eslint-disable-next-line no-restricted-syntax
  for (const [bitLength, dataType] of schema) {
    const value = data.shift();
    switch (dataType) {
      case 'number':
        encodeNumber(value, bitLength);
        break;
      case 'boolean':
        encodeBoolean(value);
        break;
      case 'ascii':
        encodeAsciiString(value, bitLength);
        break;
      default:
        throw new Error(`Неподдерживаемый тип данных: ${dataType}`);
    }
  }

  return buffer;
}

// export type Schema = [number, string][];
//
// function getBufferSize(schema: Schema) {
//   let size = 0;
//   for (let i = 0; i < schema.length; i++) {
//     size += schema[i][0];
//   }
//   return Math.ceil(size / 8);
// }
// function getBit(bitIndex: number, view: DataView) {
//   const byteIndex = bitIndex >> 3;
//   const bitOffset = 7 - (bitIndex % 8);
//   const byteValue = view.getUint8(byteIndex);
//   return (byteValue >> bitOffset) & 1;
// }
//
// export function encode(data: (string | number | boolean)[], schema: Schema) {
//   const buffer = new ArrayBuffer(getBufferSize(schema));
//   const view = new DataView(buffer);
//   let bitIndex = 0;
//
//   for (let i = 0; i < schema.length; i++) {
//     const [length, type] = schema[i];
//     const value = data[i];
//     console.log(value);
//
//     if (type === 'number') {
//       if (!Number.isInteger(value)) {
//         throw new Error(`Value ${value} at index ${i} is not a number`);
//       }
//       if (value < 0 || value >= 2 ** length) {
//         throw new Error(`Value ${value} at index ${i} is out of range for ${length}-bit number`);
//       }
//       const binaryString = value.toString(2).padStart(length, '0');
//       for (let j = 0; j < length; j++) {
//         const bit = binaryString.charAt(j);
//         view.setUint8(bitIndex >> 3, (view.getUint8(bitIndex >> 3) << 1) | (bit === '1' ? 1 : 0));
//         bitIndex++;
//       }
//     } else if (type === 'boolean') {
//       if (typeof value !== 'boolean') {
//         throw new Error(`Value ${value} at index ${i} is not a boolean`);
//       }
//       const binaryValue = value ? 1 : 0;
//       for (let j = 0; j < length; j++) {
//         view.setUint8(bitIndex >> 3, (view.getUint8(bitIndex >> 3) << 1) | binaryValue);
//         bitIndex++;
//       }
//     } else if (type === 'ascii') {
//       if (typeof value !== 'string') {
//         throw new Error(`Value ${value} at index ${i} is not a string`);
//       }
//       if (value.length > 2 ** length - 1) {
//         throw new Error(`String at index ${i} is too long for ${length}-bit ASCII field`);
//       }
//       for (let j = 0; j < value.length; j++) {
//         const asciiCode = value.charCodeAt(j);
//         if (asciiCode >= 128) {
//           throw new Error(`Non-ASCII character at index ${i}`);
//         }
//         for (let k = 0; k < 8; k++) {
//           view.setUint8(bitIndex >> 3, (view.getUint8(bitIndex >> 3) << 1) | ((asciiCode >> (7 - k)) & 1));
//           bitIndex++;
//         }
//       }
//     } else {
//       throw new Error(`Invalid type "${type}" at index ${i}`);
//     }
//   }
//
//   return buffer;
// }
//
// export function decode(buffer: ArrayBuffer, schema: Schema) {
//   const view = new DataView(buffer);
//   let bitIndex = 0;
//   const result = [];
//
//   for (let i = 0; i < schema.length; i++) {
//     const [bitCount, type] = schema[i];
//     let value = 0;
//
//     switch (type) {
//       case 'number':
//         for (let j = 0; j < bitCount; j++) {
//           value = (value << 1) | getBit(bitIndex, view);
//           bitIndex++;
//         }
//         result.push(value);
//         break;
//       case 'boolean':
//         let str = '';
//         for (let j = 0; i < bitCount; i++) {
//           const byte = view.getUint8(bitIndex + i);
//           if (byte === 0) break;
//           str += String.fromCharCode(byte);
//         }
//         result.push(!!str);
//         break;
//       case 'ascii':
//         result.push(String.fromCharCode(value));
//         break;
//       default:
//         throw new Error(`Invalid schema type: ${type}`);
//     }
//   }
//
//   return result;
// }

// Необходимо написать на javacript функцию кодирования информации по схеме: const schema = [[3, 'number'], [2, 'number'], [1, 'boolean'], [1, 'boolean'], [16, 'ascii']]; Например const data = encode([2, 3, true, false, 'ab'], schema); Функция должна возвращать ArrayBuffer и использовать побитовые операции. Также функция должна выбрасывать исключения с пояснениями, если данные не подходят схеме. Также надо написать функцию decode, которая должна преобразовывать информацию обратно, также выбрасывать исключения при несоответствии данных и правильно обрабатывать ascii