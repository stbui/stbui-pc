/**
 * @name 日历组件
 * @author: bright
 * @mail: 772020653@qq.com
 * @website: http://stbui.com
 * @update: 2016.10.08
 */

/*

var calendar = new Calendar("id", "selectRegion", false, [180, 800, 0.95, "solid", "#EEE", "#FFF", 3, 3, 0.2, "#000", "#F00", "#F6F8FD", "#000", "#F1F5FC", "#000", "#EFF3FB", true, false], function () {
    window.open('/stock/tradedetail/' + document.getElementById('notice_Ddl').value + '.html');
});

*/


var Calendar = function (targetInput, targetHelp, booleanNotAuto, options, callback) {
    //  最小宽度 最大宽度 主体透明度 主体边框默认样式 主体边框默认颜色 主体背景色 投影透明度 默认投影颜色 今日前景 今日背景 普通over前景 普通over背景 今日over前景 今日over背景 输入框是否只读 是否隐藏select
    this.options = options ? options : [140, 800, 0.95, "solid", "#EEE", "#FFF", 3, 3, 0.2, "#000", "#444", "#F6F8FD", "#333", "#F1F5FC", "#000", "#EFF3FB", true, true];
    this.toFixedZero = function (n) {
        return n < 10 ? "0" + n : n;
    };
    this.booleanNotAuto = booleanNotAuto;
    this.createContainer = function (elementTargetElement) {
        var getCssTextWHLT = function (arrayWHLT) {
            var stringCssText = ";";
            var arrayWHLTTpl = ["width", "height", "left", "top"];
            for (var i = 0; i < 4; i++) {
                if (arrayWHLT[i] != "auto") {
                    stringCssText += arrayWHLTTpl[i] + ":" + arrayWHLT[i] + (typeof arrayWHLT[i] == "string" ? "" : "px") + ";";
                }
            }
            return stringCssText;
        };
        var arrayBorderDirection = ["Top", "Right", "Bottom", "Left"];
        var arrayTargetBorderWidth = [];
        var stringTargetBorderCssText = ";background-color:" + (elementTargetElement.style.backgroundColor ? elementTargetElement.style.backgroundColor : this.options[5]) + ";";
        for (var i = 0; i < 4; i++) {
            var stringBorderWidth = elementTargetElement.style["border" + arrayBorderDirection[i] + "Width"];
            arrayTargetBorderWidth[i] = stringBorderWidth ? stringBorderWidth.replace("px", "") * 1 : 2;
            stringTargetBorderCssText += "border-" + arrayBorderDirection[i].toLowerCase() + "-width:" + arrayTargetBorderWidth[i] + "px;";
            var stringBorderStyle = elementTargetElement.style["border" + arrayBorderDirection[i] + "Style"];
            stringTargetBorderCssText += "border-" + arrayBorderDirection[i].toLowerCase() + "-style:" + (stringBorderStyle ? stringBorderStyle : this.options[3]) + ";";
            var stringBorderColor = elementTargetElement.style["border" + arrayBorderDirection[i] + "Color"];
            stringTargetBorderCssText += "border-" + arrayBorderDirection[i].toLowerCase() + "-color:" + (stringBorderColor ? stringBorderColor : this.options[4]) + ";";
        }
        var intCurrentWidth = elementTargetElement.clientWidth;
        intCurrentWidth = intCurrentWidth < this.options[0] ? this.options[0] : intCurrentWidth;
        intCurrentWidth = this.options[1] < intCurrentWidth ? this.options[1] : intCurrentWidth;

        var stringMainOpacity = "";
        var stringShadowOpacity = "";
        var stringShadowLimited = ";font-size:0px;line-height:0px;";
        if (navigator.appName == "Microsoft Internet Explorer") {
            stringMainOpacity = "filter:alpha(opacity=" + this.options[2] * 100 + ");";
            stringShadowOpacity = "filter:alpha(opacity=" + this.options[8] * 100 + ");";
        }
        else {
            stringMainOpacity = "opacity:" + this.options[2] + ";";
            stringShadowOpacity = "opacity:" + this.options[8] + ";";
        }

        var elementSpan = document.createElement("span");
        elementTargetElement.parentNode.insertBefore(elementSpan, elementTargetElement);
        var intTargetHeight = elementTargetElement.clientHeight + arrayTargetBorderWidth[0] + arrayTargetBorderWidth[2] + (elementTargetElement.offsetTop - elementSpan.offsetTop);
        elementSpan.style.position = "relative";
        elementSpan.style.display = "none";
        //elementSpan.style.marginLeft = "0";
        elementSpan.style.width = "0px";

        var elementDiv = document.createElement("div");
        elementDiv.style.position = "absolute";
        elementDiv.style.cssText += getCssTextWHLT([intCurrentWidth, "auto", 0, intTargetHeight]) + stringTargetBorderCssText + stringMainOpacity;
        elementSpan.appendChild(elementDiv);

        var elementShadowDivRight = document.createElement("div");
        elementShadowDivRight.style.position = "absolute";
        elementShadowDivRight.style.cssText += getCssTextWHLT([this.options[6], elementDiv.clientHeight + arrayTargetBorderWidth[1] + arrayTargetBorderWidth[3], intCurrentWidth + arrayTargetBorderWidth[0] + arrayTargetBorderWidth[2], intTargetHeight + this.options[7]]) + "background-color:" + (elementTargetElement.style.borderRightColor ? elementTargetElement.style.borderRightColor : this.options[9]) + ";" + stringShadowOpacity + stringShadowLimited;
        elementSpan.appendChild(elementShadowDivRight);

        var elementShadowDivBottom = document.createElement("div");
        elementShadowDivBottom.style.position = "absolute";
        elementShadowDivBottom.style.cssText += getCssTextWHLT([intCurrentWidth + arrayTargetBorderWidth[0] + arrayTargetBorderWidth[2] - this.options[6], this.options[7], this.options[6], intTargetHeight + elementDiv.clientHeight + arrayTargetBorderWidth[1] + arrayTargetBorderWidth[3]]) + "background-color:" + (elementTargetElement.style.borderBottomColor ? elementTargetElement.style.borderBottomColor : this.options[9]) + ";" + stringShadowOpacity + stringShadowLimited;
        elementSpan.appendChild(elementShadowDivBottom);

        var elementBorderDiv = document.createElement("div");
        elementBorderDiv.style.position = "absolute";
        elementBorderDiv.style.cssText += getCssTextWHLT([intCurrentWidth < elementTargetElement.clientWidth ? intCurrentWidth : elementTargetElement.clientWidth, arrayTargetBorderWidth[2] + arrayTargetBorderWidth[0], arrayTargetBorderWidth[3], intTargetHeight - arrayTargetBorderWidth[2]]) + ";background-color:" + (elementTargetElement.style.backgroundColor ? elementTargetElement.style.backgroundColor : this.options[5]) + ";" + stringShadowLimited;
        if (elementTargetElement.style.borderBottomWidth) {
            elementSpan.appendChild(elementBorderDiv);
        }

        this.elementSpan = elementSpan;
        this.elementDiv = elementDiv;
        this.elementShadowDivRight = elementShadowDivRight;
        this.elementShadowDivBottom = elementShadowDivBottom;
    };
    this.romance = function (element) {
        element.style.cursor = "pointer";
        element.style.cssText += ";padding:2px 4px; line-height: 16px;";
        element.calendar = this;
        if (element.today) {
            element.style.color = this.options[10];
            element.style.backgroundColor = this.options[11];
        }
        element.onmouseover = function () {
            if (this.today) {
                this.style.color = this.calendar.options[14];
                this.style.backgroundColor = this.calendar.options[15];
            }
            else {
                this.style.color = this.calendar.options[12];
                this.style.backgroundColor = this.calendar.options[13];
            }
            if (parseInt(this.date) == this.date) {
                this.calendar.keepShowing = true;
            }
        };
        element.onmouseout = function () {
            if (this.today) {
                this.style.color = this.calendar.options[10];
                this.style.backgroundColor = this.calendar.options[11];
            }
            else {
                this.style.color = "";
                this.style.backgroundColor = "";
            }
            this.calendar.keepShowing = false;
        };
        element.onmousedown = function () {
            //alert(this.date);
            if (parseInt(this.date) == this.date) {
                this.calendar.keepShowing = true;
                var arrayDate = this.calendar.date;
                var date = new Date(arrayDate[0], arrayDate[1] + this.date, arrayDate[2]);
                this.calendar.date = [date.getFullYear(), date.getMonth(), date.getDate()];
                this.calendar.elementTarget.value = this.calendar.date[0].toString() + "-" + this.calendar.toFixedZero(this.calendar.date[1] + 1) + "-" + this.calendar.toFixedZero(this.calendar.date[2]);
                //alert("OK")
                this.calendar.resetCalendar(this.calendar.date);
            }
            else {
                this.calendar.keepShowing = false;
                this.calendar.date = this.date;
                this.calendar.elementTarget.value = this.calendar.date[0].toString() + "-" + this.calendar.toFixedZero(this.calendar.date[1] + 1) + "-" + this.calendar.toFixedZero(this.calendar.date[2]);
                //alert("OK2")
                if (typeof callback == "function") callback();
                //alert("OK2")
            }
        };
    };
    this.resetShadow = function () {
        var intDivHeight = this.elementDiv.clientHeight + this.elementDiv.style.borderTopWidth.replace("px", "") * 1 + this.elementDiv.style.borderBottomWidth.replace("px", "") * 1;
        this.elementShadowDivRight.style.height = intDivHeight + "px";
        this.elementShadowDivBottom.style.top = this.elementDiv.style.top.replace("px", "") * 1 + intDivHeight + "px";
    };

    this.resetCalendar = function (arrayDate) {
        this.elementDiv.innerHTML = "";

        var stringCssTextButton = "width:12px; font-size:18px;";
        var stringCssTextTable = "width:100%; color:#000; font-size:12px; text-align:center;";
        var tableTitle = document.createElement("table");
        tableTitle.style.cssText += stringCssTextTable;
        tableTitle.cellPadding = 0;
        tableTitle.cellSpacing = 0;

        var trHeader = tableTitle.insertRow(0);
        trHeader.style.cssText += "background-color:#F3F3F3; line-height:20px;";

        var tdPreviousYear = trHeader.insertCell(0);
        tdPreviousYear.style.cssText += stringCssTextButton;
        tdPreviousYear.innerHTML = "&laquo;";
        tdPreviousYear.date = -12;
        this.romance(tdPreviousYear);

        var tdPreviousMonth = trHeader.insertCell(1);
        tdPreviousMonth.innerHTML = "&lsaquo;";
        tdPreviousMonth.style.cssText += stringCssTextButton;
        tdPreviousMonth.date = -1;
        this.romance(tdPreviousMonth);

        var tdYearAndMonth = trHeader.insertCell(2);
        tdYearAndMonth.innerHTML = arrayDate[0] + "年" + this.toFixedZero(arrayDate[1] + 1) + "月";

        var tdNextYear = trHeader.insertCell(3);
        tdNextYear.innerHTML = "&rsaquo;";
        tdNextYear.style.cssText += stringCssTextButton;
        tdNextYear.date = 1;
        this.romance(tdNextYear);

        var tdNextMonth = trHeader.insertCell(4);
        tdNextMonth.innerHTML = "&raquo;";
        tdNextMonth.style.cssText += stringCssTextButton;
        tdNextMonth.date = 12;
        this.romance(tdNextMonth);

        this.elementDiv.appendChild(tableTitle);

        var tableDays = document.createElement("table");
        tableDays.style.cssText += stringCssTextTable;
        tableDays.cellPadding = 0;
        tableDays.cellSpacing = 0;

        var trHeaderDays = tableDays.insertRow(0);
        var days = ["日", "一", "二", "三", "四", "五", "六"];
        for (var i = 0; i < 7; i++) {
            var tdHeaderDay = trHeaderDays.insertCell(i);
            tdHeaderDay.innerHTML = days[i];
            tdHeaderDay.style.cssText += ";padding:2px 4px; line-height: 16px;";
        }

        var day = new Date(arrayDate[0], arrayDate[1], 1).getDay();
        var dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (arrayDate[1] == 1 && ((arrayDate[0] % 4 == 0 && arrayDate[0] % 100 != 0) || arrayDate[0] % 400 == 0)) {
            dates[1] = 29;
        }

        var pos = 0;
        var currentLine = 1;
        var currentTr = tableDays.insertRow(currentLine);
        for (var i = 0; i < day; i++) {
            var currentTd = currentTr.insertCell(i);
            pos++;
        }
        for (var i = 1; i < dates[arrayDate[1]] + 1; i++) {
            if (pos == 0) {
                currentLine++;
                currentTr = tableDays.insertRow(currentLine);
            }
            currentTd = currentTr.insertCell(pos);
            currentTd.innerHTML = i.toString();
            currentTd.today = i == arrayDate[2] ? true : false;
            currentTd.date = [arrayDate[0], arrayDate[1], i];
            this.romance(currentTd);
            pos++;
            pos = pos == 7 ? 0 : pos;
        }
        if (pos != 0) {
            for (var i = pos; i < 7; i++) {
                var currentTd = currentTr.insertCell(i);
            }
        }
        this.elementDiv.appendChild(tableDays);
        this.resetShadow();
    };
    this.hideSelects = function () {
        if (navigator.appVersion.indexOf("MSIE 6.0") != -1) {
            var selects = document.getElementsByTagName("select");
            var length = selects.length;
            for (var i = 0; i < length; i++) {
                selects[i].style.visibility = "hidden";
            }
        }
    }

    this.showSelects = function () {
        if (navigator.appVersion.indexOf("MSIE 6.0") != -1) {
            var selects = document.getElementsByTagName("select");
            var length = selects.length;
            for (var i = 0; i < length; i++) {
                selects[i].style.visibility = "";
            }
        }
    }
    this.showForce = function () {
        if (this.options[17]) {
            this.hideSelects();
        }
        this.elementSpan.style.display = "";
        this.resetShadow();
    };

    this.show = function () {
        if (this.booleanNotAuto) {
            return;
        }
        if (this.options[17]) {
            this.hideSelects();
        }
        this.elementSpan.style.display = "";
        this.resetShadow();
    };

    this.hide = function () {
        if (this.options[17]) {
            this.showSelects();
        }
        this.elementSpan.style.display = "none";
    };

    this.showStandalone = function () {
        arguments.callee.object.show();
    };
    this.showStandalone.object = this;
    this.bind = function (elementTarget, elementTargetHelp, booleanAuto) {
        if (typeof elementTarget == "string") {
            var elementTargetElement = document.getElementById(elementTarget);
        }
        else {
            var elementTargetElement = elementTarget;
        }
        this.elementTarget = elementTargetElement;
        this.createContainer(elementTargetElement);

        elementTargetElement.readOnly = this.options[16];
        elementTargetElement.autocomplete = "off";
        elementTargetElement.calendar = this;
        if (elementTargetElement.value == "" || elementTargetElement.value.match(/^\d{4}-\d{1,2}-\d{1,2}$/) == null) {
            var now = new Date();
            elementTargetElement.value = elementTargetElement.value == "" ? "" : now.getFullYear().toString() + "-" + this.toFixedZero(now.getMonth() + 1) + "-" + this.toFixedZero(now.getDate());
            this.date = [now.getFullYear(), now.getMonth(), now.getDate()];
        }
        else {
            var arrayDate = elementTargetElement.value.split("-");
            this.date = [arrayDate[0] * 1, arrayDate[1] * 1 - 1, arrayDate[2] * 1];
        }

        this.resetCalendar(this.date);

        if (!booleanAuto) {
            elementTargetElement.onfocus = function () {
                this.calendar.show();
            };

            elementTargetElement.onblur = function () {
                if (this.calendar.keepShowing) {
                    this.focus();
                    setTimeout(this.calendar.showStandalone, 1);
                }
                else {
                    this.calendar.hide();
                }
            };
        }
        if (elementTargetHelp) {
            if (typeof elementTargetHelp == "string") {
                var elementTargetElementHelp = document.getElementById(elementTargetHelp);
            }
            else {
                var elementTargetElementHelp = elementTargetHelp;
            }
            elementTargetElementHelp.style.cursor = "pointer";
            elementTargetElementHelp.calendar = this;
            elementTargetElementHelp.onclick = function () {
                this.calendar.elementTarget.focus();
                this.calendar.showForce();
            };
        }
    };

    this.bind(targetInput, targetHelp);
};

module.exports = Calendar;