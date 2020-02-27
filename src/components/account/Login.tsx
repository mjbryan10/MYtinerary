import React from "react";
import AccountInput from './AccountInput';
import PasswordInput from './PasswordInput';

function CreateAccount() {
	return <form>
        <AccountInput placeholder="Username" />
        <PasswordInput />
    </form>;
}

export default CreateAccount;

