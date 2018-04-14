/ *!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Incluye Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. y otros colaboradores
 * Publicado bajo la licencia de MIT
 * http://jquery.org/license
 *
 * Fecha: 2014-05-01T17: 42Z
 * /

(función (global, fábrica) {

	if (typeof module === "object" && typeof module.exports === "object") {
		// Para entornos CommonJS y CommonJS donde hay una ventana adecuada,
		// ejecuta la fábrica y obtiene jQuery
		// Para entornos que no poseen intrínsecamente una ventana con un documento
		// (como Node.js), expone una fábrica jQuery-making como module.exports
		// Esto acentúa la necesidad de la creación de una ventana real
		// eg var jQuery = require ("jquery") (ventana);
		// Ver ticket # 14549 para más información
		module.exports = global.document?
			fábrica (global, verdadero):
			función (w) {
				if (! w.document) {
					lanzar nuevo Error ("jQuery requiere una ventana con un documento");
				}
				devolver la fábrica (w);
			};
	} else {
		fábrica (global);
	}

// Pase esto si la ventana aún no está definida
} (typeof window! == "undefined"? window: this, function (window, noGlobal) {

// No puedo hacer esto porque varias aplicaciones incluyen el rastreo de ASP.NET
// la pila a través de arguments.caller.callee y Firefox muere si
// intenta rastrear a través de cadenas de llamadas "use strict". (# 13335)
// Soporte: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Definir una copia local de jQuery
	jQuery = function (selector, context) {
		// El objeto jQuery es en realidad solo el constructor init 'mejorado'
		// Necesito init si se llama a jQuery (solo permite lanzar el error si no está incluido)
		return new jQuery.fn.init (selector, contexto);
	},

	// Soporte: Android <4.1, IE <9
	// Asegúrate de recortar la BOM y NBSP
	rtrim = / ^ [\ s \ uFEFF \ xA0] + | [\ s \ uFEFF \ xA0] + $ / g,

	// Coincide con la cadena punteada para camelizar
	rmsPrefix = / ^ - ms- /,
	rdashAlpha = / - ([\ da-z]) / gi,

	// Utilizado por jQuery.camelCase como devolución de llamada para reemplazar ()
	fcamelCase = function (all, letter) {
		return letter.toUpperCase ();
	};

jQuery.fn = jQuery.prototype = {
	// La versión actual de jQuery está siendo utilizada
	jquery: versión,

	constructor: jQuery,

	// Comience con un selector vacío
	selector: "",

	// La longitud predeterminada de un objeto jQuery es 0
	longitud: 0,

	toArray: function () {
		return slice.call (esto);
	},

	// Obtenga el enésimo elemento en el conjunto de elementos coincidentes O
	// Obtener todo el conjunto combinado de elementos como una matriz limpia
	get: function (num) {
		return num! = null?

			// Devuelve solo un elemento del conjunto
			(num <0? this [num + this.length]: this [num]):

			// Devuelve todos los elementos en una matriz limpia
			slice.call (esto);
	},

	// Tome una matriz de elementos y empújelos a la pila
	// (devuelve el nuevo conjunto de elementos coincidentes)
	pushStack: function (elems) {

		// Crea un nuevo conjunto de elementos jQuery
		var ret = jQuery.merge (this.constructor (), elems);

		// Agrega el objeto viejo a la pila (como referencia)
		ret.prevObject = this;
		ret.context = this.context;

		// Devuelve el conjunto de elementos recién formado
		return ret;
	},

	// Ejecutar una devolución de llamada para cada elemento en el conjunto combinado.
	// (Puedes sembrar los argumentos con una matriz de argumentos, pero esto es
	// solo se usa internamente)
	each: function (callback, args) {
		return jQuery.each (esto, devolución de llamada, args);
	},

	mapa: función (devolución de llamada) {
		return this.pushStack (jQuery.map (this, function (elem, i) {
			return callback.call (elem, i, elem);
		}));
	},

	slice: function () {
		devuelve this.pushStack (slice.apply (this, arguments));
	},

	primero: function () {
		devuelve this.eq (0);
	},

	last: function () {
		devuelve this.eq (-1);
	},

	eq: función (i) {
		var len = this.length,
			j = + i + (i <0? len: 0);
		devuelve this.pushStack (j> = 0 && j <len? [this [j]]: []);
	},

	end: function () {
		devuelve this.prevObject || este.constructor (nulo);
	},

	// Sólo para uso interno.
	// Se comporta como el método de una matriz, no como un método jQuery.
	empuja empuja,
	sort: deletedIds.sort,
	empalme: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function () {
	var src, copyIsArray, copy, name, options, clone,
		target = argumentos [0] || {},
		i = 1,
		length = arguments.length,
		profundo = falso;

	// Manejar una situación de copia profunda
	if (tipo de destino === "booleano") {
		profundo = objetivo;

		// omite el booleano y el objetivo
		target = argumentos [i] || {};
		i ++;
	}

	// Manejar caso cuando el objetivo es una cadena o algo (posible en copia profunda)
	if (typeof target! == "object" &&! jQuery.isFunction (target)) {
		target = {};
	}

	// extender jQuery en sí mismo si solo se pasa un argumento
	if (i === length) {
		target = this;
		yo--;
	}

	para (; i <longitud; i ++) {
		// Solo trato con valores no nulos / indefinidos
		if ((opciones = argumentos [i])!! = null) {
			// Extender el objeto base
			para (nombre en opciones) {
				src = destino [nombre];
				copy = opciones [nombre];

				// Prevenir el ciclo sin fin
				if (target === copy) {
					continuar;
				}

				// Recurse si estamos fusionando objetos simples o matrices
				if (deep && copy && (jQuery.isPlainObject (copy) || (copyIsArray = jQuery.isArray (copy)))) {
					if (copyIsArray) {
						copyIsArray = falso;
						clone = src && jQuery.isArray (src)? src: [];

					} else {
						clone = src && jQuery.isPlainObject (src)? src: {};
					}

					// Nunca muevas objetos originales, clonarlos
					target [name] = jQuery.extend (deep, clone, copy);

				// No traigas valores indefinidos
				} else if (copy! == undefined) {
					destino [nombre] = copia;
				}
			}
		}
	}

	// Devuelve el objeto modificado
	objetivo de retorno;
};

jQuery.extend ({
	// Único para cada copia de jQuery en la página
	expando: "jQuery" + (versión + Math.random ()) .replace (/ \ D / g, ""),

	// Supongamos que jQuery está listo sin el módulo listo
	isReady: cierto,

	error: function (msg) {
		lanzar nuevo Error (msg);
	},

	noop: function () {},

	// Ver test / unit / core.js para detalles sobre isFunction.
	// Desde la versión 1.3, los métodos DOM y las funciones como alerta
	// no son compatibles. Devuelven falso en IE (# 2968).
	isFunction: function (obj) {
		return jQuery.type (obj) === "función";
	},

	isArray: Array.isArray || función (obj) {
		return jQuery.type (obj) === "matriz";
	},

	isWindow: function (obj) {
		/ * jshint eqeqeq: falso * /
		return obj! = null && obj == obj.window;
	},

	isNumeric: function (obj) {
		// parseFloat NaNs falsos positivos de lanzamiento numérico (null | true | false | "")
		// ... pero malinterpreta cadenas de números iniciales, particularmente literales hexadecimales ("0x ...")
		// la substracción fuerza infinitos a NaN
		return! jQuery.isArray (obj) && obj - parseFloat (obj)> = 0;
	},

	isEmptyObject: function (obj) {
		var nombre;
		para (nombre en obj) {
			falso retorno;
		}
		devolver verdadero;
	},

	isPlainObject: function (obj) {
		var clave;

		// Debe ser un Objeto.
		// Debido a IE, también tenemos que verificar la presencia de la propiedad del constructor.
		// Asegúrate de que los nodos DOM y los objetos de la ventana no pasen, también
		if (! obj || jQuery.type (obj)! == "objeto" || obj.nodeType || jQuery.isWindow (obj)) {
			falso retorno;
		}

		tratar {
			// No posee propiedad de constructor debe ser Object
			if (obj.constructor &&
				! hasOwn.call (obj, "constructor") &&
				! hasOwn.call (obj.constructor.prototype, "isPrototypeOf")) {
				falso retorno;
			}
		} catch (e) {
			// IE8,9 Lanzará excepciones en ciertos objetos host # 9897
			falso retorno;
		}

		// Soporte: IE <9
		// Manejar la iteración sobre las propiedades heredadas antes de las propias propiedades.
		if (support.ownLast) {
			para (clave en obj) {
				return hasOwn.call (obj, clave);
			}
		}

		// Propias propiedades se enumeran en primer lugar, por lo que para acelerar,
		// si el último es propio, todas las propiedades son propias.
		para (clave en obj) {}

		tecla de retorno === indefinido || hasOwn.call (obj, clave);
	},

	tipo: función (obj) {
		if (obj == null) {
			return obj + "";
		}
		return typeof obj === "objeto" || typeof obj === "función"?
			class2type [toString.call (obj)] || "objeto":
			typeof obj;
	},

	// Evalúa un script en un contexto global
	// Soluciones basadas en los hallazgos de Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function (data) {
		if (data && jQuery.trim (data)) {
			// Utilizamos execScript en Internet Explorer
			// Usamos una función anónima para que el contexto sea ventana
			// en lugar de jQuery en Firefox
			(window.execScript || función (datos) {
				ventana ["eval"] .call (ventana, datos);
			}) (datos);
		}
	},

	// Convertir guiones a camelCase; utilizado por el css y los módulos de datos
	// Microsoft olvidó aumentar su prefijo de proveedor (# 9572)
	camelCase: function (string) {
		return string.replace (rmsPrefix, "ms-") .replace (rdashAlpha, fcamelCase);
	},

	nodeName: function (elem, name) {
		return elem.nodeName && elem.nodeName.toLowerCase () === name.toLowerCase ();
	},

	// args es solo para uso interno
	cada uno: función (obj, callback, args) {
		valor de var,
			i = 0,
			longitud = obj.length,
			isArray = isArraylike (obj);

		if (args) {
			if (isArray) {
				para (; i <longitud; i ++) {
					value = callback.apply (obj [i], args);

					if (value === false) {
						descanso;
					}
				}
			} else {
				para (i en obj) {
					value = callback.apply (obj [i], args);

					if (value === false) {
						descanso;
					}
				}
			}

		// Un caso especial, rápido, para el uso más común de cada
		} else {
			if (isArray) {
				para (; i <longitud; i ++) {
					value = callback.call (obj [i], i, obj [i]);

					if (value === false) {
						descanso;
					}
				}
			} else {
				para (i en obj) {
					value = callback.call (obj [i], i, obj [i]);

					if (value === false) {
						descanso;
					}
				}
			}
		}

		return obj;
	},

	// Soporte: Android <4.1, IE <9
	recortar: función (texto) {
		devolver texto == nulo?
			"":
			(texto + "") .replace (rtrim, "");
	},

	// los resultados son solo para uso interno
	makeArray: function (arr, results) {
		var ret = resultados || [];

		if (arr! = null) {
			if (isArraylike (Object (arr))) {
				jQuery.merge (ret,
					typeof arr === "cadena"?
					[arr]: arr
				);
			} else {
				push.call (ret, arr);
			}
		}

		return ret;
	},

	inArray: function (elem, arr, i) {
		var len;

		if (arr) {
			if (indexOf) {
				return indexOf.call (arr, elem, i);
			}

			len = arr.length;
			yo = yo? i <0? Math.max (0, len + i): i: 0;

			para (; i <len; i ++) {
				// Omitir el acceso en matrices dispersas
				if (i en arr && arr [i] === elem) {
					devuelve i;
				}
			}
		}

		return -1;
	},

	fusionar: función (primero, segundo) {
		var len = + second.length,
			j = 0,
			i = first.length;

		while (j <len) {
			primero [i ++] = segundo [j ++];
		}

		// Soporte: IE <9
		// Transmisión alternativa de .length a NaN en objetos de otro tipo (por ejemplo, NodeLists)
		if (len! == len) {
			while (segundo [j]! == undefined) {
				primero [i ++] = segundo [j ++];
			}
		}

		first.length = i;

		regresar primero;
	},

	grep: function (elems, callback, invert) {
		var callbackInverse,
			matches = [],
			i = 0,
			longitud = elems.length,
			callbackExpect =! invertido;

		// Ir a través de la matriz, solo guardando los elementos
		// que pasa la función de validación
		para (; i <longitud; i ++) {
			callbackInverse =! callback (elems [i], i);
			if (callbackInverse! == callbackExpect) {
				matches.push (elems [i]);
			}
		}

		partidos de vuelta;
	},

	// arg es solo para uso interno
	mapa: función (elems, callback, arg) {
		valor de var,
			i = 0,
			longitud = elems.length,
			isArray = isArailike (elems),
			ret = [];

		// Ir a través de la matriz, traduciendo cada uno de los elementos a sus nuevos valores
		if (isArray) {
			para (; i <longitud; i ++) {
				value = callback (elems [i], i, arg);

				if (value! = null) {
					ret.push (valor);
				}
			}

		// Revisa cada tecla en el objeto,
		} else {
			para (i en elems) {
				value = callback (elems [i], i, arg);

				if (value! = null) {
					ret.push (valor);
				}
			}
		}

		// Aplanar cualquier matriz anidada
		return concat.apply ([], ret);
	},

	// Un contador GUID global para objetos
	guid: 1,

	// Vincula una función a un contexto, opcionalmente aplicando parcialmente cualquier
	// argumentos.
	proxy: función (fn, contexto) {
		var args, proxy, tmp;

		if (tipo de contexto === "cadena") {
			tmp = fn [contexto];
			contexto = fn;
			fn = tmp;
		}

		// Verificación rápida para determinar si el objetivo es invocable, en la especificación
		// esto arroja un TypeError, pero solo devolveremos undefined.
		if (! jQuery.isFunction (fn)) {
			regreso indefinido;
		}

		// enlace simulado
		args = slice.call (argumentos, 2);
		proxy = function () {
			return fn.apply (context || this, args.concat (slice.call (argumentos)));
		};

		// Establece el guid del controlador único al mismo del controlador original, por lo que se puede eliminar
		proxy.guid = fn.guid = fn.guid || jQuery.guid ++;

		proxy de devolución;
	},

	ahora: function () {
		return + (new Date ());
	},

	// jQuery.support no se usa en Core pero otros proyectos adjuntan su
	// propiedades para que necesite existir.
	soporte soporte
});

// Rellena el mapa class2type
jQuery.each ("Boolean Number String Function Array Date RegExp Object Error" .split (""), function (i, name) {
	class2type ["[object" + name + "]"] = name.toLowerCase ();
});

la función esArraylike (obj) {
	var longitud = obj.length,
		type = jQuery.type (obj);

	if (tipo === "función" || jQuery.isWindow (obj)) {
		falso retorno;
	}

	if (obj.nodeType === 1 && length) {
		devolver verdadero;
	}

	tipo de retorno === "matriz" || longitud === 0 ||
		typeof length === "number" && length> 0 && (length - 1) en obj;
}
var Sizzle =
/ *!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. y otros colaboradores
 * Publicado bajo la licencia de MIT
 * http://jquery.org/license
 *
 * Fecha: 2014-04-18
 * /
(función (ventana) {

var i,
	apoyo,
	Expr,
	getText,
	isXML,
	tokenize,
	compilar,
	seleccionar,
	outermostContext,
	sortInput,
	hasDuplicate,

	// documento local vars
	setDocument,
	documento,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	partidos,
	contiene,

	// Datos específicos de la instancia
	expando = "chisporroteo" + - (nueva Fecha ()),
	preferredDoc = window.document,
	dirruns = 0,
	hecho = 0,
	classCache = createCache (),
	tokenCache = createCache (),
	compilerCache = createCache (),
	sortOrder = function (a, b) {
		if (a === b) {
			hasDuplicate = verdadero;
		}
		return 0;
	},

	// constantes de propósito general
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// métodos de instancia
	hasOwn = ({}). hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Usa un índice reducido si no podemos usar uno nativo
	indexOf = arr.indexOf || función (elem) {
		var i = 0,
			len = this.length;
		para (; i <len; i ++) {
			if (this [i] === elem) {
				devuelve i;
			}
		}
		return -1;
	},

	booleans = "checked | selected | async | autofocus | autoplay | controls | defer | disabled | hidden | ismap | loop | multiple | open | readonly | required | scoped",

	// Expresiones regulares

	// Caracteres de espacios en blanco http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\ x20 \\ t \\ r \\ n \\ f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?: \\\\ | | [\\ w-] | [^ \\ x00 - \\ xa0]) +",

	// modelado libremente en caracteres identificadores de CSS
	// Un valor sin comillas debería ser un identificador de CSS http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Sintaxis correcta: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace ("w", "w #"),

	// Selectores de atributos: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\ [" + whitespace + "* (" + characterEncoding + ") (?:" + espacio en blanco +
		// Operador (captura 2)
		"* ([* ^ $ |! ~]? =)" + espacio en blanco +
		// "Los valores de los atributos deben ser identificadores CSS [captura 5] o cadenas [captura 3 o captura 4]"
		"* (?: '((?: \\\\ | | [^ \\\\']) *) '| \" ((?: \\\\ | | [^ \\\\\ "] ) *) \ "| (" + identificador + ")) |)" + espacio en blanco +
		"* \\]",

	pseudos = ":(" + characterEncoding + ") (?: \\ ((" +
		// Para reducir el número de selectores que necesitan tokenize en el preFiltro, prefiera los argumentos:
		// 1. citado (captura 3, captura 4 o captura 5)
		"('((?: \\\\ | | [^ \\\\']) *) '| \" ((?: \\\\. | [^ \\\\\ "]) *) \ ") |" +
		// 2. simple (captura 6)
		"((?: \\\. | [^ \\\\ () [\\]] |" + attributes + ") *) |" +
		// 3. cualquier cosa (captura 2)
		". *" +
		") \\) |)",

	// Espacios en blanco al final y sin escape, capturando algunos caracteres que no son de espacio en blanco que preceden al último
	rtrim = new RegExp ("^" + espacio en blanco + "+ | ((?: ^ | [^ \\\\]) (?: \\\\.) *)" + espacio en blanco + "+ $", "g "),

	rcomma = new RegExp ("^" + espacio en blanco + "*," + espacio en blanco + "*"),
	rcombinators = new RegExp ("^" + espacio en blanco + "* ([> + ~] |" + espacio en blanco + ")" + espacio en blanco + "*"),

	rattributeQuotes = new RegExp ("=" + espacio en blanco + "* ([^ \\] '\"] *?) "+ espacio en blanco +" * \\] "," g "),

	rpseudo = new RegExp (pseudos),
	ridentifier = new RegExp ("^" + identificador + "$"),

	matchExpr = {
		"ID": nuevo RegExp ("^ # (" + characterEncoding + ")"),
		"CLASS": nuevo RegExp ("^ \\. (" + CharacterEncoding + ")"),
		"TAG": nuevo RegExp ("^ (" + characterEncoding.replace ("w", "w *") + ")"),
		"ATTR": nuevo RegExp ("^" + atributos),
		"PSEUDO": nuevo RegExp ("^" + pseudos),
		"CHILD": nuevo RegExp ("^ :( solo | first | last | nth | nth-last) - (child | of-type) (?: \\ (" + whitespace +
			"* (incluso | impar | (([+ -] |) (\\ d *) n |)" + espacio en blanco + "* (?: ([+ -] |)" + espacio en blanco +
			"* (\\ d +) |)) + espacio en blanco +" * \\) |) "," i ",
		"bool": nuevo RegExp ("^ (?:" + booleans + ") $", "i"),
		// Para uso en bibliotecas que implementan .is ()
		// Utilizamos esto para la coincidencia de POS en `seleccionar`
		"needsContext": nuevo RegExp ("^" + espacio en blanco + "* [> + ~] |: (incluso | impar | eq | gt | lt | nth | primero | último) (?: \\ (" +
			espacio en blanco + "* ((?: - \\ d)? \\ d *)" + espacio en blanco + "* \\) |) (? = [^ -] | $)", "i")
	},

	rinputs = / ^ (?: input | select | textarea | botón) $ / i,
	rheader = / ^ h \ d $ / i,

	rnative = / ^ [^ {] + \ {\ s * \ [native \ w /,

	// ID de fácil identificación / recuperable o selectores TAG o CLASS
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = / [+ ~] /,
	rescape = / '| \\ / g,

	// CSS escapa http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp ("\\\\ ([\\ da-f] {1,6}" + espacio en blanco + "? | (" + espacio en blanco + ") |.)", "ig"),
	funescape = function (_, escaped, escapadoWhitespace) {
		var high = "0x" + escaped - 0x10000;
		// NaN significa no codepoint
		// Soporte: Firefox <24
		// Solución errónea de interpretación numérica de + "0x"
		¡vuelve alto! == alto || escapadoWhitespace?
			escapado :
			alto <0?
				// punto de código BMP
				String.fromCharCode (alto + 0x10000):
				// Punto de código del plano suplementario (par sustituto)
				String.fromCharCode (alto >> 10 | 0xD800, alto y 0x3FF | 0xDC00);
	};

// Optimizar para push.apply (_, NodeList)
tratar {
	push.apply (
		(arr = slice.call (preferredDoc.childNodes)),
		preferredDoc.childNodes
	);
	// Soporte: Android <4.0
	// Detecta que falla silenciosamente push.apply
	arr [preferredDoc.childNodes.length] .nodeType;
} catch (e) {
	push = {apply: arr.length?

		// Leverage slice si es posible
		function (target, els) {
			push_native.apply (target, slice.call (els));
		}:

		// Soporte: IE <9
		// De lo contrario, anexar directamente
		function (target, els) {
			var j = target.length,
				i = 0;
			// No puedo confiar en NodeList.length
			while ((target [j ++] = els [i ++])) {}
			target.length = j - 1;
		}
	};
}

function Sizzle (selector, contexto, resultados, semilla) {
	var match, elem, m, nodeType,
		// QSA vars
		i, grupos, viejo, nid, newContext, newSelector;

	if ((context? context.ownerDocument || context: preferredDoc)! == document) {
		setDocument (contexto);
	}

	contexto = contexto || documento;
	resultados = resultados || [];

	if (! selector || typeof selector! == "cadena") {
		resultados de devolución;
	}

	if ((nodeType = context.nodeType)! == 1 && nodeType! == 9) {
		regreso [];
	}

	if (documentIsHTML &&! seed) {

		// Accesos directos
		if ((match = rquickExpr.exec (selector))) {
			// Speed-up: Sizzle ("# ID")
			if ((m = match [1])) {
				if (nodeType === 9) {
					elem = context.getElementById (m);
					// Ver parentNode para capturar cuando Blackberry 4.6 regresa
					// nodos que ya no están en el documento (jQuery # 6963)
					if (elem && elem.parentNode) {
						// Manejar el caso donde IE, Opera y Webkit devuelven elementos
						// por nombre en lugar de ID
						if (elem.id === m) {
							results.push (elem);
							resultados de devolución;
						}
					} else {
						resultados de devolución;
					}
				} else {
					// Contexto no es un documento
					if (context.ownerDocument && (elem = context.ownerDocument.getElementById (m)) &&
						contains (context, elem) && elem.id === m) {
						results.push (elem);
						resultados de devolución;
					}
				}

			// Speed-up: Sizzle ("TAG")
			} else if (match [2]) {
				push.apply (results, context.getElementsByTagName (selector));
				resultados de devolución;

			// Speed-up: Sizzle (". CLASS")
			} else if ((m = match [3]) && support.getElementsByClassName && context.getElementsByClassName) {
				push.apply (results, context.getElementsByClassName (m));
				resultados de devolución;
			}
		}

		// ruta QSA
		if (support.qsa && (! rbuggyQSA ||! rbuggyQSA.test (selector))) {
			nid = old = expando;
			newContext = contexto;
			newSelector = nodeType === 9 && selector;

			// qSA funciona de forma extraña en consultas basadas en elementos
			// Podemos solucionar esto especificando un ID extra en la raíz
			// y trabajando desde allí (Gracias a Andrew Dupont por la técnica)
			// IE 8 no funciona en elementos de objeto
			if (nodeType === 1 && context.nodeName.toLowerCase ()! == "object") {
				grupos = tokenize (selector);

				if ((antiguo = context.getAttribute ("id"))) {
					nid = old.replace (rescape, "\\ $ &");
				} else {
					context.setAttribute ("id", nid);
				}
				nid = "[id = '" + nid + "']";

				i = groups.length;
				mientras yo-- ) {
					grupos [i] = nid + toSelector (grupos [i]);
				}
				newContext = rsibling.test (selector) && testContext (context.parentNode) || contexto;
				newSelector = groups.join (",");
			}

			if (newSelector) {
				tratar {
					push.apply (resultados,
						newContext.querySelectorAll (newSelector)
					);
					resultados de devolución;
				} catch (qsaError) {
				} finalmente {
					Yo doblo ) {
						context.removeAttribute ("id");
					}
				}
			}
		}
	}

	// Todos los otros
	return select (selector.replace (rtrim, "$ 1"), contexto, resultados, semilla);
}

/ **
 * Crear cachés clave-valor de tamaño limitado
 * @returns {Function (string, Object)} Devuelve los datos del objeto después de almacenarlo en sí mismo con
 * nombre de propiedad la cadena (con sufijo de espacio) y (si la caché es más grande que Expr.cacheLength)
 * borrar la entrada más antigua
 * /
function createCache () {
	var keys = [];

	caché de función (clave, valor) {
		// Use (tecla + "") para evitar la colisión con las propiedades del prototipo nativo (vea el Issue # 157)
		if (keys.push (key + "")> Expr.cacheLength) {
			// Solo guarde las entradas más recientes
			eliminar caché [keys.shift ()];
		}
		return (caché [tecla + ""] = valor);
	}
	caché de retorno;
}

/ **
 * Marque una función para uso especial por Sizzle
 * @param {Function} fn La función para marcar
 * /
function markFunction (fn) {
	fn [expando] = verdadero;
	return fn;
}

/ **
 * Pruebas de soporte usando un elemento
 * @param {Function} fn Pasó el div creado y espera un resultado booleano
 * /
función assert (fn) {
	var div = document.createElement ("div");

	tratar {
		devuelve !! fn (div);
	} catch (e) {
		falso retorno;
	} finalmente {
		// Eliminar de su padre por defecto
		if (div.parentNode) {
			div.parentNode.removeChild (div);
		}
		// liberar memoria en IE
		div = null;
	}
}

/ **
 * Agrega el mismo controlador para todos los atributos especificados
 * @param {String} attrs Lista de atributos separados por tuberías
 * @param {Function} handler El método que se aplicará
 * /
function addHandle (attrs, controlador) {
	var arr = attrs.split ("|"),
		i = attrs.length;

	mientras yo-- ) {
		Expr.attrHandle [arr [i]] = controlador;
	}
}

