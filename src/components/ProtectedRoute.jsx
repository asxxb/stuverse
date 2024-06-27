
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ element }) => {
    const authState = useSelector((state) => state.auth)
    return authState.user ? element : <Navigate to="/login" />
}
ProtectedRoute.propTypes = {

    element: PropTypes.element
}
export default ProtectedRoute