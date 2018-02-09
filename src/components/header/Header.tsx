import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {IHeader} from './IHeader';
import { sp } from '@pnp/sp';

export default class Header extends React.Component<IHeader, any>{

    constructor(props:IHeader){
        super(props);

        this.state = {
            SiteTitle: null
        };
    }
    private btnClickEvent(event:any): void{
        event.preventDefault();
        console.log('Button clicked');
        try {
            sp.web.select("Title").get().then(siteTitle=>{
                console.log(siteTitle);
                this.setState({SiteTitle:siteTitle.Title});
            });
        } catch (error) {
            console.log(error);
        }
    }

    public render():React.ReactElement<IHeader>{
        return (
            <div className="ms-Grid">
            <h1>Hello Rahul from {this.props.compiler} and {this.props.framework}!</h1>
            <PrimaryButton id="btnClick" text="Click Me" onClick={this.btnClickEvent.bind(this)} />
            <div>SiteTitle: {this.state.SiteTitle}</div>
            </div>
        );
    }
}
