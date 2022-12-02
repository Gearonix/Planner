// @ts-ignore
type obj = {
    user_id : string,
    date : number,
    year : number,
    month : number,
    day : [{
       title : string,
       task_id : string,
       starts : string,
       ends : string,
       taskBackground : string,
       date : string,
       color: string,
       description : string,
       repetitionDelay : string
    }]
}

const data =  {
    user_id : '638896a832584ca9a0523a4d',
    date : new Date().getDate(),
    year : new Date().getFullYear(),
    month : new Date().getMonth() + 1,
    tasklist : [{
        title : 'TaskTitle',
        task_id : 'objid',
        starts : '8:00',
        ends : '12:00',
        taskBackground : 'textBackground',
        date : '01-12-2022',
        color: 'blue',
        description : 'description',
        repetitionDelay : null
    }]
}

const normalizeNumberFormat = (number : number) => {
    return number.toString().length==1 ? '0' + number : String(number)
}



// const generateNumbers = (amount : number,weekDay : number) => {
//     let rowsCount = 0
//     let inProcess = true
//     let dateCount = 1
//     while(inProcess){
//         const tr = create('tr')
//         if(rowsCount==0){
//             createSpace(weekDay,tr)
//         }
//         while(tr.children.length<7){
//             const td = create('td',dateCount)
//             if (+td.textContent === amount) {
//                 inProcess = false
//                 tr.append(td)
//                 break
//             }
//             dateCount++
//             tr.append(td)
//         }
//         table.append(tr)
//         rowsCount++
//     }
// }
