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
    return [day,month,date.getFullYear()].join("/");
}

export function convertDateTime(dateStr) {
  var date = new Date(dateStr);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  return `Tháng ${month} năm ${date.getFullYear()}`;
}

export function convertType(type){
  switch(type){
    case 1: return 'Full time';
    case 2: return 'Part time';
    case 3: return 'Freelancer';
    case 4: return 'Remote';
    default: return '';
  }
}

export function convertExperience(experience){
  switch(experience){
    case 1: return 'Fresher';
    case 2: return 'Junior';
    case 3: return 'Senior';
    case 4: return 'DevOps';
    case 5: return 'Frontend';
    case 6: return 'Backend';
    case 7: return 'Fullstack';
    default: return '';
  }
}
export function cutUrlImage(url){
  const urlSplit = url.split('/');
  return urlSplit[3];
}

export function getInfoUserLogin() {
  let userData = {};

  if ('userData' in localStorage) {
      userData = JSON.parse(localStorage.getItem('userData'));
  }

  return userData;
}