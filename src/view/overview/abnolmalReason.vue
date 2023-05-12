<template>
    <div class="abnolmal-reason">
        <section class="echart-style">
            <echart :option="barOpt"></echart>
        </section>
    </div>
</template>

<script lang="ts">
import {reactive, watch, computed} from 'vue';
import Echart from '@/component/elComponent/Chart-Bar.vue';

export enum AbnolmalReasonEnum{
    'deviceLossCount'= '设备丢失',
    'positionWrongCount'= '位置错误',
    'notLabelCount'='未检测到标签号',
    'illegalCount'='非法在架'
}

export default{
    component:{Echart},
    props:{
        number:{
            type: String,
            default: 'project_root',
        },
    },
    
    setup(props){
        let abnolmalReasonData: any = reactive({});
        // let title = props.type ==='room' ? '机房盘点准确率变化' : '盘点准确率变化';
        watch(
            () => props.number,
            ()  =>{
                abnolmalReasonData
            },
            {
                immediate : true,
            }
        );

        let barOpt =  computed( ()=>{
            let allList : any = [];
            for (const key in abnolmalReasonData){
                allList.push(abnolmalReasonData[key]);
            }
            let abnolmalReasonName = computed(() => {
                if(Object.keys(abnolmalReasonData).length===0) return[];
                let firstKey = (Object.keys(abnolmalReasonData) as string[])[0];
                let firstObj = abnolmalReasonData[firstKey];
                return [...firstObj];
            })

            let abnolmalReasonEnum:any = AbnolmalReasonEnum;
            let seriesData = abnolmalReasonName.value.map(name =>{
                return{
                    name: abnolmalReasonEnum[name],
                    type: 'bar',
                    stack:'one',
                    data: allList.map((item:any)=> item[name])
                };
            });
            
            return {
                tooltip:{
                    trigger:'axis',
                    confine: true,
                },
                legend:{
                    data:[...abnolmalReasonEnum.value],
                    type: 'scroll'
                },
                grid:{
                    left:'5%',
                    right:'10%',
                    bottom:'15%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: [...Object.keys(abnolmalReasonData)],
                },
                yAxis:[
                    {
                        type: 'value',
                        axisLine: {
                            show: true,
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: ['rgba(220,216,216,1)','#ddd']
                            }
                        }
                    }
                ],
                series: [...seriesData],
            }
        });
        return {barOpt};
    }
}

</script>

<style lang="less" scoped>
.accuracy{
    width: 99.5%;
    height: 100%;
    box-sizing: border-box;
    overflow-y : auto;
    overflow-x : hide;
    .echart-style{
        height: 300px;
        width: 100%;
    }
}
</style>