import { Params, RouteCompareFunctionReturn } from "../../types/core";

class Router {
    private static routes: Route[] = [];

    /**
     * Agrega una nueva ruta
     * @param {string} path url de la ruta 
     * @param {CallableFunction} renderCallback funcion que se ejecuta cuando al navegar a esta url 
     */
    static route(path: string, renderCallback: CallableFunction) {
        this.routes.push(new Route(path, renderCallback))
    }

    /**
     * Navega a una url
     * @param path Url a la que se desea viajar
     */
    static navigate (path: string) {
        path = path.trim()
        history.pushState(null, "", path)
        this.boot()
    }

    /**
     * Devuelve la ruta conicidente con la url actual
     * @param path url actual
     */
    private static match (path: string) {
        let route = null
        for(const item of this.routes) {
            const match = item.compare(path)
            if (match.success) {
                route = item
                route.params = match.params
                if ( item.type == 'exact') break;
            }
        }
        return route
    }

    /** Busca la ruta actual y ejecuta su funcion */
    static boot () {
        const path = location.pathname.trim()
        const route = this.match(path)
        route?.renderCallback(route.params)
    }
}

class Route {
    path: string
    type: "dynamic" | "exact"
    renderCallback: CallableFunction
    params?: Params

    constructor(path: string, renderCallback: CallableFunction) {
        this.path = path
        this.renderCallback = renderCallback
        const isExact = !/:\w/.test(path)
        this.type = isExact ? 'exact' : 'dynamic'
    }

    /**
     * Funcion para comparar una url con este objeto ruta
     * @param {string} url URL de comparacion
     */
    compare(url: string): RouteCompareFunctionReturn {
        if ( this.type == "exact" ) {
            return { success: url == this.path, params: {} }
        }
        const replace = this.path.replace(/:\w+/gi, '([^\/]+)')
        const regexp = new RegExp(replace, 'i')
        const match = regexp.test(url)
        if ( match ) {
            const nameParams = this.path.match(/:\w+/gi) ?? []
            const matchParams = url.match(regexp); matchParams?.shift()
            let params: Params = {}
            for(const nameParam of nameParams) {
                params[nameParam.slice(1) as string] = matchParams?.shift()
            }
            return { success: true, params }
        }
        return { success: false, params: {} }
    }
}

export default Router;
