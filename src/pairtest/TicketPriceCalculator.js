export default class TicketPriceCalculator {
    static #TICKET_PRICES = {
        ADULT: 25,
        CHILD: 15,
        INFANT: 0,
    };

    calculateTotalPrice(ticketTypeRequests) {
        return ticketTypeRequests.reduce((total, request) => {
            const ticketType = request.getTicketType();
            const numberOfTickets = request.getNoOfTickets();
            const price = TicketPriceCalculator.#TICKET_PRICES[ticketType];

            return total + (price * numberOfTickets);
        }, 0);
    }
}
