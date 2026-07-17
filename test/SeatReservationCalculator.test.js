import SeatReservationCalculator from '../src/pairtest/SeatReservationCalculator.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

describe('SeatReservationCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new SeatReservationCalculator();
    });

    test.each([
        [new TicketTypeRequest('ADULT', 1), 1],
        [new TicketTypeRequest('ADULT', 3), 3],
        [new TicketTypeRequest('CHILD', 1), 1],
        [new TicketTypeRequest('CHILD', 4), 4],
        [new TicketTypeRequest('INFANT', 1), 0],
        [new TicketTypeRequest('INFANT', 5), 0],
    ])(
        'should calculate the correct number of seats: case %#',
        (ticketTypeRequest, expectedSeats) => {
            expect(calculator.calculateTotalSeats([ticketTypeRequest]))
                .toBe(expectedSeats);
        }
    );

    test('should calculate the correct total number of seats for multiple ticket type requests', () => {
        const requests = [
            new TicketTypeRequest('ADULT', 2),
            new TicketTypeRequest('CHILD', 3),
            new TicketTypeRequest('INFANT', 1),
        ];
        expect(calculator.calculateTotalSeats(requests)).toBe(5);
    });

    test('should calculate total seats when ticket types are repeated', () => {
        const requests = [
            new TicketTypeRequest('ADULT', 1),
            new TicketTypeRequest('INFANT', 1),
            new TicketTypeRequest('CHILD', 2),
            new TicketTypeRequest('ADULT', 3),
            new TicketTypeRequest('INFANT', 1),
        ];
        expect(calculator.calculateTotalSeats(requests)).toBe(6);
    });
});
