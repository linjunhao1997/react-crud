import {PaginatedParams} from "ahooks/lib/useAntdTable";
import {BASE_REQUEST} from "@/utils/request/base_request";

interface Result {
    total: number;
    list: [];
}

export const getTableData = (url) => (
    {current, pageSize, sorter}: PaginatedParams[0],
    formData: Object,
): Promise<Result> => {

    let like = {};
    Object.entries(formData).forEach(([key, value]) => {
        if (value) {
            like[key] = value
        }
    });
    let sorters = {}
    if (sorter) {
        if (Array.isArray(sorter)) {
            sorter.map((el,index)=>{
                if (sorter[index].order === 'ascend') {
                    sorters[sorter[index].field] = 1
                } else if (sorter[index].order === 'descend') {
                    sorters[sorter[index].field] = -1
                } else {
                    delete sorters[sorter[index].field]
                }
                return
            })
        } else {
            if (sorter.order === 'ascend') {
                sorters[sorter.field] = 1
            } else if (sorter.order === 'descend') {
                sorters[sorter.field] = -1
            } else {
                delete sorters[sorter.field]

            }
            Object.keys(sorters).forEach((field, index) => {
                if (field !== sorter.field) {
                    delete sorters[field]
                }
            })

        }
    }

    const data =  {
        page: current,
        rows: pageSize,
        filter: {
            like: like
        }
    }
    return BASE_REQUEST.post(url, data)
        .then((resp) => ({
            total: resp.data.data.total,
            list: resp.data.data.records,
        }));
}

export const getSingleData = (url) => {
    return BASE_REQUEST.get(url)
}

export const updateSingleRecord = (url, data) => {
    return BASE_REQUEST.patch(url, data)
}

export const insertNewRecord = (url, data) => {
    return BASE_REQUEST.post(url, data)
}

export const deleteSingleRecord = (url) => {
    return BASE_REQUEST.delete(url)
}