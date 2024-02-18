export const localStorageStyleKey = 'style'

export const containerMaxW = 'xl:max-w-screen-2xl xl:mx-auto'

export const appTitle = 'CoD DB'

export const getPageTitle = (currentPageTitle: string) => `${currentPageTitle} - ${appTitle}`

export const BACKEND_URL = process.env.NODE_ENV == "development" ? "http://localhost:8000/" : "/"
// export const BACKEND_URL = "http://localhost:8000/"

export const API_URL = BACKEND_URL+ "api/";
