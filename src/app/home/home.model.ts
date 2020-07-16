export interface Seat{
    id: number;
    seatNumber: number;
    seatRow: number;
}
export interface ExtendedSeat extends Seat{
    isPicked: boolean;
    isClicked: boolean;
}
export interface Reservation{
    seatId: number;
    scheduleId: number;
    userId: number;
    paid: number;
}
export interface AddReservation{
    scheduleId: number;
    userId: number;
    paid: number;
    seatNumbers: Array<number>;
}
export interface ResponseMessage{
    responseMessage: string;
}
