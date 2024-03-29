import React, { useEffect, useState, } from 'react'
import * as yup from 'yup'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}


// 👇 Here you will create your schema.

const formSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong),
  size: yup
    .string()
    .required("Size is required")
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
})


// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {
const [isSuccess, setIsSuccess] = useState(false)
const [isFailure, setIsFailure] = useState(false)

// const [formIsValid, setFormIsValid] = useState(false)

// useEffect(() => {
//   formSchema.isValid(formState)
//   .then(vailid => setFormIsValid(valid))
// },[formState])

  return (
    <form>
      <h2>Order Your Pizza</h2>

      {isSuccess && <div className='success'>Thank you for your order!</div>}
      {isFailure && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size">
            <option value="">----Choose Size----</option>
            {/* Fill out the missing options */}
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
      {toppings.map((topping, index) => (
        <label key={index}>
          <input
            name={topping.topping_id}
            type="checkbox"
          />
          {topping.text}<br />
        </label>
         ))}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" />
       {/* disabled={!formIsValid} */}
    </form>
  )
}
