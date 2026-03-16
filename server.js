const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()

app.use(cors())

app.get("/download", async (req,res)=>{

const url = req.query.url

try{

const response = await axios.get(url)

const html = response.data

const regex = /"video_url":"([^"]+)"/

const match = html.match(regex)

if(!match){
return res.json({error:"Video not found"})
}

const video = match[1].replace(/\\u0026/g,"&")

res.json({
video: video
})

}catch(error){

res.json({
error:"Failed to fetch video"
})

}

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});