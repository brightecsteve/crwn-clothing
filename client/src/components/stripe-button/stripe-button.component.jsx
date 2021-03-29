import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Hgqv7JzfKHEo0f3B1CDAfZNI2SHJK9Um9KnysgQSRU2UTPWNQYYI4GrgW3l36GzLWa5Eq6bog9r1AHcqq8FKbPW005ZGGIW5j';
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token,
            },
        }).then(response => {
            alert('Payment successful');
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert(
                'There was an issue with your payment. '
                + 'Please make sure you use the provided credit card'
            );
        })
    };
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            currency='GBP'
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
