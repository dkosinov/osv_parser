const app = new Vue({
    el: '#app',
    data: {
        isFileDataLoaded: false
    },
    methods: {
        setDataLoaded (){
            this.isDataLoaded = true;
        },
        // getJson(url){
        //     return fetch(url)
        //         .then(result => result.json())
        //         .catch(error => console.log('error'));
        //     // .catch(error => this.$refs.error.setText(error));
        // },
        // postJson(url, data){
        //     return fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             "Content-type": "application/json",
        //         },
        //         body: JSON.stringify(data)
        //     })
        //         .then(result => result.json())
        //         .catch(error => {
        //             //работаем с компонентом error
        //             // this.$refs.error.setText(error);
        //         })
        // },

        setCookie(name, value, options) {
            if (!navigator.cookieEnabled) {
                alert( 'Включите cookie для комфортной работы с этим сайтом' );
            } else {
                options = options || {};

                var expires = options.expires;

                if (typeof expires == "number" && expires) {
                    var d = new Date();
                    d.setTime(d.getTime() + expires * 1000);
                    expires = options.expires = d;
                }
                if (expires && expires.toUTCString) {
                    options.expires = expires.toUTCString();
                }

                value = encodeURIComponent(value);

                var updatedCookie = name + "=" + value;

                for (var propName in options) {
                    updatedCookie += "; " + propName;
                    var propValue = options[propName];
                    if (propValue !== true) {
                        updatedCookie += "=" + propValue;
                    }
                }
                document.cookie = updatedCookie;
            }
        },
        getCookie(name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
    },
})