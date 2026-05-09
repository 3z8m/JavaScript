//-------------------------------------------------
// 型定義
//-------------------------------------------------

export type Workroll = {
    id: string
    roll_id: string
    roll_type: string
    grinding_type: string
    grinding_amount: number
    diameter: number
    ra_i: number | null
    ra_h: number | null
    judgement: string
    comment: string | null
    operation_date: string
    start_time: string
    end_time: string
    operator: string
    operation_group: string
    status: string
}

export type EditFormProps = {
    data: {
        id: string
        roll_id: string
        roll_type: string
        grinding_type: string
        grinding_amount: number
        diameter: number
        ra_i: number | null
        ra_h: number | null
        judgement: string
        comment: string | null
        operation_date: string
        start_time: string
        end_time: string
        operator: string
        operation_group: string
        status: string
    }
}

export type WorkrollCountGroup = {
    roll_type: string | null;
    grinding_type: string | null;
    status: string | null;
    _count: { status: number };
};