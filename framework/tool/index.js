/**
 * @name 数据处理组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

var tool = {
    getRiseColor: function (price, type) {
        var color = 'text-gray';
        var style = '##484848';

        if (price > 0) {
            color = 'text-red';
            style = '#f00';
        } else if (price < 0) {
            color = 'text-green';
            style = '#090';
        } else {
            color = 'text-gray';
            style = '##484848';
        }

        if (type) {
            return style;
        }

        return color;
    },
    toYuan: function (str) {
        return str + '元';
    },
    //数字格式化
    toDigit: function (str, how) {
        str = parseFloat(str);
        if (how) {
            str = str.toFixed(how)
        }
        if (str == "NaN") {
            str = "--";
        }

        return str;
    },
    //小数转换成百分数
    toRate: function (str) {
        return this.toDigit(str * 100, 2) + '%';
    },
    //数字格式化成万
    getCjmxValue: function (Di) {
        var chu = 1;
        var res = Di;
        if (Di > 0 && Di.length >= 6) {
            chu = 6;
        }
        if (Di < 0 && Di.length >= 7) {
            chu = 6;
        }
        if (chu == 6) {
            res = this.toDigit((Di / 10000), 2) + "万";
        }
        return res;
    },
    //涨跌标记
    udt: function (vs) {
        if (vs > 0) {
            return "↑";
        } else if (vs < 0) {
            return "↓";
        } else {
            return "";
        }
    },
    //涨跌平判断
    zdp: function (Pnum) {
        if (Pnum > 0) {
            return 1;
        } else if (Pnum < 0) {
            return -1;
        } else {
            return 0;
        }
    },
    //增减标记
    fvc: function (vs) {
        if (vs == 0 || vs == "") {
            return "";
        } else {
            if (vs > 0) {
                return "+" + vs;
            } else {
                return vs;
            }
        }
    },
    //获取市场
    getmarket: function (cd) {
        var j = cd.substring(0, 3);
        var i = j.substring(0, 1);
        if (i == "5" || i == "6" || i == "9") {
            return "1";
        } else {
            if (j == "009" || j == "126" || j == "110") {
                return "1";
            } else {
                return "2";
            }
        }
    },
    //是否在开盘期间
    bian: function (dt) {
        var res = false;
        var hs = dt.getHours();
        var ms = dt.getMinutes();
        if (hs >= 9 && hs <= 11) {
            res = true;
            if ((hs == 11) && ms >= 30)
                res = false;
        }
        if (hs >= 13 && hs < 15) { res = true; }
        return res;
    },
    //是否在盘前期间
    panQian: function (dt) {
        var res = false;
        var hs = dt.getHours();
        var ms = dt.getMinutes();
        if (hs == 9) { if ((ms >= 14) && ms < 29) { res = true; } }
        return res;
    },

}

module.exports = tool;