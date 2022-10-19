import React,{useReducer,useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { setCode } from '../../../Redux/features/Phone/PhoneNum';
const CodeDiv = () => {
    const dispatchRedux = useDispatch()
    const initialState = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    }
    
    const [indexVal, dispatch] = useReducer(reducer, initialState);

    const [Opt, setOpt] = useState(0)
    useEffect(() => {
        const sum = CalcOpt(1,1000)
        console.log(String(sum).padStart(4, '0'))
        setOpt(String(sum).padStart(4, '0'))
        dispatchRedux(setCode(Opt))

    }), [dispatch]
    
    function CalcOpt(i ,mult){
        // 1 0 2 5 . 1*1000+0*100+2*10+5*1
        if(mult < 10) return indexVal[i] * 1; 
        return (indexVal[i] * mult) + CalcOpt(++i,mult /=10);
    }

    function reducer(state, action) {
        switch (action.type) {
          case 'change1':
            return { ...state, 1: action.payload };
          case 'change2':
            return { ...state, 2: action.payload };
          case 'change3':
            return { ...state, 3: action.payload };
          case 'change4':
            return { ...state, 4: action.payload };
          default:
            throw new Error();
        }
      }

    const handleChange = (event,number) => {
    const { value } = event.target;
    dispatch({type: 'change'+number, payload: (value.slice(-1))})
    // InputSms.focus();
    // InputSms.setSelectionRange(InputSms.current.value, InputSms.current.value);
    };
  return (
    <div className='flex'>
            <div className='code-text'>
                {[1,2,3,4].map((number,index)=>(
                    <input
                    className = {'smsCode input'+number} 
                    value={indexVal[number]}
                    key={index}
                    type="number"
                    onChange = {(event)=>{handleChange(event,number)}
                    }/>
                ))}
            </div>
        </div> 
  )
}

export default CodeDiv