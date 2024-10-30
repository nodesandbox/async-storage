import { AsyncStorageService } from '../src/index';

jest.mock('async_hooks', () => {
  const AsyncLocalStorageMock = jest.fn().mockImplementation(() => {
    const storeMap = new Map<string, any>();

    return {
      getStore: jest.fn(() => storeMap),
      run: jest.fn((store, callback) => {
        const newStoreMap = new Map<string, any>();
        storeMap.set('store', newStoreMap);
        if (typeof callback === 'function') {
          callback();
        } else {
          throw new TypeError('callback is not a function');
        }
      }),
    };
  });

  return {
    AsyncLocalStorage: AsyncLocalStorageMock,
  };
});

describe('AsyncStorageService', () => {
  let service: AsyncStorageService;

  beforeEach(() => {
    service = AsyncStorageService.getInstance();
  });

  it('Verification of constants to check if they point to the same memory', () => {
    const instance1 = AsyncStorageService.getInstance();
    const instance2 = AsyncStorageService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('Verification to check if the stored value matches the keys value', () => {
    service.run(() => {
      service.set('key', 'value');
      expect(service.get('key')).toBe('value');
    });
  });

  it('Should return undefined if the key is not present in the context', () => {
    service.run(() => {
      expect(service.get('nonExistentKey')).toBeUndefined();
    });
  });

  it('Should fail if values from different runs match', () => {
    let value1 = "";
    let value2 = "";

    service.run(() => {
      service.set('key1', 'value1');
      value1 = service.get('key1');
    });

    service.run(() => {
      service.set('key1', 'value2');
      value2 = service.get('key1');
    });

    expect(value1).not.toBe(value2);
  });
});
