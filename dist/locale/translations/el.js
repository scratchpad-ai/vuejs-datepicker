!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):((t=t||self).vdp_translation_el=t.vdp_translation_el||{},t.vdp_translation_el.js=e())}(this,(function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return new(function(){function e(t,n,r,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.language=t,this.months=n,this.monthsAbbr=r,this.days=o,this.rtl=!1,this.ymd=!1,this.yearSuffix=""}var n,r,o;return n=e,(r=[{key:"language",get:function(){return this._language},set:function(t){if("string"!=typeof t)throw new TypeError("Language must be a string");this._language=t}},{key:"months",get:function(){return this._months},set:function(t){if(12!==t.length)throw new RangeError("There must be 12 months for ".concat(this.language," language"));this._months=t}},{key:"monthsAbbr",get:function(){return this._monthsAbbr},set:function(t){if(12!==t.length)throw new RangeError("There must be 12 abbreviated months for ".concat(this.language," language"));this._monthsAbbr=t}},{key:"days",get:function(){return this._days},set:function(t){if(7!==t.length)throw new RangeError("There must be 7 days for ".concat(this.language," language"));this._days=t}}])&&t(n.prototype,r),o&&t(n,o),Object.defineProperty(n,"prototype",{writable:!1}),e}())("Greek",["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάϊος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],["Ιαν","Φεβ","Μαρ","Απρ","Μαι","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ"],["Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ"])}));
