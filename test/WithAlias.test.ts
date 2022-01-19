import Controller from "App/Controller";
import Service from "crud-lib/Service";

jest.spyOn(Service.prototype, 'request').mockImplementation(() => "Mocked message")

describe('With Alias', () => {

    test('Mocked message should be returned', () => {
        let controller = new Controller();
        expect(controller.message()).toEqual("Mocked message");
    })

})