//-------------------------------------------------
// 型定義
//-------------------------------------------------

export type Workroll = {
    id:                     string
    roll_id:                string
    roll_type:              string
    grinding_type:          string
    grinding_amount:        number
    diameter_rg:            number
    diameter_ml:            number | null
    ra_i:                   number | null
    ra_h:                   number | null
    width:                  number | null
    judgement:              string
    comment:                string | null
    operation_date:         string
    grinding_number:        string
    processing_time:        number
    non_processing_code1:   string | null
    non_processing_time1:   number | null
    non_processing_code2:   string | null
    non_processing_time2:   number | null
    non_processing_code3:   string | null
    non_processing_time3:   number | null
    non_processing_code4:   string | null
    non_processing_time4:   number | null
    non_processing_code5:   string | null
    non_processing_time5:   number | null
    operator:               string
    operation_group:        string
    status:                 string
}

export type EditFormProps = {
    data: {
        id:                     string
        roll_id:                string
        roll_type:              string
        grinding_type:          string
        grinding_amount:        number
        diameter_rg:            number
        diameter_ml:            number | null
        ra_i:                   number | null
        ra_h:                   number | null
        width:                  number | null
        judgement:              string
        comment:                string | null
        operation_date:         string
        grinding_number:        string
        processing_time:        number
        non_processing_code1:   string | null
        non_processing_time1:   number | null
        non_processing_code2:   string | null
        non_processing_time2:   number | null
        non_processing_code3:   string | null
        non_processing_time3:   number | null
        non_processing_code4:   string | null
        non_processing_time4:   number | null
        non_processing_code5:   string | null
        non_processing_time5:   number | null
        operator:               string
        operation_group:        string
        status:                 string
    }
}

export type WorkrollCountGroup = {
    roll_type: string | null;
    grinding_type: string | null;
    status: string | null;
    _count: { status: number };
};