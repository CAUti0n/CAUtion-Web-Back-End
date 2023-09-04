var express = require("express");
var router = express.Router();
//var path = require('path');

const config = require("../config/key");
const Client = require("@notionhq/client").Client;
const NOTION_API_KEY = config.NOTION_API_KEY;
const DB_ID = config.activity_DB_ID;

const notion = new Client({ auth: NOTION_API_KEY });

const getNotionAPI = async () => {
  const notionData = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      property: "Category",
      select: {
        does_not_equal: "스터디",
      },
    },
  });

  const activityAPI = notionData.results.map((activity) => {
    const startDate = activity.properties.Date?.date?.start;
    const endDate = activity.properties.Date?.date?.end || startDate;

    const imageFile = activity.properties.Image?.files?.[0]?.file;
    const image = imageFile ? imageFile.url : "/caution.png";
    //image가 undefined이면 caution.png를 보여줌

    return {
      title: activity.properties.Name?.title[0]?.plain_text,
      startDate: startDate,
      endDate: endDate,
      place: activity.properties.Place?.rich_text[0]?.plain_text,
      url: activity.public_url,
      image: image,
    };
  });

  return activityAPI;
};

router.get("/", async (req, res) => {
  const activityData = await getNotionAPI();
  res.send(activityData);
});

module.exports = router;
