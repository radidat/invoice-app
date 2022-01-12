import styled from 'styled-components';



 export const Input = styled.input.attrs(props =>({
    type: props.type,
    value : props.value,
    name: props.name,
    readonly : props.readOnly,
    autoComplete:"off"
}))`
background: ${props =>props.darkMode  ? '#252945': '#fff' };
color: ${props =>props.darkMode  ? 'white': 'black' };
        border: 1px solid rgba(0,0,0,0.2) ; 
        height: 38px; 
        width: 300px;
        outline: none;
        margin:8px 0px;
        border-radius: 3px;
        
        &.connexion, &.input-profile{ 
            display: block;
            margin-bottom: 20px;
            width: 80%;
        }
        &.input-medium{
            width: 130px;
        }
        &.addFile{
            position: absolute;
            left:0;
            width:130px;
            opacity:0;
        }
        &.input-quantity{
           width: 60px; 
        }
        &.input-price{ 
              width: 90px;
        }
        &.total-price{
           border:none; 
           color: rgba(0,0, 0, 0.5);
           width: 50px;
        }

        @media only screen and (min-width: 375px){
            width: 350px;

            &.input-medium{ 
                width: 150px;
            }
            &.input-quantity{
                width:80px;
            }
            &.input-price{ 
                width: 110px;
            }
            &total-price{
                width: 70px;
            }
        }

        @media only screen and (min-width: 425px){
            width: 380px;

            &.input-medium{ 
                width: 180px;
            }
            &.input-quantity{
                width:110px;
            }
            &.input-price{ 
                width: 140px;
            }
            &total-price{
                width: 100px;
            }
        }
        @media only screen and (min-width: 768px){
            &.connexion, &.profile{ 
                width: 90%;
            }
        }
`; 

