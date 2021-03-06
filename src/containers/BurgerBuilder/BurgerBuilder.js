import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios_orders from '../../axios-orders';
import Loading from '../../components/UI/Loading/Loading';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce( (sum, el) => {
                        return sum += el;
                    }, 0);
        this.setState({purchaseable: sum > 3});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        // This will not work correctly if the method is triggered through an event
        // it is because of this keyword, and it will not refer to class any longer
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    sleepFor( sleepDuration ){
        var now = new Date().getTime();
        while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
    }
    
    purchaseContinueHandler = () => {

        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            name: "Gleb Helg",
            game: "Rocket League"
        };
        console.log('This state loading: ', this.state.loading);
        //this.sleepFor(2000);
        axios_orders.post('/orders.json', order)
                    .then(response => {
                        console.log('[BurgerBuilder] response:', response);
                        this.setState({loading: false, purchasing: false});
                    })
                    .catch(error => {
                        console.log('[BurgerBuilder] error:',error);
                        this.setState({loading: false, purchasing: false});
                    });
    }
    
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // console.log(this.state.ingredients['bacon']) // returns 3
        // {salad: true, meat:false, ..}
        let orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;
        if(this.state.loading){
            orderSummary = <Loading />;
        }
        return (
            <Auxiliary>
                <Modal loading={this.state.loading} show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    disabled={disabledInfo}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;