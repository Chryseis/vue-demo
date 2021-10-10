/* @zyf2e/monitor-web-performance version ' + 2.1.29 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generateUniqueID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

var roundByFour = function (num, digits) {
    if (digits === void 0) { digits = 4; }
    try {
        return parseFloat(num.toFixed(digits));
    }
    catch (err) {
        return num;
    }
};
var convertToMB = function (bytes) {
    if (typeof bytes !== 'number') {
        return null;
    }
    return roundByFour(bytes / Math.pow(1024, 2));
};
var afterLoad = function (callback) {
    if (document.readyState === 'complete') {
        setTimeout(callback);
    }
    else {
        addEventListener('pageshow', callback);
    }
};
var beforeUnload = function (callback) {
    window.addEventListener('beforeunload', callback);
};
var unload = function (callback) {
    window.addEventListener('unload', callback);
};
var validNumber = function (nums) {
    if (Array.isArray(nums)) {
        return nums.every(function (n) { return n >= 0; });
    }
    else {
        return nums >= 0;
    }
};
var isEqualArr = function (arr1, arr2) {
    if (!arr1) {
        return false;
    }
    if (!arr2) {
        return false;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    var _arr1 = arr1.sort();
    var _arr2 = arr2.sort();
    for (var i = 0; i < _arr1.length; i++) {
        if (_arr1[i] !== _arr2[i]) {
            return false;
        }
    }
    return true;
};

var onHidden = function (cb, once) {
    var onHiddenOrPageHide = function (event) {
        if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
            cb(event);
            if (once) {
                removeEventListener('visibilitychange', onHiddenOrPageHide, true);
                removeEventListener('pagehide', onHiddenOrPageHide, true);
            }
        }
    };
    addEventListener('visibilitychange', onHiddenOrPageHide, true);
    addEventListener('pagehide', onHiddenOrPageHide, true);
};

var createReporter = function (sectionId, appId, version, callback) {
    return function (data) {
        var reportData = {
            sectionId: sectionId,
            appId: appId,
            version: version,
            data: data,
            timestamp: +new Date()
        };
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(function () {
                callback(reportData);
            }, { timeout: 3000 });
        }
        else {
            callback(reportData);
        }
    };
};

var metricsStore$1 = (function () {
    function metricsStore(report) {
        this.state = new Map();
        this.report = report;
    }
    metricsStore.prototype.set = function (key, value) {
        this.state.set(key, value);
    };
    metricsStore.prototype.get = function (key) {
        return this.state.get(key);
    };
    metricsStore.prototype.has = function (key) {
        return this.state.has(key);
    };
    metricsStore.prototype.clear = function () {
        this.state.clear();
    };
    metricsStore.prototype.getValues = function () {
        return Array.from(this.state).reduce(function (obj, _a) {
            var key = _a[0], value = _a[1];
            obj[key] = value;
            return obj;
        }, {});
    };
    return metricsStore;
}());

var isPerformanceSupported = function () {
    return !!window.performance && !!window.performance.getEntriesByType && !!window.performance.mark;
};
var isPerformanceObserverSupported = function () {
    return !!window.PerformanceObserver;
};
var isNavigatorSupported = function () {
    return !!window.navigator;
};

var measure = function (customMetrics, markName) {
    if (!isPerformanceSupported()) {
        console.error('browser do not support performance');
        return;
    }
    performance.measure(customMetrics, markName + "_start", markName + "_end");
    return performance.getEntriesByName(customMetrics).pop();
};

var hasMark = function (markName) {
    if (!isPerformanceSupported()) {
        console.error('browser do not support performance');
        return;
    }
    return performance.getEntriesByName(markName).length > 0;
};
var getMark = function (markName) {
    if (!isPerformanceSupported()) {
        console.error('browser do not support performance');
        return;
    }
    return performance.getEntriesByName(markName).pop();
};
var setMark = function (markName) {
    if (!isPerformanceSupported()) {
        console.error('browser do not support performance');
        return;
    }
    performance.mark(markName);
};
var clearMark = function (markName) {
    if (!isPerformanceSupported()) {
        return;
    }
    performance.clearMarks(markName);
};

var metricsName;
(function (metricsName) {
    metricsName["NT"] = "navigation-timing";
    metricsName["FP"] = "first-paint";
    metricsName["FCP"] = "first-contentful-paint";
    metricsName["LCP"] = "largest-contentful-paint";
    metricsName["CCP"] = "custom-contentful-paint";
    metricsName["FID"] = "first-input-delay";
    metricsName["RL"] = "resource-flow";
    metricsName["CLS"] = "cumulative-layout-shift";
    metricsName["FPS"] = "fps";
    metricsName["ACT"] = "api-complete-time";
    metricsName["DI"] = "device-information";
    metricsName["NI"] = "network-information";
    metricsName["PI"] = "page-information";
})(metricsName || (metricsName = {}));

var observe = function (type, callback) {
    try {
        if (PerformanceObserver.supportedEntryTypes.includes(type)) {
            var po = new PerformanceObserver(function (l) { return l.getEntries().map(callback); });
            po.observe({ type: type, buffered: true });
            return po;
        }
    }
    catch (e) { }
};

var getNavigationTiming = function () {
    if (!isPerformanceSupported()) {
        console.warn('browser do not support performance');
        return;
    }
    var resolveNavigationTiming = function (entry, resolve) {
        var domainLookupStart = entry.domainLookupStart, domainLookupEnd = entry.domainLookupEnd, connectStart = entry.connectStart, connectEnd = entry.connectEnd, secureConnectionStart = entry.secureConnectionStart, requestStart = entry.requestStart, responseStart = entry.responseStart, responseEnd = entry.responseEnd, domInteractive = entry.domInteractive, domContentLoadedEventStart = entry.domContentLoadedEventStart, domContentLoadedEventEnd = entry.domContentLoadedEventEnd, loadEventStart = entry.loadEventStart, fetchStart = entry.fetchStart;
        resolve({
            dnsLookup: roundByFour(domainLookupEnd - domainLookupStart),
            initialConnection: roundByFour(connectEnd - connectStart),
            ssl: secureConnectionStart ? roundByFour(connectEnd - secureConnectionStart) : 0,
            ttfb: roundByFour(responseStart - requestStart),
            contentDownload: roundByFour(responseEnd - responseStart),
            domParse: roundByFour(domInteractive - responseEnd),
            deferExecuteDuration: roundByFour(domContentLoadedEventStart - domInteractive),
            domContentLoadedCallback: roundByFour(domContentLoadedEventEnd - domContentLoadedEventStart),
            resourceLoad: roundByFour(loadEventStart - domContentLoadedEventEnd),
            domReady: roundByFour(domContentLoadedEventEnd - fetchStart),
            pageLoad: roundByFour(loadEventStart - fetchStart)
        });
    };
    return new Promise(function (resolve) {
        if (isPerformanceObserverSupported() && PerformanceObserver.supportedEntryTypes.includes('navigation')) {
            var entryHandler = function (entry) {
                if (entry.entryType === 'navigation') {
                    if (po_1) {
                        po_1.disconnect();
                    }
                    resolveNavigationTiming(entry, resolve);
                }
            };
            var po_1 = observe('navigation', entryHandler);
        }
        else {
            var navigation = performance.getEntriesByType('navigation').length > 0 ? performance.getEntriesByType('navigation')[0] : performance.timing;
            resolveNavigationTiming(navigation, resolve);
        }
    });
};
var initNavigationTiming = function (store, report, immediately) {
    var _a;
    if (immediately === void 0) { immediately = true; }
    (_a = getNavigationTiming()) === null || _a === void 0 ? void 0 : _a.then(function (navigationTiming) {
        var metrics = { name: metricsName.NT, value: navigationTiming };
        if (validNumber(Object.values(metrics.value))) {
            if (immediately) {
                report(metrics);
            }
            store.set(metricsName.NT, metrics);
        }
    });
};

var getDeviceInfo = function () {
    if (!isPerformanceSupported()) {
        console.warn('browser do not support performance');
        return;
    }
    if (!isNavigatorSupported()) {
        console.warn('browser do not support navigator');
        return;
    }
    return {
        deviceMemory: 'deviceMemory' in navigator ? navigator['deviceMemory'] : 0,
        hardwareConcurrency: 'hardwareConcurrency' in navigator ? navigator['hardwareConcurrency'] : 0,
        jsHeapSizeLimit: 'memory' in performance ? convertToMB(performance['memory']['jsHeapSizeLimit']) : 0,
        totalJSHeapSize: 'memory' in performance ? convertToMB(performance['memory']['totalJSHeapSize']) : 0,
        usedJSHeapSize: 'memory' in performance ? convertToMB(performance['memory']['usedJSHeapSize']) : 0
    };
};
var initDeviceInfo = function (store, report, immediately) {
    if (immediately === void 0) { immediately = true; }
    var deviceInfo = getDeviceInfo();
    var metrics = { name: metricsName.DI, value: deviceInfo };
    if (immediately) {
        report(metrics);
    }
    store.set(metricsName.DI, metrics);
};

var getNetworkInfo = function () {
    if (!isNavigatorSupported()) {
        console.warn('browser do not support performance');
        return;
    }
    var connection = ('connection' in navigator ? navigator['connection'] : {});
    var downlink = connection.downlink, effectiveType = connection.effectiveType, rtt = connection.rtt;
    return {
        downlink: downlink,
        effectiveType: effectiveType,
        rtt: rtt
    };
};
var initNetworkInfo = function (store, report, immediately) {
    if (immediately === void 0) { immediately = true; }
    var networkInfo = getNetworkInfo();
    var metrics = { name: metricsName.NI, value: networkInfo };
    if (immediately) {
        report(metrics);
    }
    store.set(metricsName.NI, metrics);
};

var getPageInfo = function () {
    if (!location) {
        console.warn('browser do not support location');
        return;
    }
    var host = location.host, hostname = location.hostname, href = location.href, protocol = location.protocol, origin = location.origin, port = location.port, pathname = location.pathname, search = location.search, hash = location.hash;
    var _a = window.screen, width = _a.width, height = _a.height;
    return {
        host: host,
        hostname: hostname,
        href: href,
        protocol: protocol,
        origin: origin,
        port: port,
        pathname: pathname,
        search: search,
        hash: hash,
        userAgent: 'userAgent' in navigator ? navigator.userAgent : '',
        screenResolution: width + "x" + height
    };
};
var initPageInfo = function (store, report, immediately) {
    if (immediately === void 0) { immediately = true; }
    var pageInfo = getPageInfo();
    var metrics = { name: metricsName.PI, value: pageInfo };
    if (immediately) {
        report(metrics);
    }
    store.set(metricsName.PI, metrics);
};

var firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity;
var getFirstHiddenTime = function () {
    onHidden(function (e) {
        firstHiddenTime = Math.min(firstHiddenTime, e.timeStamp);
    }, true);
    return {
        get timeStamp() {
            return firstHiddenTime;
        }
    };
};

var getFP = function () {
    if (!isPerformanceObserverSupported()) {
        console.warn('browser do not support performanceObserver');
        return;
    }
    return new Promise(function (resolve) {
        var entryHandler = function (entry) {
            if (entry.name === 'first-paint') {
                if (po) {
                    po.disconnect();
                }
                if (entry.startTime < getFirstHiddenTime().timeStamp) {
                    resolve(entry);
                }
            }
        };
        var po = observe('paint', entryHandler);
    });
};
var initFP = function (store, report, immediately) {
    var _a;
    if (immediately === void 0) { immediately = true; }
    (_a = getFP()) === null || _a === void 0 ? void 0 : _a.then(function (entry) {
        var metrics = { name: metricsName.FP, value: roundByFour(entry.startTime, 2) };
        if (immediately) {
            report(metrics);
        }
        store.set(metricsName.FP, metrics);
    });
};

var getFCP = function () {
    if (!isPerformanceObserverSupported()) {
        console.warn('browser do not support performanceObserver');
        return;
    }
    return new Promise(function (resolve) {
        var entryHandler = function (entry) {
            if (entry.name === 'first-contentful-paint') {
                if (po) {
                    po.disconnect();
                }
                if (entry.startTime < getFirstHiddenTime().timeStamp) {
                    resolve(entry);
                }
            }
        };
        var po = observe('paint', entryHandler);
    });
};
var initFCP = function (store, report, immediately) {
    var _a;
    if (immediately === void 0) { immediately = true; }
    (_a = getFCP()) === null || _a === void 0 ? void 0 : _a.then(function (entry) {
        var metrics = { name: metricsName.FCP, value: roundByFour(entry.startTime, 2) };
        if (immediately) {
            report(metrics);
        }
        store.set(metricsName.FCP, metrics);
    });
};

var getFID = function () {
    if (!isPerformanceObserverSupported()) {
        console.warn('browser do not support performanceObserver');
        return;
    }
    var firstHiddenTime = getFirstHiddenTime();
    return new Promise(function (resolve) {
        var eventHandler = function (entry) {
            if (entry.startTime < firstHiddenTime.timeStamp) {
                if (po) {
                    po.disconnect();
                }
                resolve(entry);
            }
        };
        var po = observe('first-input', eventHandler);
        if (po) {
            onHidden(function () {
                if (po === null || po === void 0 ? void 0 : po.takeRecords) {
                    po.takeRecords().map(eventHandler);
                }
                po.disconnect();
            }, true);
        }
    });
};
var initFID = function (store, report, immediately) {
    var _a;
    if (immediately === void 0) { immediately = true; }
    (_a = getFID()) === null || _a === void 0 ? void 0 : _a.then(function (entry) {
        var metrics = {
            name: metricsName.FID,
            value: {
                eventName: entry.name,
                targetCls: entry.target.className,
                startTime: roundByFour(entry.startTime, 2),
                delay: roundByFour(entry.processingStart - entry.startTime, 2),
                eventHandleTime: roundByFour(entry.processingEnd - entry.processingStart, 2)
            }
        };
        if (immediately) {
            report(metrics);
        }
        store.set(metricsName.FID, metrics);
    });
};

var getLCP = function (lcp) {
    if (!isPerformanceObserverSupported()) {
        console.warn('browser do not support performanceObserver');
        return;
    }
    var firstHiddenTime = getFirstHiddenTime();
    var entryHandler = function (entry) {
        if (entry.startTime < firstHiddenTime.timeStamp) {
            lcp.value = entry;
        }
    };
    return observe('largest-contentful-paint', entryHandler);
};
var initLCP = function (store, report, immediately) {
    if (immediately === void 0) { immediately = true; }
    var lcp = { value: {} };
    var po = getLCP(lcp);
    var stopListening = function () {
        if (po) {
            if (po.takeRecords) {
                po.takeRecords().forEach(function (entry) {
                    var firstHiddenTime = getFirstHiddenTime();
                    if (entry.startTime < firstHiddenTime.timeStamp) {
                        lcp.value = entry;
                    }
                });
            }
            po.disconnect();
            if (!store.has(metricsName.LCP)) {
                var value = lcp.value;
                var metrics = { name: metricsName.LCP, value: roundByFour(value.startTime, 2) };
                if (immediately) {
                    report(metrics);
                }
                store.set(metricsName.LCP, metrics);
            }
        }
    };
    onHidden(stopListening, true);
    ['click', 'keydown'].forEach(function (event) {
        addEventListener(event, stopListening, { once: true, capture: true });
    });
};

var calculateFps = function (count) {
    return new Promise(function (resolve) {
        var frame = 0;
        var lastFrameTime = +new Date();
        var fpsQueue = [];
        var timerId = null;
        var calculate = function () {
            var now = +new Date();
            frame = frame + 1;
            if (now > 1000 + lastFrameTime) {
                var fps = Math.round(frame / ((now - lastFrameTime) / 1000));
                fpsQueue.push(fps);
                frame = 0;
                lastFrameTime = +new Date();
                if (fpsQueue.length > count) {
                    cancelAnimationFrame(timerId);
                    resolve(roundByFour(fpsQueue.reduce(function (sum, fps) {
                        sum = sum + fps;
                        return sum;
                    }, 0) / fpsQueue.length, 2));
                }
                else {
                    timerId = requestAnimationFrame(calculate);
                }
            }
            else {
                timerId = requestAnimationFrame(calculate);
            }
        };
        calculate();
    });
};

var getFPS = function (logFpsCount) {
    return calculateFps(logFpsCount);
};
var initFPS = function (store, report, logFpsCount, immediately) {
    if (immediately === void 0) { immediately = true; }
    getFPS(logFpsCount).then(function (fps) {
        var metrics = { name: metricsName.FPS, value: fps };
        if (immediately) {
            report(metrics);
        }
        store.set(metricsName.FPS, metrics);
    });
};

var getCLS = function (cls) {
    if (!isPerformanceObserverSupported()) {
        console.warn('browser do not support performanceObserver');
        return;
    }
    var entryHandler = function (entry) {
        if (!entry.hadRecentInput) {
            cls.value += entry.value;
        }
    };
    return observe('layout-shift', entryHandler);
};
var initCLS = function (store, report, customCompleteEvent, immediately) {
    if (immediately === void 0) { immediately = true; }
    var cls = { value: 0 };
    var po = getCLS(cls);
    var completeEvent = customCompleteEvent || 'pageshow';
    var stopListening = function () {
        if (po === null || po === void 0 ? void 0 : po.takeRecords) {
            po.takeRecords().map(function (entry) {
                if (!entry.hadRecentInput) {
                    cls.value += entry.value;
                }
            });
        }
        po === null || po === void 0 ? void 0 : po.disconnect();
        var metrics = { name: metricsName.CLS, value: roundByFour(cls.value) };
        if (immediately) {
            report(metrics);
        }
        store.set(metricsName.CLS, metrics);
    };
    addEventListener(completeEvent, stopListening, { once: true, capture: true });
};

function proxyXhr(beforeHandler, afterHandler) {
    var origin = window.XMLHttpRequest;
    if (origin) {
        origin.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            beforeHandler && beforeHandler.apply(void 0, args);
            origin.prototype.open.apply(this, args);
            this.addEventListener('loadend', function () {
                afterHandler && afterHandler.apply(void 0, args);
            });
        };
    }
}
function proxyFetch(beforeHandler, afterHandler) {
    var origin = window.fetch;
    if (origin) {
        window.fetch = function (resource, init) {
            beforeHandler && beforeHandler(resource, init);
            return origin.call(window, resource, init).then(function (response) {
                afterHandler && afterHandler(resource, init);
                return response;
            });
        };
    }
}
function proxyHistory(handler) {
    if (window.history) {
        var originPushState_1 = history.pushState;
        var originReplaceState_1 = history.replaceState;
        history.pushState = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            handler && handler();
            originPushState_1.apply(window.history, args);
        };
        history.replaceState = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            handler && handler();
            originReplaceState_1.apply(window.history, args);
        };
    }
}

var onPageChange = function (cb) {
    window.addEventListener('hashchange', function (e) {
        cb(e);
    });
    window.addEventListener('popstate', function (e) {
        cb(e);
    });
    proxyHistory(function () {
        cb();
    });
};

var firstVisitedState = false;
var getFirstVisitedState = function () {
    onPageChange(function () {
        firstVisitedState = true;
    });
    return {
        get state() {
            return firstVisitedState;
        }
    };
};

var getPath = function (location, isHash) {
    if (isHash) {
        return location.pathname.replace(/\/$/, '');
    }
    else {
        var index = location.href.indexOf('#');
        if (index < 0)
            return '';
        return location.href.slice(index + 1);
    }
};

var remoteQueue = [];
var completeQueue = [];
var isDone = false;
var reportLock = true;
var storeMetrics = function (name, value, store) {
    var metrics = { name: name, value: value };
    store.set(name, metrics);
};
var computeCCPAndRL = function (store) {
    setTimeout(function () {
        var images = Array.from(document.querySelectorAll('img')).filter(function (image) { return !image.complete && image.src; });
        if (images.length > 0) {
            var loadImages_1;
            images.forEach(function (image) {
                image.addEventListener('load', function () {
                    loadImages_1 += 1;
                    if (loadImages_1 === images.length) {
                        storeMetrics(metricsName.CCP, performance.now(), store);
                        storeMetrics(metricsName.RL, performance.getEntriesByType('resource'), store);
                    }
                });
                image.addEventListener('error', function () {
                    loadImages_1 += 1;
                    if (loadImages_1 === images.length) {
                        storeMetrics(metricsName.CCP, performance.now(), store);
                        storeMetrics(metricsName.RL, performance.getEntriesByType('resource'), store);
                    }
                });
            });
        }
        else {
            storeMetrics(metricsName.CCP, performance.now(), store);
            storeMetrics(metricsName.RL, performance.getEntriesByType('resource'), store);
        }
    });
};
var beforeHandler = function (url, apiConfig, hashHistory) {
    if (isPerformanceSupported()) {
        var path = getPath(location, hashHistory);
        var firstVisitedState = getFirstVisitedState();
        if (!firstVisitedState) {
            if (apiConfig[path]) {
                if (apiConfig[path].some(function (path) { return path.indexOf(url) > -1; })) {
                    remoteQueue.push(url);
                }
            }
            else {
                if (!isDone) {
                    remoteQueue.push(url);
                }
            }
        }
    }
    else {
        console.warn('browser do not support performance');
    }
};
var afterHandler = function (url, store) {
    if (isPerformanceSupported()) {
        var firstVisitedState = getFirstVisitedState();
        if (!firstVisitedState) {
            completeQueue.push(url);
            if (isEqualArr(remoteQueue, completeQueue)) {
                storeMetrics(metricsName.ACT, performance.now(), store);
                computeCCPAndRL(store);
            }
        }
    }
    else {
        console.warn('browser do not support performance');
    }
};
var reportMetrics = function (store, report) {
    if (reportLock) {
        var ccp = store.get(metricsName.CCP);
        var rl = store.get(metricsName.RL);
        var act = store.get(metricsName.ACT);
        if (act) {
            report(act);
        }
        if (ccp) {
            report(ccp);
        }
        if (rl) {
            report(rl);
        }
        reportLock = false;
    }
};
var maxWaitTime4Report = function (cb) {
    setTimeout(cb, 30 * 1000);
};
var initCCP = function (store, report, customCompleteEvent, apiConfig, hashHistory) {
    var event = customCompleteEvent || 'pageshow';
    window.addEventListener(event, function () {
        isDone = true;
        if (isPerformanceSupported()) {
            computeCCPAndRL(store);
        }
    }, { once: true, capture: true });
    onHidden(function () { return reportMetrics(store, report); }, true);
    onPageChange(function () { return reportMetrics(store, report); });
    maxWaitTime4Report(function () { return reportMetrics(store, report); });
    proxyXhr(function (url) { return beforeHandler(url, apiConfig, hashHistory); }, function (url) { return afterHandler(url, store); });
    proxyFetch(function (url) { return beforeHandler(url, apiConfig, hashHistory); }, function (url) { return afterHandler(url, store); });
};

var metricsStore;
var reporter;
var WebVitals = (function () {
    function WebVitals(config) {
        var _this = this;
        var appId = config.appId, version = config.version, reportCallback = config.reportCallback, _a = config.reportUri, reportUri = _a === void 0 ? null : _a, _b = config.immediately, immediately = _b === void 0 ? false : _b, _c = config.customPaintMetrics, customPaintMetrics = _c === void 0 ? null : _c, _d = config.logFpsCount, logFpsCount = _d === void 0 ? 5 : _d, apiConfig = config.apiConfig, _e = config.hashHistory, hashHistory = _e === void 0 ? false : _e;
        this._customPaintMetrics = customPaintMetrics;
        var sectionId = generateUniqueID();
        reporter = createReporter(sectionId, appId, version, reportCallback);
        metricsStore = new metricsStore$1(reporter);
        initPageInfo(metricsStore, reporter, immediately);
        initNetworkInfo(metricsStore, reporter, immediately);
        initDeviceInfo(metricsStore, reporter, immediately);
        initCLS(metricsStore, reporter, customPaintMetrics, immediately);
        initCCP(metricsStore, reporter, customPaintMetrics, apiConfig, hashHistory);
        afterLoad(function () {
            initNavigationTiming(metricsStore, reporter, immediately);
            initFP(metricsStore, reporter, immediately);
            initFCP(metricsStore, reporter, immediately);
            initFID(metricsStore, reporter, immediately);
            initLCP(metricsStore, reporter, immediately);
            initFPS(metricsStore, reporter, logFpsCount, immediately);
        });
        [beforeUnload, unload, onHidden].forEach(function (fn) {
            fn(function () {
                var metrics = _this.getCurrentMetrics();
                if ('sendBeacon' in navigator && reportUri && Object.keys(metrics).length > 0 && !immediately) {
                    navigator.sendBeacon(reportUri, JSON.stringify(metrics));
                    metricsStore.clear();
                }
            });
        });
    }
    WebVitals.prototype.getCurrentMetrics = function () {
        return metricsStore.getValues();
    };
    WebVitals.prototype.dispatchCustomEvent = function () {
        var event = document.createEvent('Events');
        var customPaintMetrics = this._customPaintMetrics;
        event.initEvent(customPaintMetrics, false, true);
        document.dispatchEvent(event);
    };
    WebVitals.prototype.setStartMark = function (markName) {
        setMark(markName + "_start");
    };
    WebVitals.prototype.setEndMark = function (markName) {
        var _a;
        setMark(markName + "_end");
        if (hasMark(markName + "_start")) {
            var value = measure(markName + "Metrics", markName);
            this.clearMark(markName);
            var metrics = { name: markName + "Metrics", value: value };
            reporter(metrics);
            metricsStore.set(markName + "Metrics", metrics);
        }
        else {
            var value = (_a = getMark(markName + "_end")) === null || _a === void 0 ? void 0 : _a.startTime;
            this.clearMark(markName);
            var metrics = { name: markName + "Metrics", value: value };
            reporter(metrics);
            metricsStore.set(markName + "Metrics", metrics);
        }
    };
    WebVitals.prototype.clearMark = function (markName) {
        clearMark(markName + "_start");
        clearMark(markName + "_end");
    };
    WebVitals.prototype.customContentfulPaint = function () {
        var _this = this;
        setTimeout(function () { return _this.dispatchCustomEvent(); });
    };
    return WebVitals;
}());

exports.WebVitals = WebVitals;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=web-performance.js.map
