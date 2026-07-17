import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketPurchaseValidator {
    static #MAX_TICKETS_PER_PURCHASE = 25;

    validate(accountId, ticketTypeRequests) {
        this.#validateAccountId(accountId);
        this.#validateTicketTypeRequests(ticketTypeRequests);
        this.#validateAdultTicketRequirement(ticketTypeRequests);
        this.#validateMaximumTicketLimit(ticketTypeRequests);
    }

    #validateAccountId(accountId) {
        if (!Number.isInteger(accountId) || accountId <= 0) {
            throw new InvalidPurchaseException('Invalid account ID');
        }
    }

    #validateTicketTypeRequests(ticketTypeRequests) {
        if (!Array.isArray(ticketTypeRequests) || ticketTypeRequests.length === 0) {
            throw new InvalidPurchaseException('At least one ticket type request is required');
        }

        for (const request of ticketTypeRequests) {
            if (request === null || request === undefined) {
                throw new InvalidPurchaseException('Ticket type request must be provided');
            }
            if (request.getNoOfTickets() <= 0) {
                throw new InvalidPurchaseException('Number of tickets must be greater than zero');
            }
        }
    }

    #validateAdultTicketRequirement(ticketTypeRequests) {
        const hasAdultTicket = ticketTypeRequests.some(
            (request) => request.getTicketType() === 'ADULT'
                && request.getNoOfTickets() > 0
        );

        if (!hasAdultTicket) {
            throw new InvalidPurchaseException('At least one adult ticket is required');
        }
    }

    #validateMaximumTicketLimit(ticketTypeRequests) {
        const totalTickets = ticketTypeRequests.reduce(
            (total, request) => total + request.getNoOfTickets(),
            0
        );

        if (totalTickets > TicketPurchaseValidator.#MAX_TICKETS_PER_PURCHASE) {
            throw new InvalidPurchaseException(
                `Maximum of ${TicketPurchaseValidator.#MAX_TICKETS_PER_PURCHASE} tickets can be purchased at a time`
            );
        }
    }
}
