# adonis-jest mock issue

This is a minimal repository created to reproduce an issue involving `adonisjs` and `jest`.

#### Setup

In order to setup the project to reproduce locally:

```bash
git clone https://github.com/hugoaboud/adonis-jest-mock-issue
yarn
yarn addlib
```

The project was created with `create-adonis-ts-app@4.0.6`, then the following dependencies were added: `jest`, `@types/jest` and `adonis-jest`.

To run the test, simply run `yarn test`.

#### Description

The issue involves mocking class methods from an imported package. It seems to conflict with `adonisjs` IoC aliases.

The folder `crud-lib` contains a single `Service` class with a single `request` method:

```javascript
class Service {
    request() {
        return "Original message";
    }
}
```

Then, my app has a `Controller`, which instantiates and uses a `Service`:

```javascript
import Service from "crud-lib/Service";

export default class Controller {
    
    service: Service

    constructor() {
        this.service = new Service();
    }

    message() {
        return this.service.request();
    }

} 
``` 

At last, I've created a test `WithoutAlias.test.ts` to mock the `Service.request` method and check if the mock worked.

```typescript
import Controller from "../app/Controller";
import Service from "crud-lib/Service";

jest.spyOn(Service.prototype, 'request').mockImplementation(() => "Mocked message")

describe('Without Alias', () => {

    test('Mocked message should be returned', () => {
        let controller = new Controller();
        expect(controller.message()).toEqual("Mocked message");
    })

})
```

The above test works just fine.

Then, another test file `WithAlias.test.ts` was created to do the exactly same thing, however this time using the `App/` alias defined on `.adonisrc.json`.
On this case, the method isn't mocked and the test fails.

In short:

```typescript
import Controller from "../app/Controller"; // mock works
import Controller from "App/Controller";    // mock doesn't work
```
