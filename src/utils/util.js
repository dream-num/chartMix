/**
 * 深度克隆数据,包括对象，数组，map
 * @param {*} obj 对象，数组，map
 */
function deepCopy(obj) {
    if (!isObject(obj) && !isMap(obj)) {
        return obj;
    }

    let cloneObj;
    if (isMap(obj)) {
        cloneObj = new Map();
        for (let key of obj.keys()) {
            let value = obj.get(key);
            if (isMap(value) || isObject(value) || Array.isArray(obj)) {
                let copyVal = deepCopy(value);
                cloneObj.set(key, copyVal);
            } else {
                cloneObj.set(key, value);
            }
        }
    } else if (typeof obj === "function") {
        cloneObj = obj
    } else {
        cloneObj = Array.isArray(obj) ? [] : {};
        if (obj instanceof HTMLElement) {
            cloneObj = obj.cloneNode(true)
        } else {
            for (let key in obj) {
                // if (obj.hasOwnProperty(key)) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    cloneObj[key] =
                        isMap(obj[key]) || isObject(obj[key])
                            ? deepCopy(obj[key])
                            : obj[key];
                }
            }

        }
    }
    return cloneObj;
}

/**
 * 判断参数是否是Object类型
 * @param {*} o 
 */
function isObject(o) {
    return (
        !isMap(o) &&
        (typeof o === 'object' || typeof o === 'function') &&
        o !== null
    );
}

/**
 * 判断参数是否是Map类型
 * @param {*} obj 
 */
function isMap(obj) {
    if (obj instanceof Map) {
        return true;
    } else {
        return false;
    }
}

/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
const deepClone = function (obj, cache = []) {
	// typeof [] => 'object'
	// typeof {} => 'object'
	if (obj === null || typeof obj !== 'object') {
		return obj
	}
	// 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
	/**
	 * 类似下面这种
	 * var a = {b:1}
	 * a.c = a
	 * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
	 */
	const hit = cache.filter(c => c.original === obj)[0]
	if (hit) {
		return hit.copy
	}

	const copy = Array.isArray(obj) ? [] : {}
	// 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
	cache.push({
		original: obj,
		copy
	})
	Object.keys(obj).forEach(key => {
		copy[key] = deepClone(obj[key], cache)
	})

	return copy
}

//生成随机的图表id
function generateRandomKey(prefix) {
    if (prefix == null) {
        prefix = 'chart'
    }

    var userAgent = window.navigator.userAgent
        .replace(/[^a-zA-Z0-9]/g, '')
        .split('')
    var mid = ''
    for (var i = 0; i < 12; i++) {
        mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))]
    }
    var time = new Date().getTime()

    return prefix + '_' + mid + '_' + time
}

export {
    deepCopy,
    deepClone,
    generateRandomKey
}