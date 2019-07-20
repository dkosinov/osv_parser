Vue.component('getReport', {
    data () {
        return {
            sourceReportHeader: '',
            sourceReportData: [],
            isShowReport: true,
            currentDataDimension: 0,
            dataDimensions: [
                {divider: 1, caption1: 'руб.', caption2: 'в руб.', accuracy: 2},
                {divider: 1000, caption1: 'тыс.руб.', caption2: 'в тыс.руб.', accuracy: 0},
                {divider: 1000000, caption1: 'млн.руб.', caption2: 'в млн.руб.', accuracy: 1},
            ],
            // selected: 'А',
            // options: [
            //     { text: 'Один', value: 'А' },
            //     { text: 'Два', value: 'Б' },
            //     { text: 'Три', value: 'В' }
            // ],
        }
    },
    methods: {
        del_spaces(str){
            str = str.replace(/\s/g, '').replace(',','.');
            let num = +str;
            return num;
        },
        setAccuracy (float) {
            return float.toFixed(this.dataDimensions[this.currentDataDimension].accuracy);
        },
        getDataFromSourceReportOutTag (){
            this.sourceReportData = [];
            const $sourceTableNodes = document.querySelectorAll('tbody');
            const $DataTableNode = $sourceTableNodes[$sourceTableNodes.length - 1];
            console.log($DataTableNode);
            // console.log($DataTableNode.childNodes);
            const arrRows = [...$DataTableNode.getElementsByTagName("tr")];
            // const arrRows = [...arrRows];
            // console.log(arrRows[4].getElementsByTagName("td"));

            for (let i=3; i < arrRows.length; i++) {
                const arrColumns = [...arrRows[i].getElementsByTagName("td")];
                if (i === (arrRows.length - 1) && (arrColumns[0].textContent === 'Итого')) {
                    break;
                }
                let item = {'name': arrColumns[0].textContent,
                    'ost_n_d': this.del_spaces(arrColumns[1].textContent),
                    'ost_n_k': this.del_spaces(arrColumns[2].textContent),
                    'ob_d': this.del_spaces(arrColumns[3].textContent),
                    'ob_k': this.del_spaces(arrColumns[4].textContent),
                    'ost_k_d': this.del_spaces(arrColumns[5].textContent),
                    'ost_k_k': this.del_spaces(arrColumns[6].textContent),
                };
                console.log(item);
                this.sourceReportData.push(item);
            }
            console.log(this.sourceReportData);
        },
    },
    computed: {
        showHideCaption: function(){
            let text = 'Показать';
            if (this.isShowReport){
                text = 'Скрыть'
            }
            return text;
        }
    },
    template: `<div v-if="$parent.$refs.sourceReport.isFileDataLoaded">
                    <p>Конструктор отчёта</p>
                    <button @click="isShowReport = !isShowReport">{{showHideCaption}}</button>
                    <button @click="getDataFromSourceReportOutTag()">Получить данные</button>
                    <div>
<!--                        <select v-model="selected">-->
<!--                          <option v-for="option in options" v-bind:value="option.value">-->
<!--                            {{ option.text }}-->
<!--                          </option>-->
<!--                        </select>-->
<!--                        <span>Выбрано: {{ selected }}</span>-->
<!--                        <select v-model="selected">-->
<!--&lt;!&ndash;                            <option disabled value="">Выберите один из вариантов</option>&ndash;&gt;-->
<!--                            <option v-for="option in dataDimensions" v-bind:value="option.divider">-->
<!--                                {{option.caption2}}</option>-->
<!--                        </select>-->
<!--                        <span>Выбрано: {{selected}}</span>-->
                        <select v-model="currentDataDimension">
<!--                            <option disabled value="">Выберите один из вариантов</option>-->
                            <option v-for="(option, index) in dataDimensions"
                                :value="index">
                                {{option.caption2}}
                            </option>
                        </select>
                        <span>Выбрано: {{currentDataDimension}}</span>
                    </div>
                    <TABLE v-show="isShowReport"  CELLSPACING=0>
                        <div v-for="item of sourceReportData">
                            <TR CLASS=table_row-data>
                                <TD CLASS="table__column table__column-name">{{item.name}}</TD>
                                <TD CLASS="table__column table__column-data">{{setAccuracy(item.ost_n_d/dataDimensions[currentDataDimension].divider)}}</TD>
                                <TD CLASS="table__column table__column-data">{{setAccuracy(item.ost_n_k/dataDimensions[currentDataDimension].divider)}}</TD>
                                <TD CLASS="table__column table__column-data">{{setAccuracy(item.ob_d/dataDimensions[currentDataDimension].divider)}}</TD>
                                <TD CLASS="table__column table__column-data">{{setAccuracy(item.ob_k/dataDimensions[currentDataDimension].divider)}}</TD>
                                <TD CLASS="table__column table__column-data">{{setAccuracy(item.ost_k_d/dataDimensions[currentDataDimension].divider)}}</TD>
                                <TD CLASS="table__column table__column-data">{{setAccuracy(item.ost_k_k/dataDimensions[currentDataDimension].divider)}}</TD>
                            </TR>
                        </div>
                    </TABLE>
                </div>`
})