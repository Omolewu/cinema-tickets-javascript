import { jest } from '@jest/globals';
import TicketServiceImpl from '../src/pairtest/TicketServiceImpl.js';
import InvalidPurchaseException from '../src/pairtest/lib/InvalidPurchaseException.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

describe('TicketServiceImpl', () => {
    let ticketService;
    let seatReservationService;
    let ticketPaymentService;

    beforeEach(() => {
        ticketPaymentService = {
            makePayment: jest.fn(),
        };
        seatReservationService = {
            reserveSeat: jest.fn(),
        };
        ticketService = new TicketServiceImpl(
            ticketPaymentService,
            seatReservationService
        );
    });

    test('should make payment and reserve seats for a valid ticket purchase', () => {
        const ticketTypeRequests = [
            new TicketTypeRequest('ADULT', 2),
            new TicketTypeRequest('CHILD', 3),
            new TicketTypeRequest('INFANT', 1),
        ];

        ticketService.purchaseTickets(1, ...ticketTypeRequests);
        expect(ticketPaymentService.makePayment)
            .toHaveBeenCalledWith(1, 95);
        expect(seatReservationService.reserveSeat)
            .toHaveBeenCalledWith(1, 5);
    });
    
    test('should call payment service before seat reservation service', () => {
        const ticketTypeRequests = [
            new TicketTypeRequest('ADULT', 1),
            new TicketTypeRequest('CHILD', 2),
        ];
        ticketService.purchaseTickets(1, ...ticketTypeRequests);
        const paymentCallOrder = ticketPaymentService.makePayment
            .mock.invocationCallOrder[0];
        const reservationCallOrder = seatReservationService.reserveSeat
            .mock.invocationCallOrder[0];
        expect(paymentCallOrder).toBeLessThan(reservationCallOrder);
    });

    test('should not call third-party services if an exception is thrown', () => {
        const invalidTicketTypeRequests = [
            new TicketTypeRequest('ADULT', 0),
        ];
        expect(() => {
            ticketService.purchaseTickets(1, ...invalidTicketTypeRequests);
        }).toThrow(InvalidPurchaseException);

        expect(ticketPaymentService.makePayment).not.toHaveBeenCalled();
        expect(seatReservationService.reserveSeat).not.toHaveBeenCalled();
    });

    test('should make payment and reserve seats for adult tickets only', () => {
        const ticketTypeRequests = [
            new TicketTypeRequest('ADULT', 3),
        ];
        ticketService.purchaseTickets(1, ...ticketTypeRequests);
        expect(ticketPaymentService.makePayment).toHaveBeenCalledWith(1, 75);
        expect(seatReservationService.reserveSeat).toHaveBeenCalledWith(1, 3);
    });

    test('should not charge for infants and not reserve seats for infants', () => {
        const ticketTypeRequests = [
            new TicketTypeRequest('ADULT', 2),
            new TicketTypeRequest('CHILD', 3),
            new TicketTypeRequest('INFANT', 1),
        ];
        ticketService.purchaseTickets(1, ...ticketTypeRequests);
        expect(ticketPaymentService.makePayment).toHaveBeenCalledWith(1, 95);
        expect(seatReservationService.reserveSeat).toHaveBeenCalledWith(1, 5);
    });
});
