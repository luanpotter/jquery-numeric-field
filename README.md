numeric-field
=====================

[![Build Status](https://img.shields.io/travis/luanpotter/jquery-numeric-field.svg)](https://travis-ci.org/luanpotter/jquery-numeric-field)
[![Code Climate](https://img.shields.io/codeclimate/github/luanpotter/jquery-numeric-field.svg)](https://codeclimate.com/github/luanpotter/jquery-numeric-field)
[![BowerVersion](https://img.shields.io/bower/v/luanpotter/jquery-numeric-field.svg)](http://bower.io/#getting-started)

Simple numeric fields with jquery.

Install
======

Install with bower:

    bower install -S numeric-field

Requires jquery and [cursor-manager](https://github.com/luanpotter/jquery-cursor-manager).
Fell free to build yourself as well.

Usage
=====

Just call `numericField()` on your elements!

    $('myPrettyInput').numericField();

You can also provide a map of options:

    integer: true, //If it has to be an integer or can be a rational
    min: null, //The minimum value, inclusive
    max: null, //The maxmum value, inclusive
    decimal: '.', //The decimal separator
    auto_update: false //If the field should auto update to fit min and max on blur

E.g.:

    $('.money').numericField({
        integer: false,
        min: 100.0,
        auto_update: true
    });

You can fetch the value of the field as a number with `numericValue()`:

    var number = $('input[type="text"]').numericValue(); // 10
    console.log(number + 2);
    // 12, instead of 102

And that is pretty much it. See more details on the source code, it's very, very tiny and instructive.

Build
======

Contributions are more than welcome!

    # clone
    git clone git@github.com:luanpotter/jquery-numeric-field.git
    cd jquery-numeric-field

    npm install # install grunt and dependencies
    grunt # run tests and builds dist

