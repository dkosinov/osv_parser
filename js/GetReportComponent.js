Vue.component('getReport', {
    data () {
        return {
            sourceReportHeader: '',
            sourceReportData: [],
            isShowReport: true,
            isSetViewFilter: false,
            currentDataDimension: 0,
            dataDimensions: [
                {divider: 1, caption1: 'руб.', caption2: 'в руб.', accuracy: 2},
                {divider: 1000, caption1: 'тыс.руб.', caption2: 'в тыс.руб.', accuracy: 0},
                {divider: 1000000, caption1: 'млн.руб.', caption2: 'в млн.руб.', accuracy: 1},
            ],
            viewColumnTemplate: [true,true,true,true,true,true,true],
            printColumnTemplate: [true,true,true,true,true,true,true],
        }
    },
    filters: {
        setDivider: function (num, divider){
            return num/divider;
        },
        setAccuracy: function  (num, accuracy) {
            return num.toFixed(accuracy);
        },
        setDaNet: function (bool) {
            if (bool) {
                return 'Да';
            } else return  'Нет';
        }

    },
    methods: {
        setViewFilter (){
            this.isSetViewFilter = !this.isSetViewFilter;
            if (this.isSetViewFilter) {
                this.viewColumnTemplate = this.printColumnTemplate;
            } else {
                this.viewColumnTemplate = [true,true,true,true,true,true,true];
            }
        },
        del_spaces(str){
            str = str.replace(/\s/g, '').replace(',','.');
            let num = +str;
            return num;
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
        },
        setFilterCaption: function(){
            let text = 'Просмотр';
            if (this.isSetViewFilter){
                text = 'Сбросить'
            }
            return text;
        }
    },
    template: `<div v-if="$parent.$refs.sourceReport.isFileDataLoaded">
                    <p>Конструктор отчёта</p>
                    <button @click="isShowReport = !isShowReport">{{showHideCaption}}</button>
                    <button @click="getDataFromSourceReportOutTag()">Получить данные</button>
                    <select v-model="currentDataDimension">
                        <option v-for="(option, index) in dataDimensions"
                            :value="index">
                            {{option.caption2}}
                        </option>
                    </select>
                    <span>Выбрано: {{currentDataDimension}}</span>
                    <button @click="setViewFilter()">{{setFilterCaption}}</button>
                    <TABLE v-show="isShowReport"  CELLSPACING=0>
                            <TR CLASS=table_row-data>
                                <TD CLASS="table__column table__column-name"
                                    v-show="viewColumnTemplate[0]"
                                >Контрагент</TD>
                                <TD CLASS="table__column table__column-data"
                                    v-show="viewColumnTemplate[1]"
                                >
                                    <label>С.н.Д<input 
                                        type="checkbox"
                                        v-model="printColumnTemplate[1]"
                                    ></label>
                                </TD>
                                <TD CLASS="table__column table__column-data"
                                    v-show="viewColumnTemplate[2]"
                                >
                                    <label>С.н.К<input 
                                        type="checkbox"
                                        v-model="printColumnTemplate[2]"
                                    ></label>
                                </TD>
                                <TD CLASS="table__column table__column-data"
                                    v-show="viewColumnTemplate[3]"
                                >
                                    <label>Об.Д<input 
                                        type="checkbox"
                                        v-model="printColumnTemplate[3]"
                                    ></label>
                                </TD>
                                <TD CLASS="table__column table__column-data"
                                    v-show="viewColumnTemplate[4]"
                                >
                                    <label>Об.К<input 
                                        type="checkbox"
                                        v-model="printColumnTemplate[4]"
                                    ></label>
                                </TD>
                                <TD CLASS="table__column table__column-data"
                                    v-show="viewColumnTemplate[5]"
                                >
                                    <label>С.к.Д<input 
                                        type="checkbox"
                                        v-model="printColumnTemplate[5]"
                                    ></label>
                                </TD>
                                <TD CLASS="table__column table__column-data"
                                    v-show="viewColumnTemplate[6]"
                                >
                                    <label>С.к.К<input 
                                        type="checkbox"
                                        v-model="printColumnTemplate[6]"
                                    ></label>
                                </TD>                                                                
                            </TR>
                            <TR CLASS=table_row-data>
                                <TD CLASS="table__column table__column-name" v-show="viewColumnTemplate[0]">Вывод на печать</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[1]">
                                    {{printColumnTemplate[1] | setDaNet}}
                                </TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[2]">
                                    {{printColumnTemplate[2] | setDaNet}}
                                </TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[3]">
                                    {{printColumnTemplate[3] | setDaNet}}
                                </TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[4]">
                                    {{printColumnTemplate[4] | setDaNet}}
                                </TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[5]">
                                    {{printColumnTemplate[5] | setDaNet}}
                                </TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[6]">
                                    {{printColumnTemplate[6] | setDaNet}}
                                </TD>
                            </TR>
                            <TR CLASS=table_row-data v-for="(item, index) of sourceReportData" :key="index">
                                <TD CLASS="table__column table__column-name" v-show="viewColumnTemplate[0]">{{item.name}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[1]">{{item.ost_n_d | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[2]">{{item.ost_n_k | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[3]">{{item.ob_d | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[4]">{{item.ob_k | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[5]">{{item.ost_k_d | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[6]">{{item.ost_k_k | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                            </TR>
                    </TABLE>
                </div>`
})