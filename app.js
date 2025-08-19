import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import "./db/db.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";



const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

var options = {
    swaggerOptions: {
      url: "/api-docs/swagger.json",
    },
  };

const app = express();

const PORT = process.env.PORT || 2000;


app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));


app.use((_, res) => {
    res.status(404).json({
      message: "Route not found",
      status: "error",
    });
  });
  app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  });
  
  
  app.listen(PORT, () => {
    console.log(`Swagger server is running at http://localhost:${PORT}/api-docs`);
  });
  

//   {
//   "components": {
//     "schemas": {
//       "NewTodo": {
//         "type": "object",
//         "required": ["title", "eventId", "end"],
//         "properties": {
//           "title": {
//             "type": "string",
//             "minLength": 1,
//             "example": "New Todo Title"
//           },
//           "description": {
//             "type": "string",
//             "example": "New Todo description"
//           },
//           "isImportant": {
//             "type": "boolean",
//             "default": false,
//             "example": true
//           },
//           "isCompleted": {
//             "type": "boolean",
//             "default": false,
//             "example": false
//           },
//           "start": {
//             "type": "string",
//             "format": "date-time",
//             "example": "2025-04-20T10:00:00Z"
//           },
//           "end": {
//             "type": "string",
//             "format": "date-time",
//             "example": "2025-04-20T11:00:00Z"
//           },
//           "allDay": {
//             "type": "boolean",
//             "default": false,
//             "example": false
//           },
//           "eventId": {
//             "type": "string",
//             "pattern": "^[0-9a-fA-F]{24}$",
//             "example": "6628a6f2bcf42f001c26eec9"
//           },
//           "repeat": {
//             "type": "string",
//             "enum": ["none", "daily", "weekday", "weekend"],
//             "default": "none",
//             "example": "daily"
//           },
//           "reminder": {
//             "type": "object",
//             "properties": {
//               "triggerBefore": {
//                 "type": "string",
//                 "enum": ["30min", "1hour", "1day", "none"],
//                 "default": "none",
//                 "example": "1hour"
//               },
//               "notifyAt": {
//                 "type": "string",
//                 "format": "date-time",
//                 "nullable": true,
//                 "example": "2025-05-20T17:00:00Z"
//               },
//               "notified": {
//                 "type": "boolean",
//                 "default": false,
//                 "example": false,
//                 "readOnly": true
//               }
//             }
//           }
//         }
//       },
//       "Todo": {
//         "allOf": [
//           {
//             "$ref": "#/components/schemas/NewTodo"
//           },
//           {
//             "type": "object",
//             "properties": {
//               "_id": {
//                 "type": "string",
//                 "pattern": "^[0-9a-fA-F]{24}$",
//                 "example": "68a3563ec408cc56ed9c8d69",
//                 "readOnly": true
//               },
//               "createdAt": {
//                 "type": "string",
//                 "format": "date-time",
//                 "example": "2025-08-18T16:35:10.955Z",
//                 "readOnly": true
//               },
//               "updatedAt": {
//                 "type": "string",
//                 "format": "date-time",
//                 "example": "2025-08-18T18:01:23.854Z",
//                 "readOnly": true
//               },
//               "isOverdue": {
//                 "type": "boolean",
//                 "example": true,
//                 "readOnly": true
//               }
//             },
//             "required": ["_id", "createdAt", "updatedAt"]
//           }
//         ]
//       }
//     }
//   }
// }