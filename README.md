# @nodesandbox/async-storage

A TypeScript service for managing asynchronous storage using `AsyncLocalStorage`.

## Installation

You can install the package via npm:

```bash
npm install @nodesandbox/async-storage
```

## Usage

Here is an example of how to use the `AsyncStorageService`:

```typescript
import { AsyncStorageService } from '@nodesandbox/async-storage';

const storage = AsyncStorageService.getInstance();

storage.run(() => {
  storage.set('key', 'value');
  console.log(storage.get('key')); // Output: value
});
```

## API

### `AsyncStorageService`

- **`getInstance(): AsyncStorageService`**: Returns the singleton instance of `AsyncStorageService`.

- **`set(key: string, value: any): void`**: Sets a value in the asynchronous storage.

- **`get(key: string): any`**: Retrieves a value from the asynchronous storage.

- **`run(callback: () => void, initialValue?: Map<string, any>): void`**: Runs a callback function with a new storage context.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.