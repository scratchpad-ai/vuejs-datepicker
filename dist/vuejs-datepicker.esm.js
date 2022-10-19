import { openBlock, createElementBlock, normalizeClass, createCommentVNode, normalizeStyle, createElementVNode, createTextVNode, toDisplayString, renderSlot, withDirectives, withModifiers, Fragment, renderList, vShow, resolveComponent, createVNode, withCtx, createBlock } from 'vue';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

var Language = /*#__PURE__*/function () {
  function Language(language, months, monthsAbbr, days) {
    _classCallCheck(this, Language);
    this.language = language;
    this.months = months;
    this.monthsAbbr = monthsAbbr;
    this.days = days;
    this.rtl = false;
    this.ymd = false;
    this.yearSuffix = '';
  }
  _createClass(Language, [{
    key: "language",
    get: function get() {
      return this._language;
    },
    set: function set(language) {
      if (typeof language !== 'string') {
        throw new TypeError('Language must be a string');
      }
      this._language = language;
    }
  }, {
    key: "months",
    get: function get() {
      return this._months;
    },
    set: function set(months) {
      if (months.length !== 12) {
        throw new RangeError("There must be 12 months for ".concat(this.language, " language"));
      }
      this._months = months;
    }
  }, {
    key: "monthsAbbr",
    get: function get() {
      return this._monthsAbbr;
    },
    set: function set(monthsAbbr) {
      if (monthsAbbr.length !== 12) {
        throw new RangeError("There must be 12 abbreviated months for ".concat(this.language, " language"));
      }
      this._monthsAbbr = monthsAbbr;
    }
  }, {
    key: "days",
    get: function get() {
      return this._days;
    },
    set: function set(days) {
      if (days.length !== 7) {
        throw new RangeError("There must be 7 days for ".concat(this.language, " language"));
      }
      this._days = days;
    }
  }]);
  return Language;
}(); // eslint-disable-next-line

var en = new Language('English', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
// eslint-disable-next-line
;

var utils = {
  /**
   * @type {Boolean}
   */
  useUtc: false,
  /**
   * Returns the full year, using UTC or not
   * @param {Date} date
   */getFullYear: function getFullYear(date) {
    return this.useUtc ? date.getUTCFullYear() : date.getFullYear();
  },
  /**
   * Returns the month, using UTC or not
   * @param {Date} date
   */getMonth: function getMonth(date) {
    return this.useUtc ? date.getUTCMonth() : date.getMonth();
  },
  /**
   * Returns the date, using UTC or not
   * @param {Date} date
   */getDate: function getDate(date) {
    return this.useUtc ? date.getUTCDate() : date.getDate();
  },
  /**
   * Returns the day, using UTC or not
   * @param {Date} date
   */getDay: function getDay(date) {
    return this.useUtc ? date.getUTCDay() : date.getDay();
  },
  /**
   * Returns the hours, using UTC or not
   * @param {Date} date
   */getHours: function getHours(date) {
    return this.useUtc ? date.getUTCHours() : date.getHours();
  },
  /**
   * Returns the minutes, using UTC or not
   * @param {Date} date
   */getMinutes: function getMinutes(date) {
    return this.useUtc ? date.getUTCMinutes() : date.getMinutes();
  },
  /**
   * Sets the full year, using UTC or not
   * @param {Date} date
   */setFullYear: function setFullYear(date, value, useUtc) {
    return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value);
  },
  /**
   * Sets the month, using UTC or not
   * @param {Date} date
   */setMonth: function setMonth(date, value, useUtc) {
    return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value);
  },
  /**
   * Sets the date, using UTC or not
   * @param {Date} date
   * @param {Number} value
   */setDate: function setDate(date, value, useUtc) {
    return this.useUtc ? date.setUTCDate(value) : date.setDate(value);
  },
  /**
   * Check if date1 is equivalent to date2, without comparing the time
   * @see https://stackoverflow.com/a/6202196/4455925
   * @param {Date} date1
   * @param {Date} date2
   */compareDates: function compareDates(date1, date2) {
    var d1 = new Date(date1.getTime());
    var d2 = new Date(date2.getTime());
    if (this.useUtc) {
      d1.setUTCHours(0, 0, 0, 0);
      d2.setUTCHours(0, 0, 0, 0);
    } else {
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
    }
    return d1.getTime() === d2.getTime();
  },
  /**
   * Validates a date object
   * @param {Date} date - an object instantiated with the new Date constructor
   * @return {Boolean}
   */isValidDate: function isValidDate(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return false;
    }
    return !isNaN(date.getTime());
  },
  /**
   * Return abbreviated week day name
   * @param {Date}
   * @param {Array}
   * @return {String}
   */getDayNameAbbr: function getDayNameAbbr(date, days) {
    if (_typeof(date) !== 'object') {
      throw TypeError('Invalid Type');
    }
    return days[this.getDay(date)];
  },
  /**
   * Return name of the month
   * @param {Number|Date}
   * @param {Array}
   * @return {String}
   */getMonthName: function getMonthName(month, months) {
    if (!months) {
      throw Error('missing 2nd parameter Months array');
    }
    if (_typeof(month) === 'object') {
      return months[this.getMonth(month)];
    }
    if (typeof month === 'number') {
      return months[month];
    }
    throw TypeError('Invalid type');
  },
  /**
   * Return an abbreviated version of the month
   * @param {Number|Date}
   * @return {String}
   */getMonthNameAbbr: function getMonthNameAbbr(month, monthsAbbr) {
    if (!monthsAbbr) {
      throw Error('missing 2nd paramter Months array');
    }
    if (_typeof(month) === 'object') {
      return monthsAbbr[this.getMonth(month)];
    }
    if (typeof month === 'number') {
      return monthsAbbr[month];
    }
    throw TypeError('Invalid type');
  },
  /**
   * Alternative get total number of days in month
   * @param {Number} year
   * @param {Number} m
   * @return {Number}
   */daysInMonth: function daysInMonth(year, month) {
    return /8|3|5|10/.test(month) ? 30 : month === 1 ? !(year % 4) && year % 100 || !(year % 400) ? 29 : 28 : 31;
  },
  /**
   * Get nth suffix for date
   * @param {Number} day
   * @return {String}
   */getNthSuffix: function getNthSuffix(day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st';
      case 2:
      case 22:
        return 'nd';
      case 3:
      case 23:
        return 'rd';
      default:
        return 'th';
    }
  },
  /**
   * Formats date object
   * @param {Date}
   * @param {String}
   * @param {Object}
   * @return {String}
   */formatDate: function formatDate(date, format, translation) {
    translation = !translation ? en : translation;
    var year = this.getFullYear(date);
    var month = this.getMonth(date) + 1;
    var day = this.getDate(date);
    var str = format.replace(/dd/, ('0' + day).slice(-2)).replace(/d/, day).replace(/yyyy/, year).replace(/yy/, String(year).slice(2)).replace(/MMMM/, this.getMonthName(this.getMonth(date), translation.months)).replace(/MMM/, this.getMonthNameAbbr(this.getMonth(date), translation.monthsAbbr)).replace(/MM/, ('0' + month).slice(-2)).replace(/M(?!a|ä|e)/, month).replace(/su/, this.getNthSuffix(this.getDate(date))).replace(/D(?!e|é|i)/, this.getDayNameAbbr(date, translation.days));
    return str;
  },
  /**
   * Creates an array of dates for each day in between two dates.
   * @param {Date} start
   * @param {Date} end
   * @return {Array}
   */createDateArray: function createDateArray(start, end) {
    var dates = [];
    while (start <= end) {
      dates.push(new Date(start));
      start = this.setDate(new Date(start), this.getDate(new Date(start)) + 1);
    }
    return dates;
  },
  /**
   * method used as a prop validator for input values
   * @param {*} val
   * @return {Boolean}
   */validateDateInput: function validateDateInput(val) {
    return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number';
  }
};
var makeDateUtils = function makeDateUtils(useUtc) {
  return _objectSpread({}, utils, {
    useUtc: useUtc
  });
};
var utils$1 = _objectSpread({}, utils) // eslint-disable-next-line
;

