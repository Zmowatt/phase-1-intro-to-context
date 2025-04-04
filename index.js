// Your code here


function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTime){
    let [date, hour] = dateTime.split(" ")
    let timeIn = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    };  

    employeeRecord.timeInEvents.push(timeIn)
    return employeeRecord

}

function createTimeOutEvent(employeeRecord, dateTime){
    let [date, hour] = dateTime.split(" ")
    let timeOut = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    };

    employeeRecord.timeOutEvents.push(timeOut)
    return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, date){
    let startTime = employeeRecord.timeInEvents.find(event => event.date === date)
    let endTime = employeeRecord.timeOutEvents.find(event => event.date === date)

    return (endTime.hour - startTime.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)

    return hoursWorked * employeeRecord.payPerHour;

}

function allWagesFor(employeeRecord){

    const datesWorkedArray = [];

    employeeRecord.timeInEvents.forEach((date) => datesWorkedArray.push(date.date));

    const wagesArray = datesWorkedArray.map((date) => wagesEarnedOnDate(employeeRecord, date))

    return wagesArray.reduce((total, wage) => total + wage, 0);
}

function calculatePayroll(recordsArray){

    const allWagesArray = recordsArray.map((employeeRecord) => allWagesFor(employeeRecord))

    return allWagesArray.reduce((total, allWages) => total + allWages, 0)

}