import * as dotenv from 'dotenv'
dotenv.config()

const body = {
  url: process.env.NEXTJS_WEBHOOK_ROUTE,
  topic: {
    _type: 'brightspot.example.ssg_with_webhooks.notification.BlogPostTopic',
  }
}

const postWebhook = async () => {
  fetch(`${process.env.REST_MANAGEMENT_ENDPOINT}/webhooks`, {
    method: 'POST',
    headers: {
      'X-Client-Id': process.env.CLIENT_ID,
      'X-Client-Secret': process.env.CLIENT_API_KEY,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
}

postWebhook()
