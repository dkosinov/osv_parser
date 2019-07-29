Vue.component('reportConstructor', {
    data () {
        return {
            reports: [],
            // isFileDataParsed: false, //если true отображаем таблицу
            currentReport: 0,
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
        },
        isPrint: function (bool) {
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
        getDataFromSourceReportOutTag(){
            // this.getReportFromCookie('report1');
            // console.log(document.cookie);
        },
        getReportFromCookie (name){
            // console.log(this.$parent.getCookie(name));
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
            let text = 'Применить';
            if (this.isSetViewFilter){
                text = 'Сбросить'
            }
            return text;
        }
    },
    template: `<details v-if="reports.length" close>
                    <summary>Конструктор отчёта</summary>
<!--                    <button @click="getDataFromSourceReportOutTag()">Получить данные</button>-->
<!--                    <button @click="isShowReport = !isShowReport">{{showHideCaption}}</button>-->
                    <select v-model="currentDataDimension">
                        <option v-for="(option, index) in dataDimensions"
                            :value="index">
                            {{option.caption2}}
                        </option>
                    </select>
                    <span>Выбрано: {{currentDataDimension}}</span>
                    <button @click="setViewFilter()">{{setFilterCaption}}</button>
<!--                    <TABLE v-show="isShowReport"  CELLSPACING=0>-->
                    <details close>
                        <summary>Статистика</summary>
                    </details>
                    <details close>
                        <summary>Отчёт</summary>
                        <TABLE CELLSPACING=0>
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
<!--                                    {{printColumnTemplate[2] | setDaNet}}-->
                                    <i class="fas fa-print" v-if="printColumnTemplate[2]"></i>
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
                            <TR CLASS=table_row-data v-for="(item, index) of reports[currentReport].data" :key="index">
                                <TD CLASS="table__column table__column-name" v-show="viewColumnTemplate[0]">{{item.name}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[1]">{{item.ost_n_d | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[2]">{{item.ost_n_k | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[3]">{{item.ob_d | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[4]">{{item.ob_k | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[5]">{{item.ost_k_d | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                                <TD CLASS="table__column table__column-data" v-show="viewColumnTemplate[6]">{{item.ost_k_k | setDivider(dataDimensions[currentDataDimension].divider) | setAccuracy(dataDimensions[currentDataDimension].accuracy)}}</TD>
                            </TR>
                    </TABLE>
                    </details>
                </details>`
})