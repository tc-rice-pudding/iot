<template>
    <div class="abnolmal-reason">
        <section class="echart-style">
            <echart :option="lineOpt"></echart>
        </section>
    </div>
</template>

<script lang="ts">
import {reactive, watch, computed} from 'vue';
import Echart from '@/component/elComponent/Chart-Line.vue';



export default{
    component:{Echart},
    props:{
        number:{
            type: String,
            default: '',
        },
        type:{
            type: String,
            default: '',
        }
    },
    
    setup(props){
        let accuracyData: any = reactive({});
        // let title = props.type ==='room' ? '机房盘点准确率变化' : '盘点准确率变化';
        watch(
            () => props.number,
            ()  =>{
                if(props.type === 'room'){

                }else{

                }
            },
            {
                immediate : true,
            }
        );

        let room = computed(()=>{
            if(Object.keys(accuracyData).length===0) return[];

            const firstKey :any = (Object.keys(accuracyData) as String[])[0];
            let firstObj = accuracyData[firstKey];
            return [...Object.keys(firstObj)];
        });

        let lineOpt =  computed( ()=>{
            let allList : any = [];
            for (const key in accuracyData){
                allList.push(accuracyData[key]);
            }

            let seriesData = room.value.map(roomName =>{
                return{
                    name: roomName,
                    type: 'line',
                    data: allList.map((item:any)=> item[roomName])
                };
            });
            
            return {
                tooltip:{
                    trigger:'axis',
                    confine: true,
                },
                legend:{
                    data:[...room.value],
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
                    data: [...Object.keys(accuracyData)],
                },
                yAxis:[
                    {
                        type: 'value',
                        axisLine: {
                            show: true,
                        },
                        axisLabel:{
                            formatter: function(value:number){
                                return value+'%'
                            }
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
        return {lineOpt};
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