import styled from 'styled-components/macro'

export const AdminStyleDiv = styled.div`
    display:default;
    
`;

export const TableStyleDiv = styled.div`
    width:50%;
   
    margin-left:25%;
    margin-right:60%;
    margin-top:5%;
    
`;

export const CRUDStyleDiv = styled.div`
    display:grid;
    margin-top:10%;
`;

export const ButtonStyle= styled.button`
  
  background-color: #FFFFFF;
  border: 1px solid #222222;
  border-radius: 8px;
  box-sizing: border-box;
  color: #222222;
  cursor: pointer;
  display: inline-block;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 13px 23px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s,-ms-transform .1s,-webkit-transform .1s,transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;
}

.button-23:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow .2s;
}

.button-23:active {
  background-color: #F7F7F7;
  border-color: #000000;
  transform: scale(.96);
}

.button-23:disabled {
  border-color: #DDDDDD;
  color: #DDDDDD;
  cursor: not-allowed;
  opacity: 1;
}

`;
export const LabelStyle = styled.label`
    margin-top:20px;
`;
export const ComponentStyleDiv = styled.div`
   display:flex;
   gap:10px;
`;

export const MiddleAllignDiv = styled.div`
   padding:10px;
   margin-left:45%;
`;