import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketPurchaseValidator {
    validate(accountId, ticketTypeRequests) {
        if (!Number.isInteger(accountId) || accountId <= 0) {
            throw new InvalidPurchaseException('Account ID must be a positive integer');
        }
    }
}