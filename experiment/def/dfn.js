(function (global) {
    function DF(id) {
        if (DF.__df__[id])
            return DF.__df__[id];
        function df(name, value) {
            if (value != undefined) df[name] = value;
            if (df.__value__[name])
                return df.__value__[name];
            df.__value__[name] = {
                name: name,
                val: value || df[name],
                unbind: function (obj) {
                    var propertyName = arguments[arguments.length - 1];
                    for (var i = 1; i < arguments.length - 1; i++)
                        obj = obj[arguments[i]];
                    if (arguments.length == 1 || propertyName == undefined)
                        return function () {
                            var propertyNames = arguments,
                                propertyName = arguments[arguments.length - 1];
                            Array.prototype.forEach.call(obj, function (obj) {
                                for (var i = 0; i < propertyNames.length - 1; i++)
                                    obj = obj[propertyNames[i]];
                                this.unbind.call(this, obj, propertyName);
                            }.bind(this));
                            return this;
                        }.bind(this)
                    else if (typeof propertyName == "object") {
                        Array.prototype.forEach.call(arguments, function (param) {
                            this.unbind.apply(this, param);
                        }.bind(this));
                        return this;
                    }
                    this.bindObjects = this.bindObjects.filter(function (bindObject) {
                        if (bindObject.obj != obj) return true;
                        if (propertyName == undefined || bindObject.name == propertyName) return false;
                        return true;
                    });
                },
                bind: function (obj) {
                    var propertyName = arguments[arguments.length - 1];
                    for (var i = 1; i < arguments.length - 1; i++)
                        obj = obj[arguments[i]];
                    if (arguments.length == 1 || propertyName == undefined)
                        return function () {
                            var propertyNames = arguments,
                                propertyName = arguments[arguments.length - 1];
                            Array.prototype.forEach.call(obj, function (obj) {
                                for (var i = 0; i < propertyNames.length - 1; i++)
                                    obj = obj[propertyNames[i]];
                                this.bind.call(this, obj, propertyName);
                            }.bind(this));
                            return this;
                        }.bind(this)
                    else if (typeof propertyName == "object") {
                        Array.prototype.forEach.call(arguments, function (param) {
                            this.bind.apply(this, param);
                        }.bind(this));
                        return this;
                    }
                    df.__value__[name].bindObjects.push({
                        obj: obj,
                        name: propertyName
                    });
                    obj[propertyName] = df.__value__[name].val;
                    return this;
                },
                when: function (obj, eventName) {
                    if (typeof arguments[arguments.length - 1] == "object") {
                        Array.prototype.forEach.call(arguments, function (param) {
                            this.bind.apply(this, param);
                        }.bind(this));
                        return this;
                    }
                    var propertyName = arguments[arguments.length - 1];
                    for (var i = 2; i < arguments.length - 1; i++)
                        obj = obj[arguments[i]];
                    obj.addEventListener(eventName, function () {
                        df[name] = obj[propertyName];
                    });
                    return this;
                },
                sync: function (obj, eventName) {
                    this.when.apply(this, arguments);
                    var bindArg = arguments;
                    Array.prototype.splice.call(bindArg, 1, 1);
                    this.bind.apply(this, bindArg);
                    return this;
                },
                bindObjects: [],
                whenConditions: []
            };
            Object.defineProperty(df, name, {
                get: function () {
                    return df.__value__[name].val;
                },
                set: function (value) {
                    if (df.__value__[name].val == value) return;
                    df.__value__[name].val = value;
                    df.__value__[name].bindObjects.forEach(function (bindObjects) {
                        var bindObject = bindObjects.obj,
                            bindObjectName = bindObjects.name;
                        bindObject[bindObjectName] = value;
                    });
                    df.__value__[name].whenConditions.forEach(function (whenConditions) {
                        var exec = whenConditions.exec,
                            elseWhen = whenConditions.elseWhen,
                            elseExec = whenConditions.else,
                            logic = whenConditions.logic;
                        if (df.__logic__(logic)) return exec();
                        else {
                            for (var i = 0; i < elseWhen.length; i++) {
                                var logic = elseWhen[i].logic,
                                    exec = elseWhen[i].exec;
                                if (df.__logic__(logic))
                                    return exec();
                            }
                        }
                        return elseExec();
                    });
                    return value;
                }
            });
            return df.__value__[name];
        }
        df.__value__ = {};
        df.__includes__ = function (dfValue) {
            if (!dfValue || typeof dfValue != "object") return false;
            if (df.__value__[dfValue.name] == dfValue) return true;
            return false;
        };
        df.__logic__ = function (logic) {
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
        df.when = function () {
            var whenValues = [],
                dfValues = arguments,
                conditions = {
                    logic: dfValues,
                    elseWhen: []
                };
            for (var i = 0; i < dfValues.length; i++)
                if (df.__includes__(dfValues[i]) && !whenValues.includes(dfValues[i]))
                    whenValues.push(dfValues[i]);
            return whenValues.length == dfValues.length
                ? {
                    isChange: function (exec) {
                        conditions.logic = ["true"];
                        conditions.exec = exec;
                        whenValues.forEach(function (whenValue) {
                            df.__value__[whenValue.name].whenConditions.push(conditions);
                        });
                        exec();
                    }
                }
                : {
                    then: function (exec) {
                        var executed = false;
                        conditions.exec = exec;
                        whenValues.forEach(function (whenValue) {
                            df.__value__[whenValue.name].whenConditions.push(conditions);
                        });
                        if (df.__logic__(dfValues)) {
                            executed = true;
                            exec();
                        }
                        var next = {
                            else: function (exec) {
                                conditions.else = exec;
                                if (!executed) exec();
                            },
                            elseWhen: function () {
                                var elseWhenValues = [],
                                    elsedfValues = arguments;
                                for (var i = 0; i < elsedfValues.length; i++)
                                    if (
                                        df.__includes__(elsedfValues[i]) &&
                                        !whenValues.includes(elsedfValues[i])
                                    ) elseWhenValues.push(elsedfValues[i]);
                                elseWhenValues.forEach(function (whenValue) {
                                    df.__value__[whenValue.name].whenConditions.push(conditions);
                                });
                                return {
                                    then: function (exec) {
                                        conditions.elseWhen.push({
                                            logic: elsedfValues,
                                            exec: exec
                                        });
                                        if (!executed && df.__logic__(elsedfValues)) {
                                            executed = true;
                                            exec();
                                        }
                                        return next;
                                    }
                                }
                            }
                        };
                        return next;
                    }
                };
        };
        DF.__df__[id || ""] = df;
        DFDOM(id || "");
        return df;
    }
    function DFDOM(id) {
        window.addEventListener("load", function () {
            var DFDOMObj = document.querySelectorAll("[df" + (id ? "-" + id : "") + "]");
            for (var i = 0; i < DFDOMObj.length; i++) {
                var dfCommands = DFDOMObj[i].getAttribute("df").split(",");
                for (var j = 0; j < dfCommands.length; j++) {
                    var dfCommand = dfCommands[j],
                        assignCommand = dfCommand.split("=");
                    if (assignCommand[0].includes("#")) {
                        var dfValue = assignCommand[0].replace(/#/, ""),
                            DOMValue = assignCommand[1].split("?"),
                            propertyName = DOMValue[0].split("."),
                            eventName = DOMValue[1];
                        DF.__df__[id](dfValue).when(DFDOMObj[i], eventName, ...propertyName);
                    } else {
                        var dfValue = assignCommand[1].replace(/#/, ""),
                            propertyName = assignCommand[0].split(".");
                        DF.__df__[id](dfValue).bind(DFDOMObj[i], ...propertyName);
                    }
                }
            }
        });
    }
    DF.__df__ = {};
    global.DF = DF;
})(this);