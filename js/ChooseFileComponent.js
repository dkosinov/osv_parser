Vue.component('chooseFileMenu',{
    data(){
        return {
            // fileDataHTML: '',
        }
    },
    methods: {
        loadFileData() {
            const object = document.getElementById('file');
            const file = object.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                // this.fileDataHTML = reader.result;
                // console.log(this.fileDataHTML);
                this.$parent.$refs.sourceReport.sourceReportHtml = reader.result;
                console.log(this.$parent.$refs.sourceReport.sourceReportHtml);
                this.$parent.$refs.sourceReport.isFileDataLoaded = true;
                console.log(this.$parent.$refs.sourceReport.isFileDataLoaded);
            };
            reader.onerror = function (e) {
                console.log('Ошибка');
                reader.abort();
            };
            reader.readAsText(file);
        }
    },
    template: `<div>
                    <input type="file" id="file">
                    <button @click="loadFileData()">Загрузить</button>
                </div>`
})