function def(name, value) {
    if (def.__value__[name]) {
        if (value != undefined) def[name] = value;
        return def.__value__[name];
    }
    def.__value__[name] = {
        name,
        val: value,
        bindModel: function (obj, objName) {
            if (
                obj.constructor.name.match(/HTML(Input|TextArea)Element/)
            ) obj.addEventListener("input", function () {
                def[name] = this.value;
            });
            else {
                var descriptor = Object.getOwnPropertyDescriptor(obj, objName),
                    setter = descriptor.set,
                    getter = descriptor.get;
                if (!descriptor.configurable) return;
                delete obj[objName];
                Object.defineProperty(obj, objName, {
                    set: function (value) {
                        if (obj[objName] == value) return;
                        setter(value);
                        def[name] = value;
                    },
                    get: getter
                })
            }
        },
        bindValue: function (obj, objName) {
            def.__bind__[name].push({
                obj,
                name: objName
            });
            obj[objName] = def[name];
            return def.__value__[name];
        }
    };
    def.__value__[name].bind = function () {
        def.__value__[name].bindValue.apply(def.__value__[name], arguments);
        def.__value__[name].bindModel.apply(def.__value__[name], arguments);
    };
    def.__when__[name] = [];
    def.__bind__[name] = [];
    Object.defineProperty(def, name, {
        get: () => def.__value__[name].val,
        set: function (value) {
            if (def.__value__[name].val == value) return;
            def.__value__[name].val = value;
            for (var cond of def.__when__[name])
                if (def.__cond__(cond.logic))
                    cond.exec();
            for (var bind of def.__bind__[name])
                bind.obj[bind.name] = value;
            return value;
        },
        configurable: true
    });
    return def.__value__[name];
}
def.__cond__ = function (logic) {
    var exec = "";
    for (var i = 0; i < logic.length; i++) {
        exec += i % 2 == +(typeof logic[0] == "string") ? `(${
            def.__includes__(logic[i])
                ? `def["${logic[i].name}"]`
                : typeof logic[i] == "string"
                    ? JSON.stringify(logic[i])
                    : logic[i].toString()
            })` : logic[i];
    }
    return eval(exec);
};
def.__includes__ = function (defValue) {
    if (!defValue || typeof defValue != "object") return false;
    if (def.__value__[defValue.name] == defValue) return true;
    return false;
};
def.when = function () {
    var whenNames = [],
        defValues = arguments;
    return {
        then: function (exec) {
            for (var i = 0; i < defValues.length; i++)
                if (
                    def.__includes__(defValues[i]) &&
                    !whenNames.includes(defValues[i].name)
                ) whenNames.push(defValues[i].name);
            for (var i of whenNames)
                def.__when__[i].push({
                    logic: defValues,
                    exec: exec
                });
            if (def.__cond__(defValues)) exec();
        }
    }
};
for (name of ["value", "when", "bind"])
    def[`__${name}__`] = {};