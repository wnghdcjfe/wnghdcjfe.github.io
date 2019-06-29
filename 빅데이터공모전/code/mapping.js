// time 변환 2019
// Async / await usage
const csvFilePath = '../data/ret.csv'
const csv = require('csvtojson') 
const jsonToCSV = require('json-to-csv'); 
const fs = require('fs') 

const set_time = (year, month, day, time) =>{
    const a = time.split(":"); 
    const b = `${Number(a[0])}:${Math.round(Number(a[1]) / 10) * 10}` 
    return `${year}-${month}-${day} ${b}`
}
const _toJSON = file => JSON.parse(fs.readFileSync(file))

const _csvtoJSON = async(file, to) =>{
    const jsonArray = await csv().fromFile(file);
    fs.writeFileSync(to, JSON.stringify(jsonArray));
} 
const _JSONtocsv = async(data, file) =>{
    const a = await jsonToCSV(data, file).then(() => { 
        console.log("성공적으로 JSON to CSV 변환이 완료 되었습니다.")
      })
      .catch(error => { 
          console.log("애러발생>>!" + error)
      }) 
    return a; 
}  
const set_fire = file =>{  
    return _toJSON(file).map(e => { 
        const obj = {
            "when" : set_time(e.year, e.month, e.day, e.time), 
            "city" : e.city,
            "district" : e.district,
            "firearea" : e.firearea
        }
        return obj; 
    }) 
}  
const mapping_observe_to_fire= (observe, fire) =>{
    return fire.map(a =>{
        const c = observe.find(b => (b.when === a.when) && (b.district === a.district)) 
        if(!c) return;
        const obj = {
            "when" : a.when, 
            "city" : a.city, 
            "district" : a.district, 
            "firearea" : a.firearea,  
            "prec" : c.prec || 0,
            "minhumi" : c.minhumi,
            "maxtemp" : c.maxtemp,
            "maxwindv" : c.maxwindv,
        }
        return obj
    }).filter(a => a);
}
const main = async()=>{  
    
    // await _csvtoJSON('../data/fire.csv', '../data/fire.json');
    // const fire = set_fire('../data/fire.json') 

    await _csvtoJSON('../data/merged_AWS_2003-2019.csv', '../data/observe.json');
    console.log(1)
    const observe = _toJSON('../data/observe.json') 
 
    const ret = mapping_observe_to_fire(observe, fire) 
    await _JSONtocsv(ret, '../data/result.csv') 
    console.log('변환이 완료 되었습니다. ')
}
main() 