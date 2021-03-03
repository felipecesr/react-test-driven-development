import { useState } from 'react'

const Form = () => {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='description-input'>Description</label>
      <input type='text' id='description-input' />

      <label htmlFor='value-input'>Value</label>
      <input type='text' id='value-input' />

      <label htmlFor='paid-input'>Paid</label>
      <input type='checkbox' id='paid-input' />

      <button type='submit' disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export default Form
