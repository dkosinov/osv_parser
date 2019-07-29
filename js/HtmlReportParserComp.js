Vue.component('htmlReportParser',{
    data(){
        return {
            report: {
                datetime: '',
                comment: '',
                headerData: [],
                data: [],
                statistic: {},
                settings: {},
                html: '',
            },
            isFileDataLoaded: false,
            sourceReportHtml: '',
            // isShowReport: true,
        }
    },
    updated: function (){
        if (this.isFileDataLoaded){
            this.parseFileData();
        }
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
    methods: {
        numFromStr(str){
            str = str.replace(/\s/g, '').replace(',','.');
            let num = +str;
            return num;
        },
        loadFileData() {
            const object = document.getElementById('file');
            const file = object.files[0];
            let reader = new FileReader();
            reader.onload = (err) => {
                // this.fileDataHTML = reader.result;
                // console.log(this.fileDataHTML);
                this.sourceReportHtml = reader.result;
                console.log(this.sourceReportHtml);
                this.isFileDataLoaded = true;
                // console.log(this.isFileDataLoaded);
            };
            reader.readAsText(file);
            reader.onerror = function (err) {
                console.log('Ошибка');
                reader.abort();
            };

        },
        parseFileData(){
            this.report.data = [];
            const $sourceTableNodes = document.querySelectorAll('tbody');
            const $DataTableNode = $sourceTableNodes[$sourceTableNodes.length - 1];
            console.log($DataTableNode);
            // console.log($DataTableNode.childNodes);
            const arrRows = [...$DataTableNode.getElementsByTagName("tr")];
            // const arrRows = [...arrRows];
            // console.log(arrRows[4].getElementsByTagName("td"));

            //парсим данные с 4-й строчки
            for (let i=3; i < arrRows.length; i++) {
                const arrColumns = [...arrRows[i].getElementsByTagName("td")];
                if (i === (arrRows.length - 1) && (arrColumns[0].textContent === 'Итого')) {
                    break;
                }
                let item = {'name': arrColumns[0].textContent,
                    'ost_n_d': this.numFromStr(arrColumns[1].textContent),
                    'ost_n_k': this.numFromStr(arrColumns[2].textContent),
                    'ob_d': this.numFromStr(arrColumns[3].textContent),
                    'ob_k': this.numFromStr(arrColumns[4].textContent),
                    'ost_k_d': this.numFromStr(arrColumns[5].textContent),
                    'ost_k_k': this.numFromStr(arrColumns[6].textContent),
                };
                // console.log(item);
                this.report.data.push(item);
            }
            // this.$parent.setCookie('report1', 'abc');
            // this.$parent.setCookie('report1', this.report);
            // this.$parent.$refs.reportConstructor.isFileDataParsed = true;
            this.$parent.$refs.reportConstructor.reports.push(this.report);
            console.log(this.report);


        },
        saveReport(newReport){
            // this.$parent.writeToFile(JSON.stringify(newReport));

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result){
            //             let find = this.cartItems.find(el => el.id_product === product.id_product);
            //             if(find){
            //                 find.quantity++
            //             } else {
            //                 let prod = Object.assign({quantity: 1}, product);
            //                 this.cartItems.push(prod);
            //             }
            //         } else {
            //             console.log('error!')
            //         }
            //     })
        }
    },
    template: `<div>
                <input type="file" id="file">
                <button @click="loadFileData()">Загрузить</button>
                <details v-if="isFileDataLoaded" close>
                    <summary>Исходные данные отчёта</summary>

<!--                    <button @click="parseFileData()">Обработать</button>-->
<!--                    <div v-if="isFileDataLoaded">-->
<!--&lt;!&ndash;                        <button @click="isShowReport = !isShowReport">{{showHideCaption}}</button>&ndash;&gt;-->
<!--                        <div id="sourceReportOut" v-show="isShowReport" v-html="sourceReportHtml"></div>-->
<!--                    </div>-->
                    <div v-html="sourceReportHtml"></div>
<!--                    <div id="sourceReportOut" v-show="isShowReport" v-html="sourceReportHtml"></div>-->
                </details>
               </div>`
})