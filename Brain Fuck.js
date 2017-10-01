function BrainFuck(c) {
	var ptr = 0, res = "", dta = []
	for (var i = 0; i < c.length; i++)switch (c[i]) {
		case "+": if (dta[ptr]) dta[ptr]++; else dta[ptr] = 1; break
		case "-": if (dta[ptr]) dta[ptr]--; else dta[ptr] = -1; break
		case ">": ptr++; break
		case "<": ptr--; break
		case "]": if (!dta[ptr]) break; var a = 0, b = 0
			while (1) {
				a++; if (c[i - a] == "]") b++;
				if (c[i - a] == "[") {
					if (b == 0) { i -= a; break } else b--
				}
			} break
		case ".": res += String.fromCharCode(dta[ptr]); break
		case ",": dta[ptr] = (res.length) ? res[res.length - 1].charCodeAt() : 0; break
	}return res
}