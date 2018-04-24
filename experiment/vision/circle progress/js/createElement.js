function setAttrs(attrs) {
    for (var i in attrs)
        if (attrs[i].__proto__.constructor.name !== "Object")
            this[i] = attrs[i];
        else
            setAttrs.bind(this[i])(attrs[i]);
}
function runExecs(execs) {
    for (var i in execs)
        if (execs[i] instanceof Array)
            for (var j = 0; j < execs[i].length; j++)
                if (execs[i][j] instanceof Array)
                    this[i].apply(this[i], execs[i][j]);
                else
                    this[i](execs[i][j]);
        else if (execs[i].__proto__.constructor.name !== "Object")
            this[i](execs[i]);
        else
            runExecs.bind(this[i])(execs[i]);
}
function createElement(name, attrs, execs) {
    var elem = document.createElement(name);
    if (attrs) setAttrs.bind(elem)(attrs);
    if (execs) runExecs.bind(elem)(execs);
    return elem;
}