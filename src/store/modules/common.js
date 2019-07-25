import { proxyGet, proxyGetTimeout, proxyPost, commonGet, commonPost } from '@/api/common'

const common = {
    actions: {
        ProxyGet({}, params) {
            return new Promise((resolve, reject) => {
                proxyGet(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        ProxyGetTimeout({}, params) {
            return new Promise((resolve, reject) => {
                proxyGetTimeout(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        ProxyPost({}, params) {
            return new Promise((resolve, reject) => {
                proxyPost(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        CommonGet({}, params) {
            return new Promise((resolve, reject) => {
                commonGet(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        CommonPost({}, params) {
            return new Promise((resolve, reject) => {
                commonPost(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default common