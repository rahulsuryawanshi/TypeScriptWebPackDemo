import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {IHeader} from './IHeader';

export default class Header extends React.Component<IHeader, any>{


    private btnClickEvent(event:any): void{
        event.preventDefault();
        console.log('Button clicked');
    }

    public render():React.ReactElement<IHeader>{
        return (
            <div>
            <h1>Hello Rahul from {this.props.compiler} and {this.props.framework}!</h1>
            <PrimaryButton id="btnClick" text="Click Me" onClick={this.btnClickEvent.bind(this)} />
            </div>
        );
    }
}
