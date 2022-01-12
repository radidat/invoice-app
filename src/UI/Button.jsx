import styled from 'styled-components'; 
import { Section } from './Section';




  export const Button = styled.button.attrs((props)=>({
    type:'submit'

}))` 
      display: inline-block;
       outline: none; 
       border:none;
       cursor:pointer;
       background:none;
     border-radius:25px; 

`
 export const WrapperButtonForm=styled(Section)`
 background: ${props =>props.darkMode  ? '#252945': '#fff' };
margin: 15px 0px -5px 0px;
box-shadow: ${props =>props.darkMode  ? 'none': '0px 0px 35px #555' };;
width: 100%;
@media only screen and (min-width: 768px){ 
&.btn-from-responsive{
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
}

`;


 export const  ButtonDiscord = styled(Button)`
 `;
 export const ButtonForm  = styled(Button).attrs(props =>({
   type:'submit'
 }))`
 margin-top: 25px;
padding:15px 30px;
 font-size: 12px;
 &.btn-cancel, &.btn-discord{
  background-color:#F9FAFE;
  color: #7E88C3; 
  font-weight:bolder;
 }
 &.btn-cancel{ 
   margin-left: 50px;
 }
 &.btn-save-change,&.btn-save-send { 
   background-color: #7C5DFA; 
   color: #fff;
 }
 &.btn-save-draft, &.btn-save-send{
   padding-left: 15px;
   padding-right:15px;
   margin-left: 5px;
 }
 &.btn-save-draft{ 
   color: #888EB0;
   background-color:#373B53;
 }
 &.btn-connect{
   background-color: #373B53;
   margin-bottom: 25px;
   font-size: 20px;
   color:#fff;
   width: 80%;
 }
 @media only screen and (min-width: 375px){ 
  &.btn-discord{
    margin-left: 30px;
  }
 @media only screen and (min-width: 425px){ 
  &.btn-cancel{ 
    margin-left: 90px;
  }
  &.btn-discord{
    margin-left: 50px;
  }

 }
`;