/ **
 * Verifica el orden de los documentos de dos hermanos
 * @param {Element} a
 * @param {Element} b
 * @ devuelve {Número} Devuelve menos de 0 si a es anterior a b, es mayor que 0 si a sigue a b
 * /
function siblingCheck (a, b) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			(~ b.sourceIndex || MAX_NEGATIVE) -
			(~ a.sourceIndex || MAX_NEGATIVE);

	// Usa IE sourceIndex si está disponible en ambos nodos
	if (diff) {
		return diff;
	}

	// Verifica si b sigue una
	if (cur) {
		while ((cur = cur.nextSibling)) {
			if (cur === b) {
				return -1;
			}
		}
	}

	devuelve un? 1: -1;
}

/ **
 * Devuelve una función para usar en pseudos para los tipos de entrada
 * @param {String} tipo
 * /
función createInputPseudo (type) {
	función de retorno (elem) {
		var name = elem.nodeName.toLowerCase ();
		return name === "input" && elem.type === type;
	};
}

/ **
 * Devuelve una función para usar en pseudos para botones
 * @param {String} tipo
 * /
function createButtonPseudo (type) {
	función de retorno (elem) {
		var name = elem.nodeName.toLowerCase ();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/ **
 * Devuelve una función para usar en pseudos para posiciones
 * @param {Function} fn
 * /
function createPositionalPseudo (fn) {
	return markFunction (función (argumento) {
		argumento = + argumento;
		return markFunction (función (semilla, coincidencias) {
			var j,
				matchIndexes = fn ([], seed.length, argumento),
				i = matchIndexes.length;

			// Relacionar elementos encontrados en los índices especificados
			mientras yo-- ) {
				if (seed [(j = matchIndexes [i])]) {
					semilla [j] =! (coincide con [j] = semilla [j]);
				}
			}
		});
	});
}

/ **
 * Comprueba la validez de un nodo como contexto Sizzle
 * @param {Element | Object =} context
 * @return {Element | Object | Boolean} El nodo de entrada si es aceptable, de lo contrario un valor falso
 * /
function testContext (context) {
	return context && typeof context.getElementsByTagName! == strundefined && context;
}

// Exponer vars de soporte para mayor comodidad
support = Sizzle.support = {};

/ **
 * Detecta nodos XML
 * @param {Element | Object} elem Un elemento o documento
 * @returns {Boolean} True iff elem es un nodo XML no HTML
 * /
isXML = Sizzle.isXML = function (elem) {
	// documentElement se verifica para los casos donde aún no existe
	// (como cargar iframes en IE - # 4833)
	var documentElement = elem && (elem.ownerDocument || elem) .documentElement;
	return documentElement? documentElement.nodeName! == "HTML": falso;
};

/ **
 * Establece las variables relacionadas con el documento una vez sobre la base del documento actual
 * @param {Element | Object} [doc] Un elemento u objeto de documento para usar para configurar el documento
 * @returns {Object} Devuelve el documento actual
 * /
setDocument = Sizzle.setDocument = function (node) {
	var hasCompare,
		doc = nodo? node.ownerDocument || nodo: preferredDoc,
		parent = doc.defaultView;

	// Si no hay documento y documentElement disponible, regrese
	if (doc === document || doc.nodeType! == 9 ||! doc.documentElement) {
		documento de devolución;
	}

	// Establecer nuestro documento
	document = doc;
	docElem = doc.documentElement;

	// Pruebas de soporte
	documentIsHTML =! isXML (doc);

	// Soporte: IE> 8
	// Si el documento iframe está asignado a la variable "document" y si iframe ha sido recargado,
	// IE arrojará el error de "permiso denegado" al acceder a la variable "documento", consulte jQuery # 13936
	// IE6-8 no es compatible con la propiedad defaultView por lo que los padres no estarán definidos
	if (padre && parent! == parent.top) {
		// IE11 no tiene attachEvent, entonces todos deben sufrir
		if (parent.addEventListener) {
			parent.addEventListener ("descargar", función () {
				setDocument ();
			}, falso);
		} else if (parent.attachEvent) {
			parent.attachEvent ("onunload", function () {
				setDocument ();
			});
		}
	}

	/ * Atributos
	-------------------------------------------------- -------------------- * /

	// Soporte: IE <8
	// Verificar que getAttribute realmente devuelva atributos y no propiedades (excepto los booleanos IE8)
	support.attributes = assert (function (div) {
		div.className = "i";
		return! div.getAttribute ("className");
	});

	/ * getElement (s) por *
	-------------------------------------------------- -------------------- * /

	// Compruebe si getElementsByTagName ("*") devuelve solo elementos
	support.getElementsByTagName = assert (function (div) {
		div.appendChild (doc.createComment (""));
		return! div.getElementsByTagName ("*"). length;
	});

	// Comprobar si getElementsByClassName puede ser de confianza
	support.getElementsByClassName = rnative.test (doc.getElementsByClassName) && assert (function (div) {
		div.innerHTML = "<div class = 'a'> </ div> <div class = 'a i'> </ div>";

		// Soporte: Safari <4
		// Sobrecoge de clase de captura
		div.firstChild.className = "i";
		// Soporte: Opera <10
		// Captura la falla de gEBCN para encontrar clases no líderes
		return div.getElementsByClassName ("i"). length === 2;
	});

	// Soporte: IE <10
	// Comprobar si getElementById devuelve elementos por nombre
	// Los métodos getElementById rotos no recogen los nombres programáticamente establecidos,
	// entonces usa una prueba rotunda de getElementsByName
	support.getById = assert (function (div) {
		docElem.appendChild (div) .id = expando;
		return! doc.getElementsByName || ! doc.getElementsByName (expando) .length;
	});

	// ID encuentra y filtra
	if (support.getById) {
		Expr.find ["ID"] = función (id, contexto) {
			if (typeof context.getElementById! == strundefined && documentIsHTML) {
				var m = context.getElementById (id);
				// Ver parentNode para capturar cuando Blackberry 4.6 regresa
				// nodos que ya no están en el documento # 6963
				devuelve m && m.parentNode? [m]: [];
			}
		};
		Expr.filter ["ID"] = función (id) {
			var attrId = id.replace (runescape, funescape);
			función de retorno (elem) {
				return elem.getAttribute ("id") === attrId;
			};
		};
	} else {
		// Soporte: IE6 / 7
		// getElementById no es confiable como atajo de búsqueda
		eliminar Expr.find ["ID"];

		Expr.filter ["ID"] = función (id) {
			var attrId = id.replace (runescape, funescape);
			función de retorno (elem) {
				var node = typeof elem.getAttributeNode! == strundefined && elem.getAttributeNode ("id");
				nodo de retorno && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find ["TAG"] = support.getElementsByTagName?
		función (etiqueta, contexto) {
			if (typeof context.getElementsByTagName! == strundefined) {
				return context.getElementsByTagName (tag);
			}
		}:
		función (etiqueta, contexto) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName (tag);

			// Filtrar posibles comentarios
			if (tag === "*") {
				while ((elem = resultados [i ++])) {
					if (elem.nodeType === 1) {
						tmp.push (elem);
					}
				}

				devolver tmp;
			}
			resultados de devolución;
		};

	// Clase
	Expr.find ["CLASS"] = support.getElementsByClassName && function (className, context) {
		if (typeof context.getElementsByClassName! == strundefined && documentIsHTML) {
			return context.getElementsByClassName (className);
		}
	};

	/ * QSA / matchesSelector
	-------------------------------------------------- -------------------- * /

	// Compatibilidad con QSA y matchesSelector

	// matchesSelector (: active) informa falso cuando es verdadero (IE9 / Opera 11.5)
	rbuggyMatches = [];

	// qSa (: focus) informa falso cuando es verdadero (Chrome 21)
	// Permitimos esto debido a un error en IE8 / 9 que arroja un error
	// siempre que se acceda a `document.activeElement` en un iframe
	// Entonces, permitimos que: focus pase a través de QSA todo el tiempo para evitar el error de IE
	// Ver http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ((support.qsa = rnative.test (doc.querySelectorAll))) {
		// Crear QSA regex
		// Estrategia Regex adoptada por Diego Perini
		assert (function (div) {
			// Seleccionar se establece en cadena vacía a propósito
			// Esto es para probar el tratamiento de IE de forma no explícita
			// establecer un atributo de contenido booleano,
			// ya que su presencia debería ser suficiente
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip = ''> <opción seleccionada = ''> </ option> </ select>";

			// Soporte: IE8, Opera 11-12.16
			// No se debe seleccionar nada cuando las cadenas vacías sigan ^ = o $ = o * =
			// El atributo de prueba debe ser desconocido en Opera pero "seguro" para WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if (div.querySelectorAll ("[msallowclip ^ = '']"). length) {
				rbuggyQSA.push ("[* ^ $] =" + espacio en blanco + "* (?: '' | \" \ ")");
			}

			// Soporte: IE8
			// Los atributos booleanos y el "valor" no se tratan correctamente
			if (! div.querySelectorAll ("[selected]"). length) {
				rbuggyQSA.push ("\\ [" + espacio en blanco + "* (?: valor |" + booleanos + ")");
			}

			// Webkit / Opera -: checked debería devolver los elementos de opción seleccionados
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 arroja un error aquí y no verá las pruebas posteriores
			if (! div.querySelectorAll (": checked"). length) {
				rbuggyQSA.push (": comprobado");
			}
		});

		assert (function (div) {
			// Soporte: Windows 8 Native Apps
			// Los atributos de tipo y nombre están restringidos durante la asignación .innerHTML
			var input = doc.createElement ("entrada");
			input.setAttribute ("tipo", "oculto");
			div.appendChild (input) .setAttribute ("nombre", "D");

			// Soporte: IE8
			// Aplicar el atributo de sensibilidad de mayúsculas y minúsculas
			if (div.querySelectorAll ("[name = d]") length) {
				rbuggyQSA.push ("nombre" + espacio en blanco + "* [* ^ $ |! ~]? =");
			}

			// FF 3.5 -: elementos habilitados /: deshabilitados y ocultos (los elementos ocultos aún están habilitados)
			// IE8 arroja un error aquí y no verá las pruebas posteriores
			if (! div.querySelectorAll (": enabled"). length) {
				rbuggyQSA.push (": habilitado", ": deshabilitado");
			}

			// Opera 10-11 no arroja pseudos inválidos post-coma
			div.querySelectorAll ("* ,: x");
			rbuggyQSA.push (",. *:");
		});
	}

	if ((support.matchesSelector = rnative.test ((matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector)))) {

		assert (function (div) {
			// Verifica si es posible hacer coincidenciasSelector
			// en un nodo desconectado (IE 9)
			support.disconnectedMatch = matches.call (div, "div");

			// Esto debería fallar con una excepción
			// Gecko no produce error, devuelve falso en su lugar
			matches.call (div, "[s! = '']: x");
			rbuggyMatches.push ("! =", pseudos);
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp (rbuggyQSA.join ("|"));
	rbuggyMatches = rbuggyMatches.length && new RegExp (rbuggyMatches.join ("|"));

	/ * Contiene
	-------------------------------------------------- -------------------- * /
	hasCompare = rnative.test (docElem.compareDocumentPosition);

	// Element contiene otro
	// A propósito no implementa descendientes inclusivos
	// Como en, un elemento no se contiene
	contains = hasCompare || rnative.test (docElem.contains)?
		función (a, b) {
			var adown = a.nodeType === 9? a.documentElement: a,
				bup = b && b.parentNode;
			devolver a === bup || !! (bup && bup.nodeType === 1 && (
				adown.contains?
					adown.contains (bup):
					a.compareDocumentPosition && a.compareDocumentPosition (bup) & 16
			));
		}:
		función (a, b) {
			si (b) {
				while ((b = b.parentNode)) {
					if (b === a) {
						devolver verdadero;
					}
				}
			}
			falso retorno;
		};

	/ * Clasificación
	-------------------------------------------------- -------------------- * /

	// Clasificación de orden de documentos
	sortOrder = hasCompare?
	función (a, b) {

		// Marcar para eliminar duplicados
		if (a === b) {
			hasDuplicate = verdadero;
			return 0;
		}

		// Ordenar en el método de existencia si solo una entrada tiene compararDocumentPosition
		var compare =! a.compareDocumentPosition -! b.compareDocumentPosition;
		si (comparar) {
			comparar de vuelta;
		}

		// Calcular posición si ambas entradas pertenecen al mismo documento
		compare = (a.ownerDocument || a) === (b.ownerDocument || b)?
			a.compareDocumentPosition (b):

			// De lo contrario, sabemos que están desconectados
			1;

		// nodos desconectados
		if (comparar y 1 ||
			(! support.sortDetached && b.compareDocumentPosition (a) === compare)) {

			// Elige el primer elemento relacionado con nuestro documento preferido
			if (a === doc || a.ownerDocument === preferredDoc && contains (preferredDoc, a)) {
				return -1;
			}
			if (b === doc || b.ownerDocument === preferredDoc && contains (preferredDoc, b)) {
				return 1;
			}

			// Mantener orden original
			return sortInput?
				(indexOf.call (sortInput, a) - indexOf.call (sortInput, b)):
				0;
		}

		volver comparar y 4? -1: 1;
	}:
	función (a, b) {
		// Salir temprano si los nodos son idénticos
		if (a === b) {
			hasDuplicate = verdadero;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [a],
			bp = [b];

		// Los nodos sin padres son documentos o están desconectados
		if (! aup ||! bup) {
			devolver a === doc? -1:
				b === doc? 1:
				aup? -1:
				bup? 1:
				sortInput?
				(indexOf.call (sortInput, a) - indexOf.call (sortInput, b)):
				0;

		// Si los nodos son hermanos, podemos hacer una comprobación rápida
		} else if (aup === bup) {
			return siblingCheck (a, b);
		}

		// De lo contrario, necesitamos listas completas de sus antepasados ​​para comparar
		cur = a;
		while ((cur = cur.parentNode)) {
			ap.unshift (cur);
		}
		cur = b;
		while ((cur = cur.parentNode)) {
			bp.unshift (cur);
		}

		// Camina por el árbol buscando una discrepancia
		while (ap [i] === bp [i]) {
			i ++;
		}

		volver yo?
			// Haz una comprobación de hermanos si los nodos tienen un ancestro común
			siblingCheck (ap [i], bp [i]):

			// De lo contrario, los nodos en nuestro documento ordenan primero
			ap [i] === preferredDoc? -1:
			bp [i] === preferredDoc? 1:
			0;
	};

	devolver el documento;
};

Sizzle.matches = function (expr, elements) {
	return Sizzle (expr, null, null, elementos);
};

Sizzle.matchesSelector = function (elem, expr) {
	// Establecer valores de documento si es necesario
	if ((elem.ownerDocument || elem)! == document) {
		setDocument (elem);
	}

	// Asegúrate de que los selectores de atributos estén citados
	expr = expr.replace (rattributeQuotes, "= '$ 1')");

	if (support.matchesSelector && documentIsHTML &&
		(! rbuggyMatches ||! rbuggyMatches.test (expr)) &&
		(! rbuggyQSA ||! rbuggyQSA.test (expr))) {

		tratar {
			var ret = matches.call (elem, expr);

			// MatchSelector de IE 9 devuelve falso en nodos desconectados
			if (ret || support.disconnectedMatch ||
					// Además, se dice que los nodos desconectados están en un documento
					// fragmento en IE 9
					elem.document && elem.document.nodeType! == 11) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle (expr, documento, null, [elem]) .length> 0;
};

Sizzle.contains = function (context, elem) {
	// Establecer valores de documento si es necesario
	if ((context.ownerDocument || context)! == document) {
		setDocument (contexto);
	}
	return contiene (contexto, elem);
};

Sizzle.attr = function (elem, name) {
	// Establecer valores de documento si es necesario
	if ((elem.ownerDocument || elem)! == document) {
		setDocument (elem);
	}

	var fn = Expr.attrHandle [name.toLowerCase ()],
		// No te dejes engañar por las propiedades Object.prototype (jQuery # 13807)
		val = fn && hasOwn.call (Expr.attrHandle, name.toLowerCase ())?
			fn (elem, name,! documentIsHTML):
			indefinido;

	return val! == undefined?
		Val:
		support.attributes || ! documentIsHTML?
			elem.getAttribute (nombre):
			(val = elem.getAttributeNode (name)) && val.specified?
				val.value:
				nulo;
};

Sizzle.error = function (msg) {
	throw new Error ("Error de sintaxis, expresión no reconocida:" + msg);
};

/ **
 * Clasificación de documentos y eliminación de duplicados
 * @param {ArrayLike} resultados
 * /
Sizzle.uniqueSort = function (results) {
	var elem,
		duplicados = [],
		j = 0,
		i = 0;

	// A menos que * sepamos * podemos detectar duplicados, asumir su presencia
	hasDuplicate =! support.detectDuplicates;
	sortInput =! support.sortStable && results.slice (0);
	results.sort (sortOrder);

	if (hasDuplicate) {
		while ((elem = resultados [i ++])) {
			if (elem === resultados [i]) {
				j = duplicates.push (i);
			}
		}
		while (j--) {
			results.splice (duplicados [j], 1);
		}
	}

	// Entrada clara después de la clasificación para liberar objetos
	// Ver https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	resultados de devolución;
};

/ **
 * Función de utilidad para recuperar el valor de texto de una matriz de nodos DOM
 * @param {Array | Element} elem
 * /
getText = Sizzle.getText = function (elem) {
	nodo var,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if (! nodeType) {
		// Si no hay nodeType, se espera que esto sea una matriz
		while ((node ​​= elem [i ++])) {
			// No atravesar nodos de comentarios
			ret + = getText (nodo);
		}
	} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
		// Usa el contenido de texto para los elementos
		// Se eliminó el uso de innerText por la consistencia de las nuevas líneas (jQuery # 11153)
		if (typeof elem.textContent === "string") {
			devolver elem.textContent;
		} else {
			// Atraviesa sus hijos
			para (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				ret + = getText (elem);
			}
		}
	} else if (nodeType === 3 || nodeType === 4) {
		return elem.nodeValue;
	}
	// No incluyen comentarios o nodos de instrucciones de procesamiento

	return ret;
};

Expr = Sizzle.selectors = {

	// Puede ser ajustado por el usuario
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	encontrar: {},

	relativo: {
		">": {dir: "parentNode", primero: true},
		"": {dir: "parentNode"},
		"+": {dir: "previousSibling", primero: true},
		"~": {dir: "previousSibling"}
	},

	Prefiltro: {
		"ATTR": función (coincidencia) {
			match [1] = match [1] .replace (runescape, funescape);

			// Mueve el valor dado para que coincida con [3] si está entre comillas o no.
			match [3] = (match [3] || match [4] || match [5] || "") .replace (runescape, funescape);

			if (match [2] === "~ =") {
				match [3] = "" + match [3] + "";
			}

			return match.slice (0, 4);
		},

		"NIÑO": función (coincidencia) {
			/ * coincide con matchExpr ["CHILD"]
				1 tipo (solo | nth | ...)
				2 qué (niño | de-tipo)
				3 argumento (incluso | impar | \ d * | \ d * n ([+ -] \ d +)? | ...)
				Componente de 4 xn del argumento xn + y ([+ -]? \ D * n |)
				5 signo de xn-componente
				6 x de componente xn
				7 signo de componente y
				8 y de componente y
			* /
			match [1] = match [1] .toLowerCase ();

			if (match [1] .slice (0, 3) === "nth") {
				// nth- * requiere argumento
				if (! match [3]) {
					Sizzle.error (coincidencia [0]);
				}

				// parámetros numéricos xey para Expr.filter.CHILD
				// recuerda ese lanzamiento falso / verdadero respectivamente a 0/1
				match [4] = + (match [4]? match [5] + (match [6] || 1): 2 * (match [3] === "even" || match [3] === " impar" ) );
				coincidencia [5] = + ((coincidencia [7] + coincidencia [8]) || coincidencia [3] === "impar");

			// otros tipos prohíben argumentos
			} else if (match [3]) {
				Sizzle.error (coincidencia [0]);
			}

			partido de vuelta;
		},

		"PSEUDO": función (coincidencia) {
			var exceso,
				unquoted =! match [6] && match [2];

			if (matchExpr ["CHILD"]. test (coincidencia [0])) {
				devolver nulo;
			}

			// Aceptar los argumentos citados como están
			if (match [3]) {
				match [2] = match [4] || partido [5] || "";

			// Elimina el exceso de caracteres de los argumentos no incluidos
			} else if (sin comillas && rpseudo.test (sin comillas) &&
				// Obtener exceso de tokenize (recursivamente)
				(excess = tokenize (sin comillas, verdadero)) &&
				// avanzar al siguiente paréntesis de cierre
				(excess = unquoted.indexOf (")", unquarted.length - excess) - unquoted.length)) {

				// el exceso es un índice negativo
				match [0] = match [0] .slice (0, exceso);
				match [2] = unquoted.slice (0, exceso);
			}

			// Devuelve solo las capturas necesarias por el método de pseudo filtro (tipo y argumento)
			return match.slice (0, 3);
		}
	},

	filtro: {

		"TAG": function (nodeNameSelector) {
			var nodeName = nodeNameSelector.replace (runescape, funescape) .toLowerCase ();
			return nodeNameSelector === "*"?
				function () {return true; }:
				función (elem) {
					return elem.nodeName && elem.nodeName.toLowerCase () === nodeName;
				};
		},

		"CLASS": function (className) {
			var pattern = classCache [className + ""];

			patrón de retorno ||
				(patrón = nuevo RegExp ("(^ |" + espacio en blanco + ")" + nombre de clase + "(" + espacio en blanco + "| $)")) &&
				classCache (className, function (elem) {
					return pattern.test (typeof elem.className === "string" && elem.className || typeof elem.getAttribute! == strundefined && elem.getAttribute ("class") || "");
				});
		},

		"ATTR": función (nombre, operador, control) {
			función de retorno (elem) {
				var result = Sizzle.attr (elem, nombre);

				if (resultado == nulo) {
					operador de retorno === "! =";
				}
				if (! operator) {
					devolver verdadero;
				}

				resultado + = "";

				operador de devolución === "="? resultado === verificación:
					operador === "! ="? resultado! == verificación:
					operador === "^ ="? compruebe && result.indexOf (check) === 0:
					operador === "* ="? verificar && result.indexOf (verificar)> -1:
					operador === "$ ="? verificar && result.slice (-check.length) === verificar:
					operador === "~ ="? ("" + resultado + "") .indexOf (verificar)> -1:
					operador === "| ="? resultado === control || result.slice (0, check.length + 1) === check + "-":
					falso;
			};
		},

		"NIÑO": función (tipo, qué, argumento, primero, último) {
			var simple = type.slice (0, 3)! == "nth",
				forward = type.slice (-4)! == "last",
				ofType = what === "of-type";

			devolver primero === 1 && last === 0?

				// Acceso directo para: nth - * (n)
				función (elem) {
					¡vuelve! elem.parentNode;
				}:

				función (elem, context, xml) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple! == adelante? "nextSibling": "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase (),
						useCache =! xml &&! ofType;

					if (padre) {

						//: (first | last | only) - (child | of-type)
						if (simple) {
							while (dir) {
								nodo = elem;
								while ((node ​​= node [dir])) {
									if (ofType? node.nodeName.toLowerCase () === name: node.nodeType === 1) {
										falso retorno;
									}
								}
								// Dirección inversa para: only- * (si aún no lo hemos hecho)
								start = dir = type === "only" &&! start && "nextSibling";
							}
							devolver verdadero;
						}

						start = [forward? parent.firstChild: parent.lastChild];

						// non-xml: nth-child (...) almacena datos de caché en `parent`
						if (forward && useCache) {
							// Busca `elem` de un índice previamente almacenado en caché
							outerCache = parent [expando] || (padre [expando] = {});
							cache = outerCache [tipo] || [];
							nodeIndex = caché [0] === dirruns && cache [1];
							diff = caché [0] === dirruns && cache [2];
							node = nodeIndex && parent.childNodes [nodeIndex];

							while ((node ​​= ++ nodeIndex && node && node [dir] ||

								// Regreso a la búsqueda de `elem` desde el comienzo
								(diff = nodeIndex = 0) || start.pop ())) {

								// Cuando se encuentra, los índices de caché en `parent` y break
								if (node.nodeType === 1 && ++ diff && node === elem) {
									outerCache [tipo] = [dirruns, nodeIndex, diff];
									descanso;
								}
							}

						// Usa el índice del elemento previamente almacenado en caché si está disponible
						} else if (useCache && (cache = (elem [expando] || (elem [expando] = {})) [tipo]) && cache [0] === dirruns) {
							diff = caché [1];

						// xml: nth-child (...) o: nth-last-child (...) o: nth (-last)? - of-type (...)
						} else {
							// Usa el mismo loop como arriba para buscar `elem` desde el comienzo
							while ((node ​​= ++ nodeIndex && node && node [dir] ||
								(diff = nodeIndex = 0) || start.pop ())) {

								if ((ofType? node.nodeName.toLowerCase () === name: node.nodeType === 1) && ++ diff) {
									// Guarda en caché el índice de cada elemento encontrado
									if (useCache) {
										(nodo [expando] || (nodo [expando] = {})) [tipo] = [dirruns, diff];
									}

									if (node ​​=== elem) {
										descanso;
									}
								}
							}
						}

						// Incorpore el desplazamiento, luego verifique el tamaño del ciclo
						diff - = último;
						return diff === first || (diff% primero === 0 && diff / first> = 0);
					}
				};
		},

		"PSEUDO": función (pseudo, argumento) {
			// los nombres de las pseudoclases no distinguen entre mayúsculas y minúsculas
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Priorizar por mayúsculas y minúsculas en caso de que se agreguen pseudos personalizados con letras mayúsculas
			// Recuerda que setFilters hereda de pseudos
			var args,
				fn = Expr.pseudos [pseudo] || Expr.setFilters [pseudo.toLowerCase ()] ||
					Sizzle.error ("pseudo no compatible:" + pseudo);

			// El usuario puede usar createPseudo para indicar que
			// se necesitan argumentos para crear la función de filtro
			// al igual que Sizzle
			if (fn [expando]) {
				return fn (argumento);
			}

			// Pero mantenemos el soporte para viejas firmas
			if (fn.length> 1) {
				args = [pseudo, pseudo, "", argumento];
				devuelve Expr.setFilters.hasOwnProperty (pseudo.toLowerCase ())?
					markFunction (función (semilla, coincidencias) {
						var idx,
							emparejado = fn (semilla, argumento),
							i = coincidente.length;
						mientras yo-- ) {
							idx = indexOf.call (semilla, coincidente [i]);
							seed [idx] =! (coincide con [idx] = emparejado [i]);
						}
					}):
					función (elem) {
						return fn (elem, 0, args);
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Pseudos potencialmente complejos
		"no": markFunction (función (selector) {
			// Recortar el selector pasado a compilar
			// para evitar el tratamiento de los principales y finales
			// espacios como combinators
			entrada var = [],
				resultados = [],
				matcher = compilar (selector.replace (rtrim, "$ 1"));

			return matcher [expando]?
				markFunction (función (semilla, coincidencias, contexto, xml) {
					var elem,
						incomparable = matcher (semilla, nulo, xml, []),
						i = seed.length;

					// Coincide con los elementos que no coinciden con `matcher`
					mientras yo-- ) {
						if ((elem = no coincidente [i])) {
							seed [i] =! (coincide con [i] = elem);
						}
					}
				}):
				función (elem, context, xml) {
					entrada [0] = elem;
					matcher (entrada, nulo, xml, resultados);
					return! results.pop ();
				};
		}),

		"tiene": markFunction (function (selector) {
			función de retorno (elem) {
				return Sizzle (selector, elem) .length> 0;
			};
		}),

		"contiene": markFunction (función (texto) {
			función de retorno (elem) {
				return (elem.textContent || elem.innerText || getText (elem)) .indexOf (text)> -1;
			};
		}),

		// "Si un elemento está representado por un selector: lang ()
		// se basa únicamente en el valor de idioma del elemento
		// siendo igual al identificador C,
		// o comenzando con el identificador C inmediatamente seguido de "-".
		// La coincidencia de C con el valor de idioma del elemento se realiza sin distinción de mayúsculas y minúsculas.
		// El identificador C no tiene que ser un nombre de idioma válido. "
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction (function (lang) {
			// el valor lang debe ser un identificador válido
			if (! ridentifier.test (lang || ")) {
				Sizzle.error ("lang no compatible:" + lang);
			}
			lang = lang.replace (runescape, funescape) .toLowerCase ();
			función de retorno (elem) {
				var elemLang;
				hacer {
					if ((elemLang = documentIsHTML?
						elem.lang:
						elem.getAttribute ("xml: lang") || elem.getAttribute ("lang"))) {

						elemLang = elemLang.toLowerCase ();
						return elemLang === lang || elemLang.indexOf (lang + "-") === 0;
					}
				} while ((elem = elem.parentNode) && elem.nodeType === 1);
				falso retorno;
			};
		}),

		// Varios
		"objetivo": función (elem) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice (1) === elem.id;
		},

		"raíz": función (elem) {
			return elem === docElem;
		},

		"foco": función (elem) {
			return elem === document.activeElement && (! document.hasFocus || document.hasFocus ()) && !! (elem.type || elem.href || ~ elem.tabIndex);
		},

		// propiedades booleanas
		"habilitado": función (elem) {
			return elem.disabled === falso;
		},

		"deshabilitado": función (elem) {
			return elem.disabled === verdadero;
		},

		"checked": function (elem) {
			// En CSS3,: checked debe devolver los elementos seleccionados y seleccionados
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase ();
			return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected);
		},

		"seleccionado": función (elem) {
			// Acceder a esta propiedad hace que se seleccione por defecto
			// las opciones en Safari funcionan correctamente
			if (elem.parentNode) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === verdadero;
		},

		// Contenido
		"vacío": función (elem) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			//: empty es negado por el elemento (1) o los nodos de contenido (texto: 3; cdata: 4; entidad ref: 5),
			// pero no por otros (comentario: 8; instrucción de procesamiento: 7; etc.)
			// nodeType <6 funciona porque los atributos (2) no aparecen como niños
			para (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				if (elem.nodeType <6) {
					falso retorno;
				}
			}
			devolver verdadero;
		},

		"padre": función (elem) {
			return! Expr.pseudos ["empty"] (elem);
		},

		// Elemento / tipos de entrada
		"encabezado": función (elem) {
			return rheader.test (elem.nodeName);
		},

		"entrada": función (elem) {
			devuelve rinputs.test (elem.nodeName);
		},

		"botón": función (elem) {
			var name = elem.nodeName.toLowerCase ();
			return name === "input" && elem.type === "button" || nombre === "botón";
		},

		"texto": función (elem) {
			var attr;
			return elem.nodeName.toLowerCase () === "input" &&
				elem.type === "text" &&

				// Soporte: IE <8
				// Aparecen nuevos valores de atributo HTML5 (por ejemplo, "búsqueda") con elem.type === "text"
				((attr = elem.getAttribute ("type")) == null || attr.toLowerCase () === "text");
		},

		// Position-in-collection
		"first": createPositionalPseudo (function () {
			devolver [0];
		}),

		"last": createPositionalPseudo (function (matchIndexes, length) {
			return [longitud - 1];
		}),

		"eq": createPositionalPseudo (function (matchIndexes, length, argument) {
			return [argumento <0? argumento + longitud: argumento];
		}),

		"incluso": createPositionalPseudo (function (matchIndexes, length) {
			var i = 0;
			para (; i <longitud; i + = 2) {
				matchIndexes.push (i);
			}
			return matchIndexes;
		}),

		"impar": createPositionalPseudo (function (matchIndexes, length) {
			var i = 1;
			para (; i <longitud; i + = 2) {
				matchIndexes.push (i);
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo (function (matchIndexes, length, argument) {
			var i = argumento <0? argumento + longitud: argumento;
			para (; --i> = 0;) {
				matchIndexes.push (i);
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo (function (matchIndexes, length, argument) {
			var i = argumento <0? argumento + longitud: argumento;
			for (; ++ i <length;) {
				matchIndexes.push (i);
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos ["nth"] = Expr.pseudos ["eq"];

// Añadir botón / tipo de entrada pseudos
para (i en {radio: verdadero, casilla de verificación: verdadero, archivo: verdadero, contraseña: verdadero, imagen: verdadero}) {
	Expr.pseudos [i] = createInputPseudo (i);
}
for (i en {submit: true, reset: true}) {
	Expr.pseudos [i] = createButtonPseudo (i);
}

// API fácil para crear nuevos setFilters
function setFilters () {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters ();

tokenize = Sizzle.tokenize = function (selector, parseOnly) {
	var emparejado, partido, tokens, tipo,
		soFar, grupos, preFiltros,
		cached = tokenCache [selector + ""];

	if (en caché) {
		return parseOnly? 0: cached.slice (0);
	}

	soFar = selector;
	grupos = [];
	preFilters = Expr.preFilter;

	while (soFar) {

		// Coma y primera ejecución
		if (! matching || (match = rcomma.exec (soFar))) {
			if (coincidencia) {
				// No consuma comillas finales como válidas
				soFar = soFar.slice (coincide con [0] .length) || hasta aquí;
			}
			groups.push ((tokens = []));
		}

		emparejado = falso;

		// Combinators
		if ((match = rcombinators.exec (soFar))) {
			emparejado = match.shift ();
			tokens.push ({
				valor: emparejado,
				// Conecta los combinadores descendientes al espacio
				type: match [0] .replace (rtrim, "")
			});
			soFar = soFar.slice (matching.length);
		}

		// Filtros
		para (escriba en Expr.filter) {
			if ((match = matchExpr [tipo] .exec (soFar)) && (! preFilters [tipo] ||
				(match = preFilters [type] (match)))) {
				emparejado = match.shift ();
				tokens.push ({
					valor: emparejado,
					tipo: tipo,
					partidos: partido
				});
				soFar = soFar.slice (matching.length);
			}
		}

		if (! emparejado) {
			descanso;
		}
	}

	// Devuelve la longitud del exceso no válido
	// si solo estamos analizando
	// De lo contrario, lanzar un error o devolver tokens
	return parseOnly?
		soFar.length:
		hasta aquí ?
			Sizzle.error (selector):
			// Guarda en caché los tokens
			tokenCache (selector, grupos) .slice (0);
};

function toSelector (tokens) {
	var i = 0,
		len = tokens.length,
		selector = "";
	para (; i <len; i ++) {
		selector + = tokens [i] .value;
	}
	selector de devolución;
}

función addCombinator (matcher, combinator, base) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done ++;

	volver combinator.first?
		// Verificar contra el ancestro más cercano / elemento precedente
		función (elem, context, xml) {
			while ((elem = elem [dir])) {
				if (elem.nodeType === 1 || checkNonElements) {
					return matcher (elem, context, xml);
				}
			}
		}:

		// Verificar contra todos los ancestros / elementos precedentes
		función (elem, context, xml) {
			var oldCache, outerCache,
				newCache = [dirruns, doneName];

			// No podemos establecer datos arbitrarios en nodos XML, por lo que no se benefician del almacenamiento en caché de directorios
			if (xml) {
				while ((elem = elem [dir])) {
					if (elem.nodeType === 1 || checkNonElements) {
						if (matcher (elem, context, xml)) {
							devolver verdadero;
						}
					}
				}
			} else {
				while ((elem = elem [dir])) {
					if (elem.nodeType === 1 || checkNonElements) {
						outerCache = elem [expando] || (elem [expando] = {});
						if ((oldCache = outerCache [dir]) &&
							oldCache [0] === dirruns && oldCache [1] === doneName) {

							// Asignar a newCache para que los resultados retrocedan a elementos anteriores
							return (newCache [2] = oldCache [2]);
						} else {
							// Reutilizar newcache para que los resultados se propaguen hacia atrás a los elementos anteriores
							outerCache [dir] = newCache;

							// Un partido significa que hemos terminado; un error significa que tenemos que seguir comprobando
							if ((newCache [2] = matcher (elem, context, xml))) {
								devolver verdadero;
							}
						}
					}
				}
			}
		};
}

function elementMatcher (matchers) {
	devolver matchers.length> 1?
		función (elem, context, xml) {
			var i = matchers.length;
			mientras yo-- ) {
				if (! matchers [i] (elem, context, xml)) {
					falso retorno;
				}
			}
			devolver verdadero;
		}:
		matchers [0];
}

function multipleContexts (selector, contextos, resultados) {
	var i = 0,
		len = contexts.length;
	para (; i <len; i ++) {
		Sizzle (selector, contextos [i], resultados);
	}
	resultados de devolución;
}

función condensada (no coincidente, mapa, filtro, contexto, xml) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map! = null;

	para (; i <len; i ++) {
		if ((elem = no coincidente [i])) {
			if (! filter || filter (elem, context, xml)) {
				newUnmatched.push (elem);
				if (mapeado) {
					map.push (i);
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher (preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	if (postFilter &&! postFilter [expando]) {
		postFilter = setMatcher (postFilter);
	}
	if (postFinder &&! postFinder [expando]) {
		postFinder = setMatcher (postFinder, postSelector);
	}
	return markFunction (función (semilla, resultados, contexto, xml) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexistente = results.length,

			// Obtener elementos iniciales de semilla o contexto
			elems = semilla || multipleContexts (selector || "*", context.nodeType? [context]: context, []),

			// Prefilter para obtener la entrada de matcher, preservando un mapa para la sincronización de resultados de inicialización
			matcherIn = preFilter && (seed || selector)?
				condense (elems, preMap, preFilter, context, xml):
				Elems,

			matcherOut = matcher?
				// Si tenemos un postFinder, o seed filtrado, o postFilter no semilla o resultados preexistentes,
				postFinder || (seed? preFilter: preexisting || postFilter)?

					// ... es necesario un procesamiento intermedio
					[]:

					// ... de lo contrario, usa los resultados directamente
					resultados:
				matcherIn;

		// Encuentra coincidencias principales
		if (matcher) {
			matcher (matcherIn, matcherOut, context, xml);
		}

		// Aplicar postFilter
		if (postFilter) {
			temp = condense (matcherOut, postMap);
			postFilter (temp, [], context, xml);

			// Ignorar elementos que fallan volviendo a moverlos a matcherIn
			i = temp.length;
			mientras yo-- ) {
				if ((elem = temp [i])) {
					matcherOut [postMap [i]] =! (matcherIn [postMap [i]] = elem);
				}
			}
		}

		si (semilla) {
			if (postFinder || preFilter) {
				if (postFinder) {
					// Obtenga el matcherOut final al condensar este intermedio en contextos postFinder
					temp = [];
					i = matcherOut.length;
					mientras yo-- ) {
						if ((elem = matcherOut [i])) {
							// Restaurar matcherIn ya que elem aún no es una coincidencia final
							temp.push ((matcherIn [i] = elem));
						}
					}
					postFinder (null, (matcherOut = []), temp, xml);
				}

				// Mueva los elementos coincidentes de la semilla a los resultados para mantenerlos sincronizados
				i = matcherOut.length;
				mientras yo-- ) {
					if ((elem = matcherOut [i]) &&
						(temp = postFinder? indexOf.call (seed, elem): preMap [i])> -1) {

						seed [temp] =! (results [temp] = elem);
					}
				}
			}

		// Agregar elementos a los resultados, a través de postFinder si está definido
		} else {
			matcherOut = condensado (
				matcherOut === resultados?
					matcherOut.splice (preexistente, matcherOut.length):
					matcherOut
			);
			if (postFinder) {
				postFinder (null, resultados, matcherOut, xml);
			} else {
				push.apply (resultados, matcherOut);
			}
		}
	});
}

function matcherFromTokens (tokens) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative [tokens [0] .type],
		implicitRelative = leadingRelative || Expr.relative [""],
		i = leadingRelative? 1: 0,

		// El matcher fundacional asegura que los elementos son alcanzables desde el (los) contexto (s) de nivel superior
		matchContext = addCombinator (función (elem) {
			return elem === checkContext;
		}, implicitRelative, true),
		matchAnyContext = addCombinator (function (elem) {
			return indexOf.call (checkContext, elem)> -1;
		}, implicitRelative, true),
		matchers = [function (elem, context, xml) {
			return (! leadingRelative && (xml || context! == outermostContext)) || (
				(checkContext = context) .nodeType?
					matchContext (elem, context, xml):
					matchAnyContext (elem, context, xml));
		}];

	para (; i <len; i ++) {
		if ((matcher = Expr.relative [tokens [i] .type])) {
			matchers = [addCombinator (elementMatcher (matchers), matcher)];
		} else {
			matcher = Expr.filter [tokens [i] .type] .apply (null, tokens [i] .matches);

			// Retorno especial al ver un matcher posicional
			if (matcher [expando]) {
				// Encuentra el siguiente operador relativo (si lo hay) para un manejo adecuado
				j = ++ i;
				para (; j <len; j ++) {
					if (Expr.relative [tokens [j] .type]) {
						descanso;
					}
				}
				devuelve setMatcher (
					i> 1 && elementMatcher (matchers),
					i> 1 && toSelector (
						// Si el token anterior era un combinador descendiente, inserte un elemento any implícito `*`
						tokens.slice (0, i - 1) .concat ({value: tokens [i - 2] .type === ""? "" * ":" "})
					) .replace (rtrim, "$ 1"),
					matcher,
					i <j && matcherFromTokens (tokens.slice (i, j)),
					j <len && matcherFromTokens ((tokens = tokens.slice (j))),
					j <len && toSelector (tokens)
				);
			}
			matchers.push (matcher);
		}
	}

	return elementMatcher (matchers);
}

function matcherFromGroupMatchers (elementMatchers, setMatchers) {
	var bySet = setMatchers.length> 0,
		byElement = elementMatchers.length> 0,
		superMatcher = function (semilla, contexto, xml, resultados, más externo) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				inigualable = semilla && [],
				setMatched = [],
				contextBackup = outermostContext,
				// Siempre debemos tener elementos semilla o el contexto más externo
				elems = semilla || byElement && Expr.find ["TAG"] ("*", más externo),
				// Usa dirruns enteros iff este es el matcher más externo
				dirrunsUnique = (dirruns + = contextBackup == null? 1: Math.random () || 0.1),
				len = elems.length;

			if (outermost) {
				outermostContext = context! == document && context;
			}

			// Agregar elementos que pasen elementMatchers directamente a los resultados
			// Mantenga `i` una cadena si no hay elementos, por lo que` matchedCount` será "00" a continuación
			// Soporte: IE <9, Safari
			// Tolerar las propiedades de NodeList (IE: "length"; Safari: <number>) haciendo coincidir elementos por id
			para (; i! == len && (elem = elems [i])! = null; i ++) {
				if (byElement && elem) {
					j = 0;
					while ((matcher = elementMatchers [j ++])) {
						if (matcher (elem, context, xml)) {
							results.push (elem);
							descanso;
						}
					}
					if (outermost) {
						dirruns = dirrunsUnique;
					}
				}

				// Seguimiento de elementos no coincidentes para establecer filtros
				if (bySet) {
					// Habrán pasado por todas las parejas posibles
					if ((elem =! matcher && elem)) {
						matchingCount--;
					}

					// Alarga la matriz para cada elemento, coincide o no
					si (semilla) {
						unmatched.push (elem);
					}
				}
			}

			// Aplicar filtros de conjunto a elementos no coincidentes
			matchingCount + = i;
			if (bySet && i! == matchedCount) {
				j = 0;
				while ((matcher = setMatchers [j ++])) {
					matcher (sin igual, setMatched, context, xml);
				}

				si (semilla) {
					// Reintegrar las coincidencias de elementos para eliminar la necesidad de clasificar
					if (matchingCount> 0) {
						mientras yo-- ) {
							if (! (inigualable [i] || setMatched [i])) {
								setMatched [i] = pop.call (resultados);
							}
						}
					}

					// Descartar valores de marcador de posición de índice para obtener solo coincidencias reales
					setMatched = condense (setMatched);
				}

				// Añadir coincidencias a los resultados
				push.apply (results, setMatched);

				// Las combinaciones de conjuntos sin semillas que suceden con éxito en varias combinaciones exitosas estipulan la clasificación
				if (outermost &&! seed && setMatched.length> 0 &&
					(matchedCount + setMatchers.length)> 1) {

					Sizzle.uniqueSort (resultados);
				}
			}

			// Anula la manipulación de globales por parte de los marcadores anidados
			if (outermost) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			regreso sin igual;
		};

	volver por Set?
		markFunction (superMatcher):
		superMatcher;
}

compile = Sizzle.compile = function (selector, coincidencia / * Solo uso interno * /) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache [selector + ""];

	if (! cached) {
		// Genera una función de funciones recursivas que se puede usar para verificar cada elemento
		if (! match) {
			match = tokenize (selector);
		}
		i = match.length;
		mientras yo-- ) {
			cached = matcherFromTokens (coincidencia [i]);
			if (en caché [expando]) {
				setMatchers.push (en caché);
			} else {
				elementMatchers.push (en caché);
			}
		}

		// Guarda en caché la función compilada
		cached = compilerCache (selector, matcherFromGroupMatchers (elementMatchers, setMatchers));

		// Guardar selector y tokenización
		cached.selector = selector;
	}
	devolver en caché;
};

/ **
 * Una función de selección de bajo nivel que funciona con compilado de Sizzle
 * funciones de selector
 * Selector @param {String | Function} Selector o precompilado
 * Función de selector construida con Sizzle.compile
 * contexto @param {Element}
 * @param {Array} [resultados]
 * @param {Array} [seed] Un conjunto de elementos para hacer coincidir
 * /
select = Sizzle.select = function (selector, contexto, resultados, semilla) {
	var i, tokens, token, tipo, buscar,
		compiled = typeof selector === "function" && selector,
		match =! seed && tokenize ((selector = compiled.selector || selector));

	resultados = resultados || [];

	// Intenta minimizar las operaciones si no hay semilla y solo un grupo
	if (match.length === 1) {

		// Tome un atajo y establezca el contexto si el selector de raíz es una ID
		tokens = match [0] = match [0] .slice (0);
		if (tokens.length> 2 && (token = tokens [0]). tipo === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative [tokens [1] .type]) {

			context = (Expr.find ["ID"] (token.matches [0] .replace (runescape, funescape), context) || []) [0];
			if (! context) {
				resultados de devolución;

			// Los emparejamientos precompilados aún verificarán ancestros, así que sube un nivel
			} else if (compilado) {
				context = context.parentNode;
			}

			selector = selector.slice (tokens.shift (). value.length);
		}

		// Obtener un conjunto de semillas para la correspondencia de derecha a izquierda
		i = matchExpr ["needsContext"]. test (selector)? 0: tokens.length;
		mientras yo-- ) {
			token = tokens [i];

			// abortar si golpeamos un combinador
			if (Expr.relative [(type = token.type)]) {
				descanso;
			}
			if ((find = Expr.find [type])) {
				// Buscar, expandir el contexto para los principales combinadores de hermanos
				if ((semilla = encontrar (
					token.matches [0] .replace (runescape, funescape),
					rsibling.test (tokens [0] .type) && testContext (context.parentNode) || contexto
				))) {

					// Si seed está vacío o no quedan tokens, podemos regresar temprano
					tokens.splice (i, 1);
					selector = seed.length && toSelector (tokens);
					if (! selector) {
						push.apply (resultados, semilla);
						resultados de devolución;
					}

					descanso;
				}
			}
		}
	}

	// Compila y ejecuta una función de filtrado si no se proporciona una
	// Proporcionar `match` para evitar la retoqueización si modificamos el selector anterior
	(compilado || compilar (selector, partido)) (
		semilla,
		contexto,
		! documentIsHTML,
		resultados,
		rsibling.test (selector) && testContext (context.parentNode) || contexto
	);
	resultados de devolución;
};

// asignaciones de una sola vez

// Clasificar estabilidad
support.sortStable = expando.split (""). sort (sortOrder) .join ("") === expando;

// Soporte: Chrome <14
// Siempre asume duplicados si no se pasan a la función de comparación
support.detectDuplicates = !! hasDuplicate;

// Initialize contra el documento predeterminado
setDocument ();

// Soporte: Webkit <537.32 - Safari 6.0.3 / Chrome 25 (arreglado en Chrome 27)
// Los nodos independientes se suceden de manera confusa * el uno al otro *
support.sortDetached = assert (function (div1) {
	// Debería devolver 1, pero devuelve 4 (siguiente)
	return div1.compareDocumentPosition (document.createElement ("div")) & 1;
});

// Soporte: IE <8
// Prevenir la "interpolación" de atributo / propiedad
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if (! assert (function (div) {
	div.innerHTML = "<a href='#'> </a>";
	devuelve div.firstChild.getAttribute ("href") === "#";
})) {
	addHandle ("tipo | href | alto | ancho", función (elem, nombre, isXML) {
		if (! isXML) {
			return elem.getAttribute (name, name.toLowerCase () === "type"? 1: 2);
		}
	});
}

// Soporte: IE <9
// Usa defaultValue en lugar de getAttribute ("value")
if (! support.attributes ||! assert (function (div) {
	div.innerHTML = "<input />";
	div.firstChild.setAttribute ("valor", "");
	devuelve div.firstChild.getAttribute ("valor") === "";
})) {
	addHandle ("valor", función (elem, nombre, isXML) {
		if (! isXML && elem.nodeName.toLowerCase () === "input") {
			return elem.defaultValue;
		}
	});
}

// Soporte: IE <9
// Usa getAttributeNode para buscar booleanos cuando getAttribute mentiras
if (! assert (function (div) {
	return div.getAttribute ("disabled") == null;
})) {
	addHandle (booleanos, función (elem, nombre, isXML) {
		var val;
		if (! isXML) {
			return elem [nombre] === ¿verdad? name.toLowerCase ():
					(val = elem.getAttributeNode (name)) && val.specified?
					val.value:
				nulo;
		}
	});
}

devolver Sizzle;

})( ventana );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr [":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/ ^ <(\ w +) \ s * \ /?> (?: <\ / \ 1> |) $ /);



var risSimple = /^.[^:#\[\.,]*$/;

// Implementa la funcionalidad idéntica para filtro y no
función winnow (elementos, calificador, no) {
	if (jQuery.isFunction (calificador)) {
		return jQuery.grep (elementos, función (elem, i) {
			/ * jshint -W018 * /
			¡regreso! calificador.call (elem, i, elem)! == no;
		});

	}

	if (qualifier.nodeType) {
		return jQuery.grep (elementos, función (elem) {
			return (elem === calificador)! == no;
		});

	}

	if (tipo de calificador === "cadena") {
		if (risSimple.test (calificador)) {
			return jQuery.filter (calificador, elementos, no);
		}

		qualifier = jQuery.filter (calificador, elementos);
	}

	return jQuery.grep (elementos, función (elem) {
		return (jQuery.inArray (elem, calificador)> = 0)! == no;
	});
}

jQuery.filter = function (expr, elems, not) {
	var elem = elems [0];

	si no ) {
		expr = ": not (" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1?
		jQuery.find.matchesSelector (elem, expr)? [elem]: []:
		jQuery.find.matches (expr, jQuery.grep (elems, function (elem) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend ({
	find: function (selector) {
		var i,
			ret = [],
			self = esto,
			len = self.length;

		if (typeof selector! == "cadena") {
			return this.pushStack (jQuery (selector) .filter (function () {
				para (i = 0; i <len; i ++) {
					if (jQuery.contains (self [i], this)) {
						devolver verdadero;
					}
				}
			}));
		}

		para (i = 0; i <len; i ++) {
			jQuery.find (selector, self [i], ret);
		}

		// Necesario porque $ (selector, contexto) se convierte en $ (contexto) .find (selector)
		ret = this.pushStack (len> 1? jQuery.unique (ret): ret);
		ret.selector = this.selector? this.selector + "" + selector: selector;
		return ret;
	},
	filter: function (selector) {
		devuelve this.pushStack (winnow (this, selector || [], false));
	},
	no: función (selector) {
		devuelve this.pushStack (winnow (this, selector || [], true));
	},
	es: function (selector) {
		¡regreso!
			esta,

			// Si este es un selector posicional / relativo, verifique la membresía en el conjunto devuelto
			// tan $ ("p: first"). is ("p: last") no devolverá true para un documento con dos "p".
			typeof selector === "cadena" && rneedsContext.test (selector)?
				jQuery (selector):
				selector || [],
			falso
		).longitud;
	}
});


// Inicializar un objeto jQuery


// Una referencia central a la raíz jQuery (documento)
var rootjQuery,

	// Usa el documento correcto de acuerdo con el argumento de ventana (sandbox)
	document = window.document,

	// Una forma simple de verificar cadenas de HTML
	// Prioriza a #id sobre <etiqueta> para evitar XSS a través de location.hash (# 9521)
	// Estricto reconocimiento HTML (# 11290: debe comenzar con <)
	rquickExpr = / ^ (?: \ s * (<[\ w \ W] +>) [^>] * | # ([\ w -] *)) $ /,

	init = jQuery.fn.init = function (selector, contexto) {
		var match, elem;

		// MANEJO: $ (""), $ (nulo), $ (indefinido), $ (falso)
		if (! selector) {
			devuelve esto;
		}

		// Manejar cadenas de HTML
		if (typeof selector === "cadena") {
			if (selector.charAt (0) === "<" && selector.charAt (selector.length - 1) === ">" && selector.length> = 3) {
				// Supongamos que las cadenas que comienzan y terminan con <> son HTML y omiten la comprobación de expresiones regulares
				match = [null, selector, null];

			} else {
				match = rquickExpr.exec (selector);
			}

			// Haga coincidir html o asegúrese de que no se especifique ningún contexto para #id
			if (match && (match [1] ||! context)) {

				// HANDLE: $ (html) -> $ (array)
				if (match [1]) {
					contexto = instancia de contexto de jQuery? contexto [0]: contexto;

					// scripts es cierto para back-compat
					// Permitir intencionalmente que se produzca el error si parseHTML no está presente
					jQuery.merge (this, jQuery.parseHTML (
						partido [1],
						context && context.nodeType? context.ownerDocument || contexto: documento,
						cierto
					));

					// HANDLE: $ (html, props)
					if (rsingleTag.test (match [1]) && jQuery.isPlainObject (context)) {
						para (partido en contexto) {
							// Las propiedades del contexto se llaman como métodos si es posible
							if (jQuery.isFunction (this [match])) {
								este [partido] (contexto [partido]);

							// ... y configurados como atributos
							} else {
								this.attr (coincidencia, contexto [coincidencia]);
							}
						}
					}

					devuelve esto;

				// HANDLE: $ (# id)
				} else {
					elem = document.getElementById (coincidencia [2]);

					// Ver parentNode para capturar cuando Blackberry 4.6 regresa
					// nodos que ya no están en el documento # 6963
					if (elem && elem.parentNode) {
						// Manejar el caso donde IE y Opera devuelven elementos
						// por nombre en lugar de ID
						if (elem.id! == match [2]) {
							return rootjQuery.find (selector);
						}

						// De lo contrario, inyectamos el elemento directamente en el objeto jQuery
						this.length = 1;
						esto [0] = elem;
					}

					this.context = documento;
					this.selector = selector;
					devuelve esto;
				}

			// HANDLE: $ (expr, $ (...))
			} else if (! context || context.jquery) {
				return (contexto || rootjQuery) .find (selector);

			// HANDLE: $ (expr, context)
			// (que es solo equivalente a: $ (context) .find (expr)
			} else {
				return this.constructor (context) .find (selector);
			}

		// HANDLE: $ (DOMElement)
		} else if (selector.nodeType) {
			this.context = this [0] = selector;
			this.length = 1;
			devuelve esto;

		// HANDLE: $ (función)
		// Acceso directo para documentos listos
		} else if (jQuery.isFunction (selector)) {
			return typeof rootjQuery.ready! == "undefined"?
				rootjQuery.ready (selector):
				// Ejecutar inmediatamente si ready no está presente
				selector (jQuery);
		}

		if (selector.selector! == undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray (selector, esto);
	};

// Dale a la función init el prototipo de jQuery para una instanciación posterior
init.prototype = jQuery.fn;

// Inicializar referencia central
rootjQuery = jQuery (documento);


var rparentsprev = / ^ (?: parents | prev (?: Until | All)) /,
	// métodos garantizados para producir un conjunto único cuando se comienza desde un conjunto único
	guaranteedUnique = {
		niños: cierto,
		contenido: verdadero,
		siguiente: cierto,
		prev: cierto
	};

jQuery.extend ({
	dir: function (elem, dir, until) {
		var emparejado = [],
			cur = elem [dir];

		while (cur && cur.nodeType! == 9 && (hasta === undefined || cur.nodeType! == 1 ||! jQuery (cur) .is (until))) {
			if (cur.nodeType === 1) {
				emparejado.push (cur);
			}
			cur = cur [dir];
		}
		regreso emparejado;
	},

	hermano: función (n, elem) {
		var r = [];

		para (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n! == elem) {
				r.push (n);
			}
		}

		devolver r;
	}
});

jQuery.fn.extend ({
	tiene: función (destino) {
		var i,
			targets = jQuery (target, this),
			len = targets.length;

		return this.filter (function () {
			para (i = 0; i <len; i ++) {
				if (jQuery.contains (this, targets [i])) {
					devolver verdadero;
				}
			}
		});
	},

	más cercano: función (selectores, contexto) {
		var cur,
			i = 0,
			l = this.length,
			emparejado = [],
			pos = rneedsContext.test (selectores) || typeof selectores! == "cadena"?
				jQuery (selectores, contexto || this.context):
				0;

		para (; i <l; i ++) {
			para (cur = this [i]; cur && cur! == context; cur = cur.parentNode) {
				// Siempre salte fragmentos de documentos
				if (cur.nodeType <11 && (pos?
					pos.index (cur)> -1:

					// No pases elementos que no sean a Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector (cur, selectores))) {

					emparejado.push (cur);
					descanso;
				}
			}
		}

		return this.pushStack (coincidente.length> 1? jQuery.unique (coincidente): coincidente);
	},

	// Determinar la posición de un elemento dentro
	// el conjunto combinado de elementos
	índice: función (elem) {

		// Sin argumento, índice de devolución en el padre
		if (! elem) {
			return (this [0] && this [0] .parentNode)? this.first (). prevAll (). length: -1;
		}

		// índice en selector
		if (typeof elem === "cadena") {
			return jQuery.inArray (esto [0], jQuery (elem));
		}

		// Ubica la posición del elemento deseado
		return jQuery.inArray (
			// Si recibe un objeto jQuery, se usa el primer elemento
			elem.jquery? elem [0]: elem, esto);
	},

	agregar: función (selector, contexto) {
		devuelve this.pushStack (
			jQuery.unique (
				jQuery.merge (this.get (), jQuery (selector, contexto))
			)
		);
	},

	addBack: function (selector) {
		devuelve this.add (selector == null?
			this.prevObject: this.prevObject.filter (selector)
		);
	}
});

hermano de función (cur, dir) {
	hacer {
		cur = cur [dir];
	} while (cur && cur.nodeType! == 1);

	devolver cur;
}

jQuery.each ({
	padre: función (elem) {
		var parent = elem.parentNode;
		return parent && parent.nodeType! == 11? padre: nulo;
	},
	padres: función (elem) {
		devuelve jQuery.dir (elem, "parentNode");
	},
	parentsUntil: function (elem, i, until) {
		devuelve jQuery.dir (elem, "parentNode", hasta);
	},
	siguiente: función (elem) {
		hermano de regreso (elem, "nextSibling");
	},
	prev: function (elem) {
		hermano de regreso (elem, "hermano anterior");
	},
	nextAll: function (elem) {
		devuelve jQuery.dir (elem, "nextSibling");
	},
	prevAll: function (elem) {
		return jQuery.dir (elem, "previousSibling");
	},
	nextUntil: function (elem, i, until) {
		devuelve jQuery.dir (elem, "nextSibling", hasta);
	},
	prevUntil: function (elem, i, until) {
		devuelve jQuery.dir (elem, "previousSibling", hasta);
	},
	hermanos: función (elem) {
		return jQuery.sibling ((elem.parentNode || {}) .firstChild, elem);
	},
	hijos: función (elem) {
		return jQuery.sibling (elem.firstChild);
	},
	contenido: función (elem) {
		return jQuery.nodeName (elem, "iframe")?
			elem.contentDocument || elem.contentWindow.document:
			jQuery.merge ([], elem.childNodes);
	}
}, función (nombre, fn) {
	jQuery.fn [name] = function (until, selector) {
		var ret = jQuery.map (this, fn, until);

		if (name.slice (-5)! == "Until") {
			selector = hasta;
		}

		if (selector && typeof selector === "cadena") {
			ret = jQuery.filter (selector, ret);
		}

		if (this.length> 1) {
			// Eliminar duplicados
			if (! guaranteedUnique [nombre]) {
				ret = jQuery.unique (ret);
			}

			// orden inverso para los padres * y derivados previos
			if (rparentsprev.test (name)) {
				ret = ret.reverse ();
			}
		}

		devuelve this.pushStack (ret);
	};
});
var rnotwhite = (/ \ S + / g);



// caché de formato de cadenas de opciones de objetos
var optionsCache = {};

// Convierte las opciones formateadas en String en formateadas por objetos y las almacena en caché
function createOptions (opciones) {
	var object = optionsCache [opciones] = {};
	jQuery.each (options.match (rnotwhite) || [], function (_, flag) {
		objeto [flag] = verdadero;
	});
	objeto de retorno;
}

/ *
 * Crea una lista de devolución de llamada utilizando los siguientes parámetros:
 *
 * opciones: una lista opcional de opciones separadas por espacios que cambiarán la forma
 * la lista de devolución de llamada se comporta o un objeto de opción más tradicional
 *
 * Por defecto, una lista de devolución de llamada actuará como una lista de devolución de eventos y puede ser
 * "disparado" varias veces.
 *
 * Posibles opciones:
 *
 * una vez: se asegurará de que la lista de devolución de llamada solo se active una vez (como un aplazado)
 *
 * memoria: hará un seguimiento de los valores anteriores y llamará a cualquier devolución de llamada agregada
 * después de que la lista ha sido disparada de inmediato con la última "memorización"
 * valores (como un aplazado)
 *
 * unique: asegurará que una devolución de llamada solo se pueda agregar una vez (no hay duplicados en la lista)
 *
 * stopOnFalse: interrumpe las llamadas cuando una devolución de llamada devuelve falso
 *
 * /
jQuery.Callbacks = function (opciones) {

	// Convierte las opciones de formato de cadena a formato de objeto si es necesario
	// (registramos la caché primero)
	opciones = tipo de opciones === "cadena"?
		(optionsCache [opciones] || createOptions (opciones)):
		jQuery.extend ({}, opciones);

	var // Flag para saber si la lista está actualmente activa
		disparo,
		// Último valor de fuego (para listas no olvidables)
		memoria,
		// Marca para saber si la lista ya se activó
		despedido,
		// Fin del ciclo al disparar
		despidoLongitud,
		// Índice de devolución de llamada activa (modificada por eliminar si es necesario)
		disparar índice,
		// Primera devolución de llamada al fuego (utilizada internamente por add y fireWith)
		disparandoInicio,
		// Lista de devolución real
		list = [],
		// La pila de fuego requiere listas repetibles
		stack =! options.once && [],
		// devolución de llamada de fuego
		fuego = función (datos) {
			memory = options.memory && data;
			disparado = verdadero;
			disparandoIndex = disparandoInicio || 0;
			disparandoStart = 0;
			firingLength = list.length;
			disparando = verdadero;
			para (; list && fuegoIndex <fuegoDeLuego; índicedefuego ++) {
				if (lista [igningIndex] .apply (data [0], data [1]) === false && options.stopOnFalse) {
					memoria = falso; // Para prevenir más llamadas usando add
					descanso;
				}
			}
			disparando = falso;
			if (lista) {
				if (pila) {
					if (stack.length) {
						fuego (stack.shift ());
					}
				} else if (memoria) {
					list = [];
				} else {
					self.disable ();
				}
			}
		},
		// objeto de devolución de llamada real
		self = {
			// Agregar una devolución de llamada o una colección de devoluciones de llamada a la lista
			agregar: función () {
				if (lista) {
					// Primero, guardamos la longitud actual
					var start = list.length;
					(función add (args) {
						jQuery.each (args, function (_, arg) {
							var type = jQuery.type (arg);
							if (tipo === "función") {
								if (! options.unique ||! self.has (arg)) {
									list.push (arg);
								}
							} else if (arg && arg.length && type! == "cadena") {
								// Inspeccionar recursivamente
								agregar (arg);
							}
						});
					}) (argumentos);
					// ¿Necesitamos agregar las devoluciones de llamada al
					// lote de encendido actual?
					si (disparando) {
						firingLength = list.length;
					// Con memoria, si no estamos disparando, entonces
					// deberíamos llamar de inmediato
					} else if (memoria) {
						disparandoInicio = inicio;
						fuego (memoria);
					}
				}
				devuelve esto;
			},
			// Eliminar una devolución de llamada de la lista
			remove: function () {
				if (lista) {
					jQuery.each (argumentos, función (_, arg) {
						índice de var;
						while ((index = jQuery.inArray (arg, list, index))> -1) {
							list.splice (índice, 1);
							// Manejar índices de tiro
							si (disparando) {
								if (index <= despedidaLongitud) {
									FiringLength--;
								}
								if (index <= fuegoIndex) {
									disparandoIndex--;
								}
							}
						}
					});
				}
				devuelve esto;
			},
			// Compruebe si una devolución de llamada dada está en la lista.
			// Si no se da ningún argumento, regrese si la lista tiene callbacks adjuntos o no.
			tiene: function (fn) {
				volver fn? jQuery.inArray (fn, list)> -1: !! (list && list.length);
			},
			// Eliminar todas las devoluciones de llamada de la lista
			empty: function () {
				list = [];
				igniciónLength = 0;
				devuelve esto;
			},
			// Hacer que la lista ya no haga nada
			disable: function () {
				list = stack = memory = undefined;
				devuelve esto;
			},
			// ¿Está deshabilitado?
			disabled: function () {
				lista de regreso!
			},
			// Bloquea la lista en su estado actual
			lock: function () {
				stack = undefined;
				if (! memoria) {
					self.disable ();
				}
				devuelve esto;
			},
			// ¿Está bloqueado?
			locked: function () {
				volver! pila;
			},
			// Llamar a todas las devoluciones de llamada con el contexto y los argumentos dados
			fireWith: function (context, args) {
				if (lista && (! fired || stack)) {
					args = args || [];
					args = [context, args.slice? args.slice (): args];
					si (disparando) {
						stack.push (args);
					} else {
						fuego (args);
					}
				}
				devuelve esto;
			},
			// Llamar a todas las devoluciones de llamada con los argumentos dados
			fuego: función () {
				self.fireWith (esto, argumentos);
				devuelve esto;
			},
			// Para saber si las devoluciones de llamada ya se han llamado al menos una vez
			disparado: function () {
				¡vuelve! despedido;
			}
		};

	volverse a sí mismo;
};


jQuery.extend ({

	Deferido: función (func) {
		var tuples = [
				// acción, agregar oyente, lista de oyentes, estado final
				["resolver", "hecho", jQuery.Callbacks ("una vez que la memoria"), "resuelto"],
				["rechazo", "falla", jQuery.Callbacks ("memoria de una vez"), "rechazado"],
				["notificar", "progreso", jQuery.Callbacks ("memoria")]
			],
			estado = "pendiente",
			promesa = {
				función estatal() {
					estado de devolución;
				},
				siempre: función () {
					deferred.done (argumentos) .fail (argumentos);
					devuelve esto;
				},
				then: function (/ * fnDone, fnFail, fnProgress * /) {
					var fns = argumentos;
					return jQuery.Deferred (function (newDefer) {
						jQuery.each (tuplas, función (i, tupla) {
							var fn = jQuery.isFunction (fns [i]) && fns [i];
							// diferido [hecho | fallar | progress] para reenviar acciones a newDefer
							diferido [tupla [1]] (función () {
								var returned = fn && fn.apply (esto, argumentos);
								if (returned && jQuery.isFunction (returned.promise)) {
									returned.promise ()
										.done (newDefer.resolve)
										.fail (newDefer.reject)
										.progress (newDefer.notify);
								} else {
									newDefer [tuple [0] + "With"] (this === promise? newDefer.promise (): this, fn? [returned]: arguments);
								}
							});
						});
						fns = null;
					}).promesa();
				},
				// Obtenga una promesa para este diferido
				// Si se proporciona obj, el aspecto de promesa se agrega al objeto
				promesa: función (obj) {
					return obj! = null? jQuery.extend (obj, promesa): promesa;
				}
			},
			diferido = {};

		// Keep pipe para back-compat
		promise.pipe = promise.then;

		// Añadir métodos específicos de la lista
		jQuery.each (tuplas, función (i, tupla) {
			var list = tuple [2],
				stateString = tuple [3];

			// promesa [hecho | fallar | progress] = list.add
			promesa [tuple [1]] = list.add;

			// Manejar el estado
			if (stateString) {
				list.add (function () {
					// estado = [resuelto | rechazado]
					state = stateString;

				// [reject_list | resolve_list] .disable; progress_list.lock
				}, tuplas [i ^ 1] [2] .disable, tuplas [2] [2] .lock);
			}

			// diferido [resolver | rechazar | notificar]
			diferido [tuple [0]] = function () {
				diferido [tupla [0] + "Con"] (esto === promesa diferida: esto, argumentos);
				devuelve esto;
			};
			diferido [tuple [0] + "Con"] = list.fireWith;
		});

		// Hacer que el diferido sea una promesa
		promesa.promiso (diferido);

		// Llamar func dado si hay alguno
		if (func) {
			func.call (diferido, diferido);
		}

		// ¡Todo listo!
		devolución diferida;
	},

	// Ayudante diferido
	cuando: función (subordinado / *, ..., subordinadoN * /) {
		var i = 0,
			resolveValues ​​= slice.call (argumentos),
			length = resolveValues.length,

			// el conteo de subordinados incompletos
			restante = longitud! == 1 || (subordinado && jQuery.isFunction (subordinate.promise))? longitud: 0,

			// el maestro diferido Si los valores de resolución consisten en un solo diferido, solo use eso.
			diferido = restante === 1? subordinado: jQuery.Deferred (),

			// Función de actualización para ambos valores de resolución y progreso
			updateFunc = function (i, contexts, values) {
				función de retorno (valor) {
					contextos [i] = esto;
					values ​​[i] = arguments.length> 1? slice.call (argumentos): valor;
					if (valores === progressValues) {
						deferred.notifyWith (contextos, valores);

					} else if (! (- restante)) {
						deferred.resolveWith (contextos, valores);
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// agregar oyentes a los subordinados diferidos; tratar a los demás como resueltos
		if (longitud> 1) {
			progressValues ​​= new Array (longitud);
			progressContexts = new Array (longitud);
			resolveContexts = new Array (longitud);
			para (; i <longitud; i ++) {
				if (resolveValues ​​[i] && jQuery.isFunction (resolveValues ​​[i] .promise)) {
					resolveValues ​​[i] .promise ()
						.done (updateFunc (i, resolveContexts, resolveValues))
						.fail (deferred.reject)
						.progress (updateFunc (i, progressContexts, progressValues));
				} else {
					--restante;
				}
			}
		}

		// si no estamos esperando nada, resuelve el maestro
		if (! remaining) {
			deferred.resolveWith (resolveContexts, resolveValues);
		}

		return deferred.promise ();
	}
});


// El diferido utilizado en DOM listo
var lista lista;

jQuery.fn.ready = function (fn) {
	// Agregar la devolución de llamada
	jQuery.ready.promise (). done (fn);

	devuelve esto;
};

jQuery.extend ({
	// ¿El DOM está listo para ser utilizado? Establezca en verdadero una vez que ocurre.
	isReady: falso,

	// Un contador para rastrear cuántos artículos esperar antes
	// el evento listo se dispara. Ver # 6781
	ReadyWait: 1,

	// Mantenga (o suelte) el evento listo
	holdReady: function (hold) {
		if (mantener) {
			jQuery.readyWait ++;
		} else {
			jQuery.ready (verdadero);
		}
	},

	// Manejar cuando el DOM está listo
	listo: función (espera) {

		// Abortar si hay retenciones pendientes o ya estamos listas
		if (wait === true? --jQuery.readyWait: jQuery.isReady) {
			regreso;
		}

		// Asegúrate de que el cuerpo exista, al menos, en caso de que el IE se vuelva un poco entusiasta (ticket # 5443).
		if (! document.body) {
			devuelve setTimeout (jQuery.ready);
		}

		// Recuerda que el DOM está listo
		jQuery.isReady = verdadero;

		// Si un evento DOM Ready normal se dispara, disminuye y espera si es necesario
		if (wait! == true && --jQuery.readyWait> 0) {
			regreso;
		}

		// Si hay funciones enlazadas, ejecutar
		readyList.resolveWith (document, [jQuery]);

		// Dispara cualquier evento listo enlazado
		if (jQuery.fn.triggerHandler) {
			jQuery (document) .triggerHandler ("listo");
			jQuery (documento) .off ("listo");
		}
	}
});

/ **
 * Método de limpieza para eventos dom ready
 * /
function detach () {
	if (document.addEventListener) {
		document.removeEventListener ("DOMContentLoaded", completado, falso);
		window.removeEventListener ("carga", completado, falso);

	} else {
		document.detachEvent ("onreadystatechange", completado);
		window.detachEvent ("onload", completado);
	}
}

/ **
 * El controlador de eventos listos y el método de auto limpieza
 * /
función completada () {
	// readyState === "complete" es lo suficientemente bueno para que podamos llamar al dom ready en oldIE
	if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
		despegar();
		jQuery.ready ();
	}
}

jQuery.ready.promise = function (obj) {
	if (! readyList) {

		readyList = jQuery.Deferred ();

		// Capturar casos en los que se llama a $ (document) .ready () después de que el evento del navegador ya haya ocurrido.
		// una vez intentamos usar readyState "interactivo" aquí, pero causó problemas como el
		// descubierto por ChrisS aquí: http://bugs.jquery.com/ticket/12282#comment:15
		if (document.readyState === "complete") {
			// Manejarlo de forma asíncrona para permitir que las secuencias de comandos tengan la oportunidad de retrasar listas
			setTimeout (jQuery.ready);

		// Los navegadores basados ​​en estándares admiten DOMContentLoaded
		} else if (document.addEventListener) {
			// Usa la práctica devolución de llamada del evento
			document.addEventListener ("DOMContentLoaded", completado, falso);

			// Una alternativa a window.onload, que siempre funcionará
			window.addEventListener ("carga", completado, falso);

		// Si se usa el modelo de evento IE
		} else {
			// Asegúrate de disparar antes de la carga, quizás tarde pero seguro también para iframes
			document.attachEvent ("onreadystatechange", completado);

			// Una alternativa a window.onload, que siempre funcionará
			window.attachEvent ("onload", completado);

			// Si IE y no un marco
			// continuamente verifica si el documento está listo
			var top = false;

			tratar {
				top = window.frameElement == null && document.documentElement;
			} catch (e) {}

			if (arriba && top.doScroll) {
				(función doScrollCheck () {
					if (! jQuery.isReady) {

						tratar {
							// Usa el truco de Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll ("izquierda");
						} catch (e) {
							devuelve setTimeout (doScrollCheck, 50);
						}

						// separar todos los eventos dom ready
						despegar();

						// y ejecuta cualquier función de espera
						jQuery.ready ();
					}
				}) ();
			}
		}
	}
	return readyList.promise (obj);
};


var strundefined = typeof undefined;



// Soporte: IE <9
// Iteración sobre las propiedades heredadas del objeto antes que las suyas
var i;
para (i en jQuery (soporte)) {
	descanso;
}
support.ownLast = i! == "0";

// Nota: la mayoría de las pruebas de soporte se definen en sus respectivos módulos.
// falso hasta que se ejecute la prueba
support.inlineBlockNeedsLayout = false;

// Ejecute ASAP en caso de que necesitemos establecer body.style.zoom
jQuery (función () {
	// Minificado: var a, b, c, d
	var val, div, cuerpo, contenedor;

	body = document.getElementsByTagName ("cuerpo") [0];
	if (! body ||! body.style) {
		// Retorno para los documentos del conjunto de marcos que no tienen un cuerpo
		regreso;
	}

	// Preparar
	div = document.createElement ("div");
	container = document.createElement ("div");
	container.style.cssText = "position: absolute; border: 0; width: 0; height: 0; top: 0; left: -9999px";
	body.appendChild (contenedor) .appendChild (div);

	if (typeof div.style.zoom! == strundefined) {
		// Soporte: IE <8
		// Verifica si los elementos nativos a nivel de bloque actúan como bloque en línea
		// elementos al configurar su pantalla para 'en línea' y dando
		// ellos diseño
		div.style.cssText = "display: inline; margin: 0; border: 0; relleno: 1px; ancho: 1px; zoom: 1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if (val) {
			// Impide que IE 6 afecte el diseño de los elementos posicionados # 11048
			// Evita que el IE encoja el cuerpo en el modo IE 7 # 12869
			// Soporte: IE <8
			body.style.zoom = 1;
		}
	}

	body.removeChild (contenedor);
});




(función () {
	var div = document.createElement ("div");

	// Ejecute la prueba solo si no se ha ejecutado en otro módulo.
	if (support.deleteExpando == null) {
		// Soporte: IE <9
		support.deleteExpando = true;
		tratar {
			eliminar div.test;
		} catch (e) {
			support.deleteExpando = false;
		}
	}

	// Elementos nulos para evitar fugas en IE.
	div = null;
}) ();


/ **
 * Determina si un objeto puede tener datos
 * /
jQuery.acceptData = function (elem) {
	var noData = jQuery.noData [(elem.nodeName + "") .toLowerCase ()],
		nodeType = + elem.nodeType || 1;

	// No establezca datos en nodos DOM que no sean elementos porque no se borrará (# 8335).
	return nodeType! == 1 && nodeType! == 9?
		falso:

		// Los nodos aceptan datos a menos que se especifique lo contrario; el rechazo puede ser condicional
		! noData || noData! == true && elem.getAttribute ("classid") === noData;
};


var rbrace = / ^ (?: \ {[\ w \ W] * \} | \ [[\ w \ W] * \]) $ /,
	rmultiDash = / ([AZ]) / g;

function dataAttr (elem, key, data) {
	// Si no se encontró nada internamente, intente buscar cualquier
	// datos del atributo data- * HTML5
	if (data === undefined && elem.nodeType === 1) {

		var name = "data-" + key.replace (rmultiDash, "- $ 1") .toLowerCase ();

		data = elem.getAttribute (nombre);

		if (tipo de datos === "cadena") {
			tratar {
				data = data === "true"? cierto :
					datos === "falso"? falso:
					datos === "nulo"? nulo :
					// Solo convierte a un número si no cambia la cadena
					+ datos + "" === datos? + datos:
					rbrace.test (datos)? jQuery.parseJSON (datos):
					datos;
			} catch (e) {}

			// Asegúrate de configurar los datos para que no se modifiquen más tarde
			jQuery.data (elem, clave, datos);

		} else {
			datos = indefinido;
		}
	}

	datos de retorno;
}

// verifica el vacío de un objeto de caché
function isEmptyDataObject (obj) {
	var nombre;
	para (nombre en obj) {

		// si el objeto de datos públicos está vacío, el privado todavía está vacío
		if (name === "data" && jQuery.isEmptyObject (obj [nombre])) {
			continuar;
		}
		if (name! == "toJSON") {
			falso retorno;
		}
	}

	devolver verdadero;
}

function internalData (elem, name, data, pvt / * Uso interno solamente * /) {
	if (! jQuery.acceptData (elem)) {
		regreso;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// Tenemos que manejar los nodos DOM y los objetos JS de forma diferente porque IE6-7
		// no se pueden hacer referencias al objeto GC correctamente en el límite DOM-JS
		isNode = elem.nodeType,

		// Solo los nodos DOM necesitan la caché jQuery global; Los datos del objeto JS son
		// conectado directamente al objeto para que GC pueda ocurrir automáticamente
		cache = isNode? jQuery.cache: elem,

		// Solo definiendo una ID para objetos JS si su caché ya existe, permite
		// el código para acceso directo en la misma ruta que un nodo DOM sin caché
		id = isNode? elem [tecla interna]: elem [tecla interna] && clave interna;

	// Evitamos hacer más trabajo del que necesitamos al tratar de obtener datos en un
	// objeto que no tiene datos en absoluto
	if ((! id ||! cache [id] || (! pvt &&! cache [id] .data)) && data === undefined && typeof name === "string") {
		regreso;
	}

	si yo d ) {
		// Solo los nodos DOM necesitan una nueva ID única para cada elemento, ya que sus datos
		// termina en el caché global
		if (isNode) {
			id = elem [clave interna] = deletedIds.pop () || jQuery.guid ++;
		} else {
			id = clave interna;
		}
	}

	if (! cache [id]) {
		// Evita exponer los metadatos jQuery en objetos JS simples cuando el objeto
		// se serializa usando JSON.stringify
		caché [id] = isNode? {}: {toJSON: jQuery.noop};
	}

	// Un objeto se puede pasar a jQuery.data en lugar de un par clave / valor; esto se pone
	// shallow copiado en el caché existente
	if (tipo de nombre === "objeto" || tipo de nombre === "función") {
		if (pvt) {
			caché [id] = jQuery.extend (caché [id], nombre);
		} else {
			caché [id] .data = jQuery.extend (caché [id] .data, nombre);
		}
	}

	thisCache = caché [id];

	// jQuery data () se almacena en un objeto separado dentro de los datos internos del objeto
	// caché para evitar colisiones de teclas entre datos internos y definidos por el usuario
	// datos.
	if (! pvt) {
		if (! thisCache.data) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if (data! == undefined) {
		thisCache [jQuery.camelCase (name)] = data;
	}

	// Compruebe si hay nombres de propiedad de datos convertidos a camello y no convertidos
	// Si se especificó una propiedad de datos
	if (tipo de nombre === "cadena") {

		// Primero intente encontrar los datos de la propiedad tal cual
		ret = thisCache [nombre];

		// Prueba de datos de propiedad nulos | indefinidos
		if (ret == null) {

			// Intenta encontrar la propiedad camelCased
			ret = thisCache [jQuery.camelCase (nombre)];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

función internalRemoveData (elem, name, pvt) {
	if (! jQuery.acceptData (elem)) {
		regreso;
	}

	var thisCache, yo,
		isNode = elem.nodeType,

		// Ver jQuery.data para más información
		cache = isNode? jQuery.cache: elem,
		id = isNode? elem [jQuery.expando]: jQuery.expando;

	// Si ya no hay entrada de caché para este objeto, no hay
	// propósito de continuar
	if (! cache [id]) {
		regreso;
	}

	if (nombre) {

		thisCache = pvt? caché [id]: caché [id] .data;

		if (thisCache) {

			// Soporta nombres de cadena separados por espacio o por matriz para claves de datos
			if (! jQuery.isArray (name)) {

				// prueba la cadena como una clave antes de cualquier manipulación
				if (nombre en thisCache) {
					name = [nombre];
				} else {

					// divide la versión en camello por espacios a menos que exista una clave con los espacios
					name = jQuery.camelCase (nombre);
					if (nombre en thisCache) {
						name = [nombre];
					} else {
						name = name.split ("");
					}
				}
			} else {
				// Si "nombre" es una matriz de teclas ...
				// Cuando los datos se crean inicialmente, a través de la firma ("clave", "val"),
				// las claves se convertirán en camelCase.
				// Como no hay manera de decir _how_ se agregó una clave, elimine
				// tanto la clave simple como la clave camelCase. # 12786
				// Esto solo penalizará la ruta del argumento de la matriz.
				name = name.concat (jQuery.map (nombre, jQuery.camelCase));
			}

			i = name.length;
			mientras yo-- ) {
				eliminar thisCache [nombre [i]];
			}

			// Si no quedan datos en el caché, queremos continuar
			// y dejar que el objeto de caché se destruya
			if (pvt?! isEmptyDataObject (thisCache):! jQuery.isEmptyObject (thisCache)) {
				regreso;
			}
		}
	}

	// Ver jQuery.data para más información
	if (! pvt) {
		eliminar caché [id] .data;

		// No destruyas la caché principal a menos que el objeto de datos interno
		// había sido lo único que quedaba en él
		if (! isEmptyDataObject (cache [id])) {
			regreso;
		}
	}

	// Destruye el caché
	if (isNode) {
		jQuery.cleanData ([elem], verdadero);

	// Use delete cuando se admite para expandos o `cache` no es una ventana por isWindow (# 10080)
	/ * jshint eqeqeq: falso * /
	} else if (support.deleteExpando || cache! = cache.window) {
		/ * jshint eqeqeq: true * /
		eliminar caché [id];

	// Cuando todo lo demás falla, null
	} else {
		caché [id] = null;
	}
}

jQuery.extend ({
	caché: {},

	// Los siguientes elementos (espacio-sufijo para evitar colisiones Object.prototype)
	// arrojar excepciones inaptables si intenta establecer propiedades de expansión
	sin datos: {
		"applet": cierto,
		"insertar": cierto,
		// ... pero los objetos Flash (que tienen este classid) * pueden * manejar expandos
		"objeto": "clsid: D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function (elem) {
		elem = elem.nodeType? jQuery.cache [elem [jQuery.expando]]: elem [jQuery.expando];
		¡return! elem &&! isEmptyDataObject (elem);
	},

	datos: función (elem, nombre, datos) {
		return internalData (elem, name, data);
	},

	removeData: function (elem, name) {
		devuelve internalRemoveData (elem, nombre);
	},

	// Sólo para uso interno.
	_data: function (elem, name, data) {
		return internalData (elem, name, data, true);
	},

	_removeData: function (elem, name) {
		devuelve internalRemoveData (elem, name, true);
	}
});

jQuery.fn.extend ({
	datos: función (clave, valor) {
		var i, name, data,
			elem = this [0],
			attrs = elem && elem.attributes;

		// Las expectativas especiales de .data básicamente frustran jQuery.access,
		// entonces implementamos el comportamiento relevante nosotros mismos

		// Obtiene todos los valores
		if (clave === undefined) {
			if (this.length) {
				data = jQuery.data (elem);

				if (elem.nodeType === 1 &&! jQuery._data (elem, "parsedAttrs")) {
					i = attrs.length;
					mientras yo-- ) {

						// Soporte: IE11 +
						// Los elementos attrs pueden ser nulos (# 14894)
						if (attrs [i]) {
							name = attrs [i] .name;
							if (name.indexOf ("data-") === 0) {
								name = jQuery.camelCase (name.slice (5));
								dataAttr (elem, nombre, datos [nombre]);
							}
						}
					}
					jQuery._data (elem, "parsedAttrs", verdadero);
				}
			}

			datos de retorno;
		}

		// Establece valores múltiples
		if (tipo de clave === "objeto") {
			return this.each (function () {
				jQuery.data (esto, clave);
			});
		}

		return arguments.length> 1?

			// Establece un valor
			this.each (function () {
				jQuery.data (esto, clave, valor);
			}):

			// Obtiene un valor
			// Trata de obtener primero cualquier información almacenada internamente
			elem? dataAttr (elem, key, jQuery.data (elem, key)): indefinido;
	},

	removeData: function (clave) {
		return this.each (function () {
			jQuery.removeData (this, key);
		});
	}
});


jQuery.extend ({
	queue: function (elem, type, data) {
		var queue;

		if (elem) {
			tipo = (tipo || "fx") + "cola";
			queue = jQuery._data (elem, type);

			// Aumenta la velocidad de dequeue saliendo rápidamente si esto es solo una búsqueda
			if (datos) {
				if (! queue || jQuery.isArray (data)) {
					queue = jQuery._data (elem, type, jQuery.makeArray (data));
				} else {
					queue.push (datos);
				}
			}
			cola de retorno || [];
		}
	},

	dequeue: function (elem, type) {
		tipo = tipo || "fx";

		var queue = jQuery.queue (elem, type),
			startLength = queue.length,
			fn = queue.shift (),
			hooks = jQuery._queueHooks (elem, type),
			siguiente = función () {
				jQuery.dequeue (elem, tipo);
			};

		// Si la cola fx está eliminada, siempre elimine el progreso sentinel
		if (fn === "en progreso") {
			fn = queue.shift ();
			startLength--;
		}

		if (fn) {

			// Agregar un control de progreso para evitar que la cola fx sea
			// dequeued automáticamente
			if (tipo === "fx") {
				queue.unshift ("en progreso");
			}

			// borrar la última función de detención de cola
			eliminar hooks.stop;
			fn.call (elem, siguiente, ganchos);
		}

		if (! startLength && hooks) {
			hooks.empty.fire ();
		}
	},

	// no destinado al consumo público: genera un objeto queueHooks o devuelve el actual
	_queueHooks: function (elem, type) {
		var clave = tipo + "queueHooks";
		return jQuery._data (elem, key) || jQuery._data (elem, key, {
			empty: jQuery.Callbacks ("una vez memoria"). add (función () {
				jQuery._removeData (elem, tipo + "cola");
				jQuery._removeData (elem, clave);
			})
		});
	}
});

jQuery.fn.extend ({
	cola: función (tipo, datos) {
		var setter = 2;

		if (tipo de tipo! == "cadena") {
			datos = tipo;
			type = "fx";
			setter--;
		}

		if (arguments.length <setter) {
			return jQuery.queue (this [0], type);
		}

		devolver datos === undefined?
			esta :
			this.each (function () {
				var queue = jQuery.queue (this, type, data);

				// asegurar un gancho para esta cola
				jQuery._queueHooks (esto, tipo);

				if (escribe === "fx" && queue [0]! == "inprogress") {
					jQuery.dequeue (esto, tipo);
				}
			});
	},
	dequeue: function (type) {
		return this.each (function () {
			jQuery.dequeue (esto, tipo);
		});
	},
	clearQueue: function (type) {
		devuelve this.queue (tipo || "fx", []);
	},
	// Obtener una promesa resuelta cuando las colas de un cierto tipo
	// se vacían (fx es el tipo por defecto)
	promesa: función (tipo, obj) {
		var tmp,
			recuento = 1,
			defer = jQuery.Deferred (),
			elementos = esto,
			i = this.length,
			resolve = function () {
				if (! (--count)) {
					defer.resolveWith (elementos, [elementos]);
				}
			};

		if (tipo de tipo! == "cadena") {
			obj = tipo;
			tipo = indefinido;
		}
		tipo = tipo || "fx";

		mientras yo-- ) {
			tmp = jQuery._data (elementos [i], tipo + "queueHooks");
			if (tmp && tmp.empty) {
				contar ++;
				tmp.empty.add (resolver);
			}
		}
		resolver();
		return defer.promise (obj);
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = ["Superior", "Derecho", "Inferior", "Izquierda"];

var isHidden = function (elem, el) {
		// isHidden podría llamarse desde la función jQuery # filter;
		// en ese caso, el elemento será el segundo argumento
		elem = el || elem;
		return jQuery.css (elem, "display") === "ninguno" || ! jQuery.contains (elem.ownerDocument, elem);
	};



// Método multifuncional para obtener y establecer valores de una colección
// Los valores / s se pueden ejecutar opcionalmente si se trata de una función
var access = jQuery.access = function (elems, fn, key, value, chainable, emptyGet, raw) {
	var i = 0,
		longitud = elems.length,
		bulk = clave == nulo;

	// Establece muchos valores
	if (jQuery.type (key) === "object") {
		chainable = verdadero;
		para (yo en clave) {
			jQuery.access (elems, fn, i, clave [i], true, emptyGet, raw);
		}

	// Establece un valor
	} else if (value! == undefined) {
		chainable = verdadero;

		if (! jQuery.isFunction (value)) {
			raw = verdadero;
		}

		if (bulk) {
			// Las operaciones masivas se ejecutan contra todo el conjunto
			if (raw) {
				fn.call (elems, valor);
				fn = nulo;

			// ... excepto cuando se ejecutan valores de funciones
			} else {
				bulk = fn;
				fn = función (elem, clave, valor) {
					return bulk.call (jQuery (elem), valor);
				};
			}
		}

		if (fn) {
			para (; i <longitud; i ++) {
				fn (elems [i], key, raw? value: value.call (elems [i], i, fn (elems [i], clave)));
			}
		}
	}

	volver encadenable?
		Elems:

		// Obtiene
		a granel?
			fn.call (elems):
			longitud ? fn (elems [0], tecla): emptyGet;
};
var rcheckableType = (/ ^ (?: checkbox | radio) $ / i);



(función () {
	// Minificado: var a, b, c
	var input = document.createElement ("entrada"),
		div = document.createElement ("div"),
		fragment = document.createDocumentFragment ();

	// Preparar
	div.innerHTML = "<link /> <table> </ table> <a href='/a'> a </a> <input type = 'checkbox' />";

	// IE elimina los espacios en blanco iniciales cuando se utiliza .innerHTML
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Asegúrate de que los elementos tbody no se inserten automáticamente
	// IE los insertará en tablas vacías
	support.tbody =! div.getElementsByTagName ("tbody") .length;

	// Asegúrate de que los elementos del enlace sean serializados correctamente por innerHTML
	// Esto requiere un elemento contenedor en IE
	support.htmlSerialize = !! div.getElementsByTagName ("enlace") .length;

	// Asegura que la clonación de un elemento html5 no causa problemas
	// Donde outerHTML no está definido, esto todavía funciona
	support.html5Clone =
		document.createElement ("nav") .cloneNode (true) .outerHTML! == "<: nav> </: nav>";

	// Compruebe si una casilla de verificación desconectada retendrá su marcada
	// valor de verdadero después de anexado al DOM (IE6 / 7)
	input.type = "casilla de verificación";
	input.checked = verdadero;
	fragment.appendChild (entrada);
	support.appendChecked = input.checked;

	// Asegúrate de que textarea (y checkbox) defaultValue esté clonado correctamente
	// Soporte: IE6-IE11 +
	div.innerHTML = "<textarea> x </ textarea>";
	support.noCloneChecked = !! div.cloneNode (true) .lastChild.defaultValue;

	// # 11217 - WebKit pierde control cuando el nombre está después del atributo marcado
	fragment.appendChild (div);
	div.innerHTML = "<input type = 'radio' checked = 'checked' name = 't' />";

	// Soporte: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// viejo WebKit no clona el estado verificado correctamente en fragmentos
	support.checkClone = div.cloneNode (true) .cloneNode (true) .lastChild.checked;

	// Soporte: IE <9
	// Opera no clona eventos (y typeof div.attachEvent === undefined).
	// IE9-10 clona eventos vinculados mediante attachEvent, pero no se desencadenan con .click ()
	support.noCloneEvent = true;
	if (div.attachEvent) {
		div.attachEvent ("onclick", function () {
			support.noCloneEvent = false;
		});

		div.cloneNode (true) .click ();
	}

	// Ejecute la prueba solo si no se ha ejecutado en otro módulo.
	if (support.deleteExpando == null) {
		// Soporte: IE <9
		support.deleteExpando = true;
		tratar {
			eliminar div.test;
		} catch (e) {
			support.deleteExpando = false;
		}
	}
}) ();


(función () {
	var i, eventName,
		div = document.createElement ("div");

	// Soporte: IE <9 (falta enviar / cambiar burbuja), Firefox 23+ (falta evento focusin)
	for (i en {submit: true, change: true, focusin: true}) {
		eventName = "on" + i;

		if (! (soporte [i + "Bubbles"] = eventName en la ventana)) {
			// Cuidado con las restricciones de CSP (https://developer.mozilla.org/es/Security/CSP)
			div.setAttribute (eventName, "t");
			soporte [i + "Bubbles"] = div.attributes [eventName] .expando === false;
		}
	}

	// Elementos nulos para evitar fugas en IE.
	div = null;
}) ();


var rformElems = / ^ (?: input | select | textarea) $ / i,
	rkeyEvent = / ^ clave /,
	rmouseEvent = / ^ (?: mouse | pointer | contextmenu) | click /,
	rfocusMorph = / ^ (?: focusinfocus | focusoutblur) $ /,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue () {
	devolver verdadero;
}

function returnFalse () {
	falso retorno;
}

function safeActiveElement () {
	tratar {
		return document.activeElement;
	} catch (err) {}
}

/ *
 * Funciones de ayuda para la gestión de eventos, no parte de la interfaz pública.
 * Apoyos a la biblioteca addEvent de Dean Edwards para muchas de las ideas.
 * /
jQuery.event = {

	global: {},

	agregar: función (elem, tipos, manejador, datos, selector) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			manejadores, tipo, espacios de nombres, origType,
			elemData = jQuery._data (elem);

		// No adjunte eventos a noData ni a los nodos de texto / comentario (pero permita objetos simples)
		if (! elemData) {
			regreso;
		}

		// La persona que llama puede pasar un objeto de datos personalizados en lugar del manejador
		if (handler.handler) {
			handleObjIn = controlador;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Asegúrate de que el controlador tenga una ID única, utilizada para encontrarla / eliminarla más tarde
		if (! handler.guid) {
			handler.guid = jQuery.guid ++;
		}

		// Inicia la estructura de eventos del elemento y el controlador principal, si esta es la primera
		if (! (events = elemData.events)) {
			events = elemData.events = {};
		}
		if (! (eventHandle = elemData.handle)) {
			eventHandle = elemData.handle = function (e) {
				// Descartar el segundo evento de jQuery.event.trigger () y
				// cuando se invoca un evento después de que una página se descargó
				return typeof jQuery! == strundefined && (! e || jQuery.event.triggered! == e.type)?
					jQuery.event.dispatch.apply (eventHandle.elem, arguments):
					indefinido;
			};
			// Agregue elem como una propiedad del identificador fn para evitar una pérdida de memoria con IE eventos no nativos
			eventHandle.elem = elem;
		}

		// Manejar múltiples eventos separados por un espacio
		types = (types || "") .match (rnotwhite) || [""];
		t = tipos.length;
		while (t--) {
			tmp = rtypenamespace.exec (tipos [t]) || [];
			type = origType = tmp [1];
			espacios de nombres = (tmp [2] || "") .split (".") .sort ();

			// There * must * debe ser un tipo, no adjuntar controladores de espacio de nombres solo
			if (! type) {
				continuar;
			}

			// Si el evento cambia su tipo, use los manejadores de eventos especiales para el tipo cambiado
			especial = jQuery.event.special [tipo] || {};

			// Si el selector está definido, determine el tipo de api de evento especial; de lo contrario, indique el tipo
			type = (selector? special.delegateType: special.bindType) || tipo;

			// Actualización especial basada en el tipo de reinicio reciente
			especial = jQuery.event.special [tipo] || {};

			// handleObj se pasa a todos los controladores de eventos
			handleObj = jQuery.extend ({
				tipo: tipo,
				origType: origType,
				datos: datos,
				controlador: controlador,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test (selector),
				namespace: namespaces.join (".")
			}, handleObjIn);

			// Inicia la cola del controlador de eventos si somos los primeros
			if (! (handlers = eventos [tipo])) {
				manejadores = eventos [tipo] = [];
				handlers.delegateCount = 0;

				// Solo use addEventListener / attachEvent si el manejador de eventos especiales devuelve falso
				if (! special.setup || special.setup.call (elem, data, namespaces, eventHandle) === false) {
					// Vincula el controlador de eventos global al elemento
					if (elem.addEventListener) {
						elem.addEventListener (type, eventHandle, false);

					} else if (elem.attachEvent) {
						elem.attachEvent ("on" + type, eventHandle);
					}
				}
			}

			if (special.add) {
				special.add.call (elem, handleObj);

				if (! handleObj.handler.guid) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Agregar a la lista de controladores del elemento, delega delante
			if (selector) {
				handlers.splice (handlers.delegateCount ++, 0, handleObj);
			} else {
				handlers.push (handleObj);
			}

			// Mantenga un registro de los eventos que alguna vez se han utilizado, para la optimización de eventos
			jQuery.event.global [type] = true;
		}

		// Anular elemento para evitar fugas de memoria en IE
		elem = null;
	},

	// Separar un evento o conjunto de eventos de un elemento
	remove: function (elem, types, handler, selector, mappedTypes) {
		var j, handleObj, tmp,
			origCount, t, eventos,
			especial, manejadores, tipo,
			espacios de nombres, origType,
			elemData = jQuery.hasData (elem) && jQuery._data (elem);

		if (! elemData ||! (events = elemData.events)) {
			regreso;
		}

		// Una vez para cada tipo. Namespace en types; tipo puede ser omitido
		types = (types || "") .match (rnotwhite) || [""];
		t = tipos.length;
		while (t--) {
			tmp = rtypenamespace.exec (tipos [t]) || [];
			type = origType = tmp [1];
			espacios de nombres = (tmp [2] || "") .split (".") .sort ();

			// Desvincular todos los eventos (en este espacio de nombres, si se proporciona) para el elemento
			if (! type) {
				para (escriba eventos) {
					jQuery.event.remove (elem, type + types [t], handler, selector, true);
				}
				continuar;
			}

			especial = jQuery.event.special [tipo] || {};
			type = (selector? special.delegateType: special.bindType) || tipo;
			handlers = eventos [tipo] || [];
			tmp = tmp [2] && new RegExp ("(^ | \\.)" + namespaces.join ("\\. (?:. * \\. |)") + "(\\. | $)" );

			// Eliminar eventos coincidentes
			origCount = j = handlers.length;
			while (j--) {
				handleObj = controladores [j];

				if ((mappedTypes || origType === handleObj.origType) &&
					(! handler || handler.guid === handleObj.guid) &&
					(! tmp || tmp.test (handleObj.namespace)) &&
					(! selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
					handlers.splice (j, 1);

					if (handleObj.selector) {
						handlers.delegateCount--;
					}
					if (special.remove) {
						special.remove.call (elem, handleObj);
					}
				}
			}

			// Eliminar el controlador genérico de eventos si eliminamos algo y no existen más controladores
			// (evita el potencial de recursión sin fin durante la eliminación de manejadores de eventos especiales)
			if (origCount &&! handlers.length) {
				if (! special.teardown || special.teardown.call (elem, namespaces, elemData.handle) === false) {
					jQuery.removeEvent (elem, type, elemData.handle);
				}

				eliminar eventos [tipo];
			}
		}

		// Eliminar el expando si ya no se usa
		if (jQuery.isEmptyObject (events)) {
			eliminar elemData.handle;

			// removeData también verifica el vacío y borra el expando si está vacío
			// así que úsala en lugar de eliminar
			jQuery._removeData (elem, "eventos");
		}
	},

	trigger: function (event, data, elem, onlyHandlers) {
		var handle, ontype, cur,
			bubbleType, especial, tmp, i,
			eventPath = [elem || documento],
			type = hasOwn.call (event, "type")? event.type: event,
			namespaces = hasOwn.call (event, "namespace")? event.namespace.split ("."): [];

		cur = tmp = elem = elem || documento;

		// No hacer eventos en el texto y nodos de comentarios
		if (elem.nodeType === 3 || elem.nodeType === 8) {
			regreso;
		}

		// enfoca / difumina morfos para enfocar / salir; asegurarse de que no los estamos disparando en este momento
		if (rfocusMorph.test (tipo + jQuery.event.triggered)) {
			regreso;
		}

		if (type.indexOf (".")> = 0) {
			// disparador espaciado de nombres; crear una expresión regular para hacer coincidir el tipo de evento en handle ()
			namespaces = type.split (".");
			type = namespaces.shift ();
			namespaces.sort ();
		}
		ontype = type.indexOf (":") <0 && "on" + type;

		// La persona que llama puede pasar un objeto jQuery.Event, Object o simplemente una cadena de tipo de evento
		event = event [jQuery.expando]?
			evento:
			nuevo jQuery.Event (tipo, tipo de evento === "objeto" && evento);

		// Trigger bitmask: & 1 para controladores nativos; & 2 para jQuery (siempre verdadero)
		event.isTrigger = onlyHandlers? 2: 3;
		event.namespace = namespaces.join (".");
		event.namespace_re = event.namespace?
			nuevo RegExp ("(^ | \\.)" + namespaces.join ("\\. (?:. * \\. |)") + "(\\. | $)"):
			nulo;

		// Limpiar el evento en caso de que se reutilice
		event.result = undefined;
		if (! event.target) {
			event.target = elem;
		}

		// Clonar cualquier información entrante y anteponer el evento, creando la lista de argumentos del manejador
		data = data == null?
			[evento]:
			jQuery.makeArray (datos, [evento]);

		// Permitir que los eventos especiales dibujen fuera de las líneas
		especial = jQuery.event.special [tipo] || {};
		if (! onlyHandlers && special.trigger && special.trigger.apply (elem, data) === false) {
			regreso;
		}

		// Determine la ruta de propagación del evento por adelantado, según la especificación de eventos W3C (# 9951)
		// Bubble up to document, luego a window; busque un propietario globalDocument var (# 9724)
		if (! onlyHandlers &&! special.noBubble &&! jQuery.isWindow (elem)) {

			bubbleType = special.delegateType || tipo;
			if (! rfocusMorph.test (tipo de burbuja + tipo)) {
				cur = cur.parentNode;
			}
			for (; cur; cur = cur.parentNode) {
				eventPath.push (cur);
				tmp = cur;
			}

			// Solo agregue la ventana si tenemos que documentar (p. Ej., No obj o DOM separado)
			if (tmp === (elem.ownerDocument || documento)) {
				eventPath.push (tmp.defaultView || tmp.parentWindow || ventana);
			}
		}

		// Controladores de fuego en la ruta del evento
		i = 0;
		while ((cur = eventPath [i ++]) &&! event.isPropagationStopped ()) {

			event.type = i> 1?
				bubbleType:
				special.bindType || tipo;

			// manejador jQuery
			handle = (jQuery._data (cur, "eventos") || {}) [event.type] && jQuery._data (cur, "handle");
			if (handle) {
				handle.apply (cur, data);
			}

			// Controlador nativo
			handle = ontype && cur [ontype];
			if (manejar && handle.apply && jQuery.acceptData (cur)) {
				event.result = handle.apply (cur, data);
				if (event.result === false) {
					event.preventDefault ();
				}
			}
		}
		event.type = tipo;

		// Si nadie impidió la acción predeterminada, hazlo ahora
		if (! onlyHandlers &&! event.isDefaultPrevented ()) {

			if ((! special._default || special._default.apply (eventPath.pop (), data) === false) &&
				jQuery.acceptData (elem)) {

				// Llamar a un método DOM nativo en el destino con el mismo nombre que el evento.
				// No se puede usar una comprobación .isFunction () aquí porque IE6 / 7 falla esa prueba.
				// No haga acciones predeterminadas en la ventana, ahí es donde se encuentran las variables globales (# 6170)
				if (ontype && elem [tipo] &&! jQuery.isWindow (elem)) {

					// No vuelva a activar un evento onFOO cuando llamemos a su método FOO ()
					tmp = elem [ontype];

					if (tmp) {
						elem [ontype] = null;
					}

					// Prevenir el reinicio del mismo evento, ya que ya lo borramos
					jQuery.event.triggered = tipo;
					tratar {
						elem [tipo] ();
					} catch (e) {
						// IE <9 muere en foco / desenfoque a elemento oculto (# 1486, # 12518)
						// solo reproducible en WinXP IE8 nativo, no IE9 en modo IE8
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
