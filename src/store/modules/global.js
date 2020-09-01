/*

import { setStore,getStore } from '@/util/store'
import { getAreaTree } from '@/api/coupon/tb_coupon_area'
import { getIndustryTree } from '@/api/coupon/tb_coupon_industry'
const global = {
    state: {
        allAreaList: getStore({
            name: "allAreaList"
        }) || {},
        provinceList: getStore({
            name: "provinceList"
        }) || {},
        allIndustryList: getStore({
            name: "allIndustryList"
        }) || {}
    },
    actions: {
        InitGlobalState({
            commit
        }){
            return new Promise((resolve, reject) => {
                // 初始化区域信息
                getAreaTree("86").then(response => {
                    let allAreaList = response.data.data

                    // 保存完整区域地址树
                    commit('SET_ALL_AREA_LIST', allAreaList)

                    // 保存省份列表
                    let provinceList = new Array()
                    for(let index in allAreaList){
                        let provinceMap = allAreaList[index]
                        provinceList.push({
                            "id": provinceMap.id,
                            "areaName": provinceMap.areaName
                        })
                    }
                    commit('SET_PROVINCE_LIST', provinceList)
                })

                // 初始化行业分类目录信息
                getIndustryTree().then(response => {
                    commit('SET_ALL_INDUSTRY_LIST', response.data)
                })
            })
        }
    },
    mutations: {
        SET_ALL_AREA_LIST: (state, allAreaList) => {
            state.allAreaList = allAreaList
            setStore({
                name: 'allAreaList',
                content: state.allAreaList
            })
        },
        SET_PROVINCE_LIST: (state, provinceList) => {
            state.provinceList = provinceList
            setStore({
                name: 'provinceList',
                content: state.provinceList
            })
        },
        SET_ALL_INDUSTRY_LIST: (state, allIndustryList) => {
            state.allIndustryList = allIndustryList
            setStore({
                name: 'allIndustryList',
                content: state.allIndustryList
            })
        }
    }
}
export default global*/
