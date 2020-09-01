
import store from '@/store'

/**
 * 获取下级地区集合
 * @description 传入参数时返回下级地区集合，未传参数时返回省份集合
 * @author xuliang
 * @date 2018-07-04 
*/
export const getSubAreaList = (areaCode) => {
    if(areaCode && /^\d{6}$/.test(areaCode)){

        // 获取子集完整的省份列表
        let provinceList = store.getters.allAreaList

        // 先获取对应省份以及该省份下的城市
        let provinceCode = areaCode.substring(0,2) + "0000"
        let ZXScityCode = areaCode.substring(0,2) + "0100"
        let cityList = []
        for(let index in provinceList){
            let provinceMap = provinceList[index]
            if(provinceCode == provinceMap.id){
                cityList = provinceMap.areaList
                if(cityList.length<=1){
                    for(let indexC in cityList){
                        let cityMap = cityList[indexC]
                        if(ZXScityCode == cityMap.id){
                            cityList = cityMap.areaList
                            break;
                        }
                    }
                }
                break
            }
        }

        // 若层级小于省，则获取城市以及该城市下的区域
        if(!/^\d{2}0000/.test(areaCode)){
            let cityCode = areaCode.substring(0,4) + "00"
            let distrctList = []
            for(let index in cityList){
                let cityMap = cityList[index]
                if(cityCode == cityMap.id){
                    distrctList = cityMap.areaList
                    break
                }
            }

            return distrctList
        }else{
            return cityList
        }
    }else if(areaCode == "86"){
        // 返回简化版的省份列表
        return store.getters.provinceList
    }else{
        return store.getters.allAreaList
    }
}

/**
 * 获取下级类别集合
 * @description 传入参数时返回下级类别集合，未传参数时返回行业集合
 * @author xuliang
 * @date 2018-07-04
*/
export const getSubIndustryList = (industryId) => {

    // 获取子集完整的行业类别目录列表
    let industryList = store.getters.allIndustryList

    if(industryId){
        let categoryList = []
        for(let index in industryList){
            let industryMap = industryList[index]
            if(industryId == industryMap.id){
                categoryList = industryMap.children
                break
            }
        }
       return categoryList
    }else{
        return industryList
    }
}

/**
 * 获取商户集合
 * @description 传入类别限制集合，返回符合该类别限制的所有商户
 * @author xuliang
 * @date 2018-07-04
*/
export const getCommercialList = (categoryList) => {
    return [{
        "id": "1",
        "name": "美团"
    }, {
        "id": "2",
        "name": "饿了么"
    }, {
        "id": "3",
        "name": "携程"
    }, {
        "id": "4",
        "name": "京东"
    }]
}