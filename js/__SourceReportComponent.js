Vue.component('sourceReport',{
    data(){
        return {
            isFileDataLoaded: false,
            sourceReportHtml: '',
            isShowReport: true,
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
    template: `<div v-if="isFileDataLoaded">
                    <p>Отчёт источник</p>
                    <button @click="isShowReport = !isShowReport">{{showHideCaption}}</button>
                    <div id="sourceReportOut" v-show="isShowReport" v-html="sourceReportHtml"></div>
                </div>`
})