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
            // console.log($DataTableNode.childNodes);
            const arrRows = [...$DataTableNode.getElementsByTagName("tr")];
            // const arrRows = [...arrRows];
            // console.log(arrRows[4].getElementsByTagName("td"));

            for (let i=4; i < arrRows.length; i++) {
                const arrColumns = [...arrRows[i].getElementsByTagName("td")];
                let item = {'name': arrColumns[0].textContent,
                            'ost_n_d': arrColumns[1].textContent,
                            'ost_n_k': arrColumns[2].textContent,
                            'ob_d': arrColumns[3].textContent,
                            'ob_k': arrColumns[4].textContent,
                            'ost_k_d': arrColumns[5].textContent,
                            'ost_k_k': arrColumns[6].textContent,
                            };
                // console.log(item);
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