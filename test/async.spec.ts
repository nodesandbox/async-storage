import { AsyncStorageService } from '../src/index';

jest.mock('async_hooks', () => {
  const AsyncLocalStorageMock = jest.fn().mockImplementation(() => {
    const storeMap = new Map<string, any>();

    return {
      getStore: jest.fn(() => storeMap),
      run: jest.fn((store, callback) => {
        // Crée un nouveau store pour chaque appel à run
        const newStoreMap = new Map<string, any>();
        storeMap.set('store', newStoreMap);
        // Appel du callback passé en paramètre
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

  it('Vérification des constantes pour voir si elles pointent vers la même mémoire', () => {
    const instance1 = AsyncStorageService.getInstance();
    const instance2 = AsyncStorageService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('Vérification pour voir si la valeur stockée est la valeur de la clé', () => {
    service.run(() => {
      service.set('key', 'value');
      expect(service.get('key')).toBe('value');
    });
  });

  it('devrait retourner undefined si la clé n’est pas dans le contexte', () => {
    service.run(() => {
      expect(service.get('nonExistentKey')).toBeUndefined();
    });
  });

  it('devrait échouer si les valeurs des différentes runs correspondent', () => {
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

    console.log("❌❌❌❌", value1);
    console.log("➡️➡️➡️➡️", value2);

    expect(value1).not.toBe(value2);
  });
});
