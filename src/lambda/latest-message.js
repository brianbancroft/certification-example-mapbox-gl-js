const sentences = [
  { type: 'statement', message: 'Stopping for lunch' },
  { type: 'statement', message: 'Stopping for a smoke' },
  { type: 'statement', message: 'Fueling up equipment' },
  { type: 'statement', message: 'Working on the assigned sector' },
  { type: 'statement', message: 'Working on the assigned problem' },
  {
    type: 'statement',
    message:
      "I'm about halfway through this stretch. I'm getting a little behind...",
  },
  { type: 'statement', message: 'Working on a challenging bit' },
  {
    type: 'statement',
    message: "There's a bit less frost in this area than I expected",
  },
  {
    type: 'statement',
    message:
      "Taking it slow here. Muskeg is getting pretty tricky and I don't want to sink again...",
  },
  { type: 'request', message: 'Can we get some flagging tape over here?' },
  {
    type: 'request',
    message:
      'We need to see a project manager here. There is something not making sense...',
  },
  {
    type: 'request',
    message: 'Can we get the project manager here? I need sign off.',
  },
]

const getStatement = () =>
  sentences[Math.floor(Math.random() * sentences.length)]

exports.handler = async (event, _context, callback) => {
  return { statusCode: 200, body: getStatement() }
}
