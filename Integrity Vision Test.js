
const origin = [
  {fullName : {surname : 'xxx', firstName : 'yyy', middleName: 'zzz'}},
  {fullName : {surname : 'XXX', firstName : 'YYY', middleName: 'ZZZ'}},
  {fullName : {surname : true, firstName : 'YYY', middleName: 'ZZZ'}},
  {fullName : {surname : new Date(), firstName : 'YYY', middleName: 'ZZZ'}}
]

const changeRule = {fullName : {surname : true, firstName : true, middleName: false}};

const local = {"fullName.surname" : "Прізвище", "fullName.middleName" : "По-батькові"};

console.log(convert(origin, changeRule, local));

//[{name : "Прізвище", value1 : "xxx", value2 : "XXX"}, {name : "firstName", value1 : "yyy", value2 : "YYY"}]

function convert(origin, changeRule, local) {
  let result = [];
  let map = {};
  
  const convertValueByType = (value) => {
    if (typeof value === 'boolean') {
      return value ? 'Так' : 'Ні';
    } else if (value instanceof Date) {
      return 'dd.MM.yyyy'
        .replace('dd', value.getDate())
        .replace('MM', value.getMonth()+1)
        .replace('yyyy', value.getFullYear());
    }
    
    return value;
  }; 
  
  origin.forEach((item) => {
    Object.keys(item).forEach(key => { 
      Object.keys(item[key]).forEach((key2) => {  
        if (changeRule[key][key2]) {
          const value = convertValueByType(item[key][key2]);
          
          if (!map.hasOwnProperty(key2)) {
            const name = local[key + '.' + key2];
            
            const mapIndex = result.push({name: name || key2, value1: value}) - 1;
            
            map[key2] = {
              index: mapIndex,
              size: 1
            }
          } else {
            const name = 'value' + (++map[key2].size);
            
            result[map[key2].index][name] = value;
          }
        }
      });
    });
  });

  return result;
}
