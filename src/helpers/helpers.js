export function queryString(param){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let queryResult = params.get(param);
    return queryResult;
    
}

export function convertDate(dateStr) {
    var date = new Date(dateStr),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("/");
}