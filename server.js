import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/save-segment", async (req, res) => {
  try {
    const response = await fetch("https://webhook.site/44a5140e-9315-40d2-a780-14eec0f5c881", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending to webhook");
  }
});

app.listen(4000, () => console.log("Proxy running on port 4000"));
