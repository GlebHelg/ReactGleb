import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{
    // let ob1 = {'a': 1, 'b': 2, 3: ['','','']}
    // console.log(Object.keys(ob1)) // Output: 3, a, b

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [ ...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            }); // [1,2] 
        });
    console.log('Transformed Ingredients: \n', transformedIngredients);
    const reducedIngredients = transformedIngredients.reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    console.log('Reduced Ingredients: \n', reducedIngredients);
    if(reducedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;