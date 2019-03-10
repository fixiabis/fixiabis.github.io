var skillPoint = {
    "HTML": [
        {
            title: "HTML elements",
            ref: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
            child: [
                { title: "Document metadata", point: 66, tag: "Document_metadata" },
                { title: "Content sectioning", point: 100, tag: "Content_sectioning" },
                { title: "Text content", point: 80, tag: "Text_content" },
                { title: "Inline text semantics", point: 91, tag: "Inline_text_semantics" },
                { title: "Image and multimedia", point: 66, tag: "Image_and_multimedia" },
                { title: "Embedded content", point: 83, tag: "Embedded_content" },
                { title: "Scripting", point: 100, tag: "Scripting" },
                { title: "Demarcating edits", point: 100, tag: "Demarcating_edits" },
                { title: "Table content", point: 100, tag: "Table_content" },
                { title: "Forms", point: 100, tag: "Forms" },
                { title: "Interactive elements", point: 100, tag: "Interactive_elements" },
                { title: "Web Components", point: 20, tag: "Web_Components" }
            ]
        },
        {
            title: "HTML attribute", point: 63,
            ref: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes"
        }
    ],
    "CSS": [
        {
            title: "CSS selectors",
            ref: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors",
            child: [
                { title: "Simple selectors", point: 100, tag: "Basic_selectors" },
                { title: "Combinators", point: 80, tag: "Combinators" },
                {
                    title: "Pseudo-classes", point: 46,
                    ref: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes"
                },
                {
                    title: "Pseudo-elements", point: 50,
                    ref: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements"
                }
            ]
        },
        {
            title: "At-rule", point: 67,
            ref: "https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule"
        }
    ],
    "Sass": [],
    "JavaScript": [
        {
            title: "Standard built-in objects",
            ref: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects",
            child: [
                { title: "Value properties", point: 100, tag: "Value_properties" },
                { title: "Function properties", point: 100, tag: "Function_properties" },
                {
                    title: "Fundamental objects", tag: "Fundamental_objects",
                    child: [
                        { title: "Object", point: 90, path: "Object" },
                        { title: "Function", point: 90, path: "Function" },
                        { title: "Boolean", point: 100, path: "Boolean" },
                        { title: "Symbol", point: 70, path: "Symbol" },
                        { title: "Error", point: 80, path: "Error" }
                    ]
                },
                {
                    title: "Numbers and dates", tag: "Numbers_and_dates",
                    child: [
                        { title: "Number", point: 100, path: "Number" },
                        { title: "BigInt", point: 80, path: "BigInt" },
                        { title: "Math", point: 40, path: "Math" },
                        { title: "Date", point: 80, path: "Date" }
                    ]
                },
                {
                    title: "Text processing", tag: "Text_processing",
                    child: [
                        { title: "String", point: 85, path: "String" },
                        { title: "RegExp", point: 75, path: "RegExp" }
                    ]
                },
                {
                    title: "Indexed collections", tag: "Indexed_collections",
                    child: [
                        { title: "Array", point: 90, path: "Array" },
                        { title: "Int8Array", point: 90, path: "Int8Array" },
                        { title: "Uint8Array", point: 90, path: "Uint8Array" },
                        { title: "Uint8ClampedArray", point: 90, path: "Uint8ClampedArray" },
                        { title: "Int16Array", point: 90, path: "Int16Array" },
                        { title: "Uint16Array", point: 90, path: "Uint16Array" },
                        { title: "Int32Array", point: 90, path: "Int32Array" },
                        { title: "Uint32Array", point: 90, path: "Uint32Array" },
                        { title: "Float32Array", point: 90, path: "Float32Array" },
                        { title: "Float64Array", point: 90, path: "Float64Array" }
                    ]
                },
                {
                    title: "Keyed collections", tag: "Keyed_collections",
                    child: [
                        { title: "Map", point: 88, path: "Map" },
                        { title: "Set", point: 88, path: "Set" },
                        { title: "WeakMap", point: 88, path: "WeakMap" },
                        { title: "WeakSet", point: 88, path: "WeakSet" }
                    ]
                },
                {
                    title: "Structured data", tag: "Structured_data",
                    child: [
                        { title: "ArrayBuffer", point: 75, path: "ArrayBuffer" },
                        { title: "SharedArrayBuffer", point: 70, path: "SharedArrayBuffer" },
                        { title: "Atomics", point: 70, path: "Atomics" },
                        { title: "DataView", point: 75, path: "DataView" },
                        { title: "JSON", point: 100, path: "JSON" }
                    ]
                },
                {
                    title: "Control abstraction objects", tag: "Control_abstraction_objects",
                    child: [
                        { title: "Promise", point: 100, path: "Promise" },
                        { title: "Generator", point: 95, path: "Generator" },
                        { title: "GeneratorFunction", point: 95, path: "GeneratorFunction" },
                        { title: "AsyncFunction", point: 95, path: "AsyncFunction" },
                    ]
                },
                {
                    title: "Reflection", tag: "Reflection",
                    child: [
                        { title: "Reflect", point: 85, path: "Reflect" },
                        { title: "Proxy", point: 80, path: "Proxy" },
                    ]
                },
                { title: "Internationalization", tag: "Internationalization", point: 0 },
                { title: "WebAssembly", tag: "WebAssembly", point: 0 }
            ]
        }
    ],
    "TypeScript": [
        {
            title: "Basic Types", point: 100,
            ref: "http://www.typescriptlang.org/docs/handbook/basic-types.html"
        },
        {
            title: "Interfaces", point: 100,
            ref: "http://www.typescriptlang.org/docs/handbook/interfaces.html"
        },
        {
            title: "Classes", point: 100,
            ref: "http://www.typescriptlang.org/docs/handbook/classes.html"
        },
        {
            title: "Functions", point: 100,
            ref: "http://www.typescriptlang.org/docs/handbook/functions.html"
        },
        {
            title: "Generics", point: 90,
            ref: "http://www.typescriptlang.org/docs/handbook/generics.html"
        },
        {
            title: "Enums", point: 95,
            ref: "http://www.typescriptlang.org/docs/handbook/enums.html"
        },
        {
            title: "Advanced Types", point: 90,
            ref: "http://www.typescriptlang.org/docs/handbook/advanced-types.html"
        },
        {
            title: "Modules", point: 80,
            ref: "http://www.typescriptlang.org/docs/handbook/modules.html"
        },
        {
            title: "Namespaces", point: 100,
            ref: "http://www.typescriptlang.org/docs/handbook/namespaces.html"
        },
        {
            title: "Decorators", point: 100,
            ref: "http://www.typescriptlang.org/docs/handbook/decorators.html"
        },
        {
            title: "Mixins", point: 90,
            ref: "http://www.typescriptlang.org/docs/handbook/mixins.html"
        }
    ],
    "WebAPI": [],
    "SVG": [],
    "NodeJS": [],
    "PHP": [],
    "SQL": []
};

