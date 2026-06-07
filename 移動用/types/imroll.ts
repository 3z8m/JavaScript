//-------------------------------------------------
// 型定義
//-------------------------------------------------

export type Imroll = {
    id:                     string
    taper_code:             string
    imr_set_code:           string
    imr_id:                 string
    cylindricity1:          number
    cylindricity2:          number
    cylindricity3:          number
    cylindricity4:          number
    cylindricity5:          number
    pair_diff:              number
    imr_diameter_before:    number
    imr_diameter_after:     number
    grinding_amount:        number
    grinding_type:          string | null
    imr_ra:                 number | null
    judgement:              string
    comment:                string | null
    operation_date:         string
    processing_time:        number | null
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

export type EditImrollFormProps = {
    data: {
        id:                     string
        taper_code:             string
        imr_set_code:           string
        imr_id:                 string
        cylindricity1:          number
        cylindricity2:          number
        cylindricity3:          number
        cylindricity4:          number
        cylindricity5:          number
        pair_diff:              number
        imr_diameter_before:    number
        imr_diameter_after:     number
        grinding_amount:        number
        grinding_type:          string | null
        imr_ra:                 number | null
        judgement:              string
        comment:                string | null
        operation_date:         string
        processing_time:        number | null
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