export type Destination_h = {
    id: string
    name: string
    order: string
    row: string
    place: string | null
    presence: string | null
    destination: string | null
    lunch: string | null
    lunch_default: string
}


export type EditFormProps = {
    data: {
        id: string;
        name: string;
        order: string;
        row: string;
        place: string | null;
        presence: string | null;
        destination: string | null;
        lunch: string | null;
        lunch_default: string;
    }
}