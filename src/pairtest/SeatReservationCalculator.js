export default class SeatReservationCalculator {
    static #SEAT_ALLOCATION = {
        ADULT: 1,
        CHILD: 1,
        INFANT: 0
    };

    calculateTotalSeats(ticketTypeRequests) {
        return ticketTypeRequests.reduce((totalSeats, request) => {
            const ticketType = request.getTicketType();
            const numberOfTickets = request.getNoOfTickets();
            const seats = SeatReservationCalculator.#SEAT_ALLOCATION[ticketType];

            return totalSeats + (seats * numberOfTickets);
        }, 0);
    }
}