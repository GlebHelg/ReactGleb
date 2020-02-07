import React, {Component} from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        const ret = ((nextProps.show !== this.props.show) || (nextProps.loading !== this.props.loading))
        return ret;
    }

    componentWillUpdate(){
        console.log('[Modal] WillUpdate');
    }

    render(){
        let props = this.props;
        return (
            <Auxiliary>
                <Backdrop show={props.show} clicked={props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    {props.children}
                </div>
            </Auxiliary>
        );
    }
};

export default Modal;