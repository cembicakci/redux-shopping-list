import { useSelector } from 'react-redux'
import { CartIcon } from '../icons.js'

function Navbar() {

    const { amount } = useSelector(state => state.cart)
    // const amount = useSelector(state => state.cart.amount)

    return (
        <nav>
            <div className='nav-center'>
                <h3>Shopping List</h3>
                <div className='nav-container'>
                    <CartIcon />
                    <div className='amount-container'>
                        <p className='total-amount'>{amount}</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar