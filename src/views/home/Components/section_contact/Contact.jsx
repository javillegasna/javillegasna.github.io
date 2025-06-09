import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import "./Contact.css";
const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

const Contact = () => {
    const form = useRef();
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        message: "",
    })
    const sanitizeValues = input => {
        return input
            .trim()
            .replace(/<[^>]*>?/gm, '')
            .replace(/&/g, '')
            .replace(/"/g, '')
            .replace(/'/g, '');
    }
    const handleOnchangeInputs = (value, inputName)=>{
        setFormValues({...formValues, [inputName]:sanitizeValues(value)})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        emailjs
            .sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                form.current,
                { publicKey: PUBLIC_KEY },
            )
            .then(
                () => alert("Email has been send successfully!"),
                (error) => console.log('FAILED...', error,),
            );

    }
    return (
        <section className="contact" id="contact">
            <div className="screen">
                <header className="screen-header">
                    <div className="screen-header__left">
                        <div className="screen-header__button close"></div>
                        <div className="screen-header__button maximize"></div>
                        <div className="screen-header__button minimize"></div>
                    </div>
                    <div className="screen-header__right">
                        <div className="screen-header__ellipsis"></div>
                        <div className="screen-header__ellipsis"></div>
                        <div className="screen-header__ellipsis"></div>
                    </div>
                </header>
                <div className="screen-body">
                    <aside className="screen-body__item left">
                        <div className="app-title">
                            <span>CONTACT</span>
                            <span>ME</span>
                        </div>
                        <div className="app-contact">
                            <span>CONTACT INFO: </span>
                            <span>+593 987543169</span>
                        </div>
                    </aside>
                    <div className="screen-body__item">
                        <form ref={form} onSubmit={handleSubmit} className="app-form">
                            <fieldset className="app-form__group name">
                                <input className="app-form__control" name="name" placeholder="YOUR NAME" onChange={
                                    (e) => handleOnchangeInputs(e.target.value, "name")
                                } value={formValues.name}/>
                            </fieldset>
                            <fieldset className="app-form__group">
                                <input type="email" className="app-form__control email" name="email" placeholder="EMAIL" onChange={
                                    (e) => handleOnchangeInputs(e.target.value, "email")
                                } value={formValues.email} />
                            </fieldset>
                            <fieldset className="app-form__group">
                                <textarea className="app-form__control text" name="message" placeholder="MESSAGE" onChange={
                                    (e) => handleOnchangeInputs(e.target.value, "message")
                                } value={formValues.message} />
                            </fieldset>
                            <fieldset className="app-form__group buttons">
                                <button type="reset" className="app-form__button">CANCEL</button>
                                <button type="submit" className="app-form__button">SEND</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;