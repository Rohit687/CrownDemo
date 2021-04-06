import { OtherConstant, jsonCopy } from "../../Resources/Constants";

export const HomeParser = (response) => {
    OtherConstant.showConsoleLog('>>>>>>response:', response);

    // let apiResponse = []
    let result = [];
    // response.data.map(item => {
    //     //1:pending, 2:accepted, 3:dinied, 4:completed
    //     //  date: '29 June',
    //     //  day: 'Saturday',
    //     //  time: '10:50 AM',
    //     console.log(moment(item.datetimestamp).format(ServiceOtherConstant.timeAgoDateTimeFormat))
    //     if (
    //         (response.type == 'home' && item.status != 3 && item.status != 4 && moment(item.datetimestamp) > moment()) ||
    //         (response.type == 'AppointmentView' && (moment(item.datetimestamp) < moment() || item.status == 3 || item.status == 4) ||
    //             response.type == 'OtherProfileView')
    //     ) {
    //         result.push({
    //             id: item.id,
    //             title: 'Mirror Cleaning',
    //             status: item.status,   //1:pending, 2:accepted, 3:dinied, 4:completed
    //             date: moment(item.datetimestamp).format(ServiceOtherConstant.appointmentDate),
    //             day: moment(item.datetimestamp).format(ServiceOtherConstant.appointmentDay),
    //             time: moment(item.datetimestamp).format(ServiceOtherConstant.localTimeFormat),
    //             type: item.package_type,
    //             fullAddress: `${item.address}, ${item.state}, ${item.city}`,
    //             address: item.address,
    //             state: item.state,
    //             city: item.city,
    //             no_of_windows: item.no_of_windows,
    //             business_email: item.business_email,
    //             business_manager_name: item.business_manager_name,
    //             business_name: item.business_name,
    //             business_contact: item.contact,
    //             dateTime: moment(item.datetimestamp),
    //             notes: item.notes,
    //             price: item.price
    //         });
    //     }
    // });


    // result = result.sort(function (a, b) {
    //     return SortByDate(a.dateTime, b.dateTime);
    // });

    // OtherConstant.showConsoleLog('apiResponse:', apiResponse);
    OtherConstant.showConsoleLog('result:', result);
    return { data: jsonCopy(result), uniqueNo: response.uniqueNo };
}

function checkForString(str, defaultValue = '') {
    return str ? str : defaultValue
}