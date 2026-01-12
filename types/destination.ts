//-------------------------------------------------
// 光
//-------------------------------------------------
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


export type LunchGroup = {
    place: string | null;
    lunch: string | null;
    _count: { lunch: number };
};


//-------------------------------------------------
// 市川
//-------------------------------------------------
export type Destination_i = {
    id: string
    name: string
    order: string
    row: string
    presence: string | null
    destination: string | null
}


export type EditFormProps_i = {
    data: {
        id: string;
        name: string;
        order: string;
        row: string;
        presence: string | null;
        destination: string | null;
    }
}