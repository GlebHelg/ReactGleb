import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    componentWillUpdate(){
        console.log('[OrderSummary] Will Update!');
        return true;
    }

    componentDidUpdate(){
        console.log('[OrderSummary] Did Update!');
    }

    render(){
        let props = this.props;
        let ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                       <span style={{textTransform: 'capitalize'}}>
                               {igKey}
                       </span>: {props.ingredients[igKey]}
                   </li>);
       });
        return  <>
                    <h3>Your Order</h3>
                    <p>A delicious burger with following ingredients:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                    <p>Continue to checkout?</p>
                    <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
                    <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
                 </>;
    }
};

export default OrderSummary;