const client = require('twilio')(process.env.SID, process.env.AUTH);

async function getLatestSms(toNumber) {
  const msgs = await client.messages.list({ to: toNumber, limit: 5 });
  for (const m of msgs) {
    return { sid: m.sid, body: m.body, dateSent: m.dateSent };
  }
  return null;
}