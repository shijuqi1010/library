var VUE_DATA;

$(function() {
    VUE_DATA = new Vue({
        el: '#box',
        data: {
            mydata: [],
            name: '',
            locate: '',
            tempItem: {},
            curItem: null,
            nowIndex: -100,
            curSelects: []
        },
        methods: {
            add: function () {
                this.mydata.push({
                    name: this.name,
                    locate: this.locate
                });
                this.name = '';
                this.locate = '';
            },
            del: function (n) {
                if (n == -2) {
                    this.mydata = [];
                }
                else {
                    this.curSelects = this.curSelects.sort(function(a,b){return a-b;}).reverse();
                    for (var i in this.curSelects) {
                        this.mydata.splice(this.curSelects[i], 1);
                    }
                }
            },
            modify: function () {
                this.curItem.name = this.tempItem.name;
                this.curItem.locate = this.tempItem.locate;
            }
        }
    });

    /**
     * 初始化数据
     */
    $.ajax({
        type: 'GET',
        url: 'data/book.json',// 以后有了服务端 则改为服务端的URL，如GET: http://137.234.20.8:8090/library/books
        success: function (data) {
            VUE_DATA.mydata = data;
        }
    });
});

function selectRow(index) {
    var result= $.inArray(index, VUE_DATA.curSelects);
    if(result == -1) {
        VUE_DATA.curSelects.push(index);
    } else {
        VUE_DATA.curSelects.remove(index);
    }
}