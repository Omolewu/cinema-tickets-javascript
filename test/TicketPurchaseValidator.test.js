import TicketPurchaseValidator from '../src/pairtest/TicketPurchaseValidator.js';
import InvalidPurchaseException from '../src/pairtest/lib/InvalidPurchaseException.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

describe('TicketPurchaseValidator', () => {
    let validator;
    beforeEach(() => {
        validator = new TicketPurchaseValidator();
    });
    describe('account ID validation', () => {
        test.each([0, -1, -100])(
            'should throw InvalidPurchaseException for invalid account ID: %i',
            (accountId) => {
                const request = new TicketTypeRequest('ADULT', 1);
                expect(() => validator.validate(accountId, [request]))
                    .toThrow(InvalidPurchaseException);
            }
        );

        test("should throw InvalidPurchaseException when the account ID is null", () => {
            const request = new TicketTypeRequest('ADULT', 1);
            expect(() => validator.validate(null, [request]))
                .toThrow(InvalidPurchaseException);
        });
    });
});