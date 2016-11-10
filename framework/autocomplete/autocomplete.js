/*
 * AutoComplete
 *
 * require: request
 * author: bright
 * update: 2016.10.09
 * site: stbui.com
 * */

var request = require('/framework/request/index');

var test = 0;
var debug = 0;

function AutoComplete(element, options) {
    var defaults = {
        $element: $('.search-input input'),
        status: true,
        isInit: false,
        dataSource: [],
        onSelect: new Function()
    };

    defaults.element = element ? element : defaults.element;
    this.options = $.extend(defaults, options);
}

AutoComplete.prototype = {
    dataSource: [],
    test: false,
    init: function (options) {
        this.options = $.extend(this.options, options);

        debug = this.options.status;
        // todo: 防止多次初始化，造成绑定多次事件
        if (!test) {
            this.onInput();
            test = true;
        }
    },
    create: function (data) {
        var $input = this.getInputElement();

        var tpl = '<div class="autocomplete"><table class="autocomplete-table"><thead> <tr> <th width="52">代码</th> <th>名称</th> <th>简拼</th> <th width="40">类型</th> </tr> </thead> <tbody id="AutoCompleteResult"> {{result}}</tbody> </table> <div class="autocomplete-attach"><a class="more" href="http://quote.eastmoney.com/search.html?stockcode={{keywords}}" target="_blank">更多查询结果&gt;&gt;</a></div> </div>';

        var content = '';
        for (var i = 0; i < this.dataSource.length; i++) {

            var _vaule = this.dataSource[i];
            _vaule = this.filters(_vaule);

            content += '<tr><td>' + _vaule.code + '<span></span></td> <td>' + _vaule.name + '</td> <td>' + _vaule.short + '</td> <td>' + _vaule.type + '</td> </tr> ';
        }

        if (this.isCreate()) {
            var $autocomplete = $('.autocomplete');
            $autocomplete.find('tbody').html(content);
            $autocomplete.find('a').attr('href', 'http://quote.eastmoney.com/search.html?stockcode=' + this.keywords);
        } else {
            tpl = tpl.replace(/{{result}}/g, content);
            tpl = tpl.replace(/{{keywords}}/g, this.keywords);
            var $input = this.getInputElement();
            $input.after(tpl);
        }


        this.open();
        this.select();
    },
    filters: function (data) {
        var d = {
            code: data.code,
            name: data.name,
            short: data.short,
            type: this.stockType(data.type)
        }

        switch (data.search) {
            case '0':
                var keywords = this.keywords.split("").reverse().join("");
                var code = data.code.split("").reverse().join("");
                code = code.replace(keywords, "#" + keywords + "#");
                code = code.split("").reverse().join("");
                code = code.replace("#" + this.keywords + "#", '<span class="text-red">' + this.keywords + "</span>");
                d.code = code;
                break;
            case '1':
                d.code = d.code.replace(this.keywords, '<span style="color:#F00;">' + this.keywords + "</span>");
                break;
            case '2':
            case '3':
                d.short = d.short.replace(this.keywords, '<span style="color:#F00;">' + this.keywords + "</span>");
                break;
            case '4':
                d.name = d.name.replace(this.keywords, '<span style="color:#F00;">' + this.keywords + "</span>");
                break;
        }

        return d;
    },
    stockType: function (type) {
        var text = '';
        switch (type) {
            case '0':
                text = '未知';
                break;
            case '1':
                text = 'A 股';
                text = '沪市'
                break;
            case '2':
                text = 'B 股';
                text = '深市'
                break;
            case '3':
                text = '权证';
                break;
            case '4':
                text = '期货';
                break;
            case '5':
                text = '债券';
                break;
            case '10':
                text = '基金';
                break;
            case '11':
                text = '开基';
                break;
            case '12':
                text = 'ETF';
                break;
            case '13':
                text = 'LOF';
                break;
            case '14':
                text = '货基';
                break;
            case '15':
                text = 'QDII';
                break;
            case '16':
                text = '封基';
                break;
            case '21':
                text = '港股';
                break;
            case '22':
                text = '窝轮';
                break;
            case '31':
                text = '美股';
                break;
            case '32':
                text = '美股';
                break;
            case '31':
                text = '外期';
                break;
            case '40':
                text = '指数';
                break;
            case '50':
                text = '期指';
                break;
            case '51':
                text = '国债期货';
                break;
            case '55':
                text = '期权';
                break;
            case '56':
                text = '期权';
                break;
            case '60':
                text = '三板';
                break;
        }

        return text;
    },
    isCreate: function () {
        var $autocomplete = $('.autocomplete');
        if ($autocomplete.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    disable: function () {
        var $autocomplete = $('.autocomplete');
        $autocomplete.remove();
    },
    isOpen: function () {
        var $autocomplete = $('.autocomplete');
        var open = $autocomplete.hasClass('open');
        if (open) {
            return true;
        } else {
            return false;
        }
    },
    open: function () {
        var self = this;
        var $autocomplete = $('.autocomplete');
        $autocomplete.addClass('open');

        $(document).on('click', function (e) {
            if (self.isOpen()) {
                self.close();
            }
        });
    },
    close: function () {
        var $autocomplete = $('.autocomplete');
        $autocomplete.removeClass('open');
    },
    select: function () {
        var self = this;
        var $autocompleteTable = $('.autocomplete-table');
        $autocompleteTable.off();
        $autocompleteTable.on('click', 'tr', function () {
            var $this = $(this);
            var index = $this.index();
            var value = self.dataSource[index].code;
            self.setKeyWords(value);

            self.options.onSelect.call(this, index, self.dataSource);
        });
    },
    isActive: function () {
    },
    active: function () {
    },
    destory: function () {
    },
    onInput: function () {
        var self = this;

        var $input = this.getInputElement();
        $input.on('keyup', function () {

            var status = self.getStatus();
            if (!status) {

                var value = self.getKeyWords();
                self.getDate(value);
                self.keywords = value;
            }
            // self.options.onActive.call(this,value)
        });
    },
    getStatus: function () {
        var status = debug;
        return status;
    },
    setKeyWords: function (value) {
        if (!value) return;
        var keywords = this.getInputElement();
        return keywords.val(value);
    },
    getKeyWords: function () {
        var keywords = this.getInputElement();
        return keywords.val();
    },
    getInputElement: function () {
        var keywords = this.options.$element;
        return keywords;
    },
    getDate: function (key) {
        var self = this;
        var url = 'http://suggest.eastmoney.com/suggest/default.aspx?name=suggestData&input=' + escape(key) + '&type=';
        request.loadScript(url, 'suggestData', function (data) {
            if (data == '') {
                self.disable();
                return;
            }

            self.dataSource = [];
            var _data = data.split(';');
            for (var i = 0; i < _data.length - 1; i++) {
                var v = _data[i].split(',');

                self.dataSource.push({
                    id: v[0],
                    code: v[1],
                    type: v[2],
                    short: v[3],
                    name: v[4],
                    market: v[5],
                    search: v[6],
                    source: v
                });
            }

            self.create();
        },'gb2312');
    }
}


module.exports = AutoComplete;