var script = {
  props: {
    selectedDate: Date,
    resetTypedDate: [Date],
    format: [String, Function],
    translation: Object,
    inline: Boolean,
    id: String,
    name: String,
    refName: String,
    openDate: Date,
    placeholder: String,
    inputClass: [String, Object, Array],
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    disabled: Boolean,
    required: Boolean,
    typeable: Boolean,
    bootstrapStyling: Boolean,
    useUtc: Boolean
  },
  emits: ['showCalendar', 'typedDate', 'closeCalendar', 'clearDate'],
  data: function data() {
    var constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      input: null,
      typedDate: false,
      utils: constructedDateUtils
    };
  },
  computed: {
    formattedValue: function formattedValue() {
      if (!this.selectedDate) {
        return null;
      }
      if (this.typedDate) {
        return this.typedDate;
      }
      return typeof this.format === 'function' ? this.format(this.selectedDate) : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation);
    },
    computedInputClass: function computedInputClass() {
      if (this.bootstrapStyling) {
        if (typeof this.inputClass === 'string') {
          return [this.inputClass, 'form-control'].join(' ');
        }
        return _objectSpread({
          'form-control': true
        }, this.inputClass);
      }
      return this.inputClass;
    }
  },
  watch: {
    resetTypedDate: function resetTypedDate() {
      this.typedDate = false;
    }
  },
  methods: {
    showCalendar: function showCalendar() {
      this.$emit('showCalendar');
    },
    /**
     * Attempt to parse a typed date
     * @param {Event} event
     */parseTypedDate: function parseTypedDate(event) {
      // close calendar if escape or enter are pressed
      if ([27,
      // escape
      13 // enter
      ].includes(event.keyCode)) {
        this.input.blur();
      }
      if (this.typeable) {
        var typedDate = Date.parse(this.input.value);
        if (!isNaN(typedDate)) {
          this.typedDate = this.input.value;
          this.$emit('typedDate', new Date(this.typedDate));
        }
      }
    },
    /**
     * nullify the typed date to defer to regular formatting
     * called once the input is blurred
     */inputBlurred: function inputBlurred() {
      if (this.typeable && isNaN(Date.parse(this.input.value))) {
        this.clearDate();
        this.input.value = null;
        this.typedDate = null;
      }
      this.$emit('closeCalendar');
    },
    /**
     * emit a clearDate event
     */clearDate: function clearDate() {
      this.$emit('clearDate');
    }
  },
  mounted: function mounted() {
    this.input = this.$el.querySelector('input');
  }
}
// eslint-disable-next-line
;

var _hoisted_1 = {
  key: 0
};
var _hoisted_2 = ["type", "name", "id", "value", "open-date", "placeholder", "clear-button", "disabled", "required", "readonly"];
var _hoisted_3 = {
  key: 0
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "class": normalizeClass({
      'input-group': $props.bootstrapStyling
    })
  }, [createCommentVNode(" Calendar Button "), $props.calendarButton ? (openBlock(), createElementBlock("span", {
    key: 0,
    "class": normalizeClass(["vdp-datepicker__calendar-button", {
      'input-group-prepend': $props.bootstrapStyling
    }]),
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.showCalendar && $options.showCalendar.apply($options, arguments);
    }),
    style: normalizeStyle({
      'cursor:not-allowed;': $props.disabled
    })
  }, [createElementVNode("span", {
    "class": normalizeClass({
      'input-group-text': $props.bootstrapStyling
    })
  }, [createElementVNode("i", {
    "class": normalizeClass($props.calendarButtonIcon)
  }, [createTextVNode(toDisplayString($props.calendarButtonIconContent) + " ", 1 /* TEXT */), !$props.calendarButtonIcon ? (openBlock(), createElementBlock("span", _hoisted_1, "…")) : createCommentVNode("v-if", true)], 2 /* CLASS */)], 2 /* CLASS */)], 6 /* CLASS, STYLE */)) : createCommentVNode("v-if", true), createCommentVNode(" Input "), createElementVNode("input", {
    type: $props.inline ? 'hidden' : 'text',
    "class": normalizeClass($options.computedInputClass),
    name: $props.name,
    ref: $props.refName,
    id: $props.id,
    value: $options.formattedValue,
    "open-date": $props.openDate,
    placeholder: $props.placeholder,
    "clear-button": $props.clearButton,
    disabled: $props.disabled,
    required: $props.required,
    readonly: !$props.typeable,
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.showCalendar && $options.showCalendar.apply($options, arguments);
    }),
    onKeyup: _cache[2] || (_cache[2] = function () {
      return $options.parseTypedDate && $options.parseTypedDate.apply($options, arguments);
    }),
    onBlur: _cache[3] || (_cache[3] = function () {
      return $options.inputBlurred && $options.inputBlurred.apply($options, arguments);
    }),
    autocomplete: "off"
  }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_2), createCommentVNode(" Clear Button "), $props.clearButton && $props.selectedDate ? (openBlock(), createElementBlock("span", {
    key: 1,
    "class": normalizeClass(["vdp-datepicker__clear-button", {
      'input-group-append': $props.bootstrapStyling
    }]),
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.clearDate();
    })
  }, [createElementVNode("span", {
    "class": normalizeClass({
      'input-group-text': $props.bootstrapStyling
    })
  }, [createElementVNode("i", {
    "class": normalizeClass($props.clearButtonIcon)
  }, [!$props.clearButtonIcon ? (openBlock(), createElementBlock("span", _hoisted_3, "×")) : createCommentVNode("v-if", true)], 2 /* CLASS */)], 2 /* CLASS */)], 2 /* CLASS */)) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "afterDateInput")], 2 /* CLASS */);
}

script.render = render;
script.__file = "src/components/DateInput.vue";

var script$1 = {
  props: {
    showDayView: Boolean,
    selectedDate: Date,
    pageDate: Date,
    pageTimestamp: Number,
    fullMonthName: Boolean,
    allowedToShowView: Function,
    dayCellContent: {
      type: Function,
      "default": function _default(day) {
        return day.date;
      }
    },
    disabledDates: Object,
    highlighted: Object,
    calendarClass: [String, Object, Array],
    calendarStyle: Object,
    translation: Object,
    isRtl: Boolean,
    mondayFirst: Boolean,
    useUtc: Boolean
  },
  emits: ['selectedDisabled', 'selectDate', 'showMonthCalendar', 'changedMonth'],
  data: function data() {
    var constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      utils: constructedDateUtils
    };
  },
  computed: {
    /**
     * Returns an array of day names
     * @return {String[]}
     */daysOfWeek: function daysOfWeek() {
      if (this.mondayFirst) {
        var tempDays = this.translation.days.slice();
        tempDays.push(tempDays.shift());
        return tempDays;
      }
      return this.translation.days;
    },
    /**
     * Returns the day number of the week less one for the first of the current month
     * Used to show amount of empty cells before the first in the day calendar layout
     * @return {Number}
     */blankDays: function blankDays() {
      var d = this.pageDate;
      var dObj = this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)) : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      if (this.mondayFirst) {
        return this.utils.getDay(dObj) > 0 ? this.utils.getDay(dObj) - 1 : 6;
      }
      return this.utils.getDay(dObj);
    },
    /**
     * @return {Object[]}
     */days: function days() {
      var d = this.pageDate;
      var days = [];
      // set up a new date object to the beginning of the current 'page'
      var dObj = this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)) : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
      var daysInMonth = this.utils.daysInMonth(this.utils.getFullYear(dObj), this.utils.getMonth(dObj));
      for (var i = 0; i < daysInMonth; i++) {
        days.push({
          date: this.utils.getDate(dObj),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedDate(dObj),
          isDisabled: this.isDisabledDate(dObj),
          isHighlighted: this.isHighlightedDate(dObj),
          isHighlightStart: this.isHighlightStart(dObj),
          isHighlightEnd: this.isHighlightEnd(dObj),
          isToday: this.utils.compareDates(dObj, new Date()),
          isWeekend: this.utils.getDay(dObj) === 0 || this.utils.getDay(dObj) === 6,
          isSaturday: this.utils.getDay(dObj) === 6,
          isSunday: this.utils.getDay(dObj) === 0
        });
        this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
      }
      return days;
    },
    /**
     * Gets the name of the month the current page is on
     * @return {String}
     */currMonthName: function currMonthName() {
      var monthName = this.fullMonthName ? this.translation.months : this.translation.monthsAbbr;
      return this.utils.getMonthNameAbbr(this.utils.getMonth(this.pageDate), monthName);
    },
    /**
     * Gets the name of the year that current page is on
     * @return {Number}
     */currYearName: function currYearName() {
      var yearSuffix = this.translation.yearSuffix;
      return "".concat(this.utils.getFullYear(this.pageDate)).concat(yearSuffix);
    },
    /**
     * Is this translation using year/month/day format?
     * @return {Boolean}
     */isYmd: function isYmd() {
      return this.translation.ymd && this.translation.ymd === true;
    },
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */isLeftNavDisabled: function isLeftNavDisabled() {
      return this.isRtl ? this.isNextMonthDisabled(this.pageTimestamp) : this.isPreviousMonthDisabled(this.pageTimestamp);
    },
    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */isRightNavDisabled: function isRightNavDisabled() {
      return this.isRtl ? this.isPreviousMonthDisabled(this.pageTimestamp) : this.isNextMonthDisabled(this.pageTimestamp);
    }
  },
  methods: {
    selectDate: function selectDate(date) {
      if (date.isDisabled) {
        this.$emit('selectedDisabled', date);
        return false;
      }
      this.$emit('selectDate', date);
    },
    /**
     * @return {Number}
     */getPageMonth: function getPageMonth() {
      return this.utils.getMonth(this.pageDate);
    },
    /**
     * Emit an event to show the month picker
     */showMonthCalendar: function showMonthCalendar() {
      this.$emit('showMonthCalendar');
    },
    /**
     * Change the page month
     * @param {Number} incrementBy
     */changeMonth: function changeMonth(incrementBy) {
      var date = this.pageDate;
      this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
      this.$emit('changedMonth', date);
    },
    /**
     * Decrement the page month
     */previousMonth: function previousMonth() {
      if (!this.isPreviousMonthDisabled()) {
        this.changeMonth(-1);
      }
    },
    /**
     * Is the previous month disabled?
     * @return {Boolean}
     */isPreviousMonthDisabled: function isPreviousMonthDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false;
      }
      var d = this.pageDate;
      return this.utils.getMonth(this.disabledDates.to) >= this.utils.getMonth(d) && this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(d);
    },
    /**
     * Increment the current page month
     */nextMonth: function nextMonth() {
      if (!this.isNextMonthDisabled()) {
        this.changeMonth(+1);
      }
    },
    /**
     * Is the next month disabled?
     * @return {Boolean}
     */isNextMonthDisabled: function isNextMonthDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false;
      }
      var d = this.pageDate;
      return this.utils.getMonth(this.disabledDates.from) <= this.utils.getMonth(d) && this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(d);
    },
    /**
     * Whether a day is selected
     * @param {Date}
     * @return {Boolean}
     */isSelectedDate: function isSelectedDate(dObj) {
      return this.selectedDate && this.utils.compareDates(this.selectedDate, dObj);
    },
    /**
     * Whether a day is disabled
     * @param {Date}
     * @return {Boolean}
     */isDisabledDate: function isDisabledDate(date) {
      var _this = this;
      var disabledDates = false;
      if (typeof this.disabledDates === 'undefined') {
        return false;
      }
      if (typeof this.disabledDates.dates !== 'undefined') {
        this.disabledDates.dates.forEach(function (d) {
          if (_this.utils.compareDates(date, d)) {
            disabledDates = true;
            return true;
          }
        });
      }
      if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to && date < this.disabledDates.to) {
        disabledDates = true;
      }
      if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from && date > this.disabledDates.from) {
        disabledDates = true;
      }
      if (typeof this.disabledDates.ranges !== 'undefined') {
        this.disabledDates.ranges.forEach(function (range) {
          if (typeof range.from !== 'undefined' && range.from && typeof range.to !== 'undefined' && range.to) {
            if (date < range.to && date > range.from) {
              disabledDates = true;
              return true;
            }
          }
        });
      }
      if (typeof this.disabledDates.days !== 'undefined' && this.disabledDates.days.indexOf(this.utils.getDay(date)) !== -1) {
        disabledDates = true;
      }
      if (typeof this.disabledDates.daysOfMonth !== 'undefined' && this.disabledDates.daysOfMonth.indexOf(this.utils.getDate(date)) !== -1) {
        disabledDates = true;
      }
      if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
        disabledDates = true;
      }
      return disabledDates;
    },
    /**
     * Whether a day is highlighted (only if it is not disabled already except when highlighted.includeDisabled is true)
     * @param {Date}
     * @return {Boolean}
     */isHighlightedDate: function isHighlightedDate(date) {
      var _this2 = this;
      if (!(this.highlighted && this.highlighted.includeDisabled) && this.isDisabledDate(date)) {
        return false;
      }
      var highlighted = false;
      if (typeof this.highlighted === 'undefined') {
        return false;
      }
      if (typeof this.highlighted.dates !== 'undefined') {
        this.highlighted.dates.forEach(function (d) {
          if (_this2.utils.compareDates(date, d)) {
            highlighted = true;
            return true;
          }
        });
      }
      if (this.isDefined(this.highlighted.from) && this.isDefined(this.highlighted.to)) {
        highlighted = date >= this.highlighted.from && date <= this.highlighted.to;
      }
      if (typeof this.highlighted.days !== 'undefined' && this.highlighted.days.indexOf(this.utils.getDay(date)) !== -1) {
        highlighted = true;
      }
      if (typeof this.highlighted.daysOfMonth !== 'undefined' && this.highlighted.daysOfMonth.indexOf(this.utils.getDate(date)) !== -1) {
        highlighted = true;
      }
      if (typeof this.highlighted.customPredictor === 'function' && this.highlighted.customPredictor(date)) {
        highlighted = true;
      }
      return highlighted;
    },
    dayClasses: function dayClasses(day) {
      return {
        'selected': day.isSelected,
        'disabled': day.isDisabled,
        'highlighted': day.isHighlighted,
        'today': day.isToday,
        'weekend': day.isWeekend,
        'sat': day.isSaturday,
        'sun': day.isSunday,
        'highlight-start': day.isHighlightStart,
        'highlight-end': day.isHighlightEnd
      };
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date}
     * @return {Boolean}
     */isHighlightStart: function isHighlightStart(date) {
      return this.isHighlightedDate(date) && this.highlighted.from instanceof Date && this.utils.getFullYear(this.highlighted.from) === this.utils.getFullYear(date) && this.utils.getMonth(this.highlighted.from) === this.utils.getMonth(date) && this.utils.getDate(this.highlighted.from) === this.utils.getDate(date);
    },
    /**
     * Whether a day is highlighted and it is the first date
     * in the highlighted range of dates
     * @param {Date}
     * @return {Boolean}
     */isHighlightEnd: function isHighlightEnd(date) {
      return this.isHighlightedDate(date) && this.highlighted.to instanceof Date && this.utils.getFullYear(this.highlighted.to) === this.utils.getFullYear(date) && this.utils.getMonth(this.highlighted.to) === this.utils.getMonth(date) && this.utils.getDate(this.highlighted.to) === this.utils.getDate(date);
    },
    /**
     * Helper
     * @param  {mixed}  prop
     * @return {Boolean}
     */isDefined: function isDefined(prop) {
      return typeof prop !== 'undefined' && prop;
    }
  }
}
// eslint-disable-next-line
;

var _hoisted_1$1 = ["innerHTML", "onClick"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", {
    "class": normalizeClass([$props.calendarClass, 'vdp-datepicker__calendar']),
    style: normalizeStyle($props.calendarStyle),
    onMousedown: _cache[3] || (_cache[3] = withModifiers(function () {}, ["prevent"]))
  }, [renderSlot(_ctx.$slots, "beforeCalendarHeader"), createElementVNode("header", null, [createElementVNode("span", {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $props.isRtl ? $options.nextMonth() : $options.previousMonth();
    }),
    "class": normalizeClass(["prev", {
      'disabled': $options.isLeftNavDisabled
    }])
  }, "<", 2 /* CLASS */), createElementVNode("span", {
    "class": normalizeClass(["day__month_btn", $props.allowedToShowView('month') ? 'up' : '']),
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.showMonthCalendar && $options.showMonthCalendar.apply($options, arguments);
    })
  }, toDisplayString($options.isYmd ? $options.currYearName : $options.currMonthName) + " " + toDisplayString($options.isYmd ? $options.currMonthName : $options.currYearName), 3 /* TEXT, CLASS */), createElementVNode("span", {
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $props.isRtl ? $options.previousMonth() : $options.nextMonth();
    }),
    "class": normalizeClass(["next", {
      'disabled': $options.isRightNavDisabled
    }])
  }, ">", 2 /* CLASS */)]), createElementVNode("div", {
    "class": normalizeClass($props.isRtl ? 'flex-rtl' : '')
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList($options.daysOfWeek, function (d) {
    return openBlock(), createElementBlock("span", {
      "class": "cell day-header",
      key: d.timestamp
    }, toDisplayString(d), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */)), $options.blankDays > 0 ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($options.blankDays, function (d) {
    return openBlock(), createElementBlock("span", {
      "class": "cell day blank",
      key: d.timestamp
    });
  }), 128 /* KEYED_FRAGMENT */)) : createCommentVNode("v-if", true), createCommentVNode("\n      "), (openBlock(true), createElementBlock(Fragment, null, renderList($options.days, function (day) {
    return openBlock(), createElementBlock("span", {
      "class": normalizeClass(["cell day", $options.dayClasses(day)]),
      key: day.timestamp,
      innerHTML: $props.dayCellContent(day),
      onClick: function onClick($event) {
        return $options.selectDate(day);
      }
    }, null, 10 /* CLASS, PROPS */, _hoisted_1$1);
  }), 128 /* KEYED_FRAGMENT */))], 2 /* CLASS */)], 38 /* CLASS, STYLE, HYDRATE_EVENTS */)), [[vShow, $props.showDayView]]);
}

script$1.render = render$1;
script$1.__file = "src/components/PickerDay.vue";

var script$2 = {
  props: {
    showMonthView: Boolean,
    selectedDate: Date,
    pageDate: Date,
    pageTimestamp: Number,
    disabledDates: Object,
    calendarClass: [String, Object, Array],
    calendarStyle: Object,
    translation: Object,
    isRtl: Boolean,
    allowedToShowView: Function,
    useUtc: Boolean
  },
  data: function data() {
    var constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      utils: constructedDateUtils
    };
  },
  emits: ['selectMonth', 'changedYear', 'showYearCalendar'],
  computed: {
    months: function months() {
      var d = this.pageDate;
      var months = [];
      // set up a new date object to the beginning of the current 'page'
      var dObj = this.useUtc ? new Date(Date.UTC(d.getUTCFullYear(), 0, d.getUTCDate())) : new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());
      for (var i = 0; i < 12; i++) {
        months.push({
          month: this.utils.getMonthName(i, this.translation.months),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedMonth(dObj),
          isDisabled: this.isDisabledMonth(dObj)
        });
        this.utils.setMonth(dObj, this.utils.getMonth(dObj) + 1);
      }
      return months;
    },
    /**
     * Get year name on current page.
     * @return {String}
     */pageYearName: function pageYearName() {
      var yearSuffix = this.translation.yearSuffix;
      return "".concat(this.utils.getFullYear(this.pageDate)).concat(yearSuffix);
    },
    /**
     * Is the left hand navigation disabled
     * @return {Boolean}
     */isLeftNavDisabled: function isLeftNavDisabled() {
      return this.isRtl ? this.isNextYearDisabled(this.pageTimestamp) : this.isPreviousYearDisabled(this.pageTimestamp);
    },
    /**
     * Is the right hand navigation disabled
     * @return {Boolean}
     */isRightNavDisabled: function isRightNavDisabled() {
      return this.isRtl ? this.isPreviousYearDisabled(this.pageTimestamp) : this.isNextYearDisabled(this.pageTimestamp);
    }
  },
  methods: {
    /**
     * Emits a selectMonth event
     * @param {Object} month
     */selectMonth: function selectMonth(month) {
      if (month.isDisabled) {
        return false;
      }
      this.$emit('selectMonth', month);
    },
    /**
     * Changes the year up or down
     * @param {Number} incrementBy
     */changeYear: function changeYear(incrementBy) {
      var date = this.pageDate;
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
      this.$emit('changedYear', date);
    },
    /**
     * Decrements the year
     */previousYear: function previousYear() {
      if (!this.isPreviousYearDisabled()) {
        this.changeYear(-1);
      }
    },
    /**
     * Checks if the previous year is disabled or not
     * @return {Boolean}
     */isPreviousYearDisabled: function isPreviousYearDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false;
      }
      return this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(this.pageDate);
    },
    /**
     * Increments the year
     */nextYear: function nextYear() {
      if (!this.isNextYearDisabled()) {
        this.changeYear(1);
      }
    },
    /**
     * Checks if the next year is disabled or not
     * @return {Boolean}
     */isNextYearDisabled: function isNextYearDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false;
      }
      return this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(this.pageDate);
    },
    /**
     * Emits an event that shows the year calendar
     */showYearCalendar: function showYearCalendar() {
      this.$emit('showYearCalendar');
    },
    /**
     * Whether the selected date is in this month
     * @param {Date}
     * @return {Boolean}
     */isSelectedMonth: function isSelectedMonth(date) {
      return this.selectedDate && this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date) && this.utils.getMonth(this.selectedDate) === this.utils.getMonth(date);
    },
    /**
     * Whether a month is disabled
     * @param {Date}
     * @return {Boolean}
     */isDisabledMonth: function isDisabledMonth(date) {
      var disabledDates = false;
      if (typeof this.disabledDates === 'undefined') {
        return false;
      }
      if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to) {
        if (this.utils.getMonth(date) < this.utils.getMonth(this.disabledDates.to) && this.utils.getFullYear(date) <= this.utils.getFullYear(this.disabledDates.to) || this.utils.getFullYear(date) < this.utils.getFullYear(this.disabledDates.to)) {
          disabledDates = true;
        }
      }
      if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from) {
        if (this.utils.getMonth(date) > this.utils.getMonth(this.disabledDates.from) && this.utils.getFullYear(date) >= this.utils.getFullYear(this.disabledDates.from) || this.utils.getFullYear(date) > this.utils.getFullYear(this.disabledDates.from)) {
          disabledDates = true;
        }
      }
      if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
        disabledDates = true;
      }
      return disabledDates;
    }
  }
}
// eslint-disable-next-line
;

var _hoisted_1$2 = ["onClick"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", {
    "class": normalizeClass([$props.calendarClass, 'vdp-datepicker__calendar']),
    style: normalizeStyle($props.calendarStyle),
    onMousedown: _cache[3] || (_cache[3] = withModifiers(function () {}, ["prevent"]))
  }, [renderSlot(_ctx.$slots, "beforeCalendarHeader"), createElementVNode("header", null, [createElementVNode("span", {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $props.isRtl ? $options.nextYear() : $options.previousYear();
    }),
    "class": normalizeClass(["prev", {
      'disabled': $options.isLeftNavDisabled
    }])
  }, "<", 2 /* CLASS */), createElementVNode("span", {
    "class": normalizeClass(["month__year_btn", $props.allowedToShowView('year') ? 'up' : '']),
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.showYearCalendar && $options.showYearCalendar.apply($options, arguments);
    })
  }, toDisplayString($options.pageYearName), 3 /* TEXT, CLASS */), createElementVNode("span", {
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $props.isRtl ? $options.previousYear() : $options.nextYear();
    }),
    "class": normalizeClass(["next", {
      'disabled': $options.isRightNavDisabled
    }])
  }, ">", 2 /* CLASS */)]), (openBlock(true), createElementBlock(Fragment, null, renderList($options.months, function (month) {
    return openBlock(), createElementBlock("span", {
      "class": normalizeClass(["cell month", {
        'selected': month.isSelected,
        'disabled': month.isDisabled
      }]),
      key: month.timestamp,
      onClick: withModifiers(function ($event) {
        return $options.selectMonth(month);
      }, ["stop"])
    }, toDisplayString(month.month), 11 /* TEXT, CLASS, PROPS */, _hoisted_1$2);
  }), 128 /* KEYED_FRAGMENT */))], 38 /* CLASS, STYLE, HYDRATE_EVENTS */)), [[vShow, $props.showMonthView]]);
}

script$2.render = render$2;
script$2.__file = "src/components/PickerMonth.vue";

var script$3 = {
  props: {
    showYearView: Boolean,
    selectedDate: Date,
    pageDate: Date,
    pageTimestamp: Number,
    disabledDates: Object,
    highlighted: Object,
    calendarClass: [String, Object, Array],
    calendarStyle: Object,
    translation: Object,
    isRtl: Boolean,
    allowedToShowView: Function,
    useUtc: Boolean
  },
  emits: ['selectYear', 'changedDecade'],
  computed: {
    years: function years() {
      var d = this.pageDate;
      var years = [];
      // set up a new date object to the beginning of the current 'page'7
      var dObj = this.useUtc ? new Date(Date.UTC(Math.floor(d.getUTCFullYear() / 10) * 10, d.getUTCMonth(), d.getUTCDate())) : new Date(Math.floor(d.getFullYear() / 10) * 10, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
      for (var i = 0; i < 10; i++) {
        years.push({
          year: this.utils.getFullYear(dObj),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedYear(dObj),
          isDisabled: this.isDisabledYear(dObj)
        });
        this.utils.setFullYear(dObj, this.utils.getFullYear(dObj) + 1);
      }
      return years;
    },
    /**
     * @return {String}
     */getPageDecade: function getPageDecade() {
      var decadeStart = Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10;
      var decadeEnd = decadeStart + 9;
      var yearSuffix = this.translation.yearSuffix;
      return "".concat(decadeStart, " - ").concat(decadeEnd).concat(yearSuffix);
    },
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */isLeftNavDisabled: function isLeftNavDisabled() {
      return this.isRtl ? this.isNextDecadeDisabled(this.pageTimestamp) : this.isPreviousDecadeDisabled(this.pageTimestamp);
    },
    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */isRightNavDisabled: function isRightNavDisabled() {
      return this.isRtl ? this.isPreviousDecadeDisabled(this.pageTimestamp) : this.isNextDecadeDisabled(this.pageTimestamp);
    }
  },
  data: function data() {
    var constructedDateUtils = makeDateUtils(this.useUtc);
    return {
      utils: constructedDateUtils
    };
  },
  methods: {
    selectYear: function selectYear(year) {
      if (year.isDisabled) {
        return false;
      }
      this.$emit('selectYear', year);
    },
    changeYear: function changeYear(incrementBy) {
      var date = this.pageDate;
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
      this.$emit('changedDecade', date);
    },
    previousDecade: function previousDecade() {
      if (this.isPreviousDecadeDisabled()) {
        return false;
      }
      this.changeYear(-10);
    },
    isPreviousDecadeDisabled: function isPreviousDecadeDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false;
      }
      var disabledYear = this.utils.getFullYear(this.disabledDates.to);
      var lastYearInPreviousPage = Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10 - 1;
      return disabledYear > lastYearInPreviousPage;
    },
    nextDecade: function nextDecade() {
      if (this.isNextDecadeDisabled()) {
        return false;
      }
      this.changeYear(10);
    },
    isNextDecadeDisabled: function isNextDecadeDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false;
      }
      var disabledYear = this.utils.getFullYear(this.disabledDates.from);
      var firstYearInNextPage = Math.ceil(this.utils.getFullYear(this.pageDate) / 10) * 10;
      return disabledYear < firstYearInNextPage;
    },
    /**
     * Whether the selected date is in this year
     * @param {Date}
     * @return {Boolean}
     */isSelectedYear: function isSelectedYear(date) {
      return this.selectedDate && this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date);
    },
    /**
     * Whether a year is disabled
     * @param {Date}
     * @return {Boolean}
     */isDisabledYear: function isDisabledYear(date) {
      var disabledDates = false;
      if (typeof this.disabledDates === 'undefined' || !this.disabledDates) {
        return false;
      }
      if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to) {
        if (this.utils.getFullYear(date) < this.utils.getFullYear(this.disabledDates.to)) {
          disabledDates = true;
        }
      }
      if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from) {
        if (this.utils.getFullYear(date) > this.utils.getFullYear(this.disabledDates.from)) {
          disabledDates = true;
        }
      }
      if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
        disabledDates = true;
      }
      return disabledDates;
    }
  }
}
// eslint-disable-next-line
;

var _hoisted_1$3 = ["onClick"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", {
    "class": normalizeClass([$props.calendarClass, 'vdp-datepicker__calendar']),
    style: normalizeStyle($props.calendarStyle),
    onMousedown: _cache[2] || (_cache[2] = withModifiers(function () {}, ["prevent"]))
  }, [renderSlot(_ctx.$slots, "beforeCalendarHeader"), createElementVNode("header", null, [createElementVNode("span", {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $props.isRtl ? $options.nextDecade() : $options.previousDecade();
    }),
    "class": normalizeClass(["prev", {
      'disabled': $options.isLeftNavDisabled
    }])
  }, "<", 2 /* CLASS */), createElementVNode("span", null, toDisplayString($options.getPageDecade), 1 /* TEXT */), createElementVNode("span", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $props.isRtl ? $options.previousDecade() : $options.nextDecade();
    }),
    "class": normalizeClass(["next", {
      'disabled': $options.isRightNavDisabled
    }])
  }, ">", 2 /* CLASS */)]), (openBlock(true), createElementBlock(Fragment, null, renderList($options.years, function (year) {
    return openBlock(), createElementBlock("span", {
      "class": normalizeClass(["cell year", {
        'selected': year.isSelected,
        'disabled': year.isDisabled
      }]),
      key: year.timestamp,
      onClick: withModifiers(function ($event) {
        return $options.selectYear(year);
      }, ["stop"])
    }, toDisplayString(year.year), 11 /* TEXT, CLASS, PROPS */, _hoisted_1$3);
  }), 128 /* KEYED_FRAGMENT */))], 38 /* CLASS, STYLE, HYDRATE_EVENTS */)), [[vShow, $props.showYearView]]);
}

script$3.render = render$3;
script$3.__file = "src/components/PickerYear.vue";

var script$4 = {
  components: {
    DateInput: script,
    PickerDay: script$1,
    PickerMonth: script$2,
    PickerYear: script$3
  },
  props: {
    value: {
      validator: function validator(val) {
        return utils$1.validateDateInput(val);
      }
    },
    name: String,
    refName: String,
    id: String,
    format: {
      type: [String, Function],
      "default": 'dd MMM yyyy'
    },
    language: {
      type: Object,
      "default": function _default() {
        return en;
      }
    },
    openDate: {
      validator: function validator(val) {
        return utils$1.validateDateInput(val);
      }
    },
    dayCellContent: Function,
    fullMonthName: Boolean,
    disabledDates: Object,
    highlighted: Object,
    placeholder: String,
    inline: Boolean,
    calendarClass: [String, Object, Array],
    inputClass: [String, Object, Array],
    wrapperClass: [String, Object, Array],
    mondayFirst: Boolean,
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    bootstrapStyling: Boolean,
    initialView: String,
    disabled: Boolean,
    required: Boolean,
    typeable: Boolean,
    useUtc: Boolean,
    minimumView: {
      type: String,
      "default": 'day'
    },
    maximumView: {
      type: String,
      "default": 'year'
    }
  },
  emits: ['selected', 'input', 'cleared', 'selectedDisabled', 'changedMonth', 'changedYear', 'closed'],
  data: function data() {
    var startDate = this.openDate ? new Date(this.openDate) : new Date();
    var constructedDateUtils = makeDateUtils(this.useUtc);
    var pageTimestamp = constructedDateUtils.setDate(startDate, 1);
    return {
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp: pageTimestamp,
      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      /*
       * Flags to show calendar views
       * {Boolean}
       */
      showDayView: false,
      showMonthView: false,
      showYearView: false,
      /*
       * Positioning
       */
      calendarHeight: 0,
      resetTypedDate: new Date(),
      utils: constructedDateUtils
    };
  },
  watch: {
    value: function value(_value) {
      this.setValue(_value);
    },
    openDate: function openDate() {
      this.setPageDate();
    },
    initialView: function initialView() {
      this.setInitialView();
    }
  },
  computed: {
    computedInitialView: function computedInitialView() {
      if (!this.initialView) {
        return this.minimumView;
      }
      return this.initialView;
    },
    pageDate: function pageDate() {
      return new Date(this.pageTimestamp);
    },
    translation: function translation() {
      return this.language;
    },
    calendarStyle: function calendarStyle() {
      return {
        position: this.isInline ? 'static' : undefined
      };
    },
    isOpen: function isOpen() {
      return this.showDayView || this.showMonthView || this.showYearView;
    },
    isInline: function isInline() {
      return !!this.inline;
    },
    isRtl: function isRtl() {
      return this.translation.rtl === true;
    }
  },
  methods: {
    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */resetDefaultPageDate: function resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate();
        return;
      }
      this.setPageDate(this.selectedDate);
    },
    /**
     * Effectively a toggle to show/hide the calendar
     * @return {mixed}
     */showCalendar: function showCalendar() {
      if (this.disabled || this.isInline) {
        return false;
      }
      if (this.isOpen) {
        return this.close(true);
      }
      this.setInitialView();
    },
    /**
     * Sets the initial picker page view: day, month or year
     */setInitialView: function setInitialView() {
      var initialView = this.computedInitialView;
      if (!this.allowedToShowView(initialView)) {
        throw new Error("initialView '".concat(this.initialView, "' cannot be rendered based on minimum '").concat(this.minimumView, "' and maximum '").concat(this.maximumView, "'"));
      }
      switch (initialView) {
        case 'year':
          this.showYearCalendar();
          break;
        case 'month':
          this.showMonthCalendar();
          break;
        default:
          this.showDayCalendar();
          break;
      }
    },
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */allowedToShowView: function allowedToShowView(view) {
      var views = ['day', 'month', 'year'];
      var minimumViewIndex = views.indexOf(this.minimumView);
      var maximumViewIndex = views.indexOf(this.maximumView);
      var viewIndex = views.indexOf(view);
      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
    },
    /**
     * Show the day picker
     * @return {Boolean}
     */showDayCalendar: function showDayCalendar() {
      if (!this.allowedToShowView('day')) {
        return false;
      }
      this.close();
      this.showDayView = true;
      return true;
    },
    /**
     * Show the month picker
     * @return {Boolean}
     */showMonthCalendar: function showMonthCalendar() {
      if (!this.allowedToShowView('month')) {
        return false;
      }
      this.close();
      this.showMonthView = true;
      return true;
    },
    /**
     * Show the year picker
     * @return {Boolean}
     */showYearCalendar: function showYearCalendar() {
      if (!this.allowedToShowView('year')) {
        return false;
      }
      this.close();
      this.showYearView = true;
      return true;
    },
    /**
     * Set the selected date
     * @param {Number} timestamp
     */setDate: function setDate(timestamp) {
      var date = new Date(timestamp);
      this.selectedDate = date;
      this.setPageDate(date);
      this.$emit('selected', date);
      this.$emit('input', date);
    },
    /**
     * Clear the selected date
     */clearDate: function clearDate() {
      this.selectedDate = null;
      this.setPageDate();
      this.$emit('selected', null);
      this.$emit('input', null);
      this.$emit('cleared');
    },
    /**
     * @param {Object} date
     */selectDate: function selectDate(date) {
      this.setDate(date.timestamp);
      if (!this.isInline) {
        this.close(true);
      }
      this.resetTypedDate = new Date();
    },
    /**
     * @param {Object} date
     */selectDisabledDate: function selectDisabledDate(date) {
      this.$emit('selectedDisabled', date);
    },
    /**
     * @param {Object} month
     */selectMonth: function selectMonth(month) {
      var date = new Date(month.timestamp);
      if (this.allowedToShowView('day')) {
        this.setPageDate(date);
        this.$emit('changedMonth', month);
        this.showDayCalendar();
      } else {
        this.selectDate(month);
      }
    },
    /**
     * @param {Object} year
     */selectYear: function selectYear(year) {
      var date = new Date(year.timestamp);
      if (this.allowedToShowView('month')) {
        this.setPageDate(date);
        this.$emit('changedYear', year);
        this.showMonthCalendar();
      } else {
        this.selectDate(year);
      }
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */setValue: function setValue(date) {
      if (typeof date === 'string' || typeof date === 'number') {
        var parsed = new Date(date);
        date = isNaN(parsed.valueOf()) ? null : parsed;
      }
      if (!date) {
        this.setPageDate();
        this.selectedDate = null;
        return;
      }
      this.selectedDate = date;
      this.setPageDate(date);
    },
    /**
     * Sets the date that the calendar should open on
     */setPageDate: function setPageDate(date) {
      if (!date) {
        if (this.openDate) {
          date = new Date(this.openDate);
        } else {
          date = new Date();
        }
      }
      this.pageTimestamp = this.utils.setDate(new Date(date), 1);
    },
    /**
     * Handles a month change from the day picker
     */handleChangedMonthFromDayPicker: function handleChangedMonthFromDayPicker(date) {
      this.setPageDate(date);
      this.$emit('changedMonth', date);
    },
    /**
     * Set the date from a typedDate event
     */setTypedDate: function setTypedDate(date) {
      this.setDate(date.getTime());
    },
    /**
     * Close all calendar layers
     * @param {Boolean} emitEvent - emit close event
     */close: function close(emitEvent) {
      this.showDayView = this.showMonthView = this.showYearView = false;
      if (!this.isInline) {
        if (emitEvent) {
          this.$emit('closed');
        }
        document.removeEventListener('click', this.clickOutside, false);
      }
    },
    /**
     * Initiate the component
     */init: function init() {
      if (this.value) {
        this.setValue(this.value);
      }
      if (this.isInline) {
        this.setInitialView();
      }
    }
  },
  mounted: function mounted() {
    this.init();
  }
}
// eslint-disable-next-line
;

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_date_input = resolveComponent("date-input");
  var _component_picker_day = resolveComponent("picker-day");
  var _component_picker_month = resolveComponent("picker-month");
  var _component_picker_year = resolveComponent("picker-year");
  return openBlock(), createElementBlock("div", {
    "class": normalizeClass(["vdp-datepicker", [$props.wrapperClass, $options.isRtl ? 'rtl' : '']])
  }, [createVNode(_component_date_input, {
    selectedDate: $data.selectedDate,
    resetTypedDate: $data.resetTypedDate,
    format: $props.format,
    translation: $options.translation,
    inline: $props.inline,
    id: $props.id,
    name: $props.name,
    refName: $props.refName,
    openDate: $props.openDate,
    placeholder: $props.placeholder,
    inputClass: $props.inputClass,
    typeable: $props.typeable,
    clearButton: $props.clearButton,
    clearButtonIcon: $props.clearButtonIcon,
    calendarButton: $props.calendarButton,
    calendarButtonIcon: $props.calendarButtonIcon,
    calendarButtonIconContent: $props.calendarButtonIconContent,
    disabled: $props.disabled,
    required: $props.required,
    bootstrapStyling: $props.bootstrapStyling,
    "use-utc": $props.useUtc,
    onShowCalendar: $options.showCalendar,
    onCloseCalendar: $options.close,
    onTypedDate: $options.setTypedDate,
    onClearDate: $options.clearDate
  }, {
    "default": withCtx(function () {
      return [renderSlot(_ctx.$slots, "afterDateInput", {
        slot: "afterDateInput"
      })];
    }),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["selectedDate", "resetTypedDate", "format", "translation", "inline", "id", "name", "refName", "openDate", "placeholder", "inputClass", "typeable", "clearButton", "clearButtonIcon", "calendarButton", "calendarButtonIcon", "calendarButtonIconContent", "disabled", "required", "bootstrapStyling", "use-utc", "onShowCalendar", "onCloseCalendar", "onTypedDate", "onClearDate"]), createCommentVNode(" Day View "), $options.allowedToShowView('day') ? (openBlock(), createBlock(_component_picker_day, {
    key: 0,
    pageDate: $options.pageDate,
    selectedDate: $data.selectedDate,
    showDayView: $data.showDayView,
    fullMonthName: $props.fullMonthName,
    allowedToShowView: $options.allowedToShowView,
    disabledDates: $props.disabledDates,
    highlighted: $props.highlighted,
    calendarClass: $props.calendarClass,
    calendarStyle: $options.calendarStyle,
    translation: $options.translation,
    pageTimestamp: $data.pageTimestamp,
    isRtl: $options.isRtl,
    mondayFirst: $props.mondayFirst,
    dayCellContent: $props.dayCellContent,
    "use-utc": $props.useUtc,
    onChangedMonth: $options.handleChangedMonthFromDayPicker,
    onSelectDate: $options.selectDate,
    onShowMonthCalendar: $options.showMonthCalendar,
    onSelectedDisabled: $options.selectDisabledDate
  }, {
    "default": withCtx(function () {
      return [renderSlot(_ctx.$slots, "beforeCalendarHeader", {
        slot: "beforeCalendarHeader"
      })];
    }),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["pageDate", "selectedDate", "showDayView", "fullMonthName", "allowedToShowView", "disabledDates", "highlighted", "calendarClass", "calendarStyle", "translation", "pageTimestamp", "isRtl", "mondayFirst", "dayCellContent", "use-utc", "onChangedMonth", "onSelectDate", "onShowMonthCalendar", "onSelectedDisabled"])) : createCommentVNode("v-if", true), createCommentVNode(" Month View "), $options.allowedToShowView('month') ? (openBlock(), createBlock(_component_picker_month, {
    key: 1,
    pageDate: $options.pageDate,
    selectedDate: $data.selectedDate,
    showMonthView: $data.showMonthView,
    allowedToShowView: $options.allowedToShowView,
    disabledDates: $props.disabledDates,
    calendarClass: $props.calendarClass,
    calendarStyle: $options.calendarStyle,
    translation: $options.translation,
    isRtl: $options.isRtl,
    "use-utc": $props.useUtc,
    onSelectMonth: $options.selectMonth,
    onShowYearCalendar: $options.showYearCalendar,
    onChangedYear: $options.setPageDate
  }, {
    "default": withCtx(function () {
      return [renderSlot(_ctx.$slots, "beforeCalendarHeader", {
        slot: "beforeCalendarHeader"
      })];
    }),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["pageDate", "selectedDate", "showMonthView", "allowedToShowView", "disabledDates", "calendarClass", "calendarStyle", "translation", "isRtl", "use-utc", "onSelectMonth", "onShowYearCalendar", "onChangedYear"])) : createCommentVNode("v-if", true), createCommentVNode(" Year View "), $options.allowedToShowView('year') ? (openBlock(), createBlock(_component_picker_year, {
    key: 2,
    pageDate: $options.pageDate,
    selectedDate: $data.selectedDate,
    showYearView: $data.showYearView,
    allowedToShowView: $options.allowedToShowView,
    disabledDates: $props.disabledDates,
    calendarClass: $props.calendarClass,
    calendarStyle: $options.calendarStyle,
    translation: $options.translation,
    isRtl: $options.isRtl,
    "use-utc": $props.useUtc,
    onSelectYear: $options.selectYear,
    onChangedDecade: $options.setPageDate
  }, {
    "default": withCtx(function () {
      return [renderSlot(_ctx.$slots, "beforeCalendarHeader", {
        slot: "beforeCalendarHeader"
      })];
    }),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["pageDate", "selectedDate", "showYearView", "allowedToShowView", "disabledDates", "calendarClass", "calendarStyle", "translation", "isRtl", "use-utc", "onSelectYear", "onChangedDecade"])) : createCommentVNode("v-if", true)], 2 /* CLASS */);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".rtl {\n  direction: rtl;\n}\n.vdp-datepicker {\n  position: relative;\n  text-align: left;\n}\n.vdp-datepicker * {\n  box-sizing: border-box;\n}\n.vdp-datepicker__calendar {\n  position: absolute;\n  z-index: 100;\n  background: #fff;\n  width: 300px;\n  border: 1px solid #ccc;\n}\n.vdp-datepicker__calendar header {\n  display: block;\n  line-height: 40px;\n}\n.vdp-datepicker__calendar header span {\n  display: inline-block;\n  text-align: center;\n  width: 71.42857142857143%;\n  float: left;\n}\n.vdp-datepicker__calendar header .prev,\n.vdp-datepicker__calendar header .next {\n  width: 14.285714285714286%;\n  float: left;\n  text-indent: -10000px;\n  position: relative;\n}\n.vdp-datepicker__calendar header .prev:after,\n.vdp-datepicker__calendar header .next:after {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n  border: 6px solid transparent;\n}\n.vdp-datepicker__calendar header .prev:after {\n  border-right: 10px solid #000;\n  margin-left: -5px;\n}\n.vdp-datepicker__calendar header .prev.disabled:after {\n  border-right: 10px solid #ddd;\n}\n.vdp-datepicker__calendar header .next:after {\n  border-left: 10px solid #000;\n  margin-left: 5px;\n}\n.vdp-datepicker__calendar header .next.disabled:after {\n  border-left: 10px solid #ddd;\n}\n.vdp-datepicker__calendar header .prev:not(.disabled),\n.vdp-datepicker__calendar header .next:not(.disabled),\n.vdp-datepicker__calendar header .up:not(.disabled) {\n  cursor: pointer;\n}\n.vdp-datepicker__calendar header .prev:not(.disabled):hover,\n.vdp-datepicker__calendar header .next:not(.disabled):hover,\n.vdp-datepicker__calendar header .up:not(.disabled):hover {\n  background: #eee;\n}\n.vdp-datepicker__calendar .disabled {\n  color: #ddd;\n  cursor: default;\n}\n.vdp-datepicker__calendar .flex-rtl {\n  display: flex;\n  width: inherit;\n  flex-wrap: wrap;\n}\n.vdp-datepicker__calendar .cell {\n  display: inline-block;\n  padding: 0 5px;\n  width: 14.285714285714286%;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n  vertical-align: middle;\n  border: 1px solid transparent;\n}\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day,\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month,\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year {\n  cursor: pointer;\n}\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {\n  border: 1px solid #4bd;\n}\n.vdp-datepicker__calendar .cell.selected {\n  background: #4bd;\n}\n.vdp-datepicker__calendar .cell.selected:hover {\n  background: #4bd;\n}\n.vdp-datepicker__calendar .cell.selected.highlighted {\n  background: #4bd;\n}\n.vdp-datepicker__calendar .cell.highlighted {\n  background: #cae5ed;\n}\n.vdp-datepicker__calendar .cell.highlighted.disabled {\n  color: #a3a3a3;\n}\n.vdp-datepicker__calendar .cell.grey {\n  color: #888;\n}\n.vdp-datepicker__calendar .cell.grey:hover {\n  background: inherit;\n}\n.vdp-datepicker__calendar .cell.day-header {\n  font-size: 75%;\n  white-space: nowrap;\n  cursor: inherit;\n}\n.vdp-datepicker__calendar .cell.day-header:hover {\n  background: inherit;\n}\n.vdp-datepicker__calendar .month,\n.vdp-datepicker__calendar .year {\n  width: 33.333%;\n}\n.vdp-datepicker__clear-button,\n.vdp-datepicker__calendar-button {\n  cursor: pointer;\n  font-style: normal;\n}\n.vdp-datepicker__clear-button.disabled,\n.vdp-datepicker__calendar-button.disabled {\n  color: #999;\n  cursor: default;\n}\n";
styleInject(css);

script$4.render = render$4;
script$4.__file = "src/components/Datepicker.vue";

export default script$4;
