module.exports = {
flex :function(title,coverurl,code,size)
{
    title = title.slice(0,40);
    return {
        type: "bubble",
        direction: "ltr",
        hero: {
          type: "image",
          url: coverurl,
          size: "full",
          aspectRatio: size,
          aspectMode: "fit",
          backgroundColor: "#FFC0CB"
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: title,
              size: "xl",
              align: "start",
              gravity: "top",
              color: "#3E2929"
            }
          ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "READ",
                  "uri": "https://nhentai.net/g/"+code+"/0/"
                },
                "flex": 6,
                "color": "#ff5e87",
                "margin": "xs",
                "height": "md",
                "style": "primary",
                "gravity": "top"
              },
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "READ (no ads)",
                  "uri": "https://opener.studio/h/"+code
                },
                "flex": 6,
                "color": "#9564f5",
                "margin": "xs",
                "height": "md",
                "style": "primary",
                "gravity": "top"
              },
            ]
          }
      }
}
}