import React, { useEffect, useState, } from 'react'
import * as yup from 'yup'
import axios from 'axios'


export default function Form() {
const [formState, setFormState] = useState({
  name: "",
  size: "",
  pepperoni: "",
  green_peppers: "",
  pineapple: "",
  ham: "",
  // sausage: "",
  // special: "",
});

const [errors, setErrors] = useState({
    name: "",
    size: "",
    pepperoni: "",
    green_peppers: "",
    pineapple: "",
    ham: "",
    // sausage: "",
    // special: "",
})

const [formIsValid, setFormIsValid] = useState(false);

useEffect(() => {
  formSchema.isValid(formState).then((valid) => setFormIsValid(valid));
}, [formState]);

const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}



// 👇 Here you will create your schema.

const formSchema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").max(20, "Name must be at most 20 characters"), 
  size: yup.string().oneOf(["xs", "s", "m", "l"], "size must be S or M or L"),
  pepperoni: yup.string(),
  green_peppers: yup.string(),
  pineapple: yup.string(),
  ham: yup.string(),
  // sausage: yup.string(),
  // special: yup.string(),
})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

const [isSuccess, setIsSuccess] = useState(false)

const handleChangeCheckbox = e => {
  setFormState({
    ...formState,
    [e.target.name]: e.target.checked
  })
}



const handleChangeSize = e =>{
  const name = 'size';
  const value = e.target.value;

  setFormState({
    ...formState,
    [name]: value
  })
  yup
  .reach(formSchema, name)
  .validate(value)
  .then(valid => {
    setErrors({
      ...errors,
      [name]: "",
    })
  })
  .catch(err => {
    setErrors({
      ...errors,
      [name]: err.errors[0]
    })
  })
}


  const handleChange = e => {
  let id = e.target.id
  let value = e.target.value
  setFormState({
    ...formState,
    [id]: value,
  })
    yup
      .reach(formSchema, id)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.id]: "",
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.id]: err.errors[0]
        });
      })
    }
  
    
const handleSubmit = (event) => {
  event.preventDefault()
  axios.post("https://reqres.in/api/orders", formState) 
  .then((r) => setIsSuccess(true))
}

const countToppings = () => {
  let count = 0;
  const toppings = ["pepperoni", "green_peppers", "pineapple", "ham", "sausage"];
  toppings.forEach(topping => {
    if(formState[topping]) {
      count++;
    }
  });
  return count;
}

const getSizeFullWord = (size) => {
  switch(size) {
    case 'xs':
      return 'Extra Small';
    case 's':
      return 'Small';
    case 'm':
      return 'Medium';
    case 'l':
      return 'Large';
    default:
      return '';
  }
}
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>

      {isSuccess && 
  <div className='success'>
    {`Thank you for your order, ${formState.name}! You've ordered a ${getSizeFullWord(formState.size)} pizza with ${countToppings()} toppings.`}
  </div>
}
       

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="name" type="text" name="name" onChange={handleChange} />
        </div>
        {errors.name ? <span>{errors.name}</span> : null}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          {errors.size ? <span>{errors.size}</span> : null}
          <select id="size" name="size" value={formState.size} onChange={handleChangeSize} >
            <option value="">----Choose Size----</option>
            {/* Fill out the missing options */}
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
          </select>
        </div>
    
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
      {toppings.map((topping, index) => (
        <label key={topping.topping_id}>
          <input
            onChange={handleChangeCheckbox}
            name={topping.text.toLowerCase().replace(' ', '_')}
            type="checkbox"
            checked={formState[topping.text.toLowerCase().replace(' ', '_')]}
          />
          {topping.text}<br />
        </label>
         ))}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled={!formIsValid} />
       {/* disabled={!formIsValid} */}
    </form>
  )}
