import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketPurchaseValidator {
    validate(accountId, ticketTypeRequests) {
        this.#validateAccountId(accountId);
        this.#validateTicketTypeRequests(ticketTypeRequests);
        this.#validateAdultTicketRequirement(ticketTypeRequests);
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
            (request) => request.getTicketType() === 'ADULT' && request.getNoOfTickets() > 0);

        if (!hasAdultTicket) {
            throw new InvalidPurchaseException('At least one adult ticket is required');

        }
    }
}