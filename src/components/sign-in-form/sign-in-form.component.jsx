import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {

	const [ formFields, setFormFields ] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(!password) {
			alert('Passwords do not match');
			return;
		}
		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);
			//console.log(response);
			resetFormFields();
		} catch(err) {
			switch(err.code) {
				case 'auth/wrong-password':
					alert('Incorrect password');
					break;
				case 'auth/user-not-found':
					alert('No user with that email');
					break;
				default:
					console.log(err);
			}
		}
	}

	const handleChange = (event) => {
		const {name, value} = event.target;
		setFormFields({...formFields, [name]: value});
	};

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label='Email'
						   type="email"
						   required
						   onChange={handleChange}
						   name="email"
						   value={email}
				/>
				<FormInput label='Password'
						   type="password"
						   required
						   onChange={handleChange}
						   name="password"
						   value={password}
				/>
				<div className='buttons-container'>
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
				</div>
			</form>
		</div>
	);
}

export default SignInForm
