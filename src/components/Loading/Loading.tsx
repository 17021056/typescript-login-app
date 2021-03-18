import React from 'react';
import './Loading.css'

function Loading() {
    return (
        <React.Fragment>
            <div className="about">
            <a className="bg_links social portfolio" href="https://www.rafaelalucas.com" target="_blank">
                <span className="icon"></span>
            </a>
            <a className="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" target="_blank">
                <span className="icon"></span>
            </a>
            <a className="bg_links social linkedin" href="https://www.linkedin.com/in/rafaelalucas/" target="_blank">
                <span className="icon"></span>
            </a>
            </div>
            <div className="content__loading">
                <div className="loading">
                    <p>loading</p>
                    <span></span>
                </div>
        </div>
        </React.Fragment>
    );
}

export default Loading;