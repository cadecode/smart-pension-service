/**!
 * adapter.js
 * v1.0
 * 兼容 IE8 及以上
 */
(function () {
    /***
     * WindAdapter: 全局工具方法
     * 通过 window 的 adapter 方法调用
     */
    var WindowAdapter = function () {

    }

    WindowAdapter.prototype = {
        /**
         * 面向对象相关方法
         */
        // 对象深拷贝
        deepClone: function (tar, org) {
            var tar = tar || {},
                toStr = Object.prototype.toString
            for (var key in org) {
                if (!org.hasOwnProperty(key)) continue
                if (typeof (org[key]) === 'object' && org[key] !== null) {
                    if (toStr.call(org[key]) === "[object Array]") {
                        tar[key] = []
                    } else {
                        tar[key] = {}
                    }
                    tar[key] = this.deepClone(org[key])
                } else {
                    tar[key] = org[key]
                }
            }
            return tar
        },
        // 函数原型继承
        inherit: function (tar, org) {
            tar.prototype = Object.create(org.prototype)
            tar.prototype.constructor = tar
            tar.prototype.superClass = org
        },
        // 对象类型判断
        typeToStr: function (val) {
            var type = typeof (val)
            if (val === null) {
                return "null"
            } else if (type === "object") {
                return Object.prototype.toString.call(val)
            } else return type
        },
        /**
         * 页面尺寸相关方法
         */
        // 获取滚动条滚动距离
        getScrollOffset: function () {
            if (window.pageXOffset) {
                return {
                    top: window.pageYOffset,
                    left: window.pageXOffset
                }
            } else return {
                top: document.body.scrollTop || document.documentElement.scrollTop,
                left: document.body.scrollLeft || document.documentElement.scrollLeft
            }
        },
        // 获取窗口可视尺寸
        getViewportSize: function () {
            if (window.innerWidth) {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            } else {
                if (document.compatMode === 'BackCompat') {
                    return {
                        width: document.body.clientWidth,
                        height: document.body.clientHeight
                    }
                } else {
                    return {
                        width: document.documentElement.clientWidth,
                        height: document.documentElement.clientHeight
                    }
                }
            }
        },
        // 获取文档滚动尺寸
        getScrollSize: function () {
            if (document.body.scrollHeight) {
                return {
                    width: document.body.scrollWidth,
                    height: document.body.scrollHeight
                }
            } else return {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight
            }
        },
        // 页面滚动到指定位置
        scrollTo: function (left, top, flag) {
            // flag：是否平滑滚动，ie 不支持
            if (/\bTrident\b/.test(navigator.userAgent)) {
                window.scrollTo(left, left)
            } else {
                window.scrollTo({
                    top: top,
                    bottom: left,
                    behavior: flag && 'smooth'
                })
            }
        },
        /**
         * AJAX 相关方法
         */
        ajax: function (option) {
            // 设置默认参数
            var opt = {
                type: option.type.toUpperCase(),
                url: option.url,
                data: option.data || null,
                async: option.async || true,
                success: option.success,
                error: option.error,
                timeout: option.timeout || 60000,
                callback: option.callback || ('callback' + new Date().getTime())
            }

            var type = opt.type,
                success = opt.success,
                error = opt.error,
                data = parseData(opt.data) // 将 data 对象装换成查询串

            if (type === 'GET' || type === 'POST') {
                var xhr = new XMLHttpRequest()
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        success && success(xhr.responseText, xhr.status)
                    } else {
                        error && error(xhr.status)
                    }
                }
                if (type == 'GET') {
                    xhr.open(type, opt.url + data, opt.async)
                    xhr.send()
                } else {
                    xhr.open(type, opt.url, opt.async)
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                    xhr.send(data)
                }
                setTimeout(function () {
                    xhr.abort()
                    console.error(opt.url + '请求超时')
                }, opt.timeout)
            } else if (type === 'JSONP') {
                var script = document.createElement('script')
                script.src = opt.url + data
                // 选则存放在 Window 原型上，window 下可以使用
                // 如果直接存放在 window 上，IE8 window 属性不支持 dalete
                Window.prototype[opt.callback] = function (res) {
                    script['jsonp'] = 1
                    success && success(res)
                }
                document.body.appendChild(script)

                // -[1,] 在 IE8 返回 NaN，IE9 及以上返回 -1
                if (-[1,]) {
                    // IE9 及以上支持 onerror
                    // onerror 用于请求失败，未执行 callback
                    // onload 用于请求成功,但执行 callback 出错
                    script.onerror = script.onload = function () {
                        if (typeof script['jsonp'] === 'undefined') {
                            error && error()
                        }
                        script.parentNode.removeChild(script)
                        delete Window.prototype[opt.callback]
                    }
                } else {
                    // script.onreadystatechange 兼容 IE8
                    script.onreadystatechange = function () {
                        if (/loaded|complete/i.test(this.readyState)) {
                            if (typeof script['jsonp'] === 'undefined') {
                                error && error()
                            }
                            script.parentNode.removeChild(script)
                            delete Window.prototype[opt.callback]
                        }
                    }
                }

            }

            function parseData(data) {
                var arr = [],
                    str
                if (type === 'GET') {
                    str = '?'
                } else if (type === 'POST') {
                    str = ''
                } else if (type === 'JSONP') {
                    str = '?callback=' + opt.callback + '&'
                }
                for (var k in data) {
                    arr.push(k + '=' + data[k])
                }
                return str + arr.join('&')
            }
        },
        /**
         * 浏览器类型相关方法
         */
        isIE: function () {
            return /\bTrident\b/.test(navigator.userAgent)
        },
        isLteIE8: function () {
            return ![-1,]
        }
    }

    /**
     * ElementAdapter：元素对象工具方法
     * 通过元素对象的 adapter 方法调用
     */
    var ElementAdapter = function (origin) {
        this.origin = origin
    }

    ElementAdapter.prototype = {
        /**
         * 元素属性相关方法
         */
        // 判断有无某类
        hasClass: function (str) {
            var origin = this.origin
            return new RegExp('\\b' + str + '\\b').test(origin.className)
        },
        // 添加类
        addClass: function (str) {
            var origin = this.origin
            var reg = new RegExp('\\b' + str + '\\b'),
                className = origin.className
            if (!reg.test(className)) {
                origin.className = (className + ' ' + str).trim()
            }
        },
        // 删除类
        removeClass: function (str) {
            var origin = this.origin
            var reg = new RegExp('\\b' + str + '\\b'),
                className = origin.className
            if (reg.test(className)) {
                origin.className = className.replace(reg, '').trim()
            }
        },
        // 替换类
        replaceClass: function (newStr, oldStr) {
            var origin = this.origin
            var nReg = new RegExp('\\b' + newStr + '\\b'),
                oReg = new RegExp('\\b' + oldStr + '\\b'),
                className = origin.className
            if (!nReg.test(className) && oReg.test(className)) {
                origin.className = className.replace(oReg, newStr)
            }
        },
        // 设置多个属性
        setAttributes: function (opt) {
            var origin = this.origin
            for (var key in opt) {
                origin.setAttribute(key, opt[key])
            }
        },
        /**
         * 元素样式相关方法
         */
        // 设置样式
        setStyle: function (k, v) {
            var origin = this.origin
            origin.style[k] = v
        },
        // 设置多个样式
        setStyles: function (opt) {
            var origin = this.origin
            for (var key in opt) {
                origin.style[key] = opt[key]
            }
        },
        // 获取样式集合
        getStyles: function (k) {
            var origin = this.origin
            if (window.getComputedStyle) {
                return k ? window.getComputedStyle(origin)[k] : window.getComputedStyle(origin)
            } else {
                return k ? origin.currentStyle[k] : origin.currentStyle
            }
        },
        // 获取在整个文档的坐标
        getPositionInPage: function () {
            var origin = this.origin
            var parent = origin.offsetParent,
                top = origin.offsetTop,
                left = origin.offsetLeft
            while (parent) {
                top += parent.offsetTop
                left += parent.offsetLeft
                parent = parent.offsetParent
            }
            return {
                top: top,
                left: left
            }
        },
        /**
         * 元素事件相关方法
         */
        // 绑定事件处理函数
        addEvent: function (type, fn) {
            var origin = this.origin
            if (origin.addEventListener) {
                origin.addEventListener(type, fn, false)
            } else if (origin.attachEvent) {
                origin.attachEvent('on' + type, fn)
            } else {
                origin['on' + type] = fn
            }
        },
        // 解绑事件处理函数
        removeEvent: function (type, fn) {
            var origin = this.origin
            if (origin.addEventListener) {
                origin.removeEventListener(type, fn, false)
            } else if (origin.attachEvent) {
                origin.detachEvent('on' + type, fn)
            } else {
                origin['on' + type] = null
            }
        },
        /**
         * 元素遍历相关方法
         */
        // 获取所有子元素节点的集合
        childElements: function () {
            var origin = this.origin
            var arr = [],
                nodes = origin.childNodes
            for (var i = 0; i < nodes.length; i++) {
                var item = nodes[i]
                if (item.nodeType === 1) {
                    arr.push(item)
                }
            }
            return arr
        },
        // 获取第一个子元素节点
        firstElement: function () {
            var origin = this.origin
            var nodes = origin.childNodes
            for (var i = 0; i < nodes.length; i++) {
                var item = nodes[i]
                if (item.nodeType === 1) {
                    return item
                }
            }
            return null
        },
        // 获取最后一个子元素节点
        lastElement: function () {
            var origin = this.origin
            var nodes = origin.childNodes
            for (var i = nodes.length - 1; i > -1; i--) {
                var item = nodes[i]
                if (item.nodeType === 1) {
                    return item
                }
            }
            return null
        },
        // 获取兄前一个兄弟元素节点
        nextElement: function (num) {
            var origin = this.origin
            var n = num === undefined ? 1 : num,
                item = origin
            for (; n > 0; n--) {
                item = item.nextSibling
                while (item && item.nodeType !== 1) {
                    item = item.nextSibling
                }
            }
            return item
        },
        // 获取后一个兄弟元素节点
        previousElement: function (num) {
            var origin = this.origin
            var n = num === undefined ? 1 : num,
                item = origin
            for (; n > 0; n--) {
                item = item.previousSibling
                while (item && item.nodeType !== 1) {
                    item = item.previousSibling
                }
            }
            return item
        },
        /**
         * 元素动画相关方法
         */
        // JS 设置单个样式动画
        setAnimationJS: function (key, val, time) {
            var origin = this.origin
            origin.animationTimer = origin.animationTimer || {}
            clearInterval(origin.animationTimer[key]);
            var style = parseInt(origin.adapter().getStyles(key)),
                unit = val.match(/[a-z]+/g)
            if (!isNaN(style)) {
                var val = parseInt(val),
                    each = (val - style) / time * 10
                origin.animationTimer [key] = setInterval(function () {
                    if (style * each >= val * each) {
                        clearInterval(origin.animationTimer[key]);
                    } else {
                        style += each
                        origin.style[key] = style + unit || ''
                    }
                }, 10)
            }
        },
        // JS 设置多个样式动画
        setAnimationsJS: function (props, time) {
            for (var key in props) {
                var val = props[key] + ''
                this.setAnimationJS(key, val, time)
            }
        },
        // CSS 设置单个样式动画
        setAnimationCSS: function (key, val, time, type) {
            var origin = this.origin
            origin.style.transition = key + ' ' + time + 'ms' + ' ' + (type || 'ease')
            origin.style[key] = val;
        },
        // CSS 设置多个样式动画
        setAnimationsCSS: function (props, time, type) {
            var origin = this.origin
            var keys = []
            for (var key in props) {
                keys.push(key + ' ' + time + 'ms' + ' ' + (type || 'ease'))
            }
            origin.style.transition += keys.join(',')
            for (var key in props) {
                origin.style[key] = props[key];
            }
        }
    }

    /**
     * EventAdapter：事件对象工具方法
     * 通过事件对象的 adapter 方法调用
     */
    var EventAdapter = function (origin) {
        this.origin = origin
    }

    EventAdapter.prototype = {
        // 获取事件对象
        getEvent: function () {
            var origin = this.origin
            return origin || window.event
        },
        // 获取事件源对象
        getTarget: function () {
            var origin = this.origin
            return origin.target || origin.srcElement
        },
        // 阻止事件冒泡
        stopBubble: function () {
            var origin = this.origin
            if (origin.stopPropagation) {
                origin.stopPropagation()
            } else {
                // 兼容 IE8 及以下
                origin.cancelBubble = true
            }

        },
        // 阻止默认事件
        stopDefault: function () {
            var origin = this.origin
            if (origin.preventDefault) {
                origin.preventDefault()
            } else {
                // 兼容 IE8 及以下
                origin.returnValue = false
            }
        },
        // 获取鼠标位置
        mousePosition: function () {
            var origin = this.origin,
                proto = WindowAdapter.prototype
            var sTop = proto.getScrollOffset().top,
                sLeft = proto.getScrollOffset().left,
                cTop = document.documentElement.clientTop || 0,
                cLeft = document.documentElement.clientLeft || 0
            return {
                X: origin.clientX + sLeft - cLeft,
                Y: origin.clientY + sTop - cTop,
            }
        }
    }

    /**
     * ArrayAdapter：数组对象工具方法
     * 通过数组对象的 adapter 方法调用
     */
    var ArrayAdapter = function (origin) {
        this.origin = origin
    }

    ArrayAdapter.prototype = {
        // 数组混乱
        shuffle: function () {
            var origin = this.origin
            return origin.sort(function () {
                return Math.random() - 0.5
            });
        },
        // 字符串数组按字节数排序
        sortByBytes: function () {
            var origin = this.origin
            return origin.sort(function (a, b) {
                return getBytes(a) - getBytes(b)
            })

            function getBytes(str) {
                var bytes = str.length
                for (var index in str) {
                    if (str.charCodeAt(index) > 255) {
                        bytes++
                    }
                }
                return bytes
            }
        },
        // 数字与字符串数组去重
        uniqe: function () {
            var origin = this.origin
            var temp = {},
                arr = [],
                len = origin.length
            for (var i = 0; i < len; i++) {
                var item = origin[i]
                if (!temp.hasOwnProperty(typeof (item) + item)) {
                    temp[typeof (item) + item] = true
                    arr.push(item)
                }
            }
            return arr
        }
    }

    /**
     * 整合到原型的 adapter 方法上
     * 通过原型上的方法获得对象的引用，传入构造函数
     * 通过 adapter 方法获得相应对象，以调用其中封装的方法
     */
    Window.prototype.adapter = function () {
        return new WindowAdapter()
    }

    Element.prototype.adapter = function () {
        return new ElementAdapter(this)
    }

    Event.prototype.adapter = function () {
        return new EventAdapter(this)
    }

    Array.prototype.adapter = function () {
        return new ArrayAdapter(this)
    }
}
)()


