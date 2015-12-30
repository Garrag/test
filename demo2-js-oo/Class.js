/**
 * Created by admin on 2015/10/17.
 */
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    this.Class = function(){};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]) : prop[name];
        }
        function Class() {
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();

function testObject(name){
    this.name = name;
}

//testObject.prototype = {
//   name:'aaa'
//};

var aaa = {
   //name:"aaa"
};

var bbb = new testObject('bbb');

console.log(testObject.prototype); //function testObject(name){this.name = name;}
console.log(aaa); //Object {name: "aaa"}
console.log(bbb); //testObject {name: "bbb"}
console.log('--------------------------------------------------------------------------');

function Person( name ) {
    this.name = name;
}
var p = new Person();
// 对象的隐式引用指向了构造器的 prototype 属性，所以此处打印 true
console.log( p.__proto__ === Person.prototype );

// 原型本身是一个 Object 对象，所以他的隐式引用指向了
// Object 构造器的 prototype 属性 , 故而打印 true
console.log( Person.prototype.__proto__ === Object.prototype );

// 构造器 Person 本身是一个函数对象，所以此处打印 true
console.log( Person.__proto__ === Function.prototype );

