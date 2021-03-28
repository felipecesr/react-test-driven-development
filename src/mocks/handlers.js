import { rest } from 'msw'
import faker from 'faker'
import { itemBuilder } from 'utils/generate'

const BASE_URL =
  'https://react-test-driven-development.netlify.app/.netlify/identity'

const accessTokenResponse = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTYyNTI4MjQsInN1YiI6ImRkMzU2ZjY5LWFmYzUtNDQ1Ni1hMGJmLWJiZTZkMWU5Mjk5OSIsImVtYWlsIjoiZmVsaXBlY2VzckBnbWFpbC5jb20iLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCJ9LCJ1c2VyX21ldGFkYXRhIjp7ImZ1bGxfbmFtZSI6IkZlbGlwZSBDw6lzYXIifX0.fTrWmMa5C0pqjVS4wmRGNbM2LAp7A4eTkxQhjnHT4Rw',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: '5H-7zn8pqTrC7RxcBPv_dg'
}

function resourceOwnerPasswordGrant(req, res, ctx, username, password) {
  if (!username || !password) {
    return res(
      ctx.status(400),
      ctx.json({
        error: 'invalid_grant',
        error_description: 'No user found with that email, or password invalid.'
      })
    )
  }

  return res(ctx.json(accessTokenResponse))
}

function refreshTokenGrant(req, res, ctx, refreshToken) {
  if (!refreshToken) {
    return res(
      ctx.status(400),
      ctx.json({
        error: 'invalid_grant',
        error_description: 'refresh_token required.'
      })
    )
  }

  return res(ctx.json(accessTokenResponse))
}

// based on https://github.com/netlify/gotrue
// https://github.com/netlify/gotrue-js
export const handlers = [
  rest.get('/api/items', async (req, res, ctx) => {
    const mockResolvedValues = Array.from({ length: 3 }, itemBuilder)
    return res(ctx.json(mockResolvedValues))
  }),

  rest.post('/api/save-item', async (req, res, ctx) => {
    return res(
      ctx.json({
        newExpense: {
          _id: faker.random.uuid(),
          ...req.body
        }
      })
    )
  }),

  rest.post(`${BASE_URL}/token`, async (req, res, ctx) => {
    const params = new URLSearchParams(req.body)

    switch (params.get('grant_type')) {
      case 'password':
        const username = params.get('username')
        const password = params.get('password')
        return resourceOwnerPasswordGrant(req, res, ctx, username, password)

      case 'refresh_token':
        const refreshToken = params.get('refresh_token')
        return refreshTokenGrant(req, res, ctx, refreshToken)

      default:
        throw new Error('unsupported_grant_type')
    }
  }),

  rest.get(`${BASE_URL}/user`, async (req, res, ctx) => {
    const isAuthorized = req.headers.map.authorization

    if (!isAuthorized) {
      return res(ctx.status(401), ctx.json({ message: 'Not authorized' }))
    }

    return res(
      ctx.json({
        id: '11111111-2222-3333-4444-5555555555555',
        email: 'email@example.com',
        confirmation_sent_at: '2016-05-15T20:49:40.882805774-07:00',
        created_at: '2016-05-15T19:53:12.368652374-07:00',
        updated_at: '2016-05-15T19:53:12.368652374-07:00',
        user_metadata: {}
      })
    )
  })
]
