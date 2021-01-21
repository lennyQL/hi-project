// let app = new Vue({
//     el: '#app',
//     data: {
//       city: 'Tokyo', //地域名
//       temp: 25, //気温
//       condition: {
//         main: 'Rain' //天候名
//       }
//     }
//   })
let app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        id: null, // forecastにおけるid(今は配列の何番目か)
        city: null, // 都市
        temp: null, // 気温
        condition: {
            main: null  // 天気
        },
        dt: null, // 日時
        findCity: null,
        isError: false,
        forecast: null, // 5日間3時間置きの天気予報のデータ
        fivedays: []
    },
    // mounted: function(){
    //     // const city = "Fukuok"
    //     const url = 'https://api.openweathermap.org/data/2.5/weather?q='
    //                 + this.findCity //city
    //                 + ',jp&units=metric&appid=e1af9a0928e6114abaa8ac89b5729f4d'
    //     axios.get(url)
    //     .then(function(response){
    //         this.city = response.data.name
    //         this.temp = response.data.main.temp
    //         this.condition = response.data.weather[0]
    //     }.bind(this))
    //     .catch(function(error){
    //         console.log(error)
    //     })
    // },
    filters: {
        roundUp(value){
            return Math.ceil(value)
        }
    },
    methods: {
        // 今日の天気
        // getWeather: async function() {
        //     const url = 'https://api.openweathermap.org/data/2.5/weather?q='
        //             + this.findCity //city
        //             // + ',jp&units=metric&appid=e1af9a0928e6114abaa8ac89b5729f4d'
        //             + '&lang=ja&units=metric&appid=e1af9a0928e6114abaa8ac89b5729f4d'
        //     const res = await axios.get(url)
        //     .then(function(response){
        //         this.isError = false
        //         this.city = response.data.name
        //         this.temp = response.data.main.temp
        //         this.condition = response.data.weather[0]
        //         let dateTime = new Date(response.data.dt * 1000)
        //         this.dt = dateTime.toLocaleDateString()
        //         console.log(response.data);
        //     }.bind(this))
        //     .catch(function(error){
        //         console.log(error.response.status)
        //         console.log(error)
        //         return error.response
        //     })
        //     if (res !== undefined &&
        //         res.status == 404) {
        //         this.isError = true
        //     }
        //     console.log(res)
        // },
        // 今日から1週間の天気
        getForecast: async function() {
            const url = 'https://api.openweathermap.org/data/2.5/forecast?q='
                    + this.findCity //city
                    // + ',jp&units=metric&appid=e1af9a0928e6114abaa8ac89b5729f4d'
                    + '&lang=ja&units=metric&appid=e1af9a0928e6114abaa8ac89b5729f4d'
            // 天気APIを取得
            const res = await axios.get(url)
            .then(function(response){ // 逐次処理(メイン)
                this.fivedays = [] // リストを初期化
                this.isError = false
                this.city = response.data.city.name
                this.forecast = response.data.list
                console.log(this.forecast)
                // 五日間の天気予報
                //item.dt_txt.split(" ")[1] == "12:00:00"
                let ndt = ""
                let idx = 0 // インデクス
                this.forecast.forEach((data) => {
                    let dateTime = new Date(data.dt * 1000)
                    // let day = dateTime.toLocaleString("ja")
                    let day = dateTime.toLocaleDateString()
                    console.log(day);
                    if(day !== ndt) { // 毎回違う日付の天気を追加(合計5日間)
                        // console.log(day);
                        ndt = day
                        this.fivedays.push({ // 5日間の天気を格納するリスト
                            id: idx,
                            dt: day,
                            temp: data.main.temp,
                            condition: data.weather[0],
                            main: data.main
                        })
                        idx++ // インデックスのインクリメント
                    }
                })
                // 今日の天気の更新
                // changeData(0)
                this.id = 0
                this.dt = this.fivedays[0].dt
                this.temp = this.fivedays[0].temp
                this.condition = this.fivedays[0].condition

                // console.log(this.fivedays);
            }.bind(this))
            .catch(function(error){ // エラー処理
                console.log(error.response.status)
                console.log(error)
                return error.response
            })
            if (res !== undefined &&
                res.status == 404) { // エラー(都市検索できなかった)時にフラグ立てる
                this.isError = true
                this.id = null
            }
            console.log(res)
        },
        // メイン画面の天気情報を変更
        changeData: function(id) {
            // console.log(id);
            this.id = id
            this.dt = this.fivedays[id].dt
            this.temp = this.fivedays[id].temp
            this.condition = this.fivedays[id].condition
        },
        // 前の日，次の日に情報を変更
        changeData: function(id, i) {
            // console.log(id);
            this.id = (id+i >= 0 && id+i < this.fivedays.length) ? id + i : id
            this.dt = this.fivedays[this.id].dt
            this.temp = this.fivedays[this.id].temp
            this.condition = this.fivedays[this.id].condition
        }
    }
})