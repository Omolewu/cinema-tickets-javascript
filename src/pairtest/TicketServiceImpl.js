import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
import SeatReservationCalculator from './SeatReservationCalculator.js';
import TicketPriceCalculator from './TicketPriceCalculator.js';
import TicketPurchaseValidator from './TicketPurchaseValidator.js';
import TicketService from './TicketService.js';

export default class TicketServiceImpl extends TicketService {
    #ticketPurchaseValidator;
    #ticketPriceCalculator;
    #seatReservationCalculator;
    #ticketPaymentService;
    #seatReservationService;
    constructor(
        ticketPaymentService = new TicketPaymentService(),
        seatReservationService = new SeatReservationService()
    ) {
        super();
        this.#ticketPurchaseValidator = new TicketPurchaseValidator();
        this.#ticketPriceCalculator = new TicketPriceCalculator();
        this.#seatReservationCalculator = new SeatReservationCalculator();
        this.#ticketPaymentService = ticketPaymentService;
        this.#seatReservationService = seatReservationService;
    }

    purchaseTickets(accountId, ...ticketTypeRequests) {
        this.#ticketPurchaseValidator.validate(accountId, ticketTypeRequests);
        const totalAmountToPay = this.#ticketPriceCalculator
            .calculateTotalPrice(ticketTypeRequests);
        const totalSeatsToReserve = this.#seatReservationCalculator
            .calculateTotalSeats(ticketTypeRequests);
        this.#ticketPaymentService.makePayment(accountId, totalAmountToPay);
        this.#seatReservationService.reserveSeat(accountId, totalSeatsToReserve);
    }
}
