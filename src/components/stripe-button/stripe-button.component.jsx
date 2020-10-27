import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Hgqv7JzfKHEo0f3B1CDAfZNI2SHJK9Um9KnysgQSRU2UTPWNQYYI4GrgW3l36GzLWa5Eq6bog9r1AHcqq8FKbPW005ZGGIW5j';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful!');
    };
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            currency='GDP'
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is £${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;