var list = skillPoint["JavaScript"][0];
list.child.map(item => item.ref = list.ref);

function showSkillPoint(type, list, elem, main) {
    if (!main) elem = document.querySelector("#" + type + "+section ul");

    var total = 0;

    for (var item of list) {
        var liEl = document.createElement("li");
        var span = document.createElement("span");
        var txNd = document.createTextNode(item.title);

        span.className = "point";
        liEl.appendChild(span);

        if (item.tag) {
            var aEl = document.createElement("a");
            aEl.href = main.ref + "#" + item.tag;
            aEl.target = "_new";
            aEl.appendChild(txNd);
            liEl.appendChild(aEl);
        } else if (item.path) {
            var aEl = document.createElement("a");
            aEl.href = main.ref + "/" + item.path;
            aEl.target = "_new";
            aEl.appendChild(txNd);
            liEl.appendChild(aEl);
        } else if (item.ref) {
            var aEl = document.createElement("a");
            aEl.href = item.ref;
            aEl.target = "_new";
            aEl.appendChild(txNd);
            liEl.appendChild(aEl);
        } else liEl.appendChild(txNd);

        if (item.child) {
            var ulEl = document.createElement("ul");
            showSkillPoint(type, item.child, ulEl, item);
            liEl.appendChild(ulEl);
        }

        total += item.point;
        span.innerHTML = item.point;
        elem.appendChild(liEl);
    }

    var total = Math.round(total / list.length) || 0;

    if (main) main.point = total;
    else {
        document.querySelector("#" + type + "+section h1 .point").innerHTML = total;
    }
}

for (var i in skillPoint) {
    showSkillPoint(i, skillPoint[i]);
}