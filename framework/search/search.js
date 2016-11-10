/*
 * search
 * 搜索模块
 * author: bright
 * update: 2016.10.28
 * site: stbui.com
 * */

var autocomplete = require('../autocomplete/autocomplete');
var dropDown = require('/framework/dropdown/index');

var url = {
    search: 'http://so.eastmoney.com/',
    quote: 'http://quote.eastmoney.com/'
}

var TEXT_DEFAULT = '输代码、名称或简拼';
var TEXT_QUOTE = '输代码、名称或简拼'
var TEXT_GUBA = '输代码、股吧名';
var TEXT_NEWS = '请输入查询内容';
var TEXT_BLOG = '请输入查询内容';

var $element = $('#js-search');

var search = {
    init: function () {
        this.category = 0;

        this.create()
        this.bind();
    },
    create: function () {
        var tpl = '<div class="search-dropdown"> <span class="dropdown-caption">行情</span> <ul class="dropdown-content"> <li><a>行情</a></li> <li><a>股吧</a></li> <li><a>博客</a></li> <li><a>资讯</a></li> </ul></div><div class="search-input"><input id="keyworks" type="text" value="" placeholder="' + TEXT_QUOTE + '"> </div> <button class="btn btn-default btn-search">搜索</button>';

        $element.addClass('search');
        $element.html(tpl);
    },
    bind: function () {
        this.searchEvent();
        this.dropListEvent();
        this.inputEvent();
    },
    searchEvent: function () {
        var self = this;
        var submit = $('.btn-search');
        submit.on('click', function (e) {
            var keywords = self.getKeyWords();
            var category = self.getCategory();
            var url = '';

            if ((category == 2 || category == 3) && (keywords == '' || keywords.length < 2)) {
                alert('关键字不能少于两个字符');
                return;
            }

            switch (category) {
                case 0:
                    url = self.getQuoteUrl(keywords);
                    break;
                case 1:
                    url = self.getGubaUrl(keywords);
                    break;
                case 2:
                    url = self.getBlogUrl(keywords);
                    break;
                case 3:
                    url = self.getNewsUrl(keywords);
                    break;
                default:
                    url = self.getQuoteUrl(keywords);
                    break;
            }


            window.open(url);
        });
    },
    dropListEvent: function () {
        var self = this
        var $input = this.getInputElement();

        var dropdown = new dropDown($('.search-dropdown'), {
            onSelect: function (index) {
                self.setCategory(index);

                // 选项处理
                var ac = new autocomplete();
                switch (index) {
                    case 0:
                        ac.init({status: false});
                        $input.val(TEXT_QUOTE);
                        break;
                    case 1:
                        ac.init({status: false});
                        $input.val(TEXT_GUBA);
                        break;
                    case 2:
                        ac.init({
                            status: true, onInit: function () {

                            }
                        });
                        $input.val(TEXT_BLOG);
                        break;
                    case 3:
                        ac.init({
                            status: true, onInit: function () {

                            }
                        });
                        $input.val(TEXT_NEWS);
                        break;
                    default:
                        ac.init({
                            status: true, onInit: function () {

                            }
                        });
                        $input.val(TEXT_DEFAULT);
                        break
                }
            }
        });
        dropdown.toggle();
    },
    inputEvent: function () {
        var self = this;
        var $input = this.getInputElement();
        $input.on('click', function () {
            // 临时处理
            if(self.category == 0) {
                var ac = new autocomplete();
                ac.init({status: false});
                $input.val(TEXT_QUOTE);
            }
            self.clearInputDefault();
        });
    },
    clearInputDefault: function () {
        var $value = this.getInputElement();
        switch ($value.val()) {
            case TEXT_QUOTE:
            case TEXT_GUBA:
            case TEXT_NEWS:
            case TEXT_BLOG:
                $value.val('');
                break;
            default:
                break;
        }
    },
    getKeyWords: function () {
        var keywords = this.getInputElement();
        this.clearInputDefault();
        return keywords.val();
    },
    getInputElement: function () {
        var keywords = $('.search-input input');
        return keywords;
    },
    setCategory: function (category) {
        if (!category) this.category = '';
        return this.category = category;
    },
    getCategory: function () {
        return this.category;
    },
    getQuoteUrl: function (keywords) {
        return url.quote + 'search.aspx?stockcode=' + escape(keywords);
    },
    getGubaUrl: function (keywords) {
        return url.quote + 'search.aspx?stockcode=' + escape(keywords) + '&toba=1';
    },
    getNewsUrl: function (keywords) {
        return url.search + 'Search.aspx?q=' + escape(keywords) + '&searchclass=news';
    },
    getBlogUrl: function (keywords) {
        return url.search + 'Search.aspx?q=' + escape(keywords) + '&searchclass=blog';
    }
}


search.init();

module.exports = search;