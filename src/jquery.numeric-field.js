/**
 * Numeric Field - Luan Nico
 * github.com/luanpotter/jquery
 * Version: 0.2
 * Dependencies: cursor_position.js
 */

(function ($) {
    "use strict";

    var replaceAll = function(src, find, replacement) {
        var cleanForRegex = function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        };
        return src.replace(new RegExp(cleanForRegex(find), 'g'), replacement);
    };

    $.fn.numericValue = function () {
        var settings = this.data('__jquery.plugin.numericField');
        if (typeof settings === 'undefined') {
            throw new Error('numericValue function called on non-initialized object. You must first call numericField to set it up.');
        }
        if (settings.integer) {
            return parseInt(this.val());
        }
        return parseFloat(replaceAll(this.val(), settings.decimal, '.'));
    };

    $.fn.numericField = function (options) {
        var settings = $.extend({
            integer: true, //If it has to be an integer or can be a rational
            min: null, //The minimum value, inclusive
            max: null, //The maxmum value, inclusive
            decimal: '.', //The decimal separator
            auto_update: false //If the field should auto update to fit min and max on blur
        }, options);

        var NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        if (settings.decimal.length !== 1) {
            throw new Error('The decimal separator must have a single character.');
        }
        if (!isNaN(settings.decimal)) {
            throw new Error('The decimal separator cannot be a digit (0-9).');
        }

        if (settings.auto_update && (settings.min !== null || settings.max !== null)) {
            this.bind('blur', function () {
                var num = parseFloat($(this).val());
                if (settings.min !== null && num < settings.min) {
                    $(this).val(settings.min);
                } else if (settings.max !== null && num > settings.max) {
                    $(this).val(settings.max);
                }
            });
        }

        this.data('__jquery.plugin.numericField', settings);
        this.bind('input keyup keydown', function () {
            //strip invalid characters
            var i = 0;

            //check for negative sign
            if ($(this).val()[0] === '-') {
                if (settings.min !== null && settings.min >= 0) {
                    $(this).stripOut(0);
                } else {
                    i++;
                }
            }

            var dotAlready = false;
            for (; i < $(this).val().length; i++) {
                if ($(this).val()[i] in NUMBERS) {
                    continue;
                }
                if ($(this).val()[i] === settings.decimal) {
                    if (settings.integer || dotAlready) {
                        $(this).stripOut(i);
                        i--;
                    } else {
                        dotAlready = true;
                    }
                } else {
                    $(this).stripOut(i); //anything else
                    i--;
                }
            }
        });

        return this;
    };
}(jQuery));
