function dfn(name, value) {
    if (dfn.__value__[name]) {
        if (value != undefined) dfn[name] = value;
        return dfn.__value__[name];
    }
    dfn.__value__[name] = {
        name,
        val: value,
        bindModel: function (obj, objName) {
            if (obj.constructor.name.match(/HTML.+Element/)) {
                if (
                    obj.constructor.name.match(/HTML(Input|TextArea)Element/)
                ) obj.addEventListener("input", function () {
                    dfn[name] = this.value;
                });
            } else {
                var descriptor = Object.getOwnPropertyDescriptor(obj, objName),
                    setter = descriptor.set,
                    getter = descriptor.get;
                if (!descriptor.configurable) return;
                delete obj[objName];
                Object.dfnineProperty(obj, objName, {
                    set: function (value) {
                        if (obj[objName] == value) return;
                        if (setter)
                            setter(value);
                        dfn[name] = value;
                    },
                    get: getter
                })
            }
            return dfn.__value__[name];
        },
        bindValue: function (obj, objName) {
            dfn.__bind__[name].push({
                obj,
                name: objName
            });
            obj[objName] = dfn[name];
            return dfn.__value__[name];
        }
    };
    dfn.__value__[name].bindValues = function (obj, objName) {
        for (obj of obj)
            dfn.__value__[name].bindValue(obj, objName);
    };
    dfn.__value__[name].bindModels = function (obj, objName) {
        for (obj of obj)
            dfn.__value__[name].bindModel(obj, objName);
    };
    dfn.__value__[name].bind = dfn.__value__[name].bindValue;
    dfn.__value__[name].binds = dfn.__value__[name].bindValues;
    dfn.__when__[name] = [];
    dfn.__bind__[name] = [];
    Object.defineProperty(dfn, name, {
        get: () => dfn.__value__[name].val,
        set: function (value) {
            if (dfn.__value__[name].val == value) return;
            dfn.__value__[name].val = value;
            for (var cond of dfn.__when__[name])
                if (dfn.__cond__(cond.logic))
                    cond.exec();
            for (var bind of dfn.__bind__[name])
                bind.obj[bind.name] = value;
            return value;
        },
        configurable: true
    });
    return dfn.__value__[name];
}
dfn.__cond__ = function (logic) {
    var exec = "";
    for (var i = 0; i < logic.length; i++) {
        exec += i % 2 == +(typeof logic[0] == "string") ? `(${
            dfn.__includes__(logic[i])
                ? `dfn["${logic[i].name}"]`
                : typeof logic[i] == "string"
                    ? JSON.stringify(logic[i])
                    : logic[i].toString()
            })` : logic[i];
    }
    return eval(exec);
};
dfn.__includes__ = function (dfnValue) {
    if (!dfnValue || typeof dfnValue != "object") return false;
    if (dfn.__value__[dfnValue.name] == dfnValue) return true;
    return false;
};
dfn.when = function () {
    var whenNames = [],
        dfnValues = arguments;
    return {
        then: function (exec) {
            for (var i = 0; i < dfnValues.length; i++)
                if (
                    dfn.__includes__(dfnValues[i]) &&
                    !whenNames.includes(dfnValues[i].name)
                ) whenNames.push(dfnValues[i].name);
            for (var i of whenNames)
                dfn.__when__[i].push({
                    logic: dfnValues,
                    exec: exec
                });
            if (dfn.__cond__(dfnValues)) exec();
        }
    }
};
for (name of ["value", "when", "bind"])
    dfn[`__${name}__`] = {};