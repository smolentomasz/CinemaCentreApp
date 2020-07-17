import { Schedule } from './movies/movie.model';
import { User } from '../user/user.model';

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
    reservationUUID: string;
    seatId: number;
    seat: Seat;
    scheduleId: number;
    schedule: Schedule;
    userId: number;
    user: User;
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
