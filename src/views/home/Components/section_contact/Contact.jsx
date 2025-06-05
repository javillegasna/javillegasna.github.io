import React from "react";
import "./Contact.css";
const Contact = () => {
    return (
        <div class="contact" id="contact"> 
            <div class="screen">
                <div class="screen-header">
                    <div class="screen-header__left">
                        <div class="screen-header__button close"></div>
                        <div class="screen-header__button maximize"></div>
                        <div class="screen-header__button minimize"></div>
                    </div>
                    <div class="screen-header__right">
                        <div class="screen-header__ellipsis"></div>
                        <div class="screen-header__ellipsis"></div>
                        <div class="screen-header__ellipsis"></div>
                    </div>
                </div>
                <div class="screen-body">
                    <div class="screen-body__item left">
                        <div class="app-title">
                            <span>CONTACT</span>
                            <span>ME</span>
                        </div>
                        <div class="app-contact">
                            <span>CONTACT INFO: </span>
                            <span>+593 987543169</span>
                        </div>
                    </div>
                    <div class="screen-body__item">
                        <div class="app-form">
                            <div class="app-form__group">
                                <input class="app-form__control" placeholder="NAME" value="Your Name" />
                            </div>
                            <div class="app-form__group">
                                <input class="app-form__control" placeholder="EMAIL" />
                            </div>
                            <div class="app-form__group">
                                <input class="app-form__control" placeholder="CONTACT NO" />
                            </div>
                            <div class="app-form__group message">
                                <textarea class="app-form__control" placeholder="MESSAGE" />
                            </div>
                            <div class="app-form__group buttons">
                                <button class="app-form__button">CANCEL</button>
                                <button class="app-form__button">SEND</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;