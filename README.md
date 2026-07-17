# Cinema Tickets - JavaScript Solution

A Node.js implementation of the Cinema Tickets coding exercise.

## Getting Started

### Prerequisites

- Node.js >= 20.9.0
- npm

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test
```

All tests should pass across 4 test suites.

## Solution Overview

The solution implements `TicketServiceImpl`, which validates ticket purchase requests, calculates the total amount to pay, calculates the number of seats to reserve, and then calls the provided third-party payment and seat reservation services.

The implementation is split into small classes with clear responsibilities:

| Class | Responsibility |
|---|---|
| `TicketServiceImpl` | Orchestrates validation, payment and seat reservation |
| `TicketPurchaseValidator` | Validates account ID, ticket requests, adult requirement and ticket limit |
| `TicketPriceCalculator` | Calculates the total ticket price |
| `SeatReservationCalculator` | Calculates the number of seats to reserve |

## Business Rules Implemented

- A maximum of 25 tickets can be purchased at once.
- Adult tickets cost £25.
- Child tickets cost £15.
- Infant tickets cost £0.
- Infants do not reserve seats.
- Child and Infant tickets require at least one Adult ticket.
- Invalid account IDs and invalid ticket quantities throw `InvalidPurchaseException`.
- Payment is made before seats are reserved.
- Third-party services are not called when validation fails.

## Assumptions

- Account IDs must be positive integers.
- Ticket quantities must be greater than zero.
- A `null` or `undefined` ticket request is treated as invalid.
- The requirement that infants sit on an Adult’s lap is interpreted as an adult-presence rule, not a strict one-adult-per-infant ratio.
- The provided third-party services are treated as external dependencies and are not modified.

## Project Structure

```text
src/
  pairtest/
    TicketServiceImpl.js
    TicketPurchaseValidator.js
    TicketPriceCalculator.js
    SeatReservationCalculator.js
    lib/
      TicketTypeRequest.js
      InvalidPurchaseException.js
  thirdparty/
    paymentgateway/
      TicketPaymentService.js
    seatbooking/
      SeatReservationService.js

test/
  TicketPurchaseValidator.test.js
  TicketPriceCalculator.test.js
  SeatReservationCalculator.test.js
  TicketServiceImpl.test.js
```
