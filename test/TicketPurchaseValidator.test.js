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
            -1,
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

    describe('ticket type requests validation', () => {
        test.each([
            [],
            null,
            undefined,
        ])(
            'should throw InvalidPurchaseException for invalid ticket type requests: %p',
            (ticketTypeRequests) => {
                expect(() => validator.validate(1, ticketTypeRequests))
                    .toThrow(InvalidPurchaseException);
            }
        );

        test('should throw InvalidPurchaseException when array contains a null element', () => {
            expect(() => validator.validate(1, [null]))
                .toThrow(InvalidPurchaseException);
        });

        test('should throw InvalidPurchaseException when array contains an undefined element', () => {
            expect(() => validator.validate(1, [undefined]))
                .toThrow(InvalidPurchaseException);
        });

        test.each([
            new TicketTypeRequest('ADULT', 0),
            new TicketTypeRequest('ADULT', -1),
            new TicketTypeRequest('CHILD', 0),
            new TicketTypeRequest('CHILD', -1),
            new TicketTypeRequest('INFANT', 0),
            new TicketTypeRequest('INFANT', -1),
        ])(
            'should throw InvalidPurchaseException for invalid number of tickets: %p',
            (ticketTypeRequest) => {
                expect(() => validator.validate(1, [ticketTypeRequest]))
                    .toThrow(InvalidPurchaseException);
            }
        );
    });

    describe('adult ticket requirement', () => {
        test.each([
            [[new TicketTypeRequest('CHILD', 1)]],
            [[new TicketTypeRequest('INFANT', 1)]],
            [[
                new TicketTypeRequest('CHILD', 1),
                new TicketTypeRequest('INFANT', 1),
            ]],
        ])('should throw InvalidPurchaseException when no adult tickets are requested: case %#',
            (ticketTypeRequests) => {
                expect(() => validator.validate(1, ticketTypeRequests))
                    .toThrow(InvalidPurchaseException);
            }
        );
    });

    describe('maximum ticket limit', () => {
        test('should throw InvalidPurchaseException when more than 25 tickets are requested', () => {
            const ticketTypeRequests = [
                new TicketTypeRequest('ADULT', 10),
                new TicketTypeRequest('CHILD', 10),
                new TicketTypeRequest('INFANT', 6),
            ];
            expect(() => validator.validate(1, ticketTypeRequests))
                .toThrow(InvalidPurchaseException);
        });

        test('should not throw InvalidPurchaseException when exactly 25 tickets are requested', () => {
            const ticketTypeRequests = [
                new TicketTypeRequest('ADULT', 10),
                new TicketTypeRequest('CHILD', 10),
                new TicketTypeRequest('INFANT', 5),
            ];
            expect(() => validator.validate(1, ticketTypeRequests))
                .not.toThrow(InvalidPurchaseException);
        });
    });

    describe('valid purchase requests', () => {
        test.each([
            [[new TicketTypeRequest('ADULT', 1)]],
            [[
                new TicketTypeRequest('ADULT', 1),
                new TicketTypeRequest('CHILD', 1),
            ]],
            [[
                new TicketTypeRequest('ADULT', 2),
                new TicketTypeRequest('CHILD', 3),
                new TicketTypeRequest('INFANT', 1),
            ]],
        ])('should not throw InvalidPurchaseException for valid purchase: case %#',
            (ticketTypeRequests) => {
                expect(() => validator.validate(1, ticketTypeRequests))
                    .not.toThrow(InvalidPurchaseException);
            }
        );
    });
});
