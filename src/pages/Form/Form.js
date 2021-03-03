import { useState } from 'react'

const Form = () => {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)

    const { description, value, paid } = e.target.elements

    window
      .fetch('/api/save-expense', {
        method: 'POST',
        body: JSON.stringify({
          text: description.value,
          value: value.value,
          paid: paid.checked
        })
      })
      .then(() => setIsSaving(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='description-input'>Description</label>
      <input type='text' id='description-input' name='description' />

      <label htmlFor='value-input'>Value</label>
      <input type='text' id='value-input' name='value' />

      <label htmlFor='paid-input'>Paid</label>
      <input type='checkbox' id='paid-input' name='paid' />

      <button type='submit' disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export default Form
