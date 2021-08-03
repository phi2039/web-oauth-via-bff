import React, {useState} from 'react';
import {CallApiProps} from './callApiProps';
import {CallApiState} from './callApiState';

export function CallApiView(props: CallApiProps) {

    const [state, setState] = useState<CallApiState | null>({
        welcomeMessage: '',
        error: null,
    });

    function isButtonDisabled(): boolean {
        return false;
    }

    function getAccessTokenDescription(): string {
        return "The SPA makes all API calls using SameSite cookies, with no tokens in the browser";
    }

    async function execute() {

        try {
            const data = await props.apiClient.getWelcomeData();
            if (data.message) {

                setState((state: any) => {
                    return {
                        ...state,
                        welcomeMessage: data.message,
                        error: null,
                    };
                });
            }

        } catch (e) {

            setState((state: any) => {
                return {
                    ...state,
                    welcomeMessage: '',
                    error: e.message,
                };
            });
        }
    }

    return (

        <div className='container'>
            <h2>Call APIs</h2>
            <p>{getAccessTokenDescription()}</p>
            <button 
                id='getApiData' 
                className='btn btn-primary operationButton'
                onClick={execute}
                disabled={isButtonDisabled()}>
                    Get Data
            </button>
            {state && state.welcomeMessage &&
            <div>
                <p className='alert alert-success' id='getDataResult'>{state.welcomeMessage}</p>
            </div>}
            {state && state.error &&
            <div>
                <p className='alert alert-danger' id='getDataErrorResult'>{state.error}</p>
            </div>}
            <hr/>
        </div>
    )
}
