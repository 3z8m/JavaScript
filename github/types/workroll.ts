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
    ra_i: number
    ra_h: number
    judgement: string
    comment: string | null
    operation_date: string
    start_time: string
    end_time: string
    operator: string
    operation_group: string
}

export type EditFormProps = {
    data: {
        id: string
        roll_id: string
        roll_type: string
        grinding_type: string
        grinding_amount: number
        diameter: number
        ra_i: number
        ra_h: number
        judgement: string
        comment: string | null
        operation_date: string
        start_time: string
        end_time: string
        operator: string
        operation_group: string
    }
}