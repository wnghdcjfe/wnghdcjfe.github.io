// time 변환 2019
// Async / await usage 
const csv = require('csvtojson') 
const jsonToCSV = require('json-to-csv');  

const fs = require('fs') 
const path = require('path') 
 
const set_time = (year, month, day, time) =>{
    const a = time.split(":"); 
    //const b = `${Number(a[0])}:${Math.round(Number(a[1]) / 10) * 10}`  
    return `${year}-${month}-${day} ${a[0]}:00:00`
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
const _filter = str => str.replace(/\r/g, "")
const _csvtoJSON_pure = csv =>{
    //const lines = _filter(csv.split("\n").toString()); 
    const lines = csv.split("\r")
    let ret = []
    const headers = lines[0].split(",")
    for(let i = 1; i < lines.length; i++){
        let obj = {};
        const item = lines[i].split(",");
        for(let j = 0; j < headers.length; j++){
            // if(i == 1)console.log(item[j])
            // if(item[j].includes("\r")){
            //     item[j] = item[j].toString().replace("\r", "").trim()
            // }
            obj[headers[j]] = item[j]
        }
        ret.push(obj)
    }
    console.log('csv 형식을 JSON으로 모두 변환하였습니다.'); 
    return ret;  
} 

const readBigCSVtoJSON = _csv =>{
    return new Promise((resolve, reject)=>{
        let output = ""; 
        const readStream = fs.createReadStream(_csv);
        readStream.on('data', function(chunk) {
            output += chunk.toString('utf8')
        });
        readStream.on('end', function() {
            console.log('csv 파일을 모두 읽었습니다. '); 
            resolve(_csvtoJSON_pure(output)) 
        });    
    })
} 
const spring = ["02", "03", "04"]
const set_fire = file =>{  
    return _toJSON(file).map(e => { 
        if(!spring.includes(e.month))return;  
        const obj = {
            "when" : set_time(e.year, e.month, e.day, e.time), 
            "city" : e.city,
            "district" : e.district,
            "firearea" : e.firearea
        }
        return obj; 
    }).filter(a => a)
}    
const none_district = new Set(); 
 
const _setFire = num=>{
    num = Number(num);
    if(num >= 0 && num < 0.1){
        return 1
    }else if(num >= 0.1 && num < 0.3){ 
        return 2
    }else if(num >= 0.3 && num < 0.7){
        return 3
    }else if(num >= 0.7 && num < 1){
        return 4
    }else if(num >= 1 && num < 2){
        return 5
    }else if(num >= 2 && num < 3){
        return 6
    } 
    return 7; 
}
const mapping_observe_to_fire= (observe, fire) =>{ 
    return fire.map(a =>{
        const c = observe.find(b => (b.when === a.when) && (b.district === a.district))  
        if(!c) {
            none_district.add(a.district)
            return;
        }
        const _fire = _setFire(a.firearea);
        if(_fire > 4) return;
        const obj = {
            "when" : a.when, 
            "city" : a.city, 
            "district" : a.district, 
            "firearea" : _fire,  
            "prec" : Number(c.prec) || 0,
            "minhumi" : Number(c.minhumi) * 0.01 || 0,
            "maxtemp" : Number(c.maxtemp) || 0,
            "maxwindv" : Number(c.maxwindv) || 0,
        }
        return obj
    }).filter(a => a);
}
const main = async()=>{  
    
    await _csvtoJSON('../data/fire.csv', '../data/fire.json');
    const fire = set_fire('../data/fire.json')   

    const _csv = path.join(__dirname + '../../../../merged_KMA(ASOS+AWS)_2003-2019.csv') 
    //const _csv = path.join(__dirname + '../../../../test.csv')
    const observe = await readBigCSVtoJSON(_csv) 
    const ret = mapping_observe_to_fire(observe, fire) 
    console.log('매핑이 완료 되었습니다. ', ret[0])
    if(ret) await _JSONtocsv(ret, '../data/result.csv') 
    console.log('변환이 완료 되었습니다. ')
    console.log('없는 지역은 다음과 같습니다. ')
    let _none = []
    for(let item of none_district){
        _none.push(item) 
    }
    console.log(_none)
}
main() 