var Validator = function (opt) {
    this.router = opt.router
    this.store = opt.store
    this.iView = opt.iView
    this.setRouterGuarder()
}

Validator.prototype = {
    setLocalState: function (data) {
        localStorage.setItem('state', JSON.stringify(data))
    },
    setSessionState: function (data) {
        sessionStorage.setItem('state', JSON.stringify(data))
    },
    getLoaclState: function () {
        return JSON.parse(localStorage.getItem('state'))
    },
    getSessionState: function () {
        return JSON.parse(sessionStorage.getItem('state'))
    },
    updateStoreState: function () {
        this.store.replaceState(Object.assign({},
            this.getLoaclState(),
            this.getSessionState()))
    },
    updateAllState: function (remember, data) {
        if (remember === false) {
            this.setSessionState(data)
        } else {
            this.setLocalState(data)
        }
        this.updateStoreState()
    },
    deleteAllState: function () {
        this.setLocalState({})
        this.setSessionState({})
        this.updateStoreState()
    },
    setRouterGuarder: function () {
        this.router.beforeEach((to, from, next) => {
            this.iView.LoadingBar.start()
            if (to.meta.flag) {
                this.updateStoreState()
                if (this.store.state.flag === true) {
                    next()
                } else {
                    next('/user/login')
                }
            } else {
                next()
            }
        })
        this.router.afterEach(() => {
            this.iView.LoadingBar.finish()
        })
    }
}

export default Validator