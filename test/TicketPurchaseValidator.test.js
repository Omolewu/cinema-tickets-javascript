import TicketPurchaseValidator from '../src/pairtest/TicketPurchaseValidator.js';
import InvalidPurchaseException from '../src/pairtest/lib/InvalidPurchaseException.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

describe('TicketPurchaseValidator', () => {
    let validator;
    beforeEach(() => {
        validator = new TicketPurchaseValidator();
    });
    describe('account ID validation', () => {
        test.each([
            0,
            - 1,
            -100,
            null,
            undefined,
            '123',
            1.5,
            NaN,
        ])(
            'should throw InvalidPurchaseException for invalid account ID: %p',
            (accountId) => {
                const request = new TicketTypeRequest('ADULT', 1);
                expect(() => validator.validate(accountId, [request]))
                    .toThrow(InvalidPurchaseException);
            }
        );
    });
});