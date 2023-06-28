const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.MY_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/quote", async (req, res) => {
  const keyword = req.body.keyword
  const completion_text = "Act as a expert Quote generator The user will provide you an keyword as an input ans you have to generate a Quote in English"
  const messages = [];

  messages.push({ role: "user", content: keyword });
  messages.push({ role: "assistant", content: completion_text });

  try {
    if (!keyword) throw new Error("No input is provided")

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    console.log(completion.data.choices[0].message.content.split("\n")[0])
    res.send(JSON.stringify(completion.data.choices[0].message.content.split("\n")[0]))
  } catch (error) {

    res.send("something went wrong!!!")

  }
})

app.listen(8080, () => {
  console.log("running")
}
)





