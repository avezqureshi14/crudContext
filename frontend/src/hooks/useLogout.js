import { useAuthContext } from './useAuthContext'
import { useProductsContext } from './useProductsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch:proDispatch } = useProductsContext()

  
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action 
    dispatch({ type: 'LOGOUT' })
    proDispatch({type:'SET_PRODUCTS',payload:null});
  }

  return { logout }
}