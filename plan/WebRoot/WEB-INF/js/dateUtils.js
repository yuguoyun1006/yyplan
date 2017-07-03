/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) return "";//throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


/***************************************************************************************************************/


var dateUtils={

	  /**
	  * 获取date所在的周的起始日期和终止日期
	  * 比如date=2013-1-11 则返回2013-1-7和2013-1-13
	  * @param {} date
	  * @return {}
	  */
	  getWeekDays : function(date){
		  var now=date;
		  
		  var start=new Date();
		  var end=new Date();
		
		  var weekday=now.getDay(); //从 Date 对象返回一周中的某一天 (0 ~ 6)。 返回值是 0（周日） 到 6（周六） 之间的一个整数。
		  if(weekday == 0) weekday = 6;
		  else weekday = weekday - 1;
	
		  var nowTimes = now.getTime();//返回 1970 年 1 月 1 日至今的毫秒数。
		  var weekdayTimes = weekday * 24 * 3600 * 1000;
		  var week1Times = nowTimes - weekdayTimes;
		  var week7Times = week1Times + 6 * 24 * 3600 * 1000;
		  start.setTime(week1Times);
		  end.setTime(week7Times);
		  
		  var obj = {};
		  obj.startDate = start;
		  obj.endDate = end;
		  return obj;
	 },
	 
	 /**数字代表的时间戳 毫米数*/
	 getDateFromTimes:function(times){
		
		 var date = new Date();
		 if(times){
			 date.setTime(times);
		 }
	//	 var date = new Date(parseInt(times) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
		 return date;
	 },
	 
	 /**时间戳转时间,数字代表的时间戳 毫米数*/
	 getFormatDateTimeFromTimes:function(times){
		 var date = this.getDateFromTimes(times);
		 var str = date.format("yyyy-mm-dd HH:MM:ss");
		 return str;
	 },
	 getFormatDateMinFromTimes:function(times){
		 var date = this.getDateFromTimes(times);
		 var str = date.format("HH:MM");
		 return str;
	 },
	 getFormatDateHourMinFromTimes:function(times){
		 var date = this.getDateFromTimes(times);
		 var str = date.format("HHMM");
		 return str;
	 },
	 getFormatDateHourFromTimes:function(times){
		 var date = this.getDateFromTimes(times);
		 var str = date.format("yyyy-mm-dd HH时");
		 return str;
	 },
	  /**时间戳转时间,数字代表的时间戳 毫米数*/
	 getFormatDateFromTimes:function(times){
		 if(!times)return "";
		 if(times < 100000)return "";
		 var date = this.getDateFromTimes(times);
		 var str = date.format("yyyy-mm-dd");
		 return str;
	 },
	 
	 /**
	  * 将时间格式转换为时间戳
	  * @param str  时间格式
	  * @return
	  */
	 dateToStamp:function(str){
		 if(str==null || str.length == 0) return null;
		 var new_str = str.replace(/:/g,'-');
		 new_str = new_str.replace('年','-');
		 new_str = new_str.replace('月','-');
		 new_str = new_str.replace('日','-');
		 new_str = new_str.replace('时','-');
		 new_str = new_str.replace('分','-');
		 new_str = new_str.replace('秒','-');
		 new_str = new_str.replace('+',' ');
		 new_str = new_str.replace('T',' ');
		 new_str = new_str.replace(/ /g,'-');
		 var arr = new_str.split("-");
		 var datum = null;
		 if(arr.length == 3){
			 datum=new Date(Date.UTC(arr[0],arr[1]-1,arr[2],0-8,0,0));
		 }else if(arr.length == 6){
			datum=new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
		 }
		// var datum = new Date(datum.getTime());
		// alert("<br><b>还原到原始日期为</b>: "+datum.toLocaleString());
		 return datum.getTime();
	}
	
};