import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import Header from 'components/Header/Header'
import FormItem from 'components/FormItem/FormItem'
import * as S from './styles'

const Form = ({ history }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      quantity: '',
      price: ''
    },
    onSubmit: values => {
      setIsSaving(true)

      window
        .fetch('/api/save-item', {
          method: 'POST',
          body: JSON.stringify(values)
        })
        .then(() => setRedirect(true))
    }
  })

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header title='Add New' goBack={() => history.goBack()} />
      <S.Wrapper>
        <form onSubmit={formik.handleSubmit}>
          <FormItem
            label='Title'
            name='title'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          <FormItem
            label='Quantity'
            name='quantity'
            type='number'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
          />
          <FormItem
            label='Price'
            name='price'
            type='number'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          <S.SubmitButton type='submit' disabled={isSaving}>
            Add Item
          </S.SubmitButton>
        </form>
      </S.Wrapper>
    </>
  )
}

export default Form
