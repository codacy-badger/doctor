import * as React from 'react';
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { register } from "../actions/user-actions";
import { RegisterForm } from "../components/RegisterForm";
import { IRootState } from "../reducers/root";
import { User } from '../types/user';

export interface IStateProps {
    user: User
}

export interface IDispatchProps {
    register: (user: User) => void;
}

export class RegisterPage extends React.Component<IDispatchProps & IStateProps, {}> {

    public constructor(props: IDispatchProps & IStateProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: any) {
        const { name, value } = event.target;
        const user = { ...this.props.user, [name]: value };

        this.props.register(user);
        // dispatch user change
    }

    public handleSubmit(event: any) {
        if (this.props.user.login && 
            this.props.user.email && 
            this.props.user.password) {
            this.props.register(this.props.user);
        }
    }

    public render() {
        return (
            <RegisterForm user={this.props.user} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        )
    }
}

const mapStateToProps = (state: IRootState, props: IStateProps): IStateProps => ({
    user: state.userState.user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>): IDispatchProps => {
    return {
        register: (user: User) => dispatch(register(user, dispatch)),
    };
  };

export default connect<any, IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(RegisterPage as any);