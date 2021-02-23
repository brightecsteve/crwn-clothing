import React from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden, signOut }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <CrownLogo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/'>
                CONTACT
            </OptionLink>
            {
                currentUser ? (
                    <OptionLink as='div' onClick={() => signOut()}>SIGN OUT</OptionLink>
                ) : (
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                )
            }
            <CartIcon/>
        </OptionsContainer>
        { hidden ? null : (
            <CartDropdown />
        )}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
