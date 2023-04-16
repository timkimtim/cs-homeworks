interface BitAccessor {
  get(elementIndex: number, bitIndex: number): number;
  set(elementIndex: number, bitIndex: number, newBitValue: number): void;
}

export function createBitAccessor(array: Uint8Array): BitAccessor {
  const validate = (elementIndex: number, bitIndex: number) => {
    if (elementIndex < 0 || elementIndex >= array.length) {
      throw new Error('Array index out of range');
    }
    if (bitIndex > 8 || bitIndex < 0) {
      throw new Error('Bit index must be between 0 and 7 inclusive');
    }
  };
  return {
    get(elementIndex: number, bitIndex: number): number {
      validate(elementIndex, bitIndex);
      const bit = array[elementIndex] & (1 << bitIndex);
      return bit === 0 ? 0 : 1;
    },
    set(elementIndex: number, bitIndex: number, newBitValue: number): void {
      validate(elementIndex, bitIndex);
      if (newBitValue === 0) {
        array[elementIndex] = array[elementIndex] & ~(1 << bitIndex);
      } else {
        array[elementIndex] = array[elementIndex] | (1 << bitIndex);
      }
    },
  };
}
