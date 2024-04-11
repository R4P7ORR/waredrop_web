import {useState} from "react";
import {useNavigate} from "react-router-dom";
import RegisterDisplay from "../Displays/RegisterDisplay";
import axios from "axios";
import swal from "sweetalert";

interface RegisterProps{
    handleRegister: (className: string) => void;
}
function Register(props: RegisterProps) {
    const [fullNameInput, setFullNameInput] = useState<string>('');
    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [passwordAgainInput, setPasswordAgainInput] = useState<string>('');

    function sendRegisterRequest() {
        if (!fullNameInput || !emailInput || !passwordInput) {
            swal("All fields must be filled!"," ", "error", {
                buttons: {},
                timer: 1500,
            });
        }else if(passwordInput !== passwordAgainInput){
            swal("The two password do not match!"," ", "error", {
                buttons: {},
                timer: 1500,
            });
        }else{
            axios.post('http://localhost:3001/auth/register', {
                userName: fullNameInput,
                userEmail: emailInput,
                userPassword: passwordInput
            }).then(res => {
                if (res.data.hasOwnProperty('message')){
                    setFullNameInput('');
                    setEmailInput('');
                    setPasswordInput('');
                    setPasswordAgainInput('');
                    props.handleRegister('container');
                    swal("Great!", "Account created successfully!", "success", {
                        buttons: {},
                        timer: 1500,
                    });
                } else {
                    console.log("Unexpected response format");
                }
            }).catch(() => {
                swal("User already exists!", " ", "error", {
                    buttons: {},
                    timer: 1500,
                });
            });
        }
    }
    return (
        <RegisterDisplay fullNameInput={fullNameInput} setFullNameInput={setFullNameInput} emailInput={emailInput} setEmailInput={setEmailInput} passwordInput={passwordInput} setPasswordInput={setPasswordInput} passwordAgainInput={passwordAgainInput} setPasswordAgainInput={setPasswordAgainInput} sendRegisterRequest={() => sendRegisterRequest()}/>
    )
}
export default Register;