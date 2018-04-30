(function (global) {
    function df(name, value) {
        if (df.__value__[name]) {
            if (value != undefined) df[name] = value;
            return df.__value__[name];
        }
        df.__value__[name] = {
            name,
            val: value != undefined ? value : df[name],
            bindModel: function (obj) {
                var objName = arguments[arguments.length - 1];
                for (var i = 1; i < arguments.length - 1; i++)
                    obj = obj[arguments[i]];
                if (obj.constructor.name.match(/HTML.+Element/)) {
                    if (
                        obj.constructor.name.match(/HTML(Input|TextArea)Element/)
                    ) obj.addEventListener("input", function () {
                        df[name] = this.value;
                    });
                } else {
                    var descriptor = Object.getOwnPropertyDescriptor(obj, objName),
                        setter = descriptor.set,
                        getter = descriptor.get;
                    if (!descriptor.configurable) return;
                    delete obj[objName];
                    Object.defineProperty(obj, objName, {
                        set: function (value) {
                            if (obj[objName] == value) return;
                            if (setter)
                                setter(value);
                            df[name] = value;
                        },
                        get: getter
                    })
                }
                return df.__value__[name];
            },
            bindValue: function (obj) {
                var objName = arguments[arguments.length - 1];
                for (var i = 1; i < arguments.length - 1; i++)
                    obj = obj[arguments[i]];
                df.__bind__[name].push({
                    obj,
                    name: objName
                });
                obj[objName] = df[name];
                return df.__value__[name];
            }
        };
        df.__value__[name].bindValues = function (obj) {
            for (obj of obj)
                df.__value__[name].bindValue.apply(undefined, arguments);
        };
        df.__value__[name].bindModels = function (obj) {
            for (obj of obj)
                df.__value__[name].bindModel.apply(undefined, arguments);
        };
        df.__when__[name] = [];
        df.__bind__[name] = [];
        df.__change__[name] = [];
        Object.defineProperty(df, name, {
            get: () => df.__value__[name].val,
            set: function (value) {
                if (df.__value__[name].val == value) return;
                df.__value__[name].val = value;
                for (var cond of df.__when__[name])
                    if (df.__cond__(cond.logic))
                        cond.exec(name);
                    else
                        cond.else(name);
                for (var bind of df.__bind__[name])
                    bind.obj[bind.name] = value;
                for (var exec of df.__change__[name])
                    exec(name);
                return value;
            },
            configurable: true
        });
        return df.__value__[name];
    }
    df.__cond__ = function (logic) {
        var exec = "";
        for (var i = 0; i < logic.length; i++) {
            exec += i % 2 == +(typeof logic[0] == "string") ? `(${
            df.__includes__(logic[i])
                ? `df["${logic[i].name}"]`
                : typeof logic[i] == "string"
                    ? JSON.stringify(logic[i])
                    : logic[i].toString()
            })` : logic[i];
        }
        return eval(exec);
    };
    df.__includes__ = function (dfValue) {
        if (!dfValue || typeof dfValue != "object") return false;
        if (df.__value__[dfValue.name] == dfValue) return true;
        return false;
    };
    df.when = function () {
        var whenNames = [],
            dfValues = arguments;
        for (var i = 0; i < dfValues.length; i++)
            if (
                df.__includes__(dfValues[i]) &&
                !whenNames.includes(dfValues[i].name)
            ) whenNames.push(dfValues[i].name);
        return {
            then: function (exec) {
                for (var i of whenNames)
                    df.__when__[i].push({
                        logic: dfValues,
                        exec: exec
                    });
                if (df.__cond__(dfValues)) exec();
                return {
                    else: function (exec) {
                        for (var i of whenNames)
                            df.__when__[i][
                                df.__when__[i].length - 1
                            ].else = exec;
                        if (!df.__cond__(dfValues)) exec();
                    }
                }
            },
            isChange: function (exec) {
                for (var i of whenNames)
                    df.__change__[i].push(exec);
                exec();
            }
        }
    };
    df.bind = function (obj) {
        var objName = arguments[arguments.length - 1];
        for (var i = 1; i < arguments.length - 1; i++)
            obj = obj[arguments[i]];
        return {
            when: function () {
                var whenNames = [],
                    dfValues = arguments;
                for (var i = 0; i < dfValues.length; i++)
                    if (
                        df.__includes__(dfValues[i]) &&
                        !whenNames.includes(dfValues[i].name)
                    ) whenNames.push(dfValues[i].name);
                return {
                    then: function (value) {
                        for (var i of whenNames)
                            df.__when__[i].push({
                                logic: dfValues,
                                exec: () => obj[objName] = value
                            });
                        if (df.__cond__(dfValues))
                            obj[objName] = value;
                        return {
                            else: function (value) {
                                for (var i of whenNames)
                                    df.__when__[i][
                                        df.__when__[i].length - 1
                                    ].else = () => obj[objName] = value;
                                if (!df.__cond__(dfValues))
                                    obj[objName] = value;
                            }
                        }
                    }
                }
            }
        }
    };
    df.binds = function (obj) {
        var objName = arguments[arguments.length - 1],
            objs = [];
        for (var obj of obj) {
            for (var i = 1; i < arguments.length - 1; i++)
                obj = obj[arguments[i]];
            objs.push(obj);
        }
        return {
            when: function () {
                var whenNames = [],
                    dfValues = arguments;
                for (var i = 0; i < dfValues.length; i++)
                    if (
                        df.__includes__(dfValues[i]) &&
                        !whenNames.includes(dfValues[i].name)
                    ) whenNames.push(dfValues[i].name);
                return {
                    then: function (value) {
                        for (var i of whenNames)
                            df.__when__[i].push({
                                logic: dfValues,
                                exec: () => objs.forEach(obj => obj[objName] = value)
                            });
                        if (df.__cond__(dfValues))
                            objs.forEach(obj => obj[objName] = value);
                        return {
                            else: function (value) {
                                for (var i of whenNames)
                                    df.__when__[i][
                                        df.__when__[i].length - 1
                                    ].else = () => objs.forEach(
                                        obj => obj[objName] = value
                                    );
                                if (!df.__cond__(dfValues))
                                    objs.forEach(obj => obj[objName] = value);
                            }
                        }
                    }
                }
            }
        }
    };
    for (name of ["value", "when", "bind", "change"])
        df[`__${name}__`] = {};
    Object.defineProperty(global, "df", {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: df
    });
})(this);
window.addEventListener("load", function () {
    var dfValueDom = document.querySelectorAll("[df-value]"),
        dfModelDom = document.querySelectorAll("[df-model]");
    for (var dfValueDom of dfValueDom) {
        var values = dfValueDom.getAttribute("df-value").split("#");
        for (var i = 1; i < values.length; i++) {
            var values = values[i].split("="),
                name = values[0];
            for (var j = 1; j < values.length; j++) {
                var multiValue = values[j].split(".");
                if (multiValue[0] == "this" || multiValue[0] == "")
                    multiValue.shift();
                multiValue.unshift(dfValueDom);
                df(name).bindValue.apply({}, multiValue);
            }
        }
    }
    for (var dfModelDom of dfModelDom) {
        var values = dfModelDom.getAttribute("df-model").split("#");
        for (var i = 1; i < values.length; i++) {
            var values = values[i].split("="),
                name = values[0];
            for (var j = 1; j < values.length; j++) {
                var multiValue = values[j].split(".");
                if (multiValue[0] == "this" || multiValue[0] == "")
                    multiValue.shift();
                multiValue.unshift(dfModelDom);
                df(name).bindModel.apply({}, multiValue);
            }
        }
    }
});