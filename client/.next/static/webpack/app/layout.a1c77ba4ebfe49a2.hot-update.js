"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./src/app/globals.css":
/*!*****************************!*\
  !*** ./src/app/globals.css ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"bdc172b7bf04\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZ2xvYmFscy5jc3MiLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUFlLGNBQWM7QUFDN0IsSUFBSSxJQUFVLElBQUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZ2xvYmFscy5jc3M/YWQ1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImJkYzE3MmI3YmYwNFwiXG5pZiAobW9kdWxlLmhvdCkgeyBtb2R1bGUuaG90LmFjY2VwdCgpIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/app/errorBoundary.jsx":
/*!***********************************!*\
  !*** ./src/app/errorBoundary.jsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n// import React from \"react\"\nclass ErrorBoundary extends React.Component {\n    static getDerivedStateFromError(error) {\n        // Update state so the next render will show the fallback UI\n        return {\n            hasError: true\n        };\n    }\n    componentDidCatch(error, errorInfo) {\n        // You can use your own error logging service here\n        console.log({\n            error,\n            errorInfo\n        });\n    }\n    render() {\n        // Check if the error is thrown\n        if (this.state.hasError) {\n            // You can render any custom fallback UI\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: \"Oops, there is an error!\"\n                    }, void 0, false, {\n                        fileName: \"/usr/app/client/src/app/errorBoundary.jsx\",\n                        lineNumber: 27,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"button\",\n                        onClick: ()=>this.setState({\n                                hasError: false\n                            }),\n                        children: \"Try again?\"\n                    }, void 0, false, {\n                        fileName: \"/usr/app/client/src/app/errorBoundary.jsx\",\n                        lineNumber: 28,\n                        columnNumber: 21\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/usr/app/client/src/app/errorBoundary.jsx\",\n                lineNumber: 26,\n                columnNumber: 17\n            }, this);\n        }\n        // Return children components in case of no error\n        return this.props.children;\n    }\n    constructor(props){\n        super(props);\n        // Define a state variable to track whether is an error or not\n        this.state = {\n            hasError: false\n        };\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (ErrorBoundary);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZXJyb3JCb3VuZGFyeS5qc3giLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNEJBQTRCO0FBRTVCLE1BQU1BLHNCQUFzQkMsTUFBTUMsU0FBUztJQU92QyxPQUFPQyx5QkFBeUJDLEtBQUssRUFBRTtRQUNuQyw0REFBNEQ7UUFFNUQsT0FBTztZQUFFQyxVQUFVO1FBQUs7SUFDNUI7SUFDQUMsa0JBQWtCRixLQUFLLEVBQUVHLFNBQVMsRUFBRTtRQUNoQyxrREFBa0Q7UUFDbERDLFFBQVFDLEdBQUcsQ0FBQztZQUFFTDtZQUFPRztRQUFVO0lBQ25DO0lBQ0FHLFNBQVM7UUFDTCwrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLENBQUNDLEtBQUssQ0FBQ04sUUFBUSxFQUFFO1lBQ3JCLHdDQUF3QztZQUN4QyxxQkFDSSw4REFBQ087O2tDQUNHLDhEQUFDQztrQ0FBRzs7Ozs7O2tDQUNKLDhEQUFDQzt3QkFDR0MsTUFBSzt3QkFDTEMsU0FBUyxJQUFNLElBQUksQ0FBQ0MsUUFBUSxDQUFDO2dDQUFFWixVQUFVOzRCQUFNO2tDQUNsRDs7Ozs7Ozs7Ozs7O1FBS2I7UUFFQSxpREFBaUQ7UUFFakQsT0FBTyxJQUFJLENBQUNhLEtBQUssQ0FBQ0MsUUFBUTtJQUM5QjtJQW5DQUMsWUFBWUYsS0FBSyxDQUFFO1FBQ2YsS0FBSyxDQUFDQTtRQUVOLDhEQUE4RDtRQUM5RCxJQUFJLENBQUNQLEtBQUssR0FBRztZQUFFTixVQUFVO1FBQU07SUFDbkM7QUErQko7QUFFQSwrREFBZUwsYUFBYUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2Vycm9yQm91bmRhcnkuanN4PzQ3ZDkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5cbi8vIGltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5jbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICAvLyBEZWZpbmUgYSBzdGF0ZSB2YXJpYWJsZSB0byB0cmFjayB3aGV0aGVyIGlzIGFuIGVycm9yIG9yIG5vdFxuICAgICAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UgfVxuICAgIH1cbiAgICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKGVycm9yKSB7XG4gICAgICAgIC8vIFVwZGF0ZSBzdGF0ZSBzbyB0aGUgbmV4dCByZW5kZXIgd2lsbCBzaG93IHRoZSBmYWxsYmFjayBVSVxuXG4gICAgICAgIHJldHVybiB7IGhhc0Vycm9yOiB0cnVlIH1cbiAgICB9XG4gICAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IsIGVycm9ySW5mbykge1xuICAgICAgICAvLyBZb3UgY2FuIHVzZSB5b3VyIG93biBlcnJvciBsb2dnaW5nIHNlcnZpY2UgaGVyZVxuICAgICAgICBjb25zb2xlLmxvZyh7IGVycm9yLCBlcnJvckluZm8gfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgZXJyb3IgaXMgdGhyb3duXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICAvLyBZb3UgY2FuIHJlbmRlciBhbnkgY3VzdG9tIGZhbGxiYWNrIFVJXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMj5Pb3BzLCB0aGVyZSBpcyBhbiBlcnJvciE8L2gyPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBoYXNFcnJvcjogZmFsc2UgfSl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRyeSBhZ2Fpbj9cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gY2hpbGRyZW4gY29tcG9uZW50cyBpbiBjYXNlIG9mIG5vIGVycm9yXG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yQm91bmRhcnlcbiJdLCJuYW1lcyI6WyJFcnJvckJvdW5kYXJ5IiwiUmVhY3QiLCJDb21wb25lbnQiLCJnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IiLCJlcnJvciIsImhhc0Vycm9yIiwiY29tcG9uZW50RGlkQ2F0Y2giLCJlcnJvckluZm8iLCJjb25zb2xlIiwibG9nIiwicmVuZGVyIiwic3RhdGUiLCJkaXYiLCJoMiIsImJ1dHRvbiIsInR5cGUiLCJvbkNsaWNrIiwic2V0U3RhdGUiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc3RydWN0b3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/errorBoundary.jsx\n"));

/***/ })

});