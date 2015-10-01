'use strict';

(function(global, code){
  if(typeof exports === 'object'){
    module.exports = code();
  } else{
    global.BetterArray = code();
  }}(this, function(){

    var BetterArray = function BetterArray(array){
      if(!Array.isArray(array)){
        throw new Error("BetterArrays can only be initialized with Arrays");
      }
      var newBetterArray = Object.create(BetterArrayPrototype);
      newBetterArray.native = array;
      return newBetterArray;
    }

    var BetterArrayPrototype = {
      and: function and(other){
        return this.native.filter(function(e){
          return other.indexOf(e) >= 0;
        });
      },
      at: function at(index){
        if(arguments.length === 1){
          return this.native[index];
        } else {
          return Array.prototype.map.call(arguments, function(i){
            return this.native[i];
          }.bind(this));
        }
      },
      chain: function chain(method){
        return BetterArray(this[method].apply(this, Array.prototype.slice.call(arguments, 1)));
      },
      clone: function clone(){
        return this.native.slice();
      },
      compact: function compact(){
        return this.native.filter(function(e){
          return e != null;
        });
      },
      count: function count(object){
        if(arguments.length === 0){
          return this.native.length;
        } else {
          return this.native.filter(function(e){ return e === object }).length;
        }
      },
      drop: function drop(number){
        return this.native.slice(number, this.native.length);
      },
      each: function each(){
        return this.native.forEach.apply(this.native, arguments);
      },
      filter: function filter(){ 
        return this.native.filter.apply(this.native, arguments);
      },
      first: function first(number){
        if(arguments.length === 0){
          return this.native[0];
        } else {
          return this.native.slice(0, number);
        }
      },
      grep: function grep(matcher){
        return this.native.filter(function(e){
          return matcher.test(e)
        });
      },
      includes: function includes(element){
        return this.native.indexOf(element) >= 0;
      },
      isEmpty: function isEmpty(){
        return this.native.length === 0;
      },
      last: function last(number){
        if(arguments.length === 0){
          return this.native[this.native.length - 1];
        } else {
          return this.native.slice(-number, this.native.length);
        }
      },
      map: function map(){ 
        return this.native.map.apply(this.native, arguments);
      },
      minus: function minus(other){
        return BetterArray(
          this.native.filter(function(e){
            return other.indexOf(e) < 0;
          })
        ).unique();
      },
      or: function or(other){
        return BetterArray(this.native.concat(other)).unique();
      },
      plus: function plus(other){
        return this.native.concat(other);
      },
      size: function size(){
        return this.native.length;
      },
      sliceLength: function sliceLength(from, length){
        return this.native.slice(from, from + length);
      },
      take: function take(number){
        return this.native.slice(0, number);
      },
      times: function times(integer){
        var res = []
        for(var i = 0; i < integer; i++){
          res = res.concat(this.native);
        }
        return res;
      },
      toArray: function toArray(){
        return this.native;
      },
      unique: function unique(){
        return this.native.filter(function(e){
          return e in this ? false : this[e] = true;
        }, {});
      },
      zip: function zip(){
        var others = Array.prototype.slice.call(arguments);
        return this.native.map(function(e, i) {
          var row = others.map(function(f){ return f[i]; });
          row.unshift(e);
          return row;
        });
      }
    }

    return BetterArray;
  })
);
