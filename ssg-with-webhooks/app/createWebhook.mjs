import * as dotenv from 'dotenv'
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REST_MANAGEMENT_ENDPOINT = process.env.REST_MANAGEMENT_ENDPOINT
const NEXTJS_WEBHOOK_ROUTE = process.env.NEXTJS_WEBHOOK_ROUTE

const body = {
    url: NEXTJS_WEBHOOK_ROUTE,
    topic: {
      _type: 'brightspot.example.ssg_with_webhooks.SsgTopic',
    }
}

const postWebhook = async () => {

  fetch(`${REST_MANAGEMENT_ENDPOINT}/webhooks`, {
    method: 'POST',
    headers: {
      'X-Client-Id': CLIENT_ID,
      'X-Client-Secret': CLIENT_SECRET,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
}

postWebhook()
