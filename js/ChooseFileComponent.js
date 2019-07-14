Vue.component('choose-file',{
    data(){
        return {
            sourceReportHtml: '',
            sourceReportData: [],
            showReport: true,
        }
    },
    methods: {
        readFile() {
            const object = document.getElementById('file')
            var file = object.files[0];
            var reader = new FileReader();
            reader.onload = function () {
                document.getElementById('reportOut').innerHTML = reader.result;
                // this.showReport = true; //почемуто не работает
                this.sourceReportHtml = reader.result;

            };
            reader.readAsText(file);
        },
        getDataFromHtml (html=this.sourceReportHtml){

            const $sourceTableNodes = document.querySelectorAll('tbody');
            const $DataTableNode = $sourceTableNodes[$sourceTableNodes.length - 1];
            console.log($DataTableNode);
            for (let i=0; i < $DataTableNode.childNodes.length; i++) {
                console.log($DataTableNode.childNodes[i]);
                let row = $DataTableNode.childNodes[i];
                console.log($DataTableNode.childNodes[i].childNodes[4]);
                // console.log(row.childNodes[i]);

                let item = {'name': row.childNodes[0].textContent,
                            'ost_n_d': row.childNodes[1].textContent,
                            'ost_n_k': row.childNodes[2].textContent,
                            'ob_d': row.childNodes[3].textContent,
                            'ob_k': row.childNodes[4].textContent,
                            'ost_k_d': row.childNodes[5].textContent,
                            'ost_k_k': row.childNodes[6].textContent,
                            };
                console.log(item);
                this.sourceReportData.push(item);
            }
            console.log(this.sourceReportData);
        },

    },
    template: `<div>
                    <input type="file" id="file">
                    <button @click="readFile()">Read!</button>
                    <button @click="getDataFromHtml()">Получить данные</button>
                    <button @click="showReport = !showReport">Показать/Скрыть</button>
                    <div id="reportOut" v-show="showReport">Пусто</div>
                       
                </div>`
})