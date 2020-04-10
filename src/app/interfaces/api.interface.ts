export interface Message {
    name: string;
    text: string;
    user_id?: string;
}

export interface User {
    email: string;
    password: string;
    room_id: string;
    name?: string;
    user_id?: string;
    messages?: Message[];
    access_token?: string;
}
