import TicketPriceCalculator from '../src/pairtest/TicketPriceCalculator.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

describe('TicketPriceCalculator', () => {
    let calculator;
    beforeEach(() => {
        calculator = new TicketPriceCalculator();
    });

    test.each([
        [new TicketTypeRequest('ADULT', 1), 25],
        [new TicketTypeRequest('ADULT', 2), 50],
        [new TicketTypeRequest('CHILD', 1), 15],
        [new TicketTypeRequest('CHILD', 3), 45],
        [new TicketTypeRequest('INFANT', 1), 0],
        [new TicketTypeRequest('INFANT', 4), 0],
    ])(
        'should calculate the correct price for %p',
        (ticketTypeRequest, expectedPrice) => {
            expect(calculator.calculateTotalPrice([ticketTypeRequest]))
                .toBe(expectedPrice);
        }
    );

    test('should calculate the correct total price for multiple ticket type requests', () => {
        const requests = [
            new TicketTypeRequest('ADULT', 2),
            new TicketTypeRequest('CHILD', 3),
            new TicketTypeRequest('INFANT', 1),
        ];
        expect(calculator.calculateTotalPrice(requests)).toBe(95);
    })

    test('should calculate total price when ticket types are repeated', () => {
        const requests = [
            new TicketTypeRequest('ADULT', 1),
            new TicketTypeRequest('CHILD', 2),
            new TicketTypeRequest('ADULT', 3),
            new TicketTypeRequest('INFANT', 1),
        ];
        expect(calculator.calculateTotalPrice(requests)).toBe(130);
    });

});