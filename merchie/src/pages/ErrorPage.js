import React from 'react';

const ErrorPage = () => {
        return(
        <div class="row mt-5">
            <div class="col-6 offset-3">
                <h4 className="text-center"> Error </h4>
                <div class="alert alert-danger text-center" role="alert">
                    404 - Page not found
                </div>
            </div>
        </div>
        )
    }

export default ErrorPage;