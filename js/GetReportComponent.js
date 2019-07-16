Vue.component('getReport', {
    data () {
        return {
            sourceReportHeader: '',
            sourceReportData: [],
            isShowReport: true,
        }
    },
    methods: {
        del_spaces(str){
            str = str.replace(/\s/g, '');
            return str;
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
                // console.log(item);
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
                    <TABLE v-show="isShowReport"  CELLSPACING=0>
                        <div v-for="item of sourceReportData">
                            <TR CLASS=table_row-data>
                                <TD CLASS="table__column table__column-name">{{item.name}}</TD>
                                <TD CLASS="table__column table__column-data">{{item.ost_n_d}}</TD>
                                <TD CLASS="table__column table__column-data">{{item.ost_n_k}}</TD>
                                <TD CLASS="table__column table__column-data">{{item.ob_d}}</TD>
                                <TD CLASS="table__column table__column-data">{{item.ob_k}}</TD>
                                <TD CLASS="table__column table__column-data">{{item.ost_k_d}}</TD>
                                <TD CLASS="table__column table__column-data">{{item.ost_k_k}}</TD>
                            </TR>
                        </div>
                    </TABLE>
                </div>`
})