export const sorter2s = (sorter, sorters) => {
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
    return sorters
}