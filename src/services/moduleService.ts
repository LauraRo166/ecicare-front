import apiClient from "@/services/axiosService"
import type { ModuleData } from "@/types/moduleData"
import type { ChallengeData } from "@/types/challengeData"

/**
 * Crear un nuevo módulo
 */
export const createModule = async (module: ModuleData) => {
    const response = await apiClient.post("/modules/", module)
    return response.data
}

/**
 * Obtener el total de módulos existentes
 */
export const getTotalModules = async (): Promise<number> => {
    const response = await apiClient.get<{ total: number }>("/modules/total")
    return response.data.total
}

/**
 * Obtener todos los módulos (con o sin paginación)
 *
 * Si se pasa page y size, devuelve un objeto paginado (Page<ModuleResponse>)
 * Si no, devuelve una lista completa de módulos
 */
export const getAllModules = async (
    page?: number,
    size?: number,
    view?: string
) => {
    const params: Record<string, any> = {}
    if (page !== undefined && size !== undefined) {
        params.page = page
        params.size = size
    }
    if (view) {
        params.view = view
    }

    const response = await apiClient.get("/modules/modulesWithChallenges", { params })
    return response.data
}

/**
 * Obtener módulos generales (paginados)
 */
export const getAllGenModules = async (page = 0, size = 10, view?: string) => {
    const params: Record<string, any> = { page, size }
    if (view) params.view = view

    const response = await apiClient.get("/modules/gen-modules", { params })
    return response.data
}

/**
 * Obtener los retos asociados a un módulo
 */
export const getModuleChallenges = async (moduleName: string): Promise<ChallengeData[]> => {
    const response = await apiClient.get(`/modules/challenges/${encodeURIComponent(moduleName)}`)
    return response.data
}

/**
 * Obtener los retos de un módulo con paginación
 */
export const getModuleChallengesPaged = async (moduleName: string, page = 0, size = 10) => {
    const response = await apiClient.get(`/modules/${encodeURIComponent(moduleName)}/challenges`, {
        params: { page, size },
    })
    return response.data
}

/**
 * Obtener módulos con retos y usuarios registrados (según el email del admin)
 */
export const getModulesWithChallengesAndUsers = async (email: string) => {
    const response = await apiClient.get("/modules/with-challenges-and-users", {
        params: { email },
    })
    return response.data
}

/**
 * Obtener los módulos administrados por un usuario
 */
export const getModulesByAdministrator = async (email: string, page = 0, size = 10) => {
    const response = await apiClient.get("/modules/administrated-by-user", {
        params: { email, page, size },
    })
    return response.data
}

/**
 * Actualizar la descripción de un módulo
 */
export const updateModule = async (module: ModuleData) => {
    const response = await apiClient.put("/modules/", module)
    return response.data
}

/**
 * Actualizar el administrador de un módulo
 */
export const updateModuleAdministrator = async (moduleName: string, administratorEmail: string) => {
    const response = await apiClient.put(`/modules/${encodeURIComponent(moduleName)}/administrator`, {
        administratorEmail,
    })
    return response.data
}

/**
 * Eliminar un módulo por nombre
 */
export const deleteModule = async (moduleName: string) => {
    const response = await apiClient.delete(`/modules/${encodeURIComponent(moduleName)}`)
    return response.data
}

/**
 * Obtener un módulo por su nombre
 */
export const getModuleByName = async (moduleName: string) => {
    const response = await apiClient.get(`/modules/${encodeURIComponent(moduleName)}`)
    return response.data
}

/**
 * Buscar módulos por nombre
 */
export const searchModules = async (name = "", page = 0, size = 10) => {
    const response = await apiClient.get("/modules/search", {
        params: { name, page, size },
    })
    return response.data
}

/**
 * Buscar módulos administrados por un usuario (con filtro por nombre)
 */
export const searchModulesByAdmin = async (email: string, name = "", page = 0, size = 10) => {
    const response = await apiClient.get("/modules/admin/search", {
        params: { email, name, page, size },
    })
    return response.data
}