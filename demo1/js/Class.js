/**
 * Created by admin on 2015/10/17.
 */
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    this.Class = function(){};//����class(ȫ�ֱ���)
    Class.extend = function(prop) {
        var _super = this.prototype; //ת�Ʊ����ԭ��
        initializing = true;
        var prototype = new this(); //��������������һ������,��Ϊ�µ�ԭ��
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
        function Class() {  //����һ����ʱ�Ĺ�����
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee; //����Ҳ���и�extend����
        return Class;//�µĽ����ӹ��Ĺ�����
    };
})();